import type { CSSProperties } from "react";

export type SectionFlourishTone = "default" | "happy-hour" | "cafe-da-tarde";

type SectionFlourishProps = {
  tone?: SectionFlourishTone;
  className?: string;
};

/**
 * Traço cursivo editorial entre seções — substitui hairline reta.
 * Compacto, centrado, sem ghost space.
 */
export function SectionFlourish({
  tone = "default",
  className = "",
}: SectionFlourishProps) {
  return (
    <div
      className={`section-flourish section-flourish--${tone}${className ? ` ${className}` : ""}`}
      aria-hidden
    >
      <svg
        className="section-flourish__svg"
        viewBox="0 0 720 48"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
      >
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        >
          {/* Traço principal — assinatura / flourish */}
          <path
            className="section-flourish__stroke section-flourish__stroke--main"
            strokeWidth="1.15"
            d="M 72 30 C 128 10 176 42 248 22 C 292 10 318 14 358 26 C 392 36 418 40 458 22 C 512 2 568 38 648 28"
          />
          {/* Eco mais leve */}
          <path
            className="section-flourish__stroke section-flourish__stroke--echo"
            strokeWidth="0.75"
            d="M 108 34 C 168 48 220 18 290 32 C 340 42 380 18 430 30 C 490 44 540 20 600 32"
          />
          {/* Nó central — laço cursivo */}
          <path
            className="section-flourish__stroke section-flourish__stroke--knot"
            strokeWidth="1"
            d="M 340 24 C 352 12 368 12 380 24 C 368 36 352 36 340 24 M 348 24 C 356 18 364 18 372 24"
          />
          {/* Detalhe HH: crescente mínimo (via CSS show) */}
          <path
            className="section-flourish__stroke section-flourish__stroke--moon"
            strokeWidth="0.9"
            d="M 358 14 A 7 7 0 1 1 358 34 A 5 5 0 1 0 358 14"
          />
        </g>
      </svg>
    </div>
  );
}

/** Handoff leve que só renderiza o flourish (para SectionHandoff variant). */
export function SectionFlourishHandoff({
  tone = "default",
  className = "",
  style,
}: SectionFlourishProps & { style?: CSSProperties }) {
  return (
    <div
      className={`section-handoff section-handoff-flourish ${className}`.trim()}
      style={style}
      aria-hidden
    >
      <SectionFlourish tone={tone} />
    </div>
  );
}
