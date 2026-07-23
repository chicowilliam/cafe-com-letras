import { SectionReveal } from "@/components/SectionReveal";
import {
  blueMoonIntroAspectClass,
  blueMoonObjectStyle,
  type BlueMoonImage,
} from "@/lib/blue-moon-images";

type HappyHourIntroProps = {
  description: string;
  image: BlueMoonImage;
};

export function HappyHourIntro({ description, image }: HappyHourIntroProps) {
  return (
    <section className="hh-intro hh-section-bridge relative py-9 md:py-12">
      <div className="hh-rail grid items-center gap-7 md:grid-cols-[1fr_minmax(0,280px)] md:gap-10 lg:grid-cols-[1fr_minmax(0,320px)] lg:gap-12">
        <SectionReveal variant="editorial">
          <p className="hh-intro-eyebrow">Parceria Blue Moon</p>
          <p className="section-kicker mt-3 max-w-prose">{description}</p>
          <p className="hh-pull-quote mt-5 border-l-2 pl-5 font-garamond text-base italic text-foreground/80 md:text-lg">
            Não é só chopp: é a mesa compartilhada, a luz azul da parceria e o ritmo lento da Savassi.
          </p>
        </SectionReveal>

        <SectionReveal
          variant="subtle"
          className="hh-intro-visual relative mx-auto w-full md:mx-0"
        >
          <div className="hh-intro-frame overflow-hidden rounded-sm ring-1 ring-accent-2/25">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={blueMoonObjectStyle(image)}
              className={`hh-editorial-image w-full ${blueMoonIntroAspectClass(image)}`}
            />
          </div>
          <p className="section-caption mt-3 md:mt-4">{image.label}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
