/**
 * Temporadas gastronômicas (festivais por tempo limitado).
 * Camada separada de experiências (hub) e agenda cultural (programação).
 *
 * TODO: ajustar startsAt / endsAt para as datas reais do festival.
 */

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
  title: string;
  headline?: string;
  periodLabel: string;
  startsAt: string;
  endsAt: string;
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  items: TemporadaItem[];
  detailHref: string;
};

export const TEMPORADAS: readonly Temporada[] = [];

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
