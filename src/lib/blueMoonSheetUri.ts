/**
 * Data-URI da gravura Blue Moon para CSS background-repeat no fluxo HH.
 * Mesma ideia do botanicalSheetUri — tile vertical contínuo, sem ghost space.
 */

import {
  BLUE_MOON_PATHS,
  BLUE_MOON_VIEWBOX,
  type BlueMoonPathRole,
} from "@/lib/blueMoonPaths";

const STROKE: Record<
  BlueMoonPathRole,
  { color: string; width: number; opacity: number }
> = {
  orange: { color: "#e8872e", width: 1.2, opacity: 0.78 },
  blue: { color: "#2d6cb5", width: 1.1, opacity: 0.72 },
  quiet: { color: "#a8b0bc", width: 0.9, opacity: 0.38 },
  segment: { color: "#e8872e", width: 0.75, opacity: 0.55 },
};

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** SVG empilhável em background-repeat: repeat-y. */
export function blueMoonSheetDataUri(): string {
  const paths = BLUE_MOON_PATHS.map((path) => {
    const s = STROKE[path.role];
    return `<path fill="none" stroke="${s.color}" stroke-width="${s.width}" stroke-opacity="${s.opacity}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" d="${escapeAttr(path.d)}"/>`;
  }).join("");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${BLUE_MOON_VIEWBOX}" preserveAspectRatio="xMidYMid meet">` +
    `<g fill="none">${paths}</g></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
