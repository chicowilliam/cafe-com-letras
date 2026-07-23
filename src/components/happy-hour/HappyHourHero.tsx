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
    <section className="hh-hero-full relative w-full overflow-hidden">
      <div className="hh-hero-moon" aria-hidden />
      <img
        src={BLUE_MOON_HERO_IMAGE}
        alt={BLUE_MOON_HERO_ALT}
        width={2400}
        height={1600}
        style={blueMoonObjectStyle(BLUE_MOON_HERO_IMAGE_META)}
        className="hh-hero-full__image absolute inset-0 h-full w-full object-cover"
        decoding="sync"
        fetchPriority="high"
      />
      <div className="hh-hero-overlay absolute inset-0" aria-hidden />
      <div className="hh-hero-glow absolute inset-0" aria-hidden />

      <div className="hh-hero-full__inner relative z-10 mx-auto flex max-w-6xl flex-col justify-end px-5 pb-7 pt-20 md:px-10 md:pb-9">
        <p className="hh-hero-eyebrow">{eyebrow}</p>
        <h1 className="hh-hero-title mt-2">
          <span className="hh-hero-title__line block">Happy Hour</span>
          <span className="hh-hero-title__brand block">Blue Moon</span>
        </h1>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-accent md:text-sm">
          {schedule}
        </p>
        <p className="hh-hero-subtitle mt-3 max-w-lg font-garamond text-base italic leading-relaxed text-foreground/85 md:mt-4 md:text-lg">
          {subtitle}
        </p>
        {conversionHint ? (
          <p className="mt-3 text-sm font-medium text-foreground-muted">
            {conversionHint}
          </p>
        ) : null}
        {onReserve ? (
          <button
            type="button"
            onClick={onReserve}
            className={`btn-primary focus-ring mt-5 inline-flex min-h-[44px] items-center rounded-sm px-8 py-3 text-sm font-medium ${CTA_HOVER_CLASS}`}
          >
            {CTA_LABELS.reserveTable}
          </button>
        ) : null}
      </div>
    </section>
  );
}
