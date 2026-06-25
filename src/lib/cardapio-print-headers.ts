/**
 * Recortes decorativos do topo das folhas PNG (legado).
 * Não usados no modo Cardápio (print) — títulos são tipografia CSS.
 * Mantidos para possível uso futuro ou modo Scan.
 */
import h01 from "@/assets/images/cardapio/print-headers/pt/01_info_geral.webp";
import h02 from "@/assets/images/cardapio/print-headers/pt/02_bebidas_quentes.webp";
import h03 from "@/assets/images/cardapio/print-headers/pt/03_bebidas_geladas.webp";
import h04 from "@/assets/images/cardapio/print-headers/pt/04_cervejas_drinks.webp";
import h05 from "@/assets/images/cardapio/print-headers/pt/05_drinks_coqueteis_2.webp";
import h06 from "@/assets/images/cardapio/print-headers/pt/06_licores_destilados.webp";
import h07 from "@/assets/images/cardapio/print-headers/pt/07_compartilhar_grelhados.webp";
import h08 from "@/assets/images/cardapio/print-headers/pt/08_carnes_sanduiches.webp";
import h09 from "@/assets/images/cardapio/print-headers/pt/09_saladas_massas_infantil.webp";
import h10 from "@/assets/images/cardapio/print-headers/pt/10_veganos.webp";
import h11 from "@/assets/images/cardapio/print-headers/pt/11_sobremesas.webp";

export const CARDAPIO_PRINT_HEADERS_PT: Record<string, string> = {
  "info-geral": h01,
  "bebidas-quentes": h02,
  "bebidas-geladas": h03,
  "cervejas-drinks": h04,
  "drinks-coqueteis": h05,
  "licores-destilados": h06,
  "compartilhar-grelhados": h07,
  "carnes-sanduiches": h08,
  "saladas-massas": h09,
  veganos: h10,
  sobremesas: h11,
};

export function getPrintHeaderArt(sectionId: string, lang: "pt" | "en") {
  if (sectionId === "info-geral" || sectionId === "general-information") {
    return undefined;
  }
  if (lang === "pt") return CARDAPIO_PRINT_HEADERS_PT[sectionId];
  return undefined;
}
