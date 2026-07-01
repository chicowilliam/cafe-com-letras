import { Camera, Images } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { GalleryViewer } from "@/components/GalleryViewer";
import { useInView } from "@/hooks/useInView";
import {
  GALLERY_MARQUEE_IMAGES,
  MARQUEE_CARD_HEIGHT_MD,
  isFeaturedMarqueeIndex,
  marqueeCardWidth,
} from "@/lib/gallery-images";
import "@/styles/gallery-marquee.css";

export function ImageMarquee() {
  const [paused, setPaused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerStartIndex, setViewerStartIndex] = useState(0);
  const [sectionRef, sectionInView] = useInView<HTMLElement>({
    rootMargin: "120px",
    threshold: 0,
  });

  const images = GALLERY_MARQUEE_IMAGES;

  const loop = useMemo(() => [...images, ...images], [images]);

  const openViewer = (index: number) => {
    setViewerStartIndex(index);
    setViewerOpen(true);
  };

  const preloadViewerImage = (index: number) => {
    const image = images[index];
    if (!image) return;
    const preview = new Image();
    preview.src = image.previewSrc;
    const hires = new Image();
    hires.src = image.viewerSrc;
  };

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="gallery-marquee-section overflow-hidden bg-surface section-padding"
    >
      <div className="gallery-marquee-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="gallery-marquee-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto mb-10 max-w-6xl md:mb-14">
        <AnimatedSectionHeading
          eyebrow="Galeria"
          title="Café, cultura e encontros"
          align="left"
          kicker="Arquivo e presente — memórias da casa e instantes de hoje na Savassi."
          leading={
            <Camera size={16} className="text-accent" strokeWidth={1.5} aria-hidden />
          }
          editorial
        />
        <p className="section-caption mt-3 text-foreground-muted/70">
          {images.length} fotos · arquivo e presente
        </p>
        <button
          type="button"
          onClick={() => openViewer(0)}
          className="section-caption focus-ring mt-4 inline-flex items-center gap-2 text-foreground-muted/75 transition-colors duration-300 hover:text-accent"
        >
          <Images size={12} strokeWidth={1.5} aria-hidden />
          Ver galeria completa
        </button>
      </div>

      <div className="relative -mx-5 md:-mx-8">
        <div className="gallery-marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-24" />
        <div className="gallery-marquee-fade gallery-marquee-fade--right pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-24" />

        <div
          className="gallery-marquee-track flex cursor-grab overflow-hidden px-5 md:px-8 motion-reduce:cursor-default"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {sectionInView ? (
            <div
              className={`animate-marquee flex shrink-0 items-center gap-4 md:gap-6 marquee-running motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]${paused ? " marquee-paused" : ""}`}
            >
              {loop.map((image, loopIndex) => {
                const imageIndex = loopIndex % images.length;
                const featured = isFeaturedMarqueeIndex(imageIndex);
                const prevImage = loopIndex > 0 ? loop[loopIndex - 1] : null;
                const eraBreak =
                  loopIndex > 0 &&
                  image.folder &&
                  prevImage?.folder &&
                  image.folder !== prevImage.folder;
                const cardWidth = marqueeCardWidth(image, featured, MARQUEE_CARD_HEIGHT_MD);
                const eraClass =
                  image.folder === "antigas"
                    ? "gallery-marquee-card--antigas"
                    : image.folder === "novas"
                      ? "gallery-marquee-card--novas"
                      : "";

                return (
                  <span key={`galeria-wrap-${image.src}-${loopIndex}`} className="flex items-center gap-4 md:gap-6">
                    {eraBreak ? (
                      <span className="gallery-marquee-era-break" aria-hidden />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => openViewer(imageIndex)}
                      onMouseEnter={() => preloadViewerImage(imageIndex)}
                      onFocus={() => preloadViewerImage(imageIndex)}
                      aria-label={`Abrir foto ${imageIndex + 1} de ${images.length}${image.eraLabel ? ` — ${image.eraLabel}` : ""}`}
                      className={`gallery-marquee-card focus-ring h-[220px] md:h-[260px] ${eraClass}${featured ? " gallery-marquee-card--featured" : ""}`}
                      style={{ width: cardWidth }}
                    >
                      <img
                        src={featured ? image.featuredSrc : image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="gallery-marquee-card__photo"
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      {image.eraLabel ? (
                        <span className="gallery-marquee-card__label section-caption">
                          {image.eraLabel}
                        </span>
                      ) : null}
                    </button>
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <GalleryViewer
        images={images}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        startIndex={viewerStartIndex}
      />
    </section>
  );
}
