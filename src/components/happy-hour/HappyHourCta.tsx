import { FadeIn } from "@/components/FadeIn";
import { blueMoonObjectStyle, getBlueMoonImageBySlug } from "@/lib/blue-moon-images";

type HappyHourCtaProps = {
  onReserve: () => void;
  schedule: string;
};

export function HappyHourCta({ onReserve, schedule }: HappyHourCtaProps) {
  const backdrop = getBlueMoonImageBySlug("branding-banco");

  return (
    <section className="hh-cta-section relative overflow-hidden py-14 md:py-20">
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

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center md:px-10">
        <FadeIn>
          <p className="font-garamond text-2xl italic leading-relaxed text-foreground md:text-3xl">
            Garanta sua mesa para o próximo happy hour.
          </p>
          <p className="mt-4 text-sm text-foreground-muted">{schedule}</p>
          <button
            type="button"
            onClick={onReserve}
            className="btn-primary focus-ring mt-8 inline-flex items-center gap-2 rounded-sm px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            Fazer reserva
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
