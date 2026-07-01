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
    <section className="hh-intro hh-section-bridge relative overflow-hidden bg-background py-10 md:py-14">
      <div className="mx-auto grid max-w-4xl items-center gap-8 px-5 md:grid-cols-[1fr_minmax(0,280px)] md:gap-10 md:px-10 lg:grid-cols-[1fr_minmax(0,320px)]">
        <SectionReveal variant="editorial">
          <p className="section-kicker max-w-prose">{description}</p>
          <p className="hh-pull-quote mt-6 border-l-2 border-accent/50 pl-5 font-garamond text-base italic text-foreground/80 md:text-lg">
            Chopp gelado, fatia de laranja e o entardecer da Savassi.
          </p>
        </SectionReveal>

        <SectionReveal variant="subtle" className="hh-intro-visual relative mx-auto w-full max-w-xs md:mx-0 md:max-w-sm">
          <div className="hh-intro-frame overflow-hidden rounded-sm">
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
