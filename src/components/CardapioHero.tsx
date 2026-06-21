import { FadeIn } from "@/components/FadeIn";
import { CARDAPIO_HERO_IMAGES } from "@/lib/cardapio-cover-images";

export function CardapioHero() {
  return (
    <section
      aria-labelledby="cardapio-hero-title"
      className="relative border-b border-hairline bg-surface"
    >
      <div className="relative mx-auto max-w-6xl px-5 pt-6 pb-8 md:px-8 md:pt-8 md:pb-10">
        <FadeIn>
          <div className="relative grid min-h-[45vh] grid-cols-1 gap-1.5 overflow-hidden rounded-md md:min-h-[55vh] lg:min-h-[58vh] md:grid-cols-12 md:gap-2">
            <div className="relative aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-0">
              <img
                src={CARDAPIO_HERO_IMAGES.editorial}
                alt="Pratos do Café com Letras — risoto e moqueca com overlay Cardápio"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent md:bg-gradient-to-r md:from-background/70 md:via-transparent md:to-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5 md:col-span-5 md:grid-cols-1 md:grid-rows-2 md:gap-2">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-0">
                <img
                  src={CARDAPIO_HERO_IMAGES.ambientePt}
                  alt="Refeição com salmão e vinho — cardápio em português"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-0">
                <img
                  src={CARDAPIO_HERO_IMAGES.ambienteEn}
                  alt="Petiscos e cerveja — English menu"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-6 pt-16 md:px-8 md:pb-8 md:pt-24">
              <p className="section-eyebrow !mb-2 text-accent/90">Cardápio</p>
              <h1
                id="cardapio-hero-title"
                className="font-display text-3xl tracking-tight text-foreground drop-shadow-sm md:text-4xl lg:text-[2.75rem]"
              >
                Café com Letras
              </h1>
              <p className="mt-2 max-w-md font-garamond text-lg italic leading-relaxed text-foreground-muted md:text-xl">
                da cozinha mineira ao café autoral
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
