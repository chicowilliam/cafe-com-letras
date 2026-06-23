import type { CSSProperties } from "react";
import img02 from "@/assets/images/blue-moon/blue-moon-02.webp";
import img03 from "@/assets/images/blue-moon/blue-moon-03.webp";
import img04 from "@/assets/images/blue-moon/blue-moon-04.webp";
import img07 from "@/assets/images/blue-moon/blue-moon-07.webp";
import img08 from "@/assets/images/blue-moon/blue-moon-08.webp";
import img09 from "@/assets/images/blue-moon/blue-moon-09.webp";
import img11 from "@/assets/images/blue-moon/blue-moon-11.webp";

export type AspectHint = "portrait" | "landscape" | "square";
export type ImageFit = "cover" | "contain";

export type BlueMoonImage = {
  src: string;
  alt: string;
  label: string;
  slug: string;
  focalPoint: string;
  aspectHint: AspectHint;
  fit?: ImageFit;
};

export const BLUE_MOON_HERO_IMAGE = img08;

export const BLUE_MOON_HERO_ALT =
  "Garçom servindo Blue Moon Belgian White em copo personalizado no happy hour";

export const BLUE_MOON_IMAGES: BlueMoonImage[] = [
  {
    slug: "ambiente-savassi",
    src: img03,
    label: "Entardecer na Savassi",
    alt: "Terraço do Café com Letras à noite com letreiro Blue Moon e guarda-sóis na Savassi",
    focalPoint: "50% 42%",
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
    slug: "croquetes-de-carne",
    src: img04,
    label: "Croquetes de carne",
    alt: "Seis croquetes de carne crocantes com fonduta de requeijão ao lado de chopp Blue Moon com fatia de laranja",
    focalPoint: "52% 58%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "petiscos-para-abrir",
    src: img07,
    label: "Petiscos para abrir",
    alt: "Porção de petiscos fritos com guacamole e carne moída acompanhada de chopp Blue Moon com laranja",
    focalPoint: "50% 62%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "mesa-blue-moon",
    src: img09,
    label: "Mesa com Blue Moon",
    alt: "Garrafa e copos de Blue Moon Belgian White com fatia de laranja em mesa ao ar livre à noite",
    focalPoint: "40% 52%",
    aspectHint: "landscape",
  },
  {
    slug: "servindo-blue-moon",
    src: img08,
    label: "Servindo Blue Moon",
    alt: "Garçom servindo Blue Moon Belgian White em copo personalizado no terraço do Café com Letras",
    focalPoint: "46% 52%",
    aspectHint: "portrait",
  },
  {
    slug: "branding-banco",
    src: img11,
    label: "Parceria Blue Moon",
    alt: "Logotipo Blue Moon em banco de madeira com iluminação azul no ambiente do bar",
    focalPoint: "54% 68%",
    aspectHint: "landscape",
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
  image: Pick<BlueMoonImage, "focalPoint" | "fit">,
): CSSProperties {
  return {
    objectPosition: image.focalPoint,
    objectFit: image.fit ?? "cover",
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

export const BLUE_MOON_HERO_IMAGE_META = getBlueMoonImageBySlug("servindo-blue-moon");
