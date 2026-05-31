import { HERO_IMAGE } from "@/lib/gallery-images";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";

const ctaDates =
  "rounded-full bg-accent px-8 py-3.5 font-cinzel text-xs font-medium uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-accent/80";

const ctaReserve =
  "rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-cinzel text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10";

export function Hero() {
  const { open: openReservation } = useReservation();
  const { open: openCheckout } = useExperienceCheckout();

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-background"
    >
      <img
        src={HERO_IMAGE}
        alt="Livraria Contraponto ิว๖ Caf+ฎ com Letras"
        className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-[50%_62%] md:scale-100 md:object-center"
        fetchPriority="high"
        decoding="async"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,8,8,0.72)_0%,rgba(8,8,8,0.35)_42%,rgba(8,8,8,0.88)_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-background to-transparent md:h-56"
      />

      {/* Mobile */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(5rem,env(safe-area-inset-top))] text-center md:hidden">
        <div className="hero-mobile-copy flex w-full max-w-md flex-col items-center">
          <p
            className="fade-in-up is-visible font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/70"
            style={{ transitionDelay: "0.05s" }}
          >
            Savassi -ภ Belo Horizonte
          </p>

          <h1
            className="fade-in-up is-visible mt-4 w-full text-center font-french text-5xl tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] md:text-7xl"
            style={{ transitionDelay: "0.12s" }}
          >
            Caf+ฎ com Letras
          </h1>

          <p
            className="fade-in-up is-visible mx-auto mt-4 max-w-xs text-center font-sans text-[0.9375rem] font-light leading-[1.45] tracking-[-0.01em] text-white/80"
            style={{ transitionDelay: "0.2s" }}
          >
            Onde cultura,{" "}
            <span className="italic text-white">literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mt-10 flex w-full flex-wrap items-center justify-center gap-3"
            style={{ transitionDelay: "0.3s" }}
          >
            <button type="button" onClick={openCheckout} className={ctaDates}>
              Noite dos Dates
            </button>
            <button type="button" onClick={openReservation} className={ctaReserve}>
              Fazer Reserva
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="absolute inset-0 z-20 hidden flex-col items-center justify-center px-8 text-center md:flex">
        <div className="w-full max-w-none">
          <p
            className="fade-in-up is-visible font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/70"
            style={{ transitionDelay: "0.05s" }}
          >
            Savassi -ภ Belo Horizonte
          </p>

          <h1
            className="fade-in-up is-visible mt-5 font-french text-5xl tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] md:text-7xl"
            style={{ transitionDelay: "0.12s" }}
          >
            Caf+ฎ com Letras
          </h1>

          <p
            className="fade-in-up is-visible mx-auto mt-6 max-w-lg font-sans text-base font-light leading-[1.45] tracking-[-0.01em] text-white/75"
            style={{ transitionDelay: "0.2s" }}
          >
            Onde cultura,{" "}
            <span className="italic text-white">literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mx-auto mt-12 flex items-center justify-center gap-3"
            style={{ transitionDelay: "0.3s" }}
          >
            <button type="button" onClick={openCheckout} className={ctaDates}>
              Noite dos Dates
            </button>
            <button type="button" onClick={openReservation} className={ctaReserve}>
              Fazer Reserva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
