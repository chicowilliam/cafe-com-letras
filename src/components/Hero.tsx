import { HERO_IMAGE } from "@/lib/gallery-images";

export function Hero() {
  return (
    <section id="inicio" className="bg-[#12110f] px-8 pb-8 pt-24 md:pb-12 md:pt-28">
      <div className="relative mx-auto min-h-[58vh] max-w-6xl overflow-hidden rounded-[2rem] shadow-2xl md:min-h-[72vh]">
        <img
          src={HERO_IMAGE}
          alt="Livraria Contraponto — Café com Letras"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

        <a
          href="#sobre"
          className="fade-in-up is-visible absolute top-8 right-8 rounded-full border border-white/20 bg-black/50 px-6 py-2 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:bg-black/60 md:top-10 md:right-10"
          style={{ transitionDelay: "0.2s" }}
        >
          Agendar experiência
        </a>

        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
          <p className="fade-in-up is-visible mb-3 text-[10px] font-light uppercase tracking-[0.4em] text-white/60">
            Savassi · Belo Horizonte
          </p>

          <h1
            className="fade-in-up is-visible max-w-2xl font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ transitionDelay: "0.08s" }}
          >
            Onde cultura,{" "}
            <span className="font-normal italic text-white/90">literatura</span> e
            gastronomia se encontram
          </h1>
        </div>

        <div
          className="absolute bottom-12 right-8 h-px w-32 bg-white/40 md:bottom-20 md:right-16 md:w-48"
          aria-hidden
        />
      </div>
    </section>
  );
}
