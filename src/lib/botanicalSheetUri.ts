/**
 * Data-URI da folha botânica para CSS background-repeat (home contínua).
 * Uma única origem de coordenadas ao longo de toda a altura do .home-shell —
 * sem sync JS / sem parallax.
 */

import {
  BOTANICAL_PATHS,
  BOTANICAL_VIEWBOX,
  type BotanicalPathRole,
  type BotanicalVariant,
} from "@/lib/botanicalPaths";

const STROKE: Record<
  BotanicalPathRole,
  { color: string; width: number; opacity: number }
> = {
  stem: { color: "#d4a373", width: 1.08, opacity: 0.72 },
  "stem-olive": { color: "#8a9a5b", width: 1.08, opacity: 0.62 },
  "stem-quiet": { color: "#c4b49a", width: 1.08, opacity: 0.42 },
  leaf: { color: "#d4a373", width: 0.92, opacity: 0.64 },
  "leaf-olive": { color: "#8a9a5b", width: 0.92, opacity: 0.58 },
  vein: { color: "#c4b49a", width: 0.58, opacity: 0.4 },
};

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** SVG empilhável em background-repeat: repeat-y (tile ~aspect do viewBox). */
export function botanicalSheetDataUri(variant: BotanicalVariant): string {
  const viewBox = BOTANICAL_VIEWBOX[variant];
  const paths = BOTANICAL_PATHS[variant]
    .map((path) => {
      const s = STROKE[path.role];
      return `<path fill="none" stroke="${s.color}" stroke-width="${s.width}" stroke-opacity="${s.opacity}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" d="${escapeAttr(path.d)}"/>`;
    })
    .join("");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">` +
    `<g fill="none">${paths}</g></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
