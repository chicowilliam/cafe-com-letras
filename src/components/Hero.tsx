import { HERO_IMAGE } from "@/lib/gallery-images";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[58vh] items-end overflow-hidden md:min-h-[62vh] md:items-center"
    >
      <img
        src={HERO_IMAGE}
        alt="Livraria Contraponto — Café com Letras"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute inset-0 bg-[#12110f]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12110f]/80 via-[#12110f]/30 to-[#12110f]/20" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-8 pb-14 pt-24 md:pb-0 md:pt-0">
        <div className="max-w-md">
          <p className="fade-in-up is-visible mb-3 text-[10px] font-light uppercase tracking-[0.4em] text-[#f5f0e6]/60">
            Savassi · Belo Horizonte
          </p>

          <h1
            className="fade-in-up is-visible font-serif text-xl font-light leading-snug tracking-tight text-[#f5f0e6] md:text-3xl md:leading-snug lg:text-[2rem]"
            style={{ transitionDelay: "0.08s" }}
          >
            Onde cultura,{" "}
            <span className="font-normal italic text-[#f5f0e6]/90">literatura</span> e
            gastronomia se encontram
          </h1>

          <div className="fade-in-up is-visible mt-6 md:mt-8" style={{ transitionDelay: "0.2s" }}>
            <a
              href="#sobre"
              className="inline-block border border-[#f5f0e6]/35 px-4 py-2 text-[10px] font-light uppercase tracking-[0.25em] text-[#f5f0e6]/90 transition-colors duration-300 hover:border-[#f5f0e6]/70 hover:text-[#f5f0e6]"
            >
              Agendar experiência
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
