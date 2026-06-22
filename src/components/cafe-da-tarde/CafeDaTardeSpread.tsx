import { FadeIn } from "@/components/FadeIn";
import {
  cafeDaTardeObjectStyle,
  cafeDaTardeSpreadCellClass,
  type CafeDaTardeImage,
} from "@/lib/cafe-da-tarde-images";
import type { CafeDaTardeMenuItem, SpreadVariant } from "@/lib/cafe-da-tarde-menu";

type CafeDaTardeSpreadProps = {
  index: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: CafeDaTardeMenuItem[];
  images: CafeDaTardeImage[];
  reverse?: boolean;
  variant?: SpreadVariant;
};

function SpreadPhotoGrid({
  images,
  variant,
}: {
  images: CafeDaTardeImage[];
  variant: SpreadVariant;
}) {
  if (variant === "grid-asymmetric" && images.length >= 3) {
    const [hero, ...rest] = images;
    return (
      <div className="cdt-spread-grid cdt-spread-grid--asymmetric grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-2">
        <div className="cdt-spread-cell cdt-spread-cell--hero row-span-2 overflow-hidden rounded-sm">
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            style={cafeDaTardeObjectStyle(hero)}
            className={`cdt-editorial-image cdt-spread-image h-full w-full object-cover ${cafeDaTardeSpreadCellClass(hero, "hero")}`}
          />
        </div>
        {rest.slice(0, 2).map((image) => (
          <div
            key={image.slug}
            className="cdt-spread-cell overflow-hidden rounded-sm"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={cafeDaTardeObjectStyle(image)}
              className={`cdt-editorial-image cdt-spread-image h-full w-full object-cover ${cafeDaTardeSpreadCellClass(image)}`}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "duo") {
    return (
      <div
        className={`cdt-spread-grid cdt-spread-grid--duo grid gap-1.5 md:gap-2 ${
          images.length > 1 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {images.map((image) => (
          <div
            key={image.slug}
            className={`cdt-spread-cell overflow-hidden rounded-sm ${
              images.length === 1 ? "mx-auto md:mx-0" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              style={cafeDaTardeObjectStyle(image)}
              className={`cdt-editorial-image cdt-spread-image h-full w-full object-cover ${cafeDaTardeSpreadCellClass(image, images.length === 1 ? "featured" : "default")}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="cdt-spread-grid cdt-spread-grid--2x2 grid grid-cols-2 gap-1.5 md:gap-2">
      {images.slice(0, 4).map((image) => (
        <div key={image.slug} className="cdt-spread-cell overflow-hidden rounded-sm">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            style={cafeDaTardeObjectStyle(image)}
            className={`cdt-editorial-image cdt-spread-image h-full w-full object-cover ${cafeDaTardeSpreadCellClass(image)}`}
          />
        </div>
      ))}
    </div>
  );
}

export function CafeDaTardeSpread({
  index,
  eyebrow,
  title,
  subtitle,
  items,
  images,
  reverse = false,
  variant = "grid-2x2",
}: CafeDaTardeSpreadProps) {
  const surface = index % 2 === 0 ? "bg-background" : "bg-surface";

  return (
    <section
      className={`cdt-spread cdt-section-bridge border-t border-hairline/60 ${surface} py-12 md:py-16`}
    >
      <div
        className={`mx-auto grid max-w-5xl items-center gap-8 px-5 md:max-w-6xl md:gap-12 md:px-10 lg:gap-14 ${
          reverse ? "md:grid-cols-[1fr_1.05fr]" : "md:grid-cols-[1.05fr_1fr]"
        }`}
      >
        <FadeIn
          delay={0.04}
          className={`cdt-spread-visual group ${reverse ? "md:order-2" : "md:order-1"}`}
        >
          <SpreadPhotoGrid images={images} variant={variant} />
        </FadeIn>

        <FadeIn
          delay={0.08}
          className={`cdt-spread-copy ${reverse ? "md:order-1 md:pr-2" : "md:order-2 md:pl-2"}`}
        >
          {eyebrow ? <p className="section-eyebrow mb-2">{eyebrow}</p> : null}
          <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 font-garamond text-base italic leading-relaxed text-foreground-muted md:text-lg">
              {subtitle}
            </p>
          ) : null}

          <ul className="mt-6 flex flex-col gap-5 md:mt-8 md:gap-6">
            {items.map((item) => (
              <li key={item.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-base text-foreground">{item.name}</p>
                  <span className="shrink-0 font-display text-sm text-accent">{item.price}</span>
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
