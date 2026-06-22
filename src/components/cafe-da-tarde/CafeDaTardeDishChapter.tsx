import { FadeIn } from "@/components/FadeIn";
import {
  cafeDaTardeChapterAspectClass,
  cafeDaTardeObjectStyle,
  type CafeDaTardeImage,
  type ChapterVariant,
} from "@/lib/cafe-da-tarde-images";

type CafeDaTardeDishChapterProps = {
  index: number;
  title: string;
  description: string;
  image: CafeDaTardeImage;
  reverse?: boolean;
  variant?: ChapterVariant;
};

export function CafeDaTardeDishChapter({
  index,
  title,
  description,
  image,
  reverse = false,
  variant = "standard",
}: CafeDaTardeDishChapterProps) {
  const chapterNumber = String(index + 1).padStart(2, "0");

  return (
    <section className="cdt-chapter cdt-section-bridge border-t border-hairline/60 bg-background py-16 md:py-24">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-8 px-5 md:gap-14 md:px-10 ${
          reverse ? "md:grid-cols-[0.92fr_1.08fr]" : "md:grid-cols-[1.08fr_0.92fr]"
        }`}
      >
        <FadeIn
          delay={0.04}
          className={`cdt-chapter-visual ${reverse ? "md:order-2" : "md:order-1"}`}
        >
          <div className="cdt-chapter-frame overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={cafeDaTardeObjectStyle(image)}
              className={`cdt-editorial-image cdt-chapter-image w-full ${cafeDaTardeChapterAspectClass(image, variant)}`}
            />
          </div>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className={`${reverse ? "md:order-1 md:pr-2" : "md:order-2 md:pl-2"}`}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent/80">
            {chapterNumber}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-md font-garamond text-lg italic leading-relaxed text-foreground-muted md:text-xl">
            {description}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
