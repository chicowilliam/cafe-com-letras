import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import {
  BLUE_MOON_HERO_ALT,
  BLUE_MOON_HERO_IMAGE,
  BLUE_MOON_HERO_IMAGE_META,
  blueMoonObjectStyle,
} from "@/lib/blue-moon-images";

type HappyHourHeroProps = {
  schedule: string;
  subtitle: string;
  onReserve?: () => void;
};

export function HappyHourHero({
  schedule,
  subtitle,
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

      <div className="hh-hero-full__inner hh-rail relative z-10 flex flex-col justify-end pb-8 md:pb-10">
        <p className="hh-hero-eyebrow">Happy Hour</p>
        <h1 className="hh-hero-title mt-1.5">
          <span className="hh-hero-title__brand">Blue Moon</span>
        </h1>
        <p className="hh-hero-schedule mt-3">{schedule}</p>
        <p className="hh-hero-subtitle mt-3 max-w-md font-garamond text-base italic leading-relaxed text-foreground/85 md:mt-3.5 md:text-lg">
          {subtitle}
        </p>
        {onReserve ? (
          <button
            type="button"
            onClick={onReserve}
            className={`btn-primary focus-ring hh-hero-cta mt-5 inline-flex min-h-[44px] w-auto max-w-max items-center rounded-sm px-7 py-3 text-sm font-medium ${CTA_HOVER_CLASS}`}
          >
            {CTA_LABELS.reserveTable}
          </button>
        ) : null}
      </div>
    </section>
  );
}
