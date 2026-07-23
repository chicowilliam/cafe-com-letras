import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  HappyHourDishLightbox,
  type HappyHourDishLightboxSlide,
} from "@/components/happy-hour/HappyHourDishLightbox";
import { HappyHourSpreadCarousel } from "@/components/happy-hour/HappyHourSpreadCarousel";
import {
  blueMoonObjectStyle,
  type BlueMoonImage,
} from "@/lib/blue-moon-images";
import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import type { HappyHourMenuItem, SpreadVariant } from "@/lib/happy-hour-menu";

type HappyHourSpreadProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: HappyHourMenuItem[];
  images: BlueMoonImage[];
  reverse?: boolean;
  variant?: SpreadVariant;
  tone?: "default" | "beer";
  onReserve?: () => void;
};

function isDishPhoto(image: BlueMoonImage) {
  return Boolean(image.cloudinaryId);
}

function spreadCellSurfaceClass(image: BlueMoonImage) {
  return isDishPhoto(image) || image.fit === "contain"
    ? "hh-spread-cell--contain"
    : "";
}

function buildLightboxSlide(
  image: BlueMoonImage,
  items: HappyHourMenuItem[],
): HappyHourDishLightboxSlide {
  const menuItem = items.find(
    (item) => item.imageSlug === image.slug || item.name === image.label,
  );

  const captionParts = [
    menuItem?.price,
    menuItem?.description,
  ].filter(Boolean);

  return {
    src: image.src,
    alt: image.alt,
    title: menuItem?.name ?? image.label,
    caption: captionParts.length > 0 ? captionParts.join(" · ") : undefined,
  };
}

function SpreadDishCell({
  image,
  className = "",
  onOpen,
}: {
  image: BlueMoonImage;
  className?: string;
  onOpen: (image: BlueMoonImage) => void;
}) {
  const dish = isDishPhoto(image);
  const fitContain = dish || image.fit === "contain";

  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      aria-label={`Ampliar foto: ${image.label}`}
      className={`hh-spread-cell hh-spread-cell--frame hh-spread-cell--zoom focus-ring relative overflow-hidden rounded-sm text-left ${spreadCellSurfaceClass(image)} ${className}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={blueMoonObjectStyle({
          ...image,
          fit: fitContain ? "contain" : image.fit ?? "cover",
        })}
        className={`hh-editorial-image hh-spread-image h-full w-full ${
          fitContain ? "object-contain" : "object-cover"
        }`}
      />
      {dish ? (
        <p className="hh-dish-caption" aria-hidden>
          {image.label}
        </p>
      ) : null}
    </button>
  );
}

function SpreadPhotoGrid({
  images,
  variant,
  onOpen,
}: {
  images: BlueMoonImage[];
  variant: SpreadVariant;
  onOpen: (image: BlueMoonImage) => void;
}) {
  const dishCount = images.filter(isDishPhoto).length;

  /* Pratos do DAM: colunas 2:3 iguais — evita faixas laterais do contain em célula larga */
  if (dishCount >= 2 && images.length >= 2) {
    return (
      <div
        className={`hh-spread-grid hh-spread-grid--dishes-trio grid gap-1.5 md:gap-2 ${
          images.length >= 3 ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {images.slice(0, 3).map((image) => (
          <SpreadDishCell key={image.slug} image={image} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  if (variant === "grid-asymmetric" && images.length >= 3) {
    const [hero, ...rest] = images;
    return (
      <div className="hh-spread-grid hh-spread-grid--asymmetric grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-2">
        <SpreadDishCell
          image={hero}
          onOpen={onOpen}
          className="hh-spread-cell--hero row-span-2"
        />
        {rest.slice(0, 2).map((image) => (
          <SpreadDishCell key={image.slug} image={image} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  if (variant === "carousel-card") {
    return (
      <HappyHourSpreadCarousel images={images} onOpenImage={onOpen} />
    );
  }

  if (variant === "duo") {
    const isSingle = images.length === 1;
    return (
      <div
        className={`hh-spread-grid hh-spread-grid--duo grid gap-1.5 md:gap-2 ${
          isSingle ? "hh-spread-grid--single grid-cols-1" : "grid-cols-2"
        }`}
      >
        {images.map((image) => (
          <SpreadDishCell
            key={image.slug}
            image={image}
            onOpen={onOpen}
            className={isSingle ? "mx-auto md:mx-0" : ""}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="hh-spread-grid hh-spread-grid--2x2 grid grid-cols-2 gap-1.5 md:gap-2">
      {images.slice(0, 4).map((image) => (
        <SpreadDishCell key={image.slug} image={image} onOpen={onOpen} />
      ))}
    </div>
  );
}

export function HappyHourSpread({
  eyebrow,
  title,
  subtitle,
  items,
  images,
  reverse = false,
  variant = "grid-2x2",
  tone = "default",
  onReserve,
}: HappyHourSpreadProps) {
  const [lightbox, setLightbox] = useState<HappyHourDishLightboxSlide | null>(
    null,
  );

  const surface = tone === "beer" ? "hh-spread--beer" : "";

  const hasVisual = images.length > 0;

  const openImage = (image: BlueMoonImage) => {
    setLightbox(buildLightboxSlide(image, items));
  };

  return (
    <section
      className={`hh-spread hh-section-bridge relative ${surface} py-9 md:py-12`.trim()}
    >
      <div
        className={`hh-rail grid items-start gap-6 md:items-center md:gap-10 lg:gap-14 ${
          hasVisual
            ? "md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
            : "hh-rail--readable"
        }`}
      >
        {hasVisual ? (
          <FadeIn
            delay={0.04}
            className={`hh-spread-visual group ${reverse ? "md:order-2" : "md:order-1"}`}
          >
            <SpreadPhotoGrid
              images={images}
              variant={variant}
              onOpen={openImage}
            />
          </FadeIn>
        ) : null}

        <FadeIn
          delay={0.08}
          className={`${hasVisual ? (reverse ? "md:order-1 md:pr-1" : "md:order-2 md:pl-1") : ""}`}
        >
          {eyebrow ? <p className="hh-spread-eyebrow">{eyebrow}</p> : null}
          <h2 className="hh-spread-title">{title}</h2>
          {subtitle ? <p className="hh-spread-subtitle">{subtitle}</p> : null}

          <ul className="mt-5 flex flex-col gap-4 md:mt-6 md:gap-5">
            {items.map((item) => (
              <li key={item.name}>
                {item.badge ? (
                  <span className="hh-item-badge mb-1.5 inline-block rounded-sm border border-accent-2/40 bg-accent-2/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
                    {item.badge}
                  </span>
                ) : null}
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-[0.9375rem] text-foreground md:text-base">
                    {item.name}
                  </p>
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

          {onReserve ? (
            <button
              type="button"
              onClick={onReserve}
              className={`btn-primary focus-ring mt-8 inline-flex min-h-[44px] items-center rounded-sm px-7 py-3 text-sm font-medium ${CTA_HOVER_CLASS}`}
            >
              {CTA_LABELS.reserveTable}
            </button>
          ) : null}
        </FadeIn>
      </div>

      <HappyHourDishLightbox
        slide={lightbox}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}
