import {
  getExperienciasAtivasHoje,
  type ExperienciaCatalogEntry,
} from "@/lib/experiencias";
import {
  formatTodayRibbonDate,
  getProgramacaoForDay,
  type ProgramacaoEvento,
} from "@/lib/programacao";
import { getTemporadaAtiva, type Temporada } from "@/lib/temporadas";

export type HomeTodayExperienciaItem = {
  kind: "experiencia";
  entry: ExperienciaCatalogEntry;
};

export type HomeTodayEventItem = {
  kind: "event";
  event: ProgramacaoEvento;
};

export type HomeTodayTemporadaItem = {
  kind: "temporada";
  temporada: Temporada;
};

export type HomeTodayItem =
  | HomeTodayExperienciaItem
  | HomeTodayEventItem
  | HomeTodayTemporadaItem;

const MAX_ITEMS = 3;
const RECURRING_EXPERIENCIA_CATEGORIES = new Set(["happy-hour", "cafe-da-tarde"]);

export { formatTodayRibbonDate };

/**
 * Lista compacta para a faixa “Hoje na casa”.
 * Temporada ativa entra primeiro (destaque vivo); depois experiências; depois agenda.
 */
export function getHomeTodayItems(date = new Date()): HomeTodayItem[] {
  const items: HomeTodayItem[] = [];

  const temporada = getTemporadaAtiva(date);
  if (temporada) {
    items.push({ kind: "temporada", temporada });
  }

  const experiencias: HomeTodayExperienciaItem[] = getExperienciasAtivasHoje(date).map(
    (entry) => ({ kind: "experiencia", entry }),
  );
  items.push(...experiencias);

  if (items.length >= MAX_ITEMS) return items.slice(0, MAX_ITEMS);

  const remaining = MAX_ITEMS - items.length;
  const events: HomeTodayEventItem[] = getProgramacaoForDay(date)
    .filter((event) => !RECURRING_EXPERIENCIA_CATEGORIES.has(event.category))
    .slice(0, remaining)
    .map((event) => ({ kind: "event", event }));

  return [...items, ...events].slice(0, MAX_ITEMS);
}
