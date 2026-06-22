import type { CSSProperties } from "react";
import boloDoDia01 from "@/assets/images/cafe-da-tarde/cafe-da-tarde-bolo-do-dia01.webp";
import boloDoDia02 from "@/assets/images/cafe-da-tarde/cafe-da-tarde-bolo-do-dia02.webp";
import boloDoDia03 from "@/assets/images/cafe-da-tarde/cafe-da-tarde-bolo-do-dia03.webp";
import cafe from "@/assets/images/cafe-da-tarde/cafe-da-tarde-cafe.jpg";
import cestaPaoDeQueijo from "@/assets/images/cafe-da-tarde/cafe-da-tarde-cesta-de-pao-de-queijo-com-suco-do-dia.webp";
import empadaPalmito from "@/assets/images/cafe-da-tarde/cafe-da-tarde-empada-de-palmito.webp";
import focoQuiche from "@/assets/images/cafe-da-tarde/cafe-da-tarde-foco-no-quiche.webp";
import quiche from "@/assets/images/cafe-da-tarde/cafe-da-tarde-quiche.webp";
import quicheComSuco from "@/assets/images/cafe-da-tarde/cafe-da-tarde-quiche-com-suco-do-dia.webp";
import todasRefeicoes from "@/assets/images/cafe-da-tarde/cafe-da-tarde-todas-as-refeicoes.webp";
import todasRefeicoesFocoPao from "@/assets/images/cafe-da-tarde/cafe-da-tarde-todas-as-refeicoes-mas-foco-pao-de-queijo.webp";

export type AspectHint = "portrait" | "landscape" | "square";
export type ImageFit = "cover" | "contain";

export type CafeDaTardeImage = {
  src: string;
  alt: string;
  label: string;
  slug: string;
  /** CSS object-position — ponto focal do prato principal. */
  focalPoint: string;
  aspectHint: AspectHint;
  fit?: ImageFit;
};

export const CAFE_DA_TARDE_HERO_IMAGE = todasRefeicoes;

export const CAFE_DA_TARDE_HERO_ALT =
  "Mesa do café da tarde no Café com Letras com bolos, quiches, empadas e sucos do dia";

export const CAFE_DA_TARDE_IMAGES: CafeDaTardeImage[] = [
  {
    slug: "todas-as-refeicoes",
    src: todasRefeicoes,
    label: "Todas as refeições",
    alt: "Visão geral da mesa do café da tarde com salgados, doces e sucos",
    focalPoint: "50% 42%",
    aspectHint: "portrait",
  },
  {
    slug: "todas-as-refeicoes-foco-pao",
    src: todasRefeicoesFocoPao,
    label: "Pão de queijo em destaque",
    alt: "Cesta de pão de queijo e salgados servidos no café da tarde",
    focalPoint: "50% 48%",
    aspectHint: "portrait",
  },
  {
    slug: "bolo-do-dia-01",
    src: boloDoDia01,
    label: "Bolo do dia",
    alt: "Fatia do bolo do dia servida no café da tarde",
    focalPoint: "50% 40%",
    aspectHint: "portrait",
  },
  {
    slug: "bolo-do-dia-02",
    src: boloDoDia02,
    label: "Bolo do dia",
    alt: "Outra variação do bolo do dia na vitrine do café da tarde",
    focalPoint: "50% 44%",
    aspectHint: "portrait",
  },
  {
    slug: "bolo-do-dia-03",
    src: boloDoDia03,
    label: "Bolo do dia",
    alt: "Bolo do dia com apresentação editorial na mesa",
    focalPoint: "50% 46%",
    aspectHint: "square",
  },
  {
    slug: "cafe",
    src: cafe,
    label: "Café",
    alt: "Cappuccino com latte art servido no Café com Letras",
    focalPoint: "50% 48%",
    aspectHint: "portrait",
  },
  {
    slug: "cesta-pao-de-queijo",
    src: cestaPaoDeQueijo,
    label: "Cesta de pão de queijo",
    alt: "Cesta de pão de queijo acompanhada de suco do dia",
    focalPoint: "50% 45%",
    aspectHint: "portrait",
  },
  {
    slug: "empada-palmito",
    src: empadaPalmito,
    label: "Empada de palmito",
    alt: "Empada de palmito individual do café da tarde",
    focalPoint: "50% 50%",
    aspectHint: "portrait",
  },
  {
    slug: "quiche",
    src: quiche,
    label: "Quiche",
    alt: "Quiche salgado servido no café da tarde",
    focalPoint: "50% 48%",
    aspectHint: "portrait",
  },
  {
    slug: "foco-quiche",
    src: focoQuiche,
    label: "Quiche em detalhe",
    alt: "Close do quiche com massa dourada e recheio cremoso",
    focalPoint: "50% 52%",
    aspectHint: "square",
  },
  {
    slug: "quiche-com-suco",
    src: quicheComSuco,
    label: "Quiche com suco",
    alt: "Quiche acompanhado de suco do dia na mesa do café da tarde",
    focalPoint: "50% 46%",
    aspectHint: "portrait",
  },
];

