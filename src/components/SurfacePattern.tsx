import { PatternSvg, type BackgroundPatternVariant } from "@/components/BackgroundPattern";
import { usePatternSheet, type PatternSheetTone } from "@/hooks/usePatternSheet";

type SurfacePatternProps = {
  variant?: BackgroundPatternVariant;
  tone?: PatternSheetTone;
  className?: string;
};

/**
 * Gravura botânica impressa no painel sólido (rola com o conteúdo).
 * Mesmos paths de botanicalPaths.ts que o BackgroundPattern fixed nos vazios —
 * continuidade por família de traço, sem sync/parallax no scroll.
 */
export function SurfacePattern({
  variant,
  tone,
  className = "",
}: SurfacePatternProps) {
  const sheet = usePatternSheet();
  const resolvedVariant = variant ?? sheet.variant;
  const resolvedTone = tone ?? sheet.tone;

  return (
    <div
      className={`surface-pattern-layer surface-pattern-layer--${resolvedTone}${className ? ` ${className}` : ""}`}
      aria-hidden
    >
      <PatternSvg
        variant={resolvedVariant}
        className="surface-pattern-layer__svg"
      />
    </div>
  );
}
