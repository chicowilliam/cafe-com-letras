import {
  EXPERIENCIAS_CATALOG,
  getExperienciasAtivasHoje,
} from "@/lib/experiencias";

export const HUB_TOTAL = EXPERIENCIAS_CATALOG.length;
export const PREMIUM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EDITORIAL_ASPECT = 5 / 6;
export const TRIPTYCH_HEIGHT = "clamp(480px, 56vh, 540px)";
export const INACTIVE_PANEL_FLEX = 22;
export const ACTIVE_PANEL_FLEX = 56;
export const DESKTOP_BP = "(min-width: 1024px)";
/** Debounce hover activation to avoid flicker crossing panel gaps. */
export const HUB_HOVER_ACTIVATE_MS = 64;
export const EXP_HUB_TRANSITION_MS = 850;

export function padHubIndex(value: number) {
  return String(value).padStart(2, "0");
}

function timeBandHour(timeBand: "tarde" | "entardecer" | "noite") {
  if (timeBand === "tarde") return 15;
  if (timeBand === "entardecer") return 17;
  return 19;
}

/** Índice inicial — prioriza experiências ativas hoje e proximidade do horário. */
export function getInitialActiveIndex(date = new Date()) {
  const activeToday = getExperienciasAtivasHoje(date);

  if (activeToday.length === 1) {
    return EXPERIENCIAS_CATALOG.findIndex((entry) => entry.id === activeToday[0].id);
  }

  if (activeToday.length > 1) {
    const hour = date.getHours();
    const pick = activeToday.reduce((best, entry) => {
      const dist = Math.abs(hour - timeBandHour(entry.timeBand));
      const bestDist = Math.abs(hour - timeBandHour(best.timeBand));
      return dist < bestDist ? entry : best;
    });
    return EXPERIENCIAS_CATALOG.findIndex((entry) => entry.id === pick.id);
  }

  return 0;
}
