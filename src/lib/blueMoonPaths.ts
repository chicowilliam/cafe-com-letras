/**
 * Gravura Blue Moon para /happy-hour — laranja + lua crescente.
 * ViewBox compacto (como botanical) — evita ghost space / seções altíssimas.
 * NÃO reutiliza botanicalPaths.ts.
 */

export type BlueMoonPathRole = "orange" | "blue" | "quiet" | "segment";

export type BlueMoonPath = {
  d: string;
  role: BlueMoonPathRole;
};

/** Mesma proporção da folha botânica da home — painel, não página interminável. */
export const BLUE_MOON_VIEWBOX = "0 0 1000 760";

/**
 * Motivos esparsos nas laterais: fatias de laranja + crescentes.
 */
export const BLUE_MOON_PATHS: readonly BlueMoonPath[] = [
  /* ——— Esquerda: laranjas ——— */
  {
    role: "orange",
    d: "M 48 160 A 52 52 0 1 1 152 160 A 52 52 0 1 1 48 160",
  },
  {
    role: "quiet",
    d: "M 68 160 A 32 32 0 1 1 132 160 A 32 32 0 1 1 68 160",
  },
  {
    role: "segment",
    d: "M 100 108 L 100 212 M 58 132 L 142 188 M 58 188 L 142 132",
  },
  {
    role: "orange",
    d: "M 36 420 A 46 46 0 1 1 128 420 A 46 46 0 1 1 36 420",
  },
  {
    role: "quiet",
    d: "M 52 420 A 30 30 0 1 1 112 420 A 30 30 0 1 1 52 420",
  },
  {
    role: "segment",
    d: "M 82 374 L 82 466 M 46 396 L 118 444 M 46 444 L 118 396",
  },
  {
    role: "orange",
    d: "M 56 620 A 38 38 0 1 1 132 620 A 38 38 0 1 1 56 620",
  },
  {
    role: "quiet",
    d: "M 68 620 A 24 24 0 1 1 120 620 A 24 24 0 1 1 68 620",
  },
  {
    role: "segment",
    d: "M 94 582 L 94 658 M 66 600 L 122 640 M 66 640 L 122 600",
  },

  /* ——— Direita: luas ——— */
  {
    role: "blue",
    d: "M 880 140 A 44 44 0 1 1 880 228 A 32 32 0 1 0 880 140",
  },
  {
    role: "blue",
    d: "M 900 380 A 50 50 0 1 1 900 480 A 36 36 0 1 0 900 380",
  },
  {
    role: "blue",
    d: "M 870 600 A 40 40 0 1 1 870 680 A 28 28 0 1 0 870 600",
  },

  /* ——— Arcos quietos ——— */
  {
    role: "quiet",
    d: "M 170 280 C 210 330 220 400 180 460",
  },
  {
    role: "quiet",
    d: "M 820 260 C 780 320 770 400 810 470",
  },
  {
    role: "orange",
    d: "M 160 540 C 200 580 210 640 170 690",
  },
];

export function blueMoonPathClassName(role: BlueMoonPathRole): string {
  switch (role) {
    case "orange":
      return "hh-pattern__stroke hh-pattern__stroke--orange";
    case "blue":
      return "hh-pattern__stroke hh-pattern__stroke--blue";
    case "quiet":
      return "hh-pattern__stroke hh-pattern__stroke--quiet";
    case "segment":
      return "hh-pattern__stroke hh-pattern__stroke--segment";
  }
}
