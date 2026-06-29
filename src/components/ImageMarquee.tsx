import { Camera, Images } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { GalleryViewer } from "@/components/GalleryViewer";
import { useInView } from "@/hooks/useInView";
import {
  GALLERY_MARQUEE_IMAGES,
  galleryImageAspectRatio,
} from "@/lib/gallery-images";

export function ImageMarquee() {
  const [paused, setPaused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [sectionRef, sectionInView] = useInView<HTMLElement>({
    rootMargin: "120px",
    threshold: 0,
  });

  const images = GALLERY_MARQUEE_IMAGES;

  const loop = useMemo(
    () => [...images, ...images],
    [images],
  );

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="overflow-hidden bg-surface section-padding"
    >
      <div className="mx-auto mb-10 max-w-6xl md:mb-14">
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
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          className="section-caption focus-ring mt-5 inline-flex items-center gap-2 text-foreground-muted/75 transition-colors duration-300 hover:text-accent"
        >
          <Images size={12} strokeWidth={1.5} aria-hidden />
          Ver galeria completa
        </button>
      </div>

      <div className="relative -mx-5 md:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent md:w-24" />

        <div
          className="flex min-h-36 cursor-grab overflow-hidden px-5 sm:min-h-40 md:min-h-44 md:px-8 motion-reduce:cursor-default"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {sectionInView ? (
            <div
              className={`animate-marquee flex shrink-0 gap-5 md:gap-8 marquee-running motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]${paused ? " marquee-paused" : ""}`}
            >
              {loop.map((image, index) => {
                const aspectRatio = galleryImageAspectRatio(image);

                return (
                  <div
                    key={`galeria-${image.src}-${index}`}
                    className="gallery-marquee-card relative h-36 shrink-0 overflow-hidden rounded-xl bg-[color-mix(in_srgb,var(--foreground)_5%,var(--surface))] ring-1 ring-hairline/60 sm:h-40 md:h-44"
                    style={{ aspectRatio }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-full w-full object-contain"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
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
      />
    </section>
  );
}
