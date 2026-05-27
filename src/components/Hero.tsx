import { HERO_IMAGE } from "@/lib/gallery-images";
import { useReservation } from "@/hooks/useReservation";

const ctaPrimary =
  "w-full max-w-[20rem] rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-[#12110f] transition-opacity active:opacity-80 md:max-w-none md:min-w-[160px] md:py-3 md:hover:opacity-90";

const ctaSecondary =
  "w-full max-w-[20rem] rounded-full border border-white/30 bg-black/60 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors active:bg-black/75 md:max-w-none md:min-w-[160px] md:py-3 md:hover:border-white/45 md:hover:bg-black/65";

export function Hero() {
  const { open } = useReservation();

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <img
        src={HERO_IMAGE}
        alt="Livraria Contraponto — Café com Letras"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center"
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute inset-0 bg-black/60 md:bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35 md:from-black/70 md:via-transparent md:to-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24 text-center md:justify-center md:px-6 md:pb-0 md:pt-0">
        <div className="hero-mobile-copy w-full max-w-lg md:max-w-none">
          <h1 className="fade-in-up is-visible font-serif text-[2.65rem] font-light italic leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl md:leading-none lg:text-8xl">
            Café com Letras
          </h1>

          <p
            className="fade-in-up is-visible mt-4 text-xs font-medium uppercase tracking-[0.28em] text-white/95 sm:tracking-[0.35em] md:mt-6 md:text-xs"
            style={{ transitionDelay: "0.1s" }}
          >
            Savassi · Belo Horizonte
          </p>

          <p
            className="fade-in-up is-visible mx-auto mt-4 max-w-[18rem] text-base font-light leading-relaxed text-white/90 sm:max-w-md sm:text-lg md:mt-5 md:max-w-lg md:text-base md:text-white/75"
            style={{ transitionDelay: "0.18s" }}
          >
            Onde cultura,{" "}
            <span className="italic text-white">literatura</span> e gastronomia se
            encontram
          </p>

          <div
            className="fade-in-up is-visible mx-auto mt-8 flex w-full max-w-[20rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 md:mt-10"
            style={{ transitionDelay: "0.28s" }}
          >
            <button type="button" onClick={open} className={ctaPrimary}>
              Fazer reserva
            </button>
            <a href="#sobre" className={ctaSecondary}>
              Nossa história
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
