import { useEffect, useRef, type CSSProperties } from "react";

export type BackgroundPatternVariant =
  | "constellation"
  | "vines"
  | "soft"
  | "divider";

/** Curvas divisórias — mesma família, ritmo diferente. */
export type DividerCurveId = "arch" | "valley" | "swell" | "glide";

type BackgroundPatternProps = {
  /** 0–1 visual strength. Default: 0.55 for root, higher for dividers. */
  opacity?: number;
  /** Stroke color — defaults to accent gold. */
  color?: string;
  variant?: BackgroundPatternVariant;
  /** fixed = viewport layer; absolute = parent-bounded; static = flow (handoffs). */
  mode?: "fixed" | "absolute" | "static";
  /** Subtle scroll parallax (ignored when prefers-reduced-motion). */
  parallax?: boolean;
  /** Preset curve for `variant="divider"`. Ignored if `path` is set. */
  curve?: DividerCurveId;
  /** Custom SVG path `d` (ex.: export Haikei) — viewBox 0 0 1440 48. */
  path?: string;
  /**
   * Alinha o crop do SVG em colunas estreitas (trilhos).
   * left/right favorecem o cipó correspondente; center = padrão.
   */
  focus?: "left" | "right" | "center";
  /** Espessura do traço — `strong` ~1.6–1.8× (fundos claros). */
  weight?: "regular" | "strong";
  className?: string;
};

/**
 * Curvas amplas (1–2 cubic beziers). viewBox 1440×48.
 * Amplitude ~12–16 unidades — proporcional, não “nervosa”.
 */
export const DIVIDER_CURVES: Record<DividerCurveId, string> = {
  // Arco suave: sobe no terço esquerdo, desce no direito
  arch: "M 0 30 C 360 12 720 12 1080 30 C 1260 39 1380 36 1440 30",
  // Vale espelhado
  valley: "M 0 24 C 360 42 720 42 1080 24 C 1260 15 1380 18 1440 24",
  // Uma onda ampla (S suave)
  swell: "M 0 28 C 480 10 960 46 1440 28",
  // Quase plana com leve respiração
  glide: "M 0 26 C 400 18 800 34 1200 26 C 1320 23 1400 24 1440 26",
};

