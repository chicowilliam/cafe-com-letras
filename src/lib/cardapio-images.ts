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

export const CARDAPIO_PAGES = {
  pt: [
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
  ],
  en: [enPag01, enPag02, enPag03, enPag04, enPag05],
} as const;

// Capa PT dedicada; EN usa a primeira página até haver capa-en.
export const CARDAPIO_CAPAS = {
  pt: { src: capaPt, label: "Cardápio", lang: "pt" },
  en: { src: CARDAPIO_PAGES.en[0], label: "English Menu", lang: "en" },
} as const;

export type CardapioLang = keyof typeof CARDAPIO_PAGES;
