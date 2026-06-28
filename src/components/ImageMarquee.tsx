import { Camera } from "lucide-react";
import { useState } from "react";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { useInView } from "@/hooks/useInView";
import { MARQUEE_IMAGES } from "@/lib/marquee-images";

export function ImageMarquee() {
  const loop = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
  const [paused, setPaused] = useState(false);
  const [sectionRef, sectionInView] = useInView<HTMLElement>({
    rootMargin: "120px",
    threshold: 0,
  });

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
          kicker="Artistas locais e nacionais — fotografia, pintura e a cena cultural de BH."
          leading={
            <Camera size={16} className="text-accent" strokeWidth={1.5} aria-hidden />
          }
          editorial
        />
      </div>

      <div className="relative -mx-5 md:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent md:w-24" />

        <div
          className="flex min-h-36 cursor-grab overflow-hidden px-5 sm:min-h-40 md:min-h-44 md:px-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {sectionInView ? (
            <div
              className={`animate-marquee flex shrink-0 gap-5 md:gap-8 marquee-running${paused ? " marquee-paused" : ""}`}
            >
              {loop.map((image, index) => (
                <div
                  key={`galeria-${index}`}
                  className="relative h-36 w-48 shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-52 md:h-44 md:w-56"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={224}
                    height={176}
                    className="h-full w-full object-cover"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
