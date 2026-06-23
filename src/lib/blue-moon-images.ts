import type { CSSProperties } from "react";
import img01 from "@/assets/images/blue-moon/blue-moon-01.webp";
import img02 from "@/assets/images/blue-moon/blue-moon-02.webp";
import img03 from "@/assets/images/blue-moon/blue-moon-03.webp";
import img04 from "@/assets/images/blue-moon/blue-moon-04.webp";

export type AspectHint = "portrait" | "landscape" | "square";

export type BlueMoonImage = {
  src: string;
  alt: string;
  label: string;
  slug: string;
  focalPoint: string;
  aspectHint: AspectHint;
};

export const BLUE_MOON_HERO_IMAGE = img03;

export const BLUE_MOON_HERO_ALT =
  "Chopp Blue Moon Belgian White com espuma cremosa e fatia de laranja no happy hour";

export const BLUE_MOON_IMAGES: BlueMoonImage[] = [
  {
    slug: "mesa-entardecer",
    src: img01,
    label: "Mesa do happy hour",
    alt: "Choppes e petiscos na mesa do happy hour no Café com Letras",
    focalPoint: "50% 45%",
    aspectHint: "landscape",
  },
  {
    slug: "laranja-no-copo",
    src: img02,
    label: "Fatia de laranja",
    alt: "Copo de Blue Moon Belgian White com fatia de laranja na borda",
    focalPoint: "50% 42%",
    aspectHint: "portrait",
  },
  {
    slug: "chopp-espuma",
    src: img03,
    label: "Blue Moon gelada",
    alt: "Close do chopp Blue Moon com espuma dourada servido no happy hour",
    focalPoint: "50% 48%",
    aspectHint: "landscape",
  },
  {
    slug: "petiscos-mesa",
    src: img04,
    label: "Petiscos da casa",
    alt: "Petiscos servidos no happy hour acompanhados de cerveja",
    focalPoint: "50% 46%",
    aspectHint: "portrait",
  },
];

/** @deprecated Use BLUE_MOON_IMAGES entries — mantido para compatibilidade. */
export const BLUE_MOON_IMAGE_URLS: string[] = BLUE_MOON_IMAGES.map((image) => image.src);

export function getBlueMoonImageBySlug(slug: BlueMoonImage["slug"]) {
  const image = BLUE_MOON_IMAGES.find((entry) => entry.slug === slug);
  if (!image) {
    throw new Error(`Blue Moon image not found: ${slug}`);
  }
  return image;
}

export function blueMoonObjectStyle(
  image: Pick<BlueMoonImage, "focalPoint">,
): CSSProperties {
  return {
    objectPosition: image.focalPoint,
    objectFit: "cover",
  };
}

export type SpreadCellRole = "default" | "hero" | "featured";

export function blueMoonSpreadCellClass(
  image: BlueMoonImage,
  role: SpreadCellRole = "default",
) {
  if (role === "hero") {
    return "hh-spread-cell--hero";
  }
  if (role === "featured") {
    if (image.aspectHint === "landscape") {
      return "hh-spread-cell--landscape";
    }
    return "hh-spread-cell--portrait";
  }
  if (image.aspectHint === "landscape") {
    return "hh-spread-cell--landscape";
  }
  if (image.aspectHint === "portrait") {
    return "hh-spread-cell--portrait";
  }
  return "hh-spread-cell--square";
}

export function blueMoonIntroAspectClass(image: BlueMoonImage) {
  return image.aspectHint === "landscape"
    ? "hh-aspect-intro-landscape"
    : "hh-aspect-intro-portrait";
}

export const BLUE_MOON_HERO_IMAGE_META = getBlueMoonImageBySlug("chopp-espuma");
