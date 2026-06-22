import boloDoDia01 from "@/assets/images/cafe-da-tarde/cafe-da-tarde-bolo-do-dia01.webp";
import boloDoDia02 from "@/assets/images/cafe-da-tarde/cafe-da-tarde-bolo-do-dia02.webp";
import boloDoDia03 from "@/assets/images/cafe-da-tarde/cafe-da-tarde-bolo-do-dia03.webp";
import cestaPaoDeQueijo from "@/assets/images/cafe-da-tarde/cafe-da-tarde-cesta-de-pao-de-queijo-com-suco-do-dia.webp";
import empadaPalmito from "@/assets/images/cafe-da-tarde/cafe-da-tarde-empada-de-palmito.webp";
import focoQuiche from "@/assets/images/cafe-da-tarde/cafe-da-tarde-foco-no-quiche.webp";
import quiche from "@/assets/images/cafe-da-tarde/cafe-da-tarde-quiche.webp";
import quicheComSuco from "@/assets/images/cafe-da-tarde/cafe-da-tarde-quiche-com-suco-do-dia.webp";
import todasRefeicoes from "@/assets/images/cafe-da-tarde/cafe-da-tarde-todas-as-refeicoes.webp";
import todasRefeicoesFocoPao from "@/assets/images/cafe-da-tarde/cafe-da-tarde-todas-as-refeicoes-mas-foco-pao-de-queijo.webp";

export type CafeDaTardeImage = {
  src: string;
  alt: string;
  label: string;
  slug: string;
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
  },
  {
    slug: "todas-as-refeicoes-foco-pao",
    src: todasRefeicoesFocoPao,
    label: "Pão de queijo em destaque",
    alt: "Cesta de pão de queijo e salgados servidos no café da tarde",
  },
  {
    slug: "bolo-do-dia-01",
    src: boloDoDia01,
    label: "Bolo do dia",
    alt: "Fatia do bolo do dia servida no café da tarde",
  },
  {
    slug: "bolo-do-dia-02",
    src: boloDoDia02,
    label: "Bolo do dia",
    alt: "Outra variação do bolo do dia na vitrine do café da tarde",
  },
  {
    slug: "bolo-do-dia-03",
    src: boloDoDia03,
    label: "Bolo do dia",
    alt: "Bolo do dia com apresentação editorial na mesa",
  },
  {
    slug: "cesta-pao-de-queijo",
    src: cestaPaoDeQueijo,
    label: "Cesta de pão de queijo",
    alt: "Cesta de pão de queijo acompanhada de suco do dia",
  },
  {
    slug: "empada-palmito",
    src: empadaPalmito,
    label: "Empada de palmito",
    alt: "Empada de palmito individual do café da tarde",
  },
  {
    slug: "quiche",
    src: quiche,
    label: "Quiche",
    alt: "Quiche salgado servido no café da tarde",
  },
  {
    slug: "foco-quiche",
    src: focoQuiche,
    label: "Quiche em detalhe",
    alt: "Close do quiche com massa dourada e recheio cremoso",
  },
  {
    slug: "quiche-com-suco",
    src: quicheComSuco,
    label: "Quiche com suco",
    alt: "Quiche acompanhado de suco do dia na mesa do café da tarde",
  },
];

/** Fotos editoriais para a galeria — exclui as usadas no hero e no menu. */
export const CAFE_DA_TARDE_GALLERY: CafeDaTardeImage[] = [
  CAFE_DA_TARDE_IMAGES.find((img) => img.slug === "todas-as-refeicoes-foco-pao")!,
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
