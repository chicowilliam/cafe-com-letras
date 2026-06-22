import { FadeIn } from "@/components/FadeIn";
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
    <section className="cdt-intro cdt-section-bridge relative overflow-hidden bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_1.05fr] md:gap-14 md:px-10">
        <FadeIn>
          <p className="font-garamond text-2xl italic leading-relaxed text-foreground-muted md:text-3xl md:leading-snug">
            {description}
          </p>
          <p className="cdt-pull-quote mt-8 border-l-2 border-accent/40 pl-5 font-garamond text-lg italic text-foreground/80 md:text-xl">
            Entre um capítulo e outro, um bolo e um chá.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="cdt-intro-visual relative md:-mr-4 lg:-mr-8">
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
          <p className="mt-3 font-garamond text-sm italic text-foreground-muted md:mt-4">
            {image.label}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
