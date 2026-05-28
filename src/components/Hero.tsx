import { HERO_IMAGE } from "@/lib/gallery-images";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";

const ctaPrimaryMobile =
  "cursor-pointer rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-[#12110f] transition-opacity active:opacity-80";

const ctaSecondaryMobile =
  "cursor-pointer rounded-full border border-white/30 bg-black/60 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors active:bg-black/75";

const ctaPrimaryDesktop =
  "cursor-pointer rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wide text-[#12110f] transition-opacity hover:opacity-90";

const ctaSecondaryDesktop =
  "cursor-pointer rounded-full border border-white/30 bg-black/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-black/65";

export function Hero() {
  const { open: openReservation } = useReservation();
  const { open: openCheckout } = useExperienceCheckout();

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <img
        src={HERO_IMAGE}
        alt="Livraria Contraponto — Café com Letras"
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-[50%_62%] md:scale-100 md:object-center"
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent md:hidden" />
      <div className="absolute inset-0 hidden bg-black/55 md:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/70 via-transparent to-black/30 md:block" />

      {/* Mobile */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(4.5rem,env(safe-area-inset-top))] text-center md:hidden">
        <div className="hero-mobile-copy flex w-full max-w-[20rem] flex-col items-center">
          <h1 className="fade-in-up is-visible w-full text-center font-serif text-[2.5rem] font-light italic leading-[1.08] tracking-tight text-white">
            Café com Letras
          </h1>

          <p
            className="fade-in-up is-visible mt-3 w-full text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/95"
            style={{ transitionDelay: "0.1s" }}
          >
            Savassi · Belo Horizonte
          </p>

          <p
            className="fade-in-up is-visible mt-3 w-full max-w-[17rem] text-center text-[0.9375rem] font-light leading-relaxed text-white/90"
            style={{ transitionDelay: "0.18s" }}
          >
            Onde cultura,{" "}
            <span className="italic text-white">literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mt-7 flex items-center justify-center gap-4"
            style={{ transitionDelay: "0.28s" }}
          >
            <button type="button" onClick={openCheckout} className={ctaPrimaryMobile}>
              Comprar Experiência
            </button>
            <button type="button" onClick={openReservation} className={ctaSecondaryMobile}>
              Fazer Reserva
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="absolute inset-0 hidden flex-col items-center justify-center px-6 text-center md:flex">
        <div className="w-full max-w-none">
          <h1 className="fade-in-up is-visible font-serif text-7xl font-light italic leading-none tracking-tight text-white lg:text-8xl">
            Café com Letras
          </h1>

          <p
            className="fade-in-up is-visible mt-6 text-xs font-medium uppercase tracking-[0.35em] text-white/95"
            style={{ transitionDelay: "0.1s" }}
          >
            Savassi · Belo Horizonte
          </p>

          <p
            className="fade-in-up is-visible mx-auto mt-5 max-w-lg text-base font-light leading-relaxed text-white/75"
            style={{ transitionDelay: "0.18s" }}
          >
            Onde cultura,{" "}
            <span className="italic text-white">literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mx-auto mt-10 flex items-center justify-center gap-4"
            style={{ transitionDelay: "0.28s" }}
          >
            <button type="button" onClick={openCheckout} className={ctaPrimaryDesktop}>
              Comprar Experiência
            </button>
            <button type="button" onClick={openReservation} className={ctaSecondaryDesktop}>
              Fazer Reserva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
