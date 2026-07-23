import { useMemo } from "react";
import type { CSSProperties } from "react";
import { blueMoonSheetDataUri } from "@/lib/blueMoonSheetUri";

type HappyHourSurfacePatternProps = {
  className?: string;
};

/**
 * Gravura Blue Moon contínua (tile vertical) — rola com .hh-flow.
 * Fora do fluxo; não usa botanicalPaths / SurfacePattern da home.
 */
export function HappyHourSurfacePattern({
  className = "",
}: HappyHourSurfacePatternProps) {
  const style = useMemo(
    () =>
      ({
        "--hh-pattern-sheet": blueMoonSheetDataUri(),
      }) as CSSProperties,
    [],
  );

  return (
    <div
      className={`hh-surface-pattern${className ? ` ${className}` : ""}`}
      style={style}
      aria-hidden
    />
  );
}
