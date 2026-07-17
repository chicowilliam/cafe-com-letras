import { useEffect, useState } from "react";
import {
  blueMoonObjectStyle,
  type BlueMoonImage,
} from "@/lib/blue-moon-images";

const AUTOPLAY_MS = 4500;

type HappyHourSpreadCarouselProps = {
  images: BlueMoonImage[];
};

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduceMotion;
}

export function HappyHourSpreadCarousel({ images }: HappyHourSpreadCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (paused || reduceMotion || images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [images.length, paused, reduceMotion]);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex];

  return (
    <div
      className="hh-spread-carousel relative w-full max-w-[320px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        aria-hidden
        className="hh-spread-carousel__glow pointer-events-none absolute left-0 top-1/2 z-0 h-[min(72vw,300px)] w-[min(88vw,320px)] -translate-y-1/2 rounded-full bg-accent-2/8 blur-[42px] motion-reduce:opacity-50"
      />

      <div
        className="focus-ring relative z-[1] w-full outline-none"
        role="region"
        aria-roledescription="slideshow"
        aria-label="Galeria editorial do happy hour"
      >
        <div
          className="hh-spread-carousel__card relative aspect-[2/3] w-[min(88vw,320px)] max-w-[320px] overflow-hidden rounded-xl bg-surface-elevated ring-1 ring-accent-2/30 shadow-[var(--shadow-image-contact)]"
          aria-live="polite"
        >
          {images.map((image, index) => {
            const isActive = activeIndex === index;
            const surfaceClass =
              image.fit === "contain" ? "hh-spread-cell--contain" : "";

            return (
              <div
                key={image.slug}
                data-active={isActive}
                className={`hh-spread-carousel__slide absolute inset-0 ${surfaceClass} ${
                  isActive ? "z-10" : "z-0 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={image.src}
                  alt={isActive ? image.alt : ""}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={blueMoonObjectStyle(image)}
                  className="hh-editorial-image hh-spread-carousel__image absolute inset-0 h-full w-full"
                />
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/85 via-background/40 to-transparent px-3 pb-3 pt-10 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                >
                  <p className="font-garamond text-xs italic text-foreground/80">
                    {image.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <span className="sr-only">{activeImage.label}</span>
      </div>
    </div>
  );
}
