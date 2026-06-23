import { FadeIn } from "@/components/FadeIn";
import { HappyHourSpreadCarousel } from "@/components/happy-hour/HappyHourSpreadCarousel";
import {
  blueMoonObjectStyle,
  blueMoonSpreadCellClass,
  type BlueMoonImage,
} from "@/lib/blue-moon-images";
import type { HappyHourMenuItem, SpreadVariant } from "@/lib/happy-hour-menu";

type HappyHourSpreadProps = {
  index: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: HappyHourMenuItem[];
  images: BlueMoonImage[];
  reverse?: boolean;
  variant?: SpreadVariant;
  tone?: "default" | "beer";
};

function spreadCellSurfaceClass(image: BlueMoonImage) {
  return image.fit === "contain" ? "hh-spread-cell--contain" : "";
}

function SpreadPhotoGrid({
  images,
  variant,
}: {
  images: BlueMoonImage[];
  variant: SpreadVariant;
}) {
  if (variant === "grid-asymmetric" && images.length >= 3) {
    const [hero, ...rest] = images;
    return (
      <div className="hh-spread-grid hh-spread-grid--asymmetric grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-2">
        <div
          className={`hh-spread-cell hh-spread-cell--hero row-span-2 overflow-hidden rounded-sm ${spreadCellSurfaceClass(hero)}`}
        >
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            style={blueMoonObjectStyle(hero)}
            className={`hh-editorial-image hh-spread-image h-full w-full ${blueMoonSpreadCellClass(hero, "hero")}`}
          />
        </div>
        {rest.slice(0, 2).map((image) => (
          <div
            key={image.slug}
            className={`hh-spread-cell overflow-hidden rounded-sm ${spreadCellSurfaceClass(image)}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={blueMoonObjectStyle(image)}
              className={`hh-editorial-image hh-spread-image h-full w-full ${blueMoonSpreadCellClass(image)}`}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "carousel-card") {
    return <HappyHourSpreadCarousel images={images} />;
  }

  if (variant === "duo") {
    return (
      <div
        className={`hh-spread-grid hh-spread-grid--duo grid gap-1.5 md:gap-2 ${
          images.length > 1 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {images.map((image) => (
          <div
            key={image.slug}
            className={`hh-spread-cell overflow-hidden rounded-sm ${spreadCellSurfaceClass(image)} ${
              images.length === 1 ? "mx-auto md:mx-0" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={blueMoonObjectStyle(image)}
              className={`hh-editorial-image hh-spread-image h-full w-full ${blueMoonSpreadCellClass(image, images.length === 1 ? "featured" : "default")}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hh-spread-grid hh-spread-grid--2x2 grid grid-cols-2 gap-1.5 md:gap-2">
      {images.slice(0, 4).map((image) => (
        <div
          key={image.slug}
          className={`hh-spread-cell overflow-hidden rounded-sm ${spreadCellSurfaceClass(image)}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            style={blueMoonObjectStyle(image)}
            className={`hh-editorial-image hh-spread-image h-full w-full ${blueMoonSpreadCellClass(image)}`}
          />
        </div>
      ))}
    </div>
  );
}

export function HappyHourSpread({
  index,
  eyebrow,
  title,
  subtitle,
  items,
  images,
  reverse = false,
  variant = "grid-2x2",
  tone = "default",
}: HappyHourSpreadProps) {
  const surface =
    tone === "beer"
      ? "bg-surface-elevated hh-spread--beer"
      : index % 2 === 0
        ? "bg-background"
        : "bg-surface";

  const hasVisual = images.length > 0;

  return (
    <section
      className={`hh-spread hh-section-bridge border-t border-hairline/60 ${surface} py-12 md:py-16`}
    >
      <div
        className={`mx-auto grid max-w-5xl items-center gap-8 px-5 md:max-w-6xl md:gap-12 md:px-10 lg:gap-14 ${
          hasVisual
            ? reverse
              ? "md:grid-cols-[1fr_1.05fr]"
              : "md:grid-cols-[1.05fr_1fr]"
            : "md:max-w-3xl"
        }`}
      >
        {hasVisual ? (
          <FadeIn
            delay={0.04}
            className={`hh-spread-visual group ${reverse ? "md:order-2" : "md:order-1"}`}
          >
            <SpreadPhotoGrid images={images} variant={variant} />
          </FadeIn>
        ) : null}

        <FadeIn
          delay={0.08}
          className={`${hasVisual ? (reverse ? "md:order-1 md:pr-2" : "md:order-2 md:pl-2") : ""}`}
        >
          {eyebrow ? <p className="hh-spread-eyebrow">{eyebrow}</p> : null}
          <h2 className="hh-spread-title">{title}</h2>
          {subtitle ? <p className="hh-spread-subtitle">{subtitle}</p> : null}

          <ul className="mt-6 flex flex-col gap-5 md:mt-8 md:gap-6">
            {items.map((item) => (
              <li key={item.name}>
                {item.badge ? (
                  <span className="hh-item-badge mb-1.5 inline-block rounded-sm border border-accent-2/35 bg-accent-2/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
                    {item.badge}
                  </span>
                ) : null}
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-base text-foreground">{item.name}</p>
                  {item.price ? (
                    <span className="shrink-0 font-display text-sm text-accent">
                      {item.price}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-garamond text-sm italic leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
