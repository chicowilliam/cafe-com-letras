import { FadeIn } from "@/components/FadeIn";
import type { CafeDaTardeImage } from "@/lib/cafe-da-tarde-images";

type CafeDaTardeDishChapterProps = {
  index: number;
  title: string;
  description: string;
  image: CafeDaTardeImage;
  secondaryImage?: CafeDaTardeImage;
  reverse?: boolean;
  objectPosition?: string;
  variant?: "standard" | "detail" | "wide";
};

export function CafeDaTardeDishChapter({
  index,
  title,
  description,
  image,
  secondaryImage,
  reverse = false,
  objectPosition = "object-center",
  variant = "standard",
}: CafeDaTardeDishChapterProps) {
  const chapterNumber = String(index + 1).padStart(2, "0");

  return (
    <section
      className={`cdt-chapter py-14 md:py-20 ${index % 2 === 0 ? "bg-background" : "bg-surface"}`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-center gap-8 px-5 md:gap-12 md:px-10 ${
          reverse ? "md:grid-cols-[0.95fr_1.05fr]" : "md:grid-cols-[1.05fr_0.95fr]"
        }`}
      >
        <FadeIn
          delay={0.04}
          className={`cdt-chapter-visual relative ${reverse ? "md:order-2" : "md:order-1"}`}
        >
          <div
            className={`cdt-chapter-frame overflow-hidden ${
              variant === "wide" ? "cdt-chapter-frame--wide" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={`cdt-editorial-image cdt-chapter-image w-full object-cover ${objectPosition} ${
                variant === "wide"
                  ? "aspect-[16/11] min-h-[240px] md:min-h-[420px]"
                  : "aspect-[4/5] min-h-[280px] md:min-h-[460px]"
              }`}
            />
          </div>

          {secondaryImage ? (
            <div className="cdt-chapter-detail absolute -bottom-6 -right-2 w-[42%] max-w-[200px] overflow-hidden shadow-2xl md:-bottom-8 md:-right-6 md:max-w-[240px]">
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                loading="lazy"
                decoding="async"
                className="cdt-editorial-image aspect-[4/5] w-full object-cover object-center"
              />
            </div>
          ) : null}
        </FadeIn>

        <FadeIn
          delay={0.1}
          className={`${reverse ? "md:order-1 md:pr-4" : "md:order-2 md:pl-4"}`}
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
