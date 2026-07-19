import { type CSSProperties } from "react";
import {
  BOTANICAL_PATHS,
  BOTANICAL_VIEWBOX,
  botanicalPathClassName,
  type BotanicalVariant,
} from "@/lib/botanicalPaths";

export type BackgroundPatternVariant = BotanicalVariant;

export interface BackgroundPatternProps {
  variant?: BackgroundPatternVariant;
  tone?: "dark" | "light";
  density?: "sparse" | "default" | "dense";
  className?: string;
}

const DENSITY_OPACITY = {
  sparse: 0.24,
  default: 0.38,
  dense: 0.52,
} as const;

export function PatternSvg({
  variant,
  className = "background-pattern__svg",
  /** Sem non-scaling-stroke: o traço escala com o SVG (visível dentro de seções) */
  scalingStroke = false,
}: {
  variant: BotanicalVariant;
  className?: string;
  scalingStroke?: boolean;
}) {
  const paths = BOTANICAL_PATHS[variant];

  return (
    <svg
      className={className}
      viewBox={BOTANICAL_VIEWBOX[variant]}
      preserveAspectRatio="xMidYMid slice"
      overflow="hidden"
      aria-hidden
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect={scalingStroke ? undefined : "non-scaling-stroke"}
      >
        {paths.map((path) => (
          <path
            key={`${path.role}-${path.d.slice(0, 24)}`}
            className={botanicalPathClassName(path.role)}
            d={path.d}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Folha botânica global da página.
 * Paths vêm exclusivamente de botanicalPaths.ts (mesma fonte do SurfacePattern).
 */
export function BackgroundPattern({
  variant = "branch",
  tone = "dark",
  density = "default",
  className = "",
}: BackgroundPatternProps) {
  const style = {
    "--bg-pattern-opacity": String(DENSITY_OPACITY[density]),
  } as CSSProperties;

  const classes = [
    "background-pattern",
    `background-pattern--${tone}`,
    `background-pattern--${variant}`,
    className || null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} aria-hidden>
      <PatternSvg variant={variant} />
      <div className="background-pattern__veil" />
    </div>
  );
}
