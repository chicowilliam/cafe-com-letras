import { HERO_IMAGE } from "@/lib/hero-image";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";

const ctaPrimary =
  "btn-primary focus-ring rounded-full px-7 py-3 transition-all duration-300 hover:scale-[1.01] hover:bg-accent/90";

const ctaGhost =
  "btn-ghost focus-ring rounded-full px-7 py-3 transition-all duration-300 hover:scale-[1.01]";

const locationBadgeClass =
  "mb-5 inline-flex items-center rounded-full border border-white/10 bg-black/45 px-3 py-1 font-sans text-xs font-medium tracking-tight text-accent backdrop-blur-sm";

const taglineClass =
  "font-sans text-sm leading-relaxed text-foreground-muted md:text-base";

const taglineHighlightClass =
  "mx-1 font-display text-base italic text-foreground md:text-lg";

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
        alt="Livraria Contraponto — Café com Letras"
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
        <div className="hero-mobile-copy flex w-full max-w-md flex-col items-center gap-1">
          <span
            className={`fade-in-up is-visible ${locationBadgeClass}`}
            style={{ transitionDelay: "0.05s" }}
          >
            Savassi · Belo Horizonte
          </span>

          <h1
            className="hero-symbol fade-in-up is-visible w-full text-center font-display text-[2.75rem] leading-[1.05] tracking-tight text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
            style={{ transitionDelay: "0.12s" }}
          >
            Café com Letras
          </h1>

          <p
            className={`fade-in-up is-visible mt-5 max-w-xs ${taglineClass}`}
            style={{ transitionDelay: "0.2s" }}
          >
            Onde cultura,{" "}
            <span className={taglineHighlightClass}>literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mt-10 flex w-full flex-wrap items-center justify-center gap-3"
            style={{ transitionDelay: "0.3s" }}
          >
            <button type="button" onClick={openCheckout} className={ctaPrimary}>
              Noite dos Dates
            </button>
            <button type="button" onClick={openReservation} className={ctaGhost}>
              Fazer reserva
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="absolute inset-0 z-20 hidden flex-col items-center justify-center px-8 text-center md:flex">
        <div className="flex w-full max-w-2xl flex-col items-center gap-1">
          <span
            className={`fade-in-up is-visible ${locationBadgeClass}`}
            style={{ transitionDelay: "0.05s" }}
          >
            Savassi · Belo Horizonte
          </span>

          <h1
            className="hero-symbol fade-in-up is-visible font-display text-6xl leading-[1.05] tracking-tight text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] lg:text-7xl"
            style={{ transitionDelay: "0.12s" }}
          >
            Café com Letras
          </h1>

          <p
            className={`fade-in-up is-visible mt-6 max-w-md ${taglineClass}`}
            style={{ transitionDelay: "0.2s" }}
          >
            Onde cultura,{" "}
            <span className={taglineHighlightClass}>literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mt-12 flex items-center justify-center gap-3"
            style={{ transitionDelay: "0.3s" }}
          >
            <button type="button" onClick={openCheckout} className={ctaPrimary}>
              Noite dos Dates
            </button>
            <button type="button" onClick={openReservation} className={ctaGhost}>
              Fazer reserva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
