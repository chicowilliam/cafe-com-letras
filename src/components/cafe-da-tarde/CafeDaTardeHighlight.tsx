import { FadeIn } from "@/components/FadeIn";
import {
  cafeDaTardeHighlightAspectClass,
  cafeDaTardeObjectStyle,
  type CafeDaTardeImage,
  type ChapterVariant,
} from "@/lib/cafe-da-tarde-images";

type CafeDaTardeHighlightProps = {
  index: number;
  title: string;
  description: string;
  image: CafeDaTardeImage;
  reverse?: boolean;
  variant?: ChapterVariant;
};

export function CafeDaTardeHighlight({
  index,
  title,
  description,
  image,
  reverse = false,
  variant = "standard",
}: CafeDaTardeHighlightProps) {
  const highlightNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`cdt-highlight mx-auto grid max-w-4xl items-center gap-6 px-5 md:gap-10 md:px-10 ${
        reverse ? "md:grid-cols-[1fr_minmax(0,340px)]" : "md:grid-cols-[minmax(0,340px)_1fr]"
      }`}
    >
      <FadeIn
        delay={0.04}
        className={`cdt-highlight-visual ${reverse ? "md:order-2" : "md:order-1"}`}
      >
        <div className="cdt-highlight-frame mx-auto w-full max-w-[280px] overflow-hidden md:mx-0 md:max-w-[340px]">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            style={cafeDaTardeObjectStyle(image)}
            className={`cdt-editorial-image cdt-highlight-image w-full ${cafeDaTardeHighlightAspectClass(image, variant)}`}
          />
        </div>
      </FadeIn>

      <FadeIn
        delay={0.08}
        className={`${reverse ? "md:order-1 md:pr-2" : "md:order-2 md:pl-2"}`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent/80">
          {highlightNumber}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-sm font-garamond text-sm italic leading-relaxed text-foreground-muted md:text-base">
          {description}
        </p>
      </FadeIn>
    </article>
  );
}
