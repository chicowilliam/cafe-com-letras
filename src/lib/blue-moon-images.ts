import type { CSSProperties } from "react";
import imgAmbiente from "@/assets/images/blue-moon/blue-moon-ambiente-hi.webp";
import imgBranding from "@/assets/images/blue-moon/blue-moon-branding-hi.webp";
import imgBrinde from "@/assets/images/blue-moon/blue-moon-brinde-hi.webp";
import imgHero from "@/assets/images/blue-moon/blue-moon-hero.webp";
import imgLaranja from "@/assets/images/blue-moon/blue-moon-laranja-hi.webp";
import imgMesa from "@/assets/images/blue-moon/blue-moon-mesa-hi.webp";
import imgPetiscos from "@/assets/images/blue-moon/blue-moon-petiscos-hi.webp";
import imgServindo from "@/assets/images/blue-moon/blue-moon-servindo-hi.webp";
import { cloudinaryImageFitUrl } from "@/lib/cloudinary-image";

/**
 * Pasta Cloudinary de branding Blue Moon (local `src/assets/images/blue-moon/`).
 */
export const BLUE_MOON_CLOUDINARY_FOLDER = "blue-moon";
export const BLUE_MOON_CLOUDINARY_CLOUD = "dmqa0cxay";

/**
 * Pasta Cloudinary dos pratos oficiais do Happy Hour (DAM Media Library).
 * PublicIds ficam na raiz do cloud; a pasta organiza no Media Library.
 */
export const HAPPY_HOUR_CLOUDINARY_FOLDER = "happy hour";

/** Entrega hi-res dos pratos (portrait ~2323×3480 no DAM). */
function happyHourDishSrc(publicId: string) {
  return cloudinaryImageFitUrl(publicId, 1400, 2100, "auto:best");
}

export type AspectHint = "portrait" | "landscape" | "square";
export type ImageFit = "cover" | "contain";

export type BlueMoonImage = {
  src: string;
  alt: string;
  label: string;
  slug: string;
  /** PublicId Cloudinary completo (quando a foto vem do DAM). */
  cloudinaryId?: string;
  focalPoint: string;
  aspectHint: AspectHint;
  fit?: ImageFit;
};

/** Hero da página /happy-hour — landscape hi-res (mesa Blue Moon). */
export const BLUE_MOON_HERO_IMAGE = imgHero;

export const BLUE_MOON_HERO_ALT =
  "Mesa com Blue Moon Belgian White, fatia de laranja e o entardecer na Savassi";

export const BLUE_MOON_IMAGES: BlueMoonImage[] = [
  {
    slug: "ambiente-savassi",
    src: imgAmbiente,
    label: "Entardecer na Savassi",
    alt: "Terraço do Café com Letras à noite com letreiro Blue Moon e guarda-sóis na Savassi",
    focalPoint: "50% 42%",
    aspectHint: "landscape",
  },
  {
    slug: "laranja-no-copo",
    src: imgLaranja,
    label: "Blue Moon com laranja",
    alt: "Copo de Blue Moon Belgian White com fatia de laranja na borda",
    focalPoint: "50% 40%",
    aspectHint: "portrait",
  },
  {
    slug: "batatas-rusticas",
    src: happyHourDishSrc("Batata_rustica_d9n5jz"),
    cloudinaryId: "Batata_rustica_d9n5jz",
    label: "Batatas rústicas",
    alt: "Batatas rústicas com lâminas de bacon e fonduta de requeijão de raspa",
    focalPoint: "50% 45%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "croquetes-de-carne",
    src: happyHourDishSrc("Croquetes_de_carne_awkkhu"),
    cloudinaryId: "Croquetes_de_carne_awkkhu",
    label: "Croquetes de carne",
    alt: "Seis croquetes de carne crocantes com fonduta de requeijão de raspa",
    focalPoint: "50% 45%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "choripan",
    src: happyHourDishSrc("Chripan_vegano_pfngya"),
    cloudinaryId: "Chripan_vegano_pfngya",
    label: "Choripan vegano",
    alt: "Choripan vegano acompanhado de baguete no happy hour",
    focalPoint: "50% 45%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "pastel-camarao",
    src: happyHourDishSrc("pastel_aberto_de_camarão_rzi3cj"),
    cloudinaryId: "pastel_aberto_de_camarão_rzi3cj",
    label: "Pastel aberto de camarão",
    alt: "Pastel aberto de camarão — quatro unidades",
    focalPoint: "50% 45%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "pastel-provolone",
    src: happyHourDishSrc(
      "Pastel_aberto_de_queijo_provolone_e_salaminho_jpmfah",
    ),
    cloudinaryId: "Pastel_aberto_de_queijo_provolone_e_salaminho_jpmfah",
    label: "Pastel aberto de provolone",
    alt: "Pastel aberto de queijo provolone com salaminho — quatro unidades",
    focalPoint: "50% 45%",
    aspectHint: "portrait",
    fit: "contain",
  },
  {
    slug: "petiscos-board",
    src: imgPetiscos,
    label: "Board de petiscos",
    alt: "Nachos e dips com Blue Moon Belgian White e fatia de laranja sob luz azul e laranja",
    focalPoint: "50% 48%",
    aspectHint: "portrait",
  },
  {
    slug: "mesa-blue-moon",
    src: imgMesa,
    label: "Mesa com Blue Moon",
    alt: "Garrafa e copos de Blue Moon Belgian White com fatia de laranja em mesa ao ar livre à noite",
    focalPoint: "48% 48%",
    aspectHint: "landscape",
  },
  {
    slug: "servindo-blue-moon",
    src: imgServindo,
    label: "Servindo Blue Moon",
    alt: "Garçom servindo Blue Moon Belgian White em copo personalizado no terraço do Café com Letras",
    focalPoint: "46% 42%",
    aspectHint: "portrait",
  },
  {
    slug: "brinde-blue-moon",
    src: imgBrinde,
    label: "Brinde na Savassi",
    alt: "Dois amigos brindando com Blue Moon Belgian White e fatia de laranja no terraço",
    focalPoint: "50% 35%",
    aspectHint: "portrait",
  },
  {
    slug: "branding-banco",
    src: imgBranding,
    label: "Parceria Blue Moon",
    alt: "Logotipo Blue Moon em banco de madeira com iluminação azul no ambiente do bar",
    focalPoint: "54% 48%",
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

/** PublicId Cloudinary do asset, quando existir. */
export function blueMoonCloudinaryPublicId(image: BlueMoonImage) {
  return image.cloudinaryId ?? null;
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

export const BLUE_MOON_HERO_IMAGE_META = {
  src: BLUE_MOON_HERO_IMAGE,
  alt: BLUE_MOON_HERO_ALT,
  label: "Happy Hour Blue Moon",
  slug: "hero-mesa",
  focalPoint: "45% 42%",
  aspectHint: "landscape" as const,
};
