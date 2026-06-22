import { FadeIn } from "@/components/FadeIn";
import {
  cafeDaTardeObjectStyle,
  getCafeDaTardeImageBySlug,
} from "@/lib/cafe-da-tarde-images";

type CafeDaTardeCtaProps = {
  onReserve: () => void;
};

export function CafeDaTardeCta({ onReserve }: CafeDaTardeCtaProps) {
  const backdrop = getCafeDaTardeImageBySlug("bolo-do-dia-02");

  return (
    <section className="cdt-cta-section relative overflow-hidden py-20 md:py-28">
      <img
        src={backdrop.src}
        alt=""
        aria-hidden
        style={cafeDaTardeObjectStyle(backdrop)}
        className="cdt-cta-backdrop absolute inset-0 h-full w-full"
        loading="lazy"
        decoding="async"
      />
      <div className="cdt-cta-overlay absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center md:px-10">
        <FadeIn>
          <p className="font-garamond text-2xl italic leading-relaxed text-foreground md:text-3xl">
            Reserve sua mesa para o próximo café da tarde.
          </p>
          <p className="mt-4 text-sm text-foreground-muted">
            Sábados e domingos · das 15h às 17h
          </p>
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
