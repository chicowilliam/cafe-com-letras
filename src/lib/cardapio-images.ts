import capaPt from "@/assets/images/cardapio/capa-pt.jfif";
import ptPag01 from "@/assets/images/cardapio/pt/01_info_geral.png";
import ptPag02 from "@/assets/images/cardapio/pt/02_bebidas_quentes.png";
import ptPag03 from "@/assets/images/cardapio/pt/03_bebidas_geladas.png";
import ptPag04 from "@/assets/images/cardapio/pt/04_cervejas_drinks.png";
import ptPag05 from "@/assets/images/cardapio/pt/05_drinks_coqueteis_2.png";
import ptPag06 from "@/assets/images/cardapio/pt/06_licores_destilados.png";
import ptPag07 from "@/assets/images/cardapio/pt/07_compartilhar_grelhados.png";
import ptPag08 from "@/assets/images/cardapio/pt/08_carnes_sanduiches.png";
import ptPag09 from "@/assets/images/cardapio/pt/09_saladas_massas_infantil.png";
import ptPag10 from "@/assets/images/cardapio/pt/10_veganos.png";
import ptPag11 from "@/assets/images/cardapio/pt/11_sobremesas.png";

import enPag01 from "@/assets/images/cardapio/en/01.png";
import enPag02 from "@/assets/images/cardapio/en/02.png";
import enPag03 from "@/assets/images/cardapio/en/03.png";
import enPag04 from "@/assets/images/cardapio/en/04.png";
import enPag05 from "@/assets/images/cardapio/en/05.png";

export type CardapioLang = "pt" | "en";

export type CardapioSection = {
  id: string;
  label: string;
  src: string;
};

const PT_SECTIONS: Omit<CardapioSection, "src">[] = [
  { id: "info-geral", label: "Info geral" },
  { id: "bebidas-quentes", label: "Bebidas quentes" },
  { id: "bebidas-geladas", label: "Bebidas geladas" },
  { id: "cervejas-drinks", label: "Cervejas & drinks" },
  { id: "drinks-coqueteis", label: "Drinks & coquetéis" },
  { id: "licores-destilados", label: "Licores & destilados" },
  { id: "compartilhar-grelhados", label: "Compartilhar & grelhados" },
  { id: "carnes-sanduiches", label: "Carnes & sanduíches" },
  { id: "saladas-massas", label: "Saladas, massas & infantil" },
  { id: "veganos", label: "Veganos" },
  { id: "sobremesas", label: "Sobremesas" },
];

const EN_SECTIONS: Omit<CardapioSection, "src">[] = [
  { id: "general-information", label: "General information" },
  { id: "to-share-salads", label: "To share & salads" },
  { id: "main-courses", label: "Main courses" },
  { id: "drinks-beers", label: "Drinks & beers" },
  { id: "desserts", label: "Desserts" },
];

const PT_SOURCES = [
  ptPag01,
  ptPag02,
  ptPag03,
  ptPag04,
  ptPag05,
  ptPag06,
  ptPag07,
  ptPag08,
  ptPag09,
  ptPag10,
  ptPag11,
];

const EN_SOURCES = [enPag01, enPag02, enPag03, enPag04, enPag05];

function buildSections(
  meta: Omit<CardapioSection, "src">[],
  sources: string[],
): CardapioSection[] {
  return meta.map((entry, index) => ({
    ...entry,
    src: sources[index]!,
  }));
}

export const CARDAPIO_SECTIONS: Record<CardapioLang, CardapioSection[]> = {
  pt: buildSections(PT_SECTIONS, PT_SOURCES),
  en: buildSections(EN_SECTIONS, EN_SOURCES),
};

export const CARDAPIO_PAGES: Record<CardapioLang, string[]> = {
  pt: CARDAPIO_SECTIONS.pt.map((section) => section.src),
  en: CARDAPIO_SECTIONS.en.map((section) => section.src),
};

export const CARDAPIO_CAPAS = {
  pt: { src: capaPt, label: "Cardápio", lang: "pt" as const },
  en: { src: CARDAPIO_PAGES.en[0]!, label: "English Menu", lang: "en" as const },
} as const;

export function scrollToCardapioSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}
