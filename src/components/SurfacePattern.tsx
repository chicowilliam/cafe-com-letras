import { useLayoutEffect, useRef } from "react";
import { PatternSvg, type BackgroundPatternVariant } from "@/components/BackgroundPattern";
import { usePatternSheet, type PatternSheetTone } from "@/hooks/usePatternSheet";
import { subscribeSurfacePatternSync } from "@/lib/surface-pattern-sync";

type SurfacePatternProps = {
  variant?: BackgroundPatternVariant;
  tone?: PatternSheetTone;
  className?: string;
};

/**
 * Janela da mesma folha botânica do BackgroundPattern fixed.
 * O SVG cobre o viewport e é deslocado por -getBoundingClientRect —
 * todos os painéis mostram o mesmo recorte contínuo (sem crop irregular por aspect ratio).
 */
export function SurfacePattern({
  variant,
  tone,
  className = "",
}: SurfacePatternProps) {
  const sheet = usePatternSheet();
  const resolvedVariant = variant ?? sheet.variant;
  const resolvedTone = tone ?? sheet.tone;
  const hostRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    const svgWrap = svgWrapRef.current;
    if (!host || !svgWrap) return;
    return subscribeSurfacePatternSync(host, svgWrap);
  }, []);

  return (
    <div
      ref={hostRef}
      className={`surface-pattern-layer surface-pattern-layer--${resolvedTone}${className ? ` ${className}` : ""}`}
      aria-hidden
    >
      <div ref={svgWrapRef} className="surface-pattern-layer__sheet">
        <PatternSvg
          variant={resolvedVariant}
          className="surface-pattern-layer__svg"
        />
      </div>
    </div>
  );
}
