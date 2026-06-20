import ptPag01 from "@/assets/images/cardapio/pt/01.png";
import ptPag02 from "@/assets/images/cardapio/pt/02.png";
import ptPag03 from "@/assets/images/cardapio/pt/03.png";
import ptPag04 from "@/assets/images/cardapio/pt/04.png";
import ptPag05 from "@/assets/images/cardapio/pt/05.png";

import enPag01 from "@/assets/images/cardapio/en/01.png";
import enPag02 from "@/assets/images/cardapio/en/02.png";
import enPag03 from "@/assets/images/cardapio/en/03.png";
import enPag04 from "@/assets/images/cardapio/en/04.png";
import enPag05 from "@/assets/images/cardapio/en/05.png";

export const CARDAPIO_PAGES = {
  pt: [ptPag01, ptPag02, ptPag03, ptPag04, ptPag05],
  en: [enPag01, enPag02, enPag03, enPag04, enPag05],
} as const;

// Sem arquivos de capa dedicados: usa a primeira página de cada menu como capa.
export const CARDAPIO_CAPAS = {
  pt: { src: CARDAPIO_PAGES.pt[0], label: "Cardápio", lang: "pt" },
  en: { src: CARDAPIO_PAGES.en[0], label: "English Menu", lang: "en" },
} as const;

export type CardapioLang = keyof typeof CARDAPIO_PAGES;
