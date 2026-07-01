import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { MarqueeImage } from "@/lib/gallery-images";
import {
  galleryLightboxCaption,
  galleryLightboxYear,
} from "@/lib/gallery-images";
import "@/styles/gallery-lightbox.css";

type GalleryViewerProps = {
  images: MarqueeImage[];
  open: boolean;
  onClose: () => void;
  startIndex?: number;
};

const LIGHTBOX_EASE = [0.22, 1, 0.36, 1] as const;
const PRELOAD_RADIUS = 2;

function loopDistance(active: number, index: number, total: number) {
  const linear = Math.abs(active - index);
  return Math.min(linear, total - linear);
}

function neighborIndices(active: number, total: number, radius = PRELOAD_RADIUS) {
  const indices = new Set<number>();
  for (let offset = 0; offset <= radius; offset += 1) {
    if (offset === 0) {
      indices.add(active);
      continue;
    }
    indices.add((active + offset) % total);
    indices.add((active - offset + total) % total);
  }
  return [...indices];
}

function preloadImages(images: MarqueeImage[], indices: number[]) {
  const links: HTMLLinkElement[] = [];

  for (const index of indices) {
    const href = images[index]?.viewerSrc;
    if (!href) continue;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    links.push(link);
  }

  return () => {
    for (const link of links) {
      link.remove();
    }
  };
}

type LightboxPhotoProps = {
  image: MarqueeImage;
  isActive: boolean;
  distance: number;
};

function LightboxPhoto({ image, isActive, distance }: LightboxPhotoProps) {
  const shouldLoadHires = distance <= PRELOAD_RADIUS;
  const [hiresReady, setHiresReady] = useState(false);
  const placeholderSrc = image.previewSrc;

  useEffect(() => {
    setHiresReady(false);
  }, [image.viewerSrc]);

  return (
    <div className="gallery-lightbox-photo-wrap">
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden
        width={image.width}
        height={image.height}
        decoding="async"
        draggable={false}
        className={`gallery-lightbox-photo gallery-lightbox-photo--placeholder${hiresReady ? " is-replaced" : ""}`}
      />
      {shouldLoadHires ? (
        <img
          src={image.viewerSrc}
          alt={isActive ? image.alt : ""}
          width={image.width}
          height={image.height}
          decoding="async"
          draggable={false}
          fetchPriority={isActive ? "high" : "low"}
          onLoad={() => setHiresReady(true)}
          className={`gallery-lightbox-photo gallery-lightbox-photo--hires${hiresReady ? " is-ready" : ""}`}
        />
      ) : null}
    </div>
  );
}

type GalleryLightboxLayerProps = {
  images: MarqueeImage[];
  onClose: () => void;
  startIndex: number;
  reduceMotion: boolean | null;
};

function GalleryLightboxLayer({
  images,
  onClose,
  startIndex,
  reduceMotion,
}: GalleryLightboxLayerProps) {
  const titleId = useId();
  const liveId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: images.length > 1,
    startIndex,
    dragFree: false,
    skipSnaps: false,
  });

  useFocusTrap(dialogRef, true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(startIndex, true);
    setActiveIndex(startIndex);
  }, [emblaApi, startIndex]);

  useEffect(() => {
    return preloadImages(images, neighborIndices(activeIndex, images.length));
  }, [activeIndex, images]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const onResize = () => emblaApi?.reInit();

    document.documentElement.dataset.galleryOpen = "true";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    closeButtonRef.current?.focus();

    return () => {
      delete document.documentElement.dataset.galleryOpen;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi, onClose]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [emblaApi, scrollNext, scrollPrev],
  );

  const activeImage = images[activeIndex];
  const caption = activeImage ? galleryLightboxCaption(activeImage) : null;
  const year = activeImage ? galleryLightboxYear(activeImage) : null;

  return (
    <>
      <m.button
        type="button"
        aria-label="Fechar galeria"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: LIGHTBOX_EASE }}
        className="gallery-lightbox-backdrop fixed inset-0 z-[90] cursor-default"
        onClick={onClose}
      />

      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-roledescription="carrossel"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: LIGHTBOX_EASE }}
        className="gallery-lightbox-stage pointer-events-none fixed inset-0 z-[91] flex flex-col outline-none"
        onKeyDown={handleKeyDown}
      >
        <div className="gallery-lightbox-glow pointer-events-none" aria-hidden />

        <header className="gallery-lightbox-header pointer-events-auto relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-6 md:px-8">
          <p id={titleId} className="gallery-lightbox-counter section-caption">
            <span className="sr-only">Galeria — foto </span>
            {activeIndex + 1}
            <span aria-hidden> / </span>
            {images.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar galeria"
            className="gallery-lightbox-control focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted"
          >
            <X size={17} strokeWidth={1.5} aria-hidden />
          </button>
        </header>

        <p id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
          Foto {activeIndex + 1} de {images.length}
          {caption ? ` — ${caption}` : ""}
          {year ? ` (${year})` : ""}
        </p>

        <div className="pointer-events-auto relative flex min-h-0 flex-1 items-center">
          <div ref={emblaRef} className="w-full overflow-hidden">
            <div className="gallery-lightbox-track flex">
              {images.map((image, index) => {
                const distance = loopDistance(activeIndex, index, images.length);
                const isActive = distance === 0;
                const isAdjacent = distance === 1;

                return (
                  <div
                    key={`viewer-${image.previewSrc}-${index}`}
                    className={`gallery-lightbox-slide${isActive ? " is-active" : ""}${isAdjacent ? " is-adjacent" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <div className="gallery-lightbox-photo-frame">
                      <LightboxPhoto
                        image={image}
                        isActive={isActive}
                        distance={distance}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Foto anterior"
                className="gallery-lightbox-control gallery-lightbox-control--nav focus-ring absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-foreground-muted sm:inline-flex md:left-4"
              >
                <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Próxima foto"
                className="gallery-lightbox-control gallery-lightbox-control--nav focus-ring absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-foreground-muted sm:inline-flex md:right-4"
              >
                <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
              </button>
            </>
          ) : null}
        </div>

        <footer className="gallery-lightbox-footer pointer-events-none relative z-20 shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-center sm:px-6 md:px-8">
          {caption ? (
            <>
              <p className="gallery-lightbox-era section-caption">
                <span className="gallery-lightbox-era__dot" aria-hidden />
                {caption}
              </p>
              {year ? (
                <p className="gallery-lightbox-year mt-1 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-foreground-muted/80">
                  {year}
                </p>
              ) : null}
            </>
          ) : (
            <p className="section-caption opacity-0" aria-hidden>
              &nbsp;
            </p>
          )}
        </footer>
      </m.div>
    </>
  );
}

export function GalleryViewer({
  images,
  open,
  onClose,
  startIndex = 0,
}: GalleryViewerProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open || images.length === 0) return;
    return preloadImages(images, neighborIndices(startIndex, images.length));
  }, [open, images, startIndex]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && images.length > 0 ? (
        <div key="gallery-lightbox" className="gallery-lightbox-root">
          <GalleryLightboxLayer
            images={images}
            onClose={onClose}
            startIndex={startIndex}
            reduceMotion={reduceMotion}
          />
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
