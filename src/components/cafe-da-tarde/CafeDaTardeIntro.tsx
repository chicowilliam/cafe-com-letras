import { SectionReveal } from "@/components/SectionReveal";
import {
  cafeDaTardeIntroAspectClass,
  cafeDaTardeObjectStyle,
  type CafeDaTardeImage,
} from "@/lib/cafe-da-tarde-images";

type CafeDaTardeIntroProps = {
  description: string;
  image: CafeDaTardeImage;
};

export function CafeDaTardeIntro({ description, image }: CafeDaTardeIntroProps) {
  return (
    <section className="cdt-intro cdt-section-bridge relative overflow-hidden bg-background py-10 md:py-14">
      <div className="mx-auto grid max-w-4xl items-center gap-8 px-5 md:grid-cols-[1fr_minmax(0,280px)] md:gap-10 md:px-10 lg:grid-cols-[1fr_minmax(0,320px)]">
        <SectionReveal variant="editorial">
          <p className="section-kicker max-w-prose">{description}</p>
          <p className="cdt-pull-quote mt-6 border-l-2 border-accent/40 pl-5 font-garamond text-base italic text-foreground/80 md:text-lg">
            Entre um capítulo e outro, um bolo e um chá.
          </p>
        </SectionReveal>

        <SectionReveal variant="subtle" className="cdt-intro-visual relative mx-auto w-full max-w-xs md:mx-0 md:max-w-sm">
          <div className="cdt-intro-frame overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={cafeDaTardeObjectStyle(image)}
              className={`cdt-editorial-image w-full ${cafeDaTardeIntroAspectClass(image)}`}
            />
          </div>
          <p className="section-caption mt-3 md:mt-4">{image.label}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
