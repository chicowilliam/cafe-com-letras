import type { CSSProperties } from "react";
import img01 from "@/assets/images/blue-moon/blue-moon-01.webp";
import img02 from "@/assets/images/blue-moon/blue-moon-02.webp";
import img03 from "@/assets/images/blue-moon/blue-moon-03.webp";
import img04 from "@/assets/images/blue-moon/blue-moon-04.webp";
import img05 from "@/assets/images/blue-moon/blue-moon-05.webp";
import img06 from "@/assets/images/blue-moon/blue-moon-06.webp";
import img07 from "@/assets/images/blue-moon/blue-moon-07.webp";
import img08 from "@/assets/images/blue-moon/blue-moon-08.webp";
import img09 from "@/assets/images/blue-moon/blue-moon-09.webp";
import img10 from "@/assets/images/blue-moon/blue-moon-10.webp";
import img11 from "@/assets/images/blue-moon/blue-moon-11.webp";

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
  {
    slug: "croquetes-de-carne",
    src: img05,
    label: "Croquetes de carne",
    alt: "Seis croquetes de carne crocantes com fonduta de requeijão ao lado de chopp Blue Moon com fatia de laranja",
    focalPoint: "52% 62%",
    aspectHint: "portrait",
  },
  {
    slug: "batatas-rusticas",
    src: img06,
    label: "Batatas rústicas",
    alt: "Batatas assadas e carne na tábua de madeira com garrafa e copo de Blue Moon Belgian White ao fundo",
    focalPoint: "50% 68%",
    aspectHint: "portrait",
  },
  {
    slug: "petiscos-abertos",
    src: img07,
    label: "Petiscos para abrir",
    alt: "Porção de petiscos fritos com guacamole e carne moída acompanhada de chopp Blue Moon com laranja",
    focalPoint: "50% 64%",
    aspectHint: "portrait",
  },
  {
    slug: "servindo-blue-moon",
    src: img08,
    label: "Servindo Blue Moon",
    alt: "Garçom servindo Blue Moon Belgian White em copo personalizado no terraço do Café com Letras",
    focalPoint: "46% 56%",
    aspectHint: "portrait",
  },
  {
    slug: "mesa-casal-blue-moon",
    src: img09,
    label: "Mesa com Blue Moon",
    alt: "Garrafa e copos de Blue Moon Belgian White com fatia de laranja em mesa ao ar livre à noite",
    focalPoint: "38% 54%",
    aspectHint: "landscape",
  },
  {
    slug: "brinde-amigos",
    src: img10,
    label: "Brinde no happy hour",
    alt: "Amigos brindando com copo de Blue Moon Belgian White no pátio do Café com Letras à noite",
    focalPoint: "50% 44%",
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
