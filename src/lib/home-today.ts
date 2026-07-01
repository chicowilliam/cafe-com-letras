import {
  getExperienciasAtivasHoje,
  type ExperienciaCatalogEntry,
} from "@/lib/experiencias";
import {
  formatTodayRibbonDate,
  getProgramacaoForDay,
  type ProgramacaoEvento,
} from "@/lib/programacao";

export type HomeTodayExperienciaItem = {
  kind: "experiencia";
  entry: ExperienciaCatalogEntry;
};

export type HomeTodayEventItem = {
  kind: "event";
  event: ProgramacaoEvento;
};

export type HomeTodayItem = HomeTodayExperienciaItem | HomeTodayEventItem;

const MAX_ITEMS = 3;
const RECURRING_EXPERIENCIA_CATEGORIES = new Set(["happy-hour", "cafe-da-tarde"]);

export { formatTodayRibbonDate };

/** Lista compacta para a faixa “Hoje na casa” — experiências primeiro, depois agenda cultural. */
export function getHomeTodayItems(date = new Date()): HomeTodayItem[] {
  const experiencias: HomeTodayExperienciaItem[] = getExperienciasAtivasHoje(date).map(
    (entry) => ({ kind: "experiencia", entry }),
  );

  const remaining = MAX_ITEMS - experiencias.length;
  if (remaining <= 0) return experiencias.slice(0, MAX_ITEMS);

  const events: HomeTodayEventItem[] = getProgramacaoForDay(date)
    .filter((event) => !RECURRING_EXPERIENCIA_CATEGORIES.has(event.category))
    .slice(0, remaining)
    .map((event) => ({ kind: "event", event }));

  return [...experiencias, ...events];
}
