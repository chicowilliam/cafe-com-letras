export const PALETTE_STORAGE_KEY = "cl-palette";

export type PaletteId =
  | "default"
  | "espresso-ambar"
  | "verde-livraria"
  | "vinho-jazz"
  | "cafe-papel";

const OVERRIDE_KEYS = [
  "--background",
  "--surface",
  "--surface-elevated",
  "--foreground",
  "--foreground-muted",
  "--muted",
  "--accent",
  "--accent-hover",
  "--accent-active",
  "--accent-2",
  "--ink",
] as const;

export type PaletteDefinition = {
  id: Exclude<PaletteId, "default">;
  name: string;
  tokens: Record<(typeof OVERRIDE_KEYS)[number], string>;
};

export const PALETTES: PaletteDefinition[] = [
  {
    id: "espresso-ambar",
    name: "Espresso & Âmbar",
    tokens: {
      "--background": "#1c1714",
      "--surface": "#251e19",
      "--surface-elevated": "#2f2620",
      "--foreground": "#f4ede1",
      "--foreground-muted": "#bcae9c",
      "--muted": "#bcae9c",
      "--accent": "#e3a857",
      "--accent-hover": "#edb86c",
      "--accent-active": "#cf9647",
      "--accent-2": "#c5613f",
      "--ink": "#1c1714",
    },
  },
  {
    id: "verde-livraria",
    name: "Verde Livraria",
    tokens: {
      "--background": "#15160f",
      "--surface": "#1e1f16",
      "--surface-elevated": "#26271c",
      "--foreground": "#f2efe2",
      "--foreground-muted": "#b3b09c",
      "--muted": "#b3b09c",
      "--accent": "#d4a373",
      "--accent-hover": "#e0b88a",
      "--accent-active": "#c49362",
      "--accent-2": "#8a9a5b",
      "--ink": "#15160f",
    },
  },
  {
    id: "vinho-jazz",
    name: "Vinho & Jazz",
    tokens: {
      "--background": "#17110f",
      "--surface": "#211815",
      "--surface-elevated": "#2a1f1b",
      "--foreground": "#f5efe6",
      "--foreground-muted": "#bdab9c",
      "--muted": "#bdab9c",
      "--accent": "#d8a766",
      "--accent-hover": "#e6b878",
      "--accent-active": "#c4974f",
      "--accent-2": "#9b3b46",
      "--ink": "#17110f",
    },
  },
  {
    id: "cafe-papel",
    name: "Café Papel (claro)",
    tokens: {
      "--background": "#f4ecdd",
      "--surface": "#ece2cf",
      "--surface-elevated": "#e3d7c0",
      "--foreground": "#241c16",
      "--foreground-muted": "#5a4d40",
      "--muted": "#5a4d40",
      "--accent": "#b85c38",
      "--accent-hover": "#a64f2f",
      "--accent-active": "#8f4327",
      "--accent-2": "#c8893f",
      "--ink": "#241c16",
    },
  },
];

export function resetPaletteOverrides() {
  const root = document.documentElement;
  for (const key of OVERRIDE_KEYS) {
    root.style.removeProperty(key);
  }
}

export function applyPalette(id: PaletteId) {
  if (id === "default") {
    resetPaletteOverrides();
    try {
      localStorage.removeItem(PALETTE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return;
  }

  const palette = PALETTES.find((entry) => entry.id === id);
  if (!palette) return;

  const root = document.documentElement;
  for (const [key, value] of Object.entries(palette.tokens)) {
    root.style.setProperty(key, value);
  }

  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
}

export function readStoredPaletteId(): PaletteId {
  try {
    const stored = localStorage.getItem(PALETTE_STORAGE_KEY);
    if (
      stored === "espresso-ambar" ||
      stored === "verde-livraria" ||
      stored === "vinho-jazz" ||
      stored === "cafe-papel"
    ) {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return "default";
}

/** Chamar antes do primeiro paint do React para evitar flash de tema. */
export function hydrateStoredPalette(): PaletteId {
  const id = readStoredPaletteId();
  if (id !== "default") applyPalette(id);
  return id;
}

export function getPaletteById(id: PaletteId) {
  if (id === "default") return null;
  return PALETTES.find((entry) => entry.id === id) ?? null;
}