function ConstellationMotif({
  color,
  weight = "regular",
}: {
  color: string;
  weight?: "regular" | "strong";
}) {
  const w = weight === "strong" ? 1.7 : 1;
  return (
    <>
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path
          strokeWidth={1.1 * w}
          d="M 40 80 C 120 40 200 120 280 90 C 360 60 420 140 500 110 C 580 80 640 160 720 130 C 800 100 860 180 940 150"
        />
        <path
          strokeWidth={1 * w}
          d="M 60 320 C 140 280 220 360 300 330 C 380 300 460 380 540 350 C 620 320 700 400 780 370 C 860 340 920 420 980 390"
        />
        <path
          strokeWidth={1 * w}
          d="M 20 560 C 100 520 180 600 260 570 C 340 540 420 620 500 590 C 580 560 660 640 740 610 C 820 580 900 660 980 630"
        />
        <path
          strokeWidth={0.9 * w}
          d="M 80 200 C 160 240 240 180 320 220 C 400 260 480 200 560 240 C 640 280 720 220 800 260"
        />
        <path
          strokeWidth={0.9 * w}
          d="M 100 440 C 180 400 260 480 340 450 C 420 420 500 500 580 470 C 660 440 740 520 820 490"
        />
      </g>
      <g fill={color}>
        <circle cx="120" cy="70" r={2.2 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="280" cy="95" r={1.6 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="460" cy="125" r={2 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="640" cy="145" r={1.5 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="820" cy="120" r={2.1 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="180" cy="310" r={1.8 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="360" cy="340" r={2.2 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="540" cy="355" r={1.5 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="720" cy="380" r={2 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="900" cy="365" r={1.7 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="140" cy="545" r={1.9 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="320" cy="575" r={2.1 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="500" cy="595" r={1.6 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="680" cy="620" r={2 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="860" cy="605" r={1.8 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="240" cy="210" r={1.4 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="480" cy="230" r={1.7 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="700" cy="250" r={1.5 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="260" cy="450" r={1.6 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="500" cy="480" r={1.9 * (weight === "strong" ? 1.15 : 1)} />
        <circle cx="760" cy="500" r={1.5 * (weight === "strong" ? 1.15 : 1)} />
      </g>
    </>
  );
}

function VinesMotif({ color }: { color: string }) {
  const accent2 = "var(--accent-2)";
  return (
    <g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Evita que o traço some/engrosse ao esticar o SVG em páginas altas
      vectorEffect="nonScalingStroke"
    >
      <path
        stroke={accent2}
        strokeWidth="1.2"
        d="M 48 40 C 90 120 70 220 110 320 C 145 410 100 510 130 610 C 155 690 120 790 150 890 C 175 980 140 1080 165 1180"
      />
      <path
        stroke={color}
        strokeWidth="1.2"
        d="M 952 20 C 910 110 930 210 890 310 C 855 400 900 500 870 600 C 845 690 880 780 850 880 C 825 970 860 1070 835 1170"
      />
      <path
        stroke={color}
        strokeWidth="1"
        d="M 880 180 L 896 168 M 880 180 L 892 190 M 870 520 L 886 508 M 870 520 L 882 530"
      />
      <path
        stroke={accent2}
        strokeWidth="1"
        d="M 130 280 L 116 268 M 130 280 L 118 288 M 150 720 L 136 708 M 150 720 L 138 728"
      />
      <ellipse
        cx="118"
        cy="400"
        rx="14"
        ry="7"
        stroke={accent2}
        strokeWidth="1"
        transform="rotate(-26 118 400)"
      />
      <ellipse
        cx="870"
        cy="640"
        rx="13"
        ry="6"
        stroke={color}
        strokeWidth="1"
        transform="rotate(18 870 640)"
      />
    </g>
  );
}

function SoftMotif({ color }: { color: string }) {
  return (
    <g fill={color}>
      {Array.from({ length: 28 }, (_, i) => {
        const x = 60 + ((i * 137) % 880);
        const y = 50 + ((i * 97) % 650);
        const r = 1.2 + (i % 3) * 0.45;
        return <circle key={i} cx={x} cy={y} r={r} opacity={0.55 + (i % 4) * 0.1} />;
      })}
      <g fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7">
        <path d="M 80 120 C 200 80 320 160 440 120" />
        <path d="M 520 400 C 640 360 760 440 880 400" />
        <path d="M 140 560 C 280 520 420 600 560 560" />
      </g>
    </g>
  );
}

function DividerMotif({
  color,
  curve = "swell",
  path,
}: {
  color: string;
  curve?: DividerCurveId;
  path?: string;
}) {
  const d = path?.trim() || DIVIDER_CURVES[curve];

  return (
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <path
        className="background-pattern__divider-stroke"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
        d={d}
      />
    </g>
  );
}

function PatternSvg({
  variant,
  color,
  curve,
  path,
  focus = "center",
  weight = "regular",
}: {
  variant: BackgroundPatternVariant;
  color: string;
  curve?: DividerCurveId;
  path?: string;
  focus?: "left" | "right" | "center";
  weight?: "regular" | "strong";
}) {
  if (variant === "divider") {
    return (
      <svg
        className="background-pattern__svg background-pattern__svg--divider"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <DividerMotif color={color} curve={curve} path={path} />
      </svg>
    );
  }

  const viewBox = variant === "vines" ? "0 0 1000 1200" : "0 0 1000 700";
  const preserveAspectRatio =
    focus === "left"
      ? "xMinYMid slice"
      : focus === "right"
        ? "xMaxYMid slice"
        : "xMidYMid slice";

  return (
    <svg
      className="background-pattern__svg"
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      {variant === "constellation" ? (
        <ConstellationMotif color={color} weight={weight} />
      ) : null}
      {variant === "vines" ? <VinesMotif color={color} /> : null}
      {variant === "soft" ? <SoftMotif color={color} /> : null}
    </svg>
  );
}

/**
 * Camada decorativa de fundo (constelação / cipó / soft).
 * Fica atrás do conteúdo; use no AppShell ou em handoffs.
 */
export function BackgroundPattern({
  opacity = 0.55,
  color = "var(--accent)",
  variant = "constellation",
  mode = "fixed",
  parallax = false,
  curve = "swell",
  path,
  focus = "center",
  weight = "regular",
  className = "",
}: BackgroundPatternProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || mode === "static") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    if (reduce.matches || compact.matches) return;

    const node = layerRef.current;
    if (!node) return;

    let frame = 0;
    let latest = window.scrollY;

    const paint = () => {
      frame = 0;
      // Movimento mínimo — reforça profundidade sem custo de layout.
      const y = Math.max(-34, Math.min(34, latest * -0.035));
      node.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const onScroll = () => {
      latest = window.scrollY;
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [parallax, mode]);

  const style = {
    "--bg-pattern-opacity": String(opacity),
    "--bg-pattern-color": color,
  } as CSSProperties;

  return (
    <div
      ref={layerRef}
      className={`background-pattern background-pattern--${mode} background-pattern--${variant}${focus !== "center" ? ` background-pattern--focus-${focus}` : ""}${className ? ` ${className}` : ""}`}
      style={style}
      aria-hidden
    >
      <PatternSvg
        variant={variant}
        color={color}
        curve={curve}
        path={path}
        focus={focus}
        weight={weight}
      />
      {variant === "divider" ? null : <div className="background-pattern__veil" />}
    </div>
  );
}
