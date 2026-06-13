import { FadeIn } from "@/components/FadeIn";
import { ABOUT_HERO_IMAGE } from "@/lib/about-images";
import { ABOUT_PARAGRAPHS } from "@/lib/constants";

export function About() {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="pb-10 text-center md:pb-14 md:text-left">
          <p className="section-eyebrow">A História</p>
          <h2 className="section-title mx-auto max-w-xs sm:max-w-sm md:mx-0 md:max-w-md lg:max-w-lg">
            Três amigos, um sonho{" "}
            <span className="italic text-foreground-muted">e a Savassi</span>
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="w-full overflow-hidden rounded-2xl aspect-[3/2] sm:aspect-[16/9]">
            <img
              src={ABOUT_HERO_IMAGE}
              alt="Café com Letras — ambiente da livraria"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </FadeIn>

        <FadeIn className="mt-10 md:mt-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-14 lg:gap-x-20">
            {ABOUT_PARAGRAPHS.map((text, index) => (
              <p
                key={index}
                className="font-garamond italic text-[1.0625rem] leading-relaxed text-foreground-muted md:text-[1.1875rem]"
              >
                {text}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn
          className="mt-14 border-t border-hairline pt-8 text-center md:mt-20 md:pt-12 md:text-left"
          rootMargin="0px"
        >
          <p className="section-eyebrow mb-0 text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
