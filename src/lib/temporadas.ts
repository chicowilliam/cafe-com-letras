/**
 * Temporadas gastronômicas (festivais por tempo limitado).
 * Camada separada de experiências (hub) e agenda cultural (programação).
 *
 * TODO: ajustar startsAt / endsAt para as datas reais do festival.
 */

import capaFestival from "@/assets/images/temporadas/festival-hamburguer/capa-festival.png";
import itemCaprese from "@/assets/images/temporadas/festival-hamburguer/item-caprese-vegano.png";
import itemFileCheddar from "@/assets/images/temporadas/festival-hamburguer/item-file-cheddar.png";
import itemMilkshakes from "@/assets/images/temporadas/festival-hamburguer/item-milkshakes.png";
import itemPresunto from "@/assets/images/temporadas/festival-hamburguer/item-presunto-cru.png";

export type TemporadaItem = {
  id: string;
  image: string;
  title: string;
  priceLabel: string;
  description: string;
  alt: string;
  /** Dimensões intrínsecas da arte (CLS) */
  width: number;
  height: number;
};

export type Temporada = {
  id: string;
  kicker: string;
  /** Nome completo (aria, faixa Hoje) */
  title: string;
  /** Título curto na seção Home — o cartaz já carrega o nome longo */
  headline?: string;
  /** Frase curta sob o título (período / tom) */
  periodLabel: string;
  /** TODO: datas reais do festival */
  startsAt: string;
  endsAt: string;
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  items: TemporadaItem[];
  /** Âncora do cardápio da temporada na home */
  detailHref: string;
};

/** TODO: trocar pelas datas oficiais quando forem confirmadas. */
const FESTIVAL_STARTS_AT = "2026-07-01T00:00:00-03:00";
const FESTIVAL_ENDS_AT = "2026-08-31T23:59:59-03:00";

export const TEMPORADA_FESTIVAL_HAMBURGUER: Temporada = {
  id: "festival-hamburguer",
  kicker: "Temporada",
  title: "Festival de hambúrguer, sanduíche e milkshake",
  headline: "Festival de sanduíches e milkshakes",
  periodLabel: "Por tempo limitado · Savassi",
  startsAt: FESTIVAL_STARTS_AT,
  endsAt: FESTIVAL_ENDS_AT,
  cover: {
    src: capaFestival,
    alt: "Cartaz do Festival de hambúrguer, sanduíche e milkshake do Café com Letras — por tempo limitado, 30 anos",
    width: 1080,
    height: 1350,
  },
  detailHref: "#temporada-festival-hamburguer-cardapio",
  items: [
{
      id: "file-cheddar",
      image: itemFileCheddar,
      title: "Sanduíche de filé com cheddar",
      priceLabel: "R$92",
      description:
        "150g de filé mignon com cebola roxa, cheddar cremoso e tomate confit na baguete",
      alt: "Sanduíche de filé com cheddar, R$92 — filé mignon, cebola roxa, cheddar e tomate confit na baguete",
      width: 1080,
      height: 1350,
    },
{
      id: "caprese-vegano",
      image: itemCaprese,
      title: "Sanduíche caprese vegano",
      priceLabel: "R$47",
      description:
        "Queijo de castanha de caju, rúcula, tomate sweet e pesto de manjericão na baguete",
      alt: "Sanduíche caprese vegano, R$47 — queijo de castanha, rúcula, tomate sweet e pesto na baguete",
      width: 1080,
      height: 1350,
    }
  ],
};

export const TEMPORADAS: readonly Temporada[] = [TEMPORADA_FESTIVAL_HAMBURGUER];

export function isTemporadaAtiva(temporada: Temporada, date = new Date()): boolean {
  const t = date.getTime();
  const start = new Date(temporada.startsAt).getTime();
  const end = new Date(temporada.endsAt).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return t >= start && t <= end;
}

export function getTemporadaAtiva(date = new Date()): Temporada | null {
  return TEMPORADAS.find((temporada) => isTemporadaAtiva(temporada, date)) ?? null;
}
