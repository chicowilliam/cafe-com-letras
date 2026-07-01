import { Coffee } from "lucide-react";
import {
  CAFE_DA_TARDE_HERO_ALT,
  CAFE_DA_TARDE_HERO_IMAGE,
  CAFE_DA_TARDE_HERO_IMAGE_META,
  cafeDaTardeObjectStyle,
} from "@/lib/cafe-da-tarde-images";

type CafeDaTardeHeroProps = {
  eyebrow: string;
  title: string;
  schedule: string;
  subtitle: string;
  conversionHint?: string;
  onReserve?: () => void;
};

export function CafeDaTardeHero({
  eyebrow,
  title,
  schedule,
  subtitle,
  conversionHint,
  onReserve,
}: CafeDaTardeHeroProps) {
  return (
    <section className="cdt-hero-full relative min-h-[60dvh] w-full overflow-hidden md:min-h-[68vh]">
      <img
        src={CAFE_DA_TARDE_HERO_IMAGE}
        alt={CAFE_DA_TARDE_HERO_ALT}
        style={cafeDaTardeObjectStyle(CAFE_DA_TARDE_HERO_IMAGE_META)}
        className="cdt-hero-full__image absolute inset-0 h-full w-full"
        decoding="async"
        fetchPriority="high"
      />
      <div className="cdt-hero-overlay absolute inset-0" aria-hidden />
      <div className="cdt-hero-glow absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-6xl flex-col justify-end px-5 pb-10 pt-24 md:min-h-[68vh] md:px-10 md:pb-14">
        <span className="cdt-hero-eyebrow section-eyebrow flex items-center gap-1.5 text-foreground/90">
          <Coffee size={12} strokeWidth={1.75} aria-hidden />
          {eyebrow}
        </span>
        <h1 className="cdt-hero-title mt-3 font-display text-[2.25rem] leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.5rem]">
          {title}
        </h1>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-accent md:text-sm">
          {schedule}
        </p>
        <p className="cdt-hero-subtitle mt-4 max-w-lg font-garamond text-lg italic leading-relaxed text-foreground/85 md:mt-5 md:text-xl">
          {subtitle}
        </p>
        {conversionHint ? (
          <p className="mt-4 text-sm font-medium text-foreground-muted md:mt-5">
            {conversionHint}
          </p>
        ) : null}
        {onReserve ? (
          <button
            type="button"
            onClick={onReserve}
            className="btn-primary focus-ring mt-6 inline-flex min-h-[44px] items-center rounded-sm px-8 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            Reservar
          </button>
        ) : null}
      </div>
    </section>
  );
}
