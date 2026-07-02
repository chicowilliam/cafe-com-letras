import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import {
  BLUE_MOON_HERO_ALT,
  BLUE_MOON_HERO_IMAGE,
  BLUE_MOON_HERO_IMAGE_META,
  blueMoonObjectStyle,
} from "@/lib/blue-moon-images";

type HappyHourHeroProps = {
  eyebrow: string;
  schedule: string;
  subtitle: string;
  conversionHint?: string;
  onReserve?: () => void;
};

export function HappyHourHero({
  eyebrow,
  schedule,
  subtitle,
  conversionHint,
  onReserve,
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
        <p className="hh-hero-eyebrow">{eyebrow}</p>
        <h1 className="hh-hero-title mt-3">
          <span className="hh-hero-title__line block">Happy Hour</span>
          <span className="hh-hero-title__brand block">Blue Moon</span>
        </h1>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-accent md:text-sm">
          {schedule}
        </p>
        <p className="hh-hero-subtitle mt-5 max-w-lg font-garamond text-lg italic leading-relaxed text-foreground/85 md:mt-6 md:text-xl">
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
            className={`btn-primary focus-ring mt-6 inline-flex min-h-[44px] items-center rounded-sm px-8 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
          >
            {CTA_LABELS.reserve}
          </button>
        ) : null}
      </div>
    </section>
  );
}
