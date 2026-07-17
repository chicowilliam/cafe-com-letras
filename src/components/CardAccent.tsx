import type { CSSProperties } from "react";

/**
 * Ornamentos de canto — mesma família visual do BackgroundPattern
 * (stem / leaf / vein). Impressos SOBRE o fundo sólido do card (ex-líbris).
 */
export type CardAccentVariant = "sprig-a" | "sprig-b" | "sprig-c";

export type CardAccentTone = "dark" | "light";

type CardAccentProps = {
  variant?: CardAccentVariant;
  tone?: CardAccentTone;
  /** Força canto; senão cada variante tem um canto canônico */
  corner?: "tr" | "tl" | "br" | "bl";
  className?: string;
  style?: CSSProperties;
};

const VARIANT_CORNER: Record<CardAccentVariant, NonNullable<CardAccentProps["corner"]>> = {
  "sprig-a": "tr",
  "sprig-b": "bl",
  "sprig-c": "br",
};

const ACCENT_VARIANTS: readonly CardAccentVariant[] = ["sprig-a", "sprig-b", "sprig-c"];

let accentSequence = 0;

/** Alterna 2–3 variantes entre cards sem configuração por seção. */
export function nextCardAccentVariant(): CardAccentVariant {
  const variant = ACCENT_VARIANTS[accentSequence % ACCENT_VARIANTS.length];
  accentSequence += 1;
  return variant;
}

export function cardAccentVariantFromIndex(index: number): CardAccentVariant {
  return ACCENT_VARIANTS[((index % ACCENT_VARIANTS.length) + ACCENT_VARIANTS.length) % ACCENT_VARIANTS.length];
}

/** Sprig A — canto superior direito */
function SprigAMotif() {
  return (
    <g>
      <path
        className="card-accent__stem"
        d="M 28 148 C 48 118 58 86 78 52 C 92 30 112 16 138 8"
      />
      <path
        className="card-accent__leaf"
        d="M 78 52 C 42 48 22 28 28 4 C 62 8 86 28 96 56 C 88 52 82 50 74 46"
      />
      <path
        className="card-accent__leaf"
        d="M 108 28 C 92 6 102 -8 128 -14 C 144 6 138 28 116 40 C 114 30 112 22 108 14"
      />
      <path
        className="card-accent__vein"
        d="M 32 8 C 48 22 62 36 84 48 M 128 -10 C 132 4 128 18 118 30"
      />
    </g>
  );
}

/** Sprig B — canto inferior esquerdo */
function SprigBMotif() {
  return (
    <g>
      <path
        className="card-accent__stem"
        d="M 132 12 C 108 36 92 64 74 98 C 60 122 40 140 12 152"
      />
      <path
        className="card-accent__leaf card-accent__leaf--olive"
        d="M 74 98 C 40 86 18 96 8 122 C 36 138 64 132 84 110 C 78 108 72 104 66 100"
      />
      <path
        className="card-accent__leaf card-accent__leaf--olive"
        d="M 48 132 C 22 118 4 126 0 150 C 24 162 48 154 62 138 C 56 136 52 134 46 130"
      />
      <path
        className="card-accent__vein"
        d="M 12 124 C 28 118 48 112 72 104 M 4 148 C 18 146 34 142 50 136"
      />
    </g>
  );
}

/** Sprig C — canto inferior direito */
function SprigCMotif() {
  return (
    <g>
      <path
        className="card-accent__stem"
        d="M 18 18 C 42 40 58 68 72 104 C 82 126 98 142 128 152"
      />
      <path
        className="card-accent__leaf"
        d="M 72 104 C 102 88 128 96 142 122 C 116 144 86 142 68 120 C 74 116 80 110 88 106"
      />
      <path
        className="card-accent__leaf"
        d="M 98 138 C 122 128 144 138 150 158 C 126 168 104 160 94 146 C 98 144 102 140 106 138"
      />
      <path
        className="card-accent__vein"
        d="M 138 124 C 122 118 100 112 78 110 M 146 156 C 132 152 116 148 102 144"
      />
    </g>
  );
}

function Motif({ variant }: { variant: CardAccentVariant }) {
  if (variant === "sprig-b") return <SprigBMotif />;
  if (variant === "sprig-c") return <SprigCMotif />;
  return <SprigAMotif />;
}

export function CardAccent({
  variant = "sprig-a",
  tone = "dark",
  corner,
  className = "",
  style,
}: CardAccentProps) {
  const resolvedCorner = corner ?? VARIANT_CORNER[variant];

  return (
    <span
      className={`card-accent card-accent--${tone} card-accent--${resolvedCorner}${className ? ` ${className}` : ""}`}
      style={style}
      data-card-accent={variant}
      aria-hidden
    >
      <svg
        className="card-accent__svg"
        viewBox="0 0 160 160"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <Motif variant={variant} />
      </svg>
    </span>
  );
}