/** Fotos editoriais para a galeria — exclui as usadas no hero e no menu. */
export const CAFE_DA_TARDE_GALLERY: CafeDaTardeImage[] = [
  CAFE_DA_TARDE_IMAGES.find((img) => img.slug === "cafe")!,
  CAFE_DA_TARDE_IMAGES.find((img) => img.slug === "bolo-do-dia-02")!,
  CAFE_DA_TARDE_IMAGES.find((img) => img.slug === "bolo-do-dia-03")!,
  CAFE_DA_TARDE_IMAGES.find((img) => img.slug === "foco-quiche")!,
];

export function getCafeDaTardeGalleryImages() {
  return CAFE_DA_TARDE_GALLERY;
}

export function getCafeDaTardeImageBySlug(slug: CafeDaTardeImage["slug"]) {
  const image = CAFE_DA_TARDE_IMAGES.find((entry) => entry.slug === slug);
  if (!image) {
    throw new Error(`Cafe da tarde image not found: ${slug}`);
  }
  return image;
}

export function cafeDaTardeObjectStyle(
  image: Pick<CafeDaTardeImage, "focalPoint" | "fit">,
): CSSProperties {
  return {
    objectPosition: image.focalPoint,
    objectFit: image.fit ?? "cover",
  };
}

export type ChapterVariant = "standard" | "wide" | "detail";

export function cafeDaTardeChapterAspectClass(
  image: CafeDaTardeImage,
  variant: ChapterVariant = "standard",
) {
  if (variant === "wide") {
    return "cdt-aspect-chapter-wide";
  }
  if (variant === "detail" || image.aspectHint === "square") {
    return "cdt-aspect-chapter-square";
  }
  if (image.aspectHint === "landscape") {
    return "cdt-aspect-chapter-landscape";
  }
  return "cdt-aspect-chapter-portrait";
}

export function cafeDaTardeIntroAspectClass(image: CafeDaTardeImage) {
  return image.aspectHint === "landscape"
    ? "cdt-aspect-intro-landscape"
    : "cdt-aspect-intro-portrait";
}

export type SpreadCellRole = "default" | "hero" | "wide" | "featured";

export function cafeDaTardeSpreadCellClass(
  image: CafeDaTardeImage,
  role: SpreadCellRole = "default",
) {
  if (role === "featured") {
    if (image.aspectHint === "landscape") {
      return "cdt-spread-cell--landscape";
    }
    if (image.aspectHint === "square") {
      return "cdt-spread-cell--square";
    }
    return "cdt-spread-cell--portrait";
  }
  if (role === "wide" || image.aspectHint === "landscape") {
    return "cdt-spread-cell--landscape";
  }
  if (role === "hero") {
    return "cdt-spread-cell--hero";
  }
  return "cdt-spread-cell--square";
}

export type CafeDaTardeMosaicLayout = "feature" | "detail";

export type CafeDaTardeMosaicCell = {
  slug: CafeDaTardeImage["slug"];
  layout: CafeDaTardeMosaicLayout;
};

/**
 * Mosaico final — só closes e variações que não protagonizam os capítulos.
 * (Hero, intro e capítulos já usam as demais fotos.)
 */
export const CAFE_DA_TARDE_MOSAIC: CafeDaTardeMosaicCell[] = [
  { slug: "bolo-do-dia-02", layout: "feature" },
  { slug: "bolo-do-dia-03", layout: "detail" },
  { slug: "foco-quiche", layout: "detail" },
];

export function getCafeDaTardeMosaicImages() {
  return CAFE_DA_TARDE_MOSAIC.map((cell) => ({
    ...cell,
    image: getCafeDaTardeImageBySlug(cell.slug),
  }));
}

export const CAFE_DA_TARDE_HERO_IMAGE_META = getCafeDaTardeImageBySlug("todas-as-refeicoes");
