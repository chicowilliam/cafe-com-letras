import { type CSSProperties } from "react";

type HandoffTone = "background" | "surface";
export type DividerCurveId = "arch" | "valley" | "swell" | "glide";

export type SectionHandoffVariant =
  | "breath"
  | "wash"
  | "wave"
  | "chapter"
  | "accent-band";

type SectionHandoffProps = {
  variant: SectionHandoffVariant;
  from?: HandoffTone;
  to?: HandoffTone;
  /** Ex.: "04" — capítulo da seção seguinte */
  chapterIndex?: string;
  chapterLabel?: string;
  overlap?: "none" | "sm" | "md" | "lg";
  className?: string;
  /** Override da curva divisória (ou use `dividerPath` para SVG externo). */
  dividerCurve?: DividerCurveId;
  /** Path `d` custom (Haikei etc.), viewBox 0 0 1440 48. */
  dividerPath?: string;
};

const OVERLAP_CLASS = {
  none: "",
  sm: "section-overlap-sm",
  md: "section-overlap-md",
  lg: "section-overlap-lg",
} as const;

const FROM_CLASS: Record<HandoffTone, string> = {
  background: "section-handoff-from-background",
  surface: "section-handoff-from-surface",
};

const TO_CLASS: Record<HandoffTone, string> = {
  background: "section-handoff-to-background",
  surface: "section-handoff-to-surface",
};

/** Ritmo por tipo de handoff — mesma família, curvas distintas. */
const HANDOFF_CURVE: Record<SectionHandoffVariant, DividerCurveId> = {
  breath: "glide",
  wash: "swell",
  wave: "valley",
  chapter: "arch",
  "accent-band": "glide",
};

const DIVIDER_CURVES: Record<DividerCurveId, string> = {
  arch: "M 0 30 C 360 12 720 12 1080 30 C 1260 39 1380 36 1440 30",
  valley: "M 0 24 C 360 42 720 42 1080 24 C 1260 15 1380 18 1440 24",
  swell: "M 0 28 C 480 10 960 46 1440 28",
  glide: "M 0 26 C 400 18 800 34 1200 26 C 1320 23 1400 24 1440 26",
};

function toneClasses(from: HandoffTone, to: HandoffTone) {
  return `${FROM_CLASS[from]} ${TO_CLASS[to]}`;
}

function HandoffPattern({
  curve,
  path,
  boost = false,
}: {
  curve: DividerCurveId;
  path?: string;
  boost?: boolean;
}) {
  const d = path?.trim() || DIVIDER_CURVES[curve];
  const opacity = boost ? 0.42 : 0.32;

  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden
      className="section-handoff__pattern"
      style={{ "--section-handoff-pattern-opacity": String(opacity) } as CSSProperties}
    >
      <g fill="none" stroke="var(--accent)" strokeLinecap="round" strokeLinejoin="round">
        <path
          className="section-handoff__filet"
          strokeWidth="1.15"
          vectorEffect="non-scaling-stroke"
          d={d}
        />
        <path
          className="section-handoff__fleuron"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          d="M 650 24 C 676 10 704 10 720 24 C 736 38 764 38 790 24 M 704 24 C 712 16 728 16 736 24 M 704 24 C 712 32 728 32 736 24"
        />
      </g>
    </svg>
  );
}

export function SectionHandoff({
  variant,
  from = "background",
  to = "surface",
  chapterIndex,
  chapterLabel,
  overlap = "none",
  className = "",
  dividerCurve,
  dividerPath,
}: SectionHandoffProps) {
  const overlapClass = OVERLAP_CLASS[overlap];
  const base = `section-handoff ${toneClasses(from, to)} ${overlapClass} ${className}`.trim();
  const curve = dividerCurve ?? HANDOFF_CURVE[variant];

  if (variant === "breath") {
    return (
      <div aria-hidden className={`${base} section-handoff-breath`}>
        <HandoffPattern curve={curve} path={dividerPath} />
      </div>
    );
  }

  if (variant === "wash") {
    return (
      <div aria-hidden className={`${base} section-handoff-wash`}>
        <HandoffPattern curve={curve} path={dividerPath} boost />
      </div>
    );
  }

  if (variant === "accent-band") {
    return (
      <div aria-hidden className={`${base} section-handoff-accent-band`}>
        <HandoffPattern curve={curve} path={dividerPath} />
      </div>
    );
  }

  if (variant === "chapter" && chapterIndex) {
    return (
      <div aria-hidden className={`${base} section-handoff-chapter`}>
        <HandoffPattern curve={curve} path={dividerPath} boost />
        <span className="section-handoff-chapter-index">{chapterIndex}</span>
        {chapterLabel ? (
          <span className="section-handoff-chapter-label">{chapterLabel}</span>
        ) : null}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div aria-hidden className={`${base} section-handoff-wave`}>
        <HandoffPattern curve={curve} path={dividerPath} />
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden>
          <path
            className="section-handoff-wave-fill"
            d="M0,32 C360,52 720,12 1080,32 C1260,42 1380,40 1440,32 L1440,64 L0,64 Z"
          />
        </svg>
      </div>
    );
  }

  return null;
}

/** @deprecated Use SectionHandoff */
export function SectionBridge(props: {
  variant?: "gradient" | "gradient-organic" | "none";
  overlap?: "none" | "sm" | "md" | "lg";
  className?: string;
}) {
  if (props.variant === "none") return null;
  return (
    <SectionHandoff
      variant={props.variant === "gradient-organic" ? "wave" : "wash"}
      overlap={props.overlap}
      className={props.className}
    />
  );
}
