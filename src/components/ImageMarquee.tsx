import { Camera } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useInView } from "@/hooks/useInView";
import { MARQUEE_IMAGES } from "@/lib/constants";

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
      className="overflow-hidden bg-[#1a1614] py-12 md:py-24"
    >
      <div className="mx-auto mb-10 max-w-6xl px-5 md:mb-16 md:px-8">
        <FadeIn className="flex items-center gap-2.5">
          <Camera size={16} className="text-accent" strokeWidth={1.5} />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
            Momentos
          </span>
        </FadeIn>

        <FadeIn
          as="h2"
          delay={0.08}
          className="mt-3 font-serif text-2xl text-[#f5f0e6] md:text-3xl"
        >
          Café, cultura e encontros
        </FadeIn>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#1a1614] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#1a1614] to-transparent md:w-24" />

        <div className="flex overflow-hidden px-5 md:px-8">
          <div
            className={`animate-marquee flex shrink-0 gap-5 md:gap-10${sectionInView ? "" : " marquee-paused"}`}
          >
            {loop.map((image, index) => (
              <div
                key={`galeria-${index}`}
                className="relative h-32 w-44 shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-48 md:h-36 md:w-48"
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
