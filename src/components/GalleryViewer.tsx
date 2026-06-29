import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useEmblaSlideTween } from "@/hooks/useEmblaSlideTween";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
  galleryImageAspectRatio,
  type MarqueeImage,
} from "@/lib/gallery-images";

type GalleryViewerProps = {
  images: MarqueeImage[];
  open: boolean;
  onClose: () => void;
  startIndex?: number;
};

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduceMotion;
}

export function GalleryViewer({
  images,
  open,
  onClose,
  startIndex = 0,
}: GalleryViewerProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const reduceMotion = usePrefersReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: images.length > 1,
    startIndex,
    dragFree: false,
  });

  useEmblaSlideTween(emblaApi, reduceMotion);
  useFocusTrap(dialogRef, open);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!open || !emblaApi) return;
    emblaApi.scrollTo(startIndex, true);
    setActiveIndex(startIndex);
  }, [emblaApi, open, startIndex]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

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

  if (!open || images.length === 0) return null;

  const activeImage = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-background/94 backdrop-blur-md motion-reduce:backdrop-blur-none"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-roledescription="carrossel"
        tabIndex={-1}
        className="relative flex min-h-0 flex-1 flex-col outline-none"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
          <p id={titleId} className="section-caption">
            Galeria · {activeIndex + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar galeria"
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground-muted transition-colors hover:border-accent/35 hover:text-accent"
          >
            <X size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20 md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20 md:w-28" />

          <div ref={emblaRef} className="w-full overflow-hidden">
            <div className="flex touch-pan-y gap-4 px-[max(5vw,0.75rem)] sm:gap-6 md:gap-8">
              {images.map((image, index) => {
                const isActive = activeIndex === index;
                const aspectRatio = galleryImageAspectRatio(image);

                return (
                  <div
                    key={`viewer-${image.src}-${index}`}
                    className="gallery-viewer-slide flex min-w-0 shrink-0 basis-[min(84vw,40rem)] items-center justify-center sm:basis-[min(72vw,36rem)] lg:basis-[min(58vw,32rem)]"
                    aria-hidden={!isActive}
                  >
                    <div
                      className={`flex max-h-[min(68vh,640px)] w-full items-center justify-center overflow-hidden rounded-xl bg-[color-mix(in_srgb,var(--foreground)_6%,var(--background))] transition-[box-shadow,ring-color] duration-500 motion-reduce:transition-none ${
                        isActive
                          ? "shadow-[0_16px_56px_rgba(0,0,0,0.42)] ring-1 ring-accent/25"
                          : "shadow-[0_8px_28px_rgba(0,0,0,0.28)] ring-1 ring-hairline"
                      }`}
                      style={{ aspectRatio }}
                    >
                      <img
                        src={image.viewerSrc}
                        alt={isActive ? image.alt : ""}
                        width={image.width}
                        height={image.height}
                        decoding="async"
                        loading={Math.abs(index - startIndex) <= 2 ? "eager" : "lazy"}
                        draggable={false}
                        className="max-h-[min(68vh,640px)] w-full object-contain"
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
                className="focus-ring absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-background/75 text-foreground-muted backdrop-blur-sm transition-colors hover:border-accent/35 hover:text-accent sm:left-5 md:left-8"
              >
                <ChevronLeft size={20} strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Próxima foto"
                className="focus-ring absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-background/75 text-foreground-muted backdrop-blur-sm transition-colors hover:border-accent/35 hover:text-accent sm:right-5 md:right-8"
              >
                <ChevronRight size={20} strokeWidth={1.5} aria-hidden />
              </button>
            </>
          ) : null}
        </div>

        <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
          {activeImage?.folder ? (
            <p className="section-caption text-center sm:text-left">
              {activeImage.folder === "antigas" ? "Arquivo histórico" : "Savassi hoje"}
            </p>
          ) : (
            <p className="section-caption text-center opacity-0 sm:text-left" aria-hidden>
              &nbsp;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
