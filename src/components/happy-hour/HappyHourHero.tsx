import { Beer } from "lucide-react";
import {
  BLUE_MOON_HERO_ALT,
  BLUE_MOON_HERO_IMAGE,
  BLUE_MOON_HERO_IMAGE_META,
  blueMoonObjectStyle,
} from "@/lib/blue-moon-images";

type HappyHourHeroProps = {
  eyebrow: string;
  title: string;
  schedule: string;
  subtitle: string;
};

export function HappyHourHero({
  eyebrow,
  title,
  schedule,
  subtitle,
}: HappyHourHeroProps) {
  return (
    <section className="hh-hero-full relative min-h-[60dvh] w-full overflow-hidden md:min-h-[68vh]">
      <div className="hh-hero-moon" aria-hidden />
      <img
        src={BLUE_MOON_HERO_IMAGE}
        alt={BLUE_MOON_HERO_ALT}
        style={blueMoonObjectStyle(BLUE_MOON_HERO_IMAGE_META)}
        className="hh-hero-full__image absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
      />
      <div className="hh-hero-overlay absolute inset-0" aria-hidden />
      <div className="hh-hero-glow absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-6xl flex-col justify-end px-5 pb-10 pt-24 md:min-h-[68vh] md:px-10 md:pb-14">
        <span className="hh-hero-eyebrow section-eyebrow flex items-center gap-1.5 text-foreground/90">
          <Beer size={12} strokeWidth={1.75} aria-hidden />
          {eyebrow}
        </span>
        <h1 className="hh-hero-title mt-3 font-display text-[2.25rem] leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.5rem]">
          {title}
        </h1>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-accent md:text-sm">
          {schedule}
        </p>
        <p className="hh-hero-subtitle mt-4 max-w-lg font-garamond text-lg italic leading-relaxed text-foreground/85 md:mt-5 md:text-xl">
          {subtitle}
        </p>
        <p className="hh-hero-badge mt-5 inline-flex w-fit items-center rounded-sm border border-accent-2/40 bg-accent-2/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
          Parceria Blue Moon
        </p>
      </div>
    </section>
  );
}
