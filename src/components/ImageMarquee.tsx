import { Camera } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useInView } from "@/hooks/useInView";
import { MARQUEE_IMAGES } from "@/lib/marquee-images";

export function ImageMarquee() {
  const loop = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
  const [sectionRef, sectionInView] = useInView<HTMLElement>({
    rootMargin: "200px",
    threshold: 0,
  });

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="overflow-hidden border-t border-hairline bg-surface section-padding"
    >
      <div className="mx-auto mb-10 max-w-6xl md:mb-14">
        <FadeIn className="flex items-center gap-2.5">
          <Camera size={16} className="text-accent" strokeWidth={1.5} />
          <span className="section-eyebrow mb-0">Momentos</span>
        </FadeIn>

        <FadeIn as="h2" delay={0.08} className="section-title mt-3">
          Café, cultura e encontros
        </FadeIn>
      </div>

      <div className="relative -mx-5 md:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent md:w-24" />

        <div className="flex overflow-hidden px-5 md:px-8">
          <div
            className={`animate-marquee flex shrink-0 gap-5 md:gap-8${sectionInView ? "" : " marquee-paused"}`}
          >
            {loop.map((image, index) => (
              <div
                key={`galeria-${index}`}
                className="relative h-36 w-48 shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-52 md:h-44 md:w-56"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
