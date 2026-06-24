import { FadeIn } from "@/components/FadeIn";
import { getBlueMoonImageBySlug } from "@/lib/blue-moon-images";

const HERO_IMAGE = getBlueMoonImageBySlug("ambiente-savassi");

export function ExperienciasHubHero() {
  return (
    <section className="exp-hub-hero relative min-h-[52dvh] w-full overflow-hidden md:min-h-[58vh]">
      <img
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        className="exp-hub-hero__image absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
      />
      <div className="exp-hub-hero__overlay absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[52dvh] max-w-6xl flex-col justify-end px-5 pb-10 pt-28 md:min-h-[58vh] md:px-10 md:pb-14">
        <FadeIn>
          <p className="exp-hub-hero__eyebrow">Como viver a casa</p>
          <h1 className="exp-hub-hero__title mt-3 font-display text-foreground">
            Experiências
          </h1>
          <p className="exp-hub-hero__subtitle mt-4 max-w-xl font-garamond text-lg italic leading-relaxed text-foreground/85 md:mt-5 md:text-xl">
            Da tarde descontraída ao romance da noite — três momentos, três
            atmosferas na Savassi.
          </p>
          <p className="exp-hub-hero__days mt-5 text-xs text-foreground-muted/80 md:text-sm">
            Sábado e domingo · Quinta a domingo · Sob reserva
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
