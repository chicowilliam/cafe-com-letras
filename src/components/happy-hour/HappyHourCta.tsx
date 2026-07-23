import { FadeIn } from "@/components/FadeIn";
import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import { blueMoonObjectStyle, getBlueMoonImageBySlug } from "@/lib/blue-moon-images";

type HappyHourCtaProps = {
  onReserve: () => void;
};

export function HappyHourCta({ onReserve }: HappyHourCtaProps) {
  const backdrop = getBlueMoonImageBySlug("branding-banco");

  return (
    <section className="hh-cta-section relative overflow-hidden">
      <img
        src={backdrop.src}
        alt=""
        aria-hidden
        style={blueMoonObjectStyle(backdrop)}
        className="hh-cta-backdrop absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="hh-cta-overlay absolute inset-0" aria-hidden />

      <div className="hh-rail hh-rail--readable relative z-10 text-center">
        <FadeIn>
          <p className="hh-cta-eyebrow">Blue Moon · Savassi</p>
          <p className="hh-cta-title mt-3 font-garamond text-2xl italic leading-relaxed text-foreground md:text-[2rem]">
            Guarde mesa no terraço — Blue Moon, petiscos e o fim de tarde da casa.
          </p>
          <button
            type="button"
            onClick={onReserve}
            className={`btn-primary focus-ring mt-8 inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-medium ${CTA_HOVER_CLASS}`}
          >
            {CTA_LABELS.reserveTable}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
