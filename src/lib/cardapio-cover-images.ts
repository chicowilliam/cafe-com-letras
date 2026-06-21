import capaEditorial from "@/assets/images/cardapio/hero/capa-editorial.webp";
import ambientePt from "@/assets/images/cardapio/hero/ambiente-pt.webp";
import ambienteEn from "@/assets/images/cardapio/hero/ambiente-en.webp";

export const CARDAPIO_HERO_IMAGES = {
  /** Foto editorial com overlay "Cardápio" — foco central do hero. */
  editorial: capaEditorial,
  /** Ambiente PT: salmão, vinho, faixa "PORTUGUÊS". */
  ambientePt,
  /** Ambiente EN: petiscos, cerveja, overlay "Menu ENGLISH". */
  ambienteEn,
} as const;

export type CardapioHeroImageKey = keyof typeof CARDAPIO_HERO_IMAGES;
