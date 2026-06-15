import { ChevronDown } from "lucide-react";
import { HeroBackgroundVideo } from "@/components/HeroBackgroundVideo";
import { useReservation } from "@/hooks/useReservation";

function scrollToDates() {
  const target = document.getElementById("noite-dos-dates");
  if (!target) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
}

const ctaPrimary =
  "btn-primary focus-ring rounded-full px-7 py-3 transition-all duration-300 hover:scale-[1.01]";

const ctaGhost =
  "btn-ghost focus-ring rounded-full px-7 py-3 transition-all duration-300 hover:scale-[1.01]";

const locationBadgeClass =
  "mb-5 inline-flex items-center rounded-full border border-white/10 bg-black/45 px-3 py-1 font-sans text-xs font-medium tracking-tight text-accent backdrop-blur-sm";

const taglineClass =
  "hero-tagline font-sans text-sm leading-relaxed md:text-base";

const taglineHighlightClass =
  "hero-tagline-highlight mx-1 font-display text-base italic md:text-lg";

export function Hero() {
  const { open: openReservation } = useReservation();

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[var(--hero-overlay-bottom)]"
    >
      <HeroBackgroundVideo />

      <div aria-hidden className="hero-cinematic-overlay absolute inset-0" />

      <div
        aria-hidden
        className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 md:h-56"
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
            className="hero-title fade-in-up is-visible w-full text-center font-display text-[2.75rem] leading-[1.05] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
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
            <button type="button" onClick={scrollToDates} className={ctaPrimary}>
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
            className="hero-title fade-in-up is-visible font-display text-6xl leading-[1.05] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] lg:text-7xl"
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
            <button type="button" onClick={scrollToDates} className={ctaPrimary}>
              Noite dos Dates
            </button>
            <button type="button" onClick={openReservation} className={ctaGhost}>
              Fazer reserva
            </button>
          </div>
        </div>
      </div>

      <a
        href="#noite-dos-dates"
        aria-label="Rolar para a próxima seção"
        className="focus-ring absolute inset-x-0 bottom-5 z-20 mx-auto flex w-fit flex-col items-center gap-1 text-foreground-muted transition-colors duration-300 hover:text-accent md:bottom-7"
      >
        <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em]">
          Explore
        </span>
        <ChevronDown className="hero-scroll-cue h-5 w-5" strokeWidth={1.5} />
      </a>
    </section>
  );
}
