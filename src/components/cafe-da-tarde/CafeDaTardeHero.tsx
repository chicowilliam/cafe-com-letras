import { Coffee } from "lucide-react";
import {
  CAFE_DA_TARDE_HERO_ALT,
  CAFE_DA_TARDE_HERO_IMAGE,
} from "@/lib/cafe-da-tarde-images";

type CafeDaTardeHeroProps = {
  eyebrow: string;
  title: string;
  schedule: string;
  subtitle: string;
};

export function CafeDaTardeHero({
  eyebrow,
  title,
  schedule,
  subtitle,
}: CafeDaTardeHeroProps) {
  return (
    <section className="cdt-hero-full relative min-h-[78dvh] w-full overflow-hidden md:min-h-[88vh]">
      <img
        src={CAFE_DA_TARDE_HERO_IMAGE}
        alt={CAFE_DA_TARDE_HERO_ALT}
        className="cdt-hero-full__image absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />
      <div className="cdt-hero-overlay absolute inset-0" aria-hidden />
      <div className="cdt-hero-glow absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:min-h-[88vh] md:px-10 md:pb-20">
        <span className="cdt-hero-eyebrow section-eyebrow flex items-center gap-1.5 text-foreground/90">
          <Coffee size={12} strokeWidth={1.75} aria-hidden />
          {eyebrow}
        </span>
        <h1 className="cdt-hero-title mt-3 font-display text-[2.75rem] leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[5.25rem]">
          {title}
        </h1>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-accent md:text-sm">
          {schedule}
        </p>
        <p className="cdt-hero-subtitle mt-5 max-w-xl font-garamond text-xl italic leading-relaxed text-foreground/85 md:mt-6 md:text-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
