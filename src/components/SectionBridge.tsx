type HandoffTone = "background" | "surface";

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

function toneClasses(from: HandoffTone, to: HandoffTone) {
  return `${FROM_CLASS[from]} ${TO_CLASS[to]}`;
}

export function SectionHandoff({
  variant,
  from = "background",
  to = "surface",
  chapterIndex,
  chapterLabel,
  overlap = "none",
  className = "",
}: SectionHandoffProps) {
  const overlapClass = OVERLAP_CLASS[overlap];
  const base = `section-handoff ${toneClasses(from, to)} ${overlapClass} ${className}`.trim();

  if (variant === "breath") {
    return <div aria-hidden className={`${base} section-handoff-breath`} />;
  }

  if (variant === "wash") {
    return <div aria-hidden className={`${base} section-handoff-wash`} />;
  }

  if (variant === "accent-band") {
    return <div aria-hidden className={`${base} section-handoff-accent-band`} />;
  }

  if (variant === "chapter" && chapterIndex) {
    return (
      <div aria-hidden className={`${base} section-handoff-chapter`}>
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
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden>
          <path
            className="section-handoff-wave-fill"
            d="M0,28 C240,56 480,8 720,32 C960,56 1200,12 1440,36 L1440,64 L0,64 Z"
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
