export const PALETTE_STORAGE_KEY = "cl-palette";

export type PaletteId =
  | "default"
  | "espresso-ambar"
  | "verde-livraria"
  | "vinho-jazz"
  | "cafe-papel"
  | "linho-branco"
  | "verde-bebe"
  | "areia-savassi"
  | "rose-pale"
  | "azul-sereno"
  | "lavanda";

export const LIGHT_PALETTE_IDS = [
  "cafe-papel",
  "linho-branco",
  "verde-bebe",
  "azul-sereno",
  "rose-pale",
  "areia-savassi",
  "lavanda",
] as const satisfies readonly Exclude<PaletteId, "default">[];

export const LIGHT_PALETTE_ID_SET = new Set<string>(LIGHT_PALETTE_IDS);

const ALL_PALETTE_IDS = new Set<string>(
  [
    "espresso-ambar",
    "verde-livraria",
    "vinho-jazz",
    ...LIGHT_PALETTE_IDS,
  ] as const,
);

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
  "--accent-foreground",
  "--accent-2",
  "--ink",
] as const;

export type PaletteDefinition = {
  id: Exclude<PaletteId, "default">;
  name: string;
  isLight: boolean;
  tokens: Record<(typeof OVERRIDE_KEYS)[number], string>;
};

export const PALETTES: PaletteDefinition[] = [
  {
    id: "espresso-ambar",
    name: "Espresso & Âmbar",
    isLight: false,
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
      "--accent-foreground": "#1c1714",
      "--accent-2": "#c5613f",
      "--ink": "#1c1714",
    },
  },
  {
    id: "verde-livraria",
    name: "Verde Livraria",
    isLight: false,
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
      "--accent-foreground": "#15160f",
      "--accent-2": "#8a9a5b",
      "--ink": "#15160f",
    },
  },
  {
    id: "vinho-jazz",
    name: "Vinho & Jazz",
    isLight: false,
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
      "--accent-foreground": "#17110f",
      "--accent-2": "#9b3b46",
      "--ink": "#17110f",
    },
  },
  {
    id: "cafe-papel",
    name: "Café Papel (claro)",
    isLight: true,
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
      "--accent-foreground": "#fbf0e8",
      "--accent-2": "#c8893f",
      "--ink": "#241c16",
    },
  },
  {
    id: "linho-branco",
    name: "Branco Linho",
    isLight: true,
    tokens: {
      "--background": "#faf8f3",
      "--surface": "#f0ede5",
      "--surface-elevated": "#e7e3d9",
      "--foreground": "#20201d",
      "--foreground-muted": "#5c5a52",
      "--muted": "#5c5a52",
      "--accent": "#b9632f",
      "--accent-hover": "#c8723c",
      "--accent-active": "#9f5226",
      "--accent-foreground": "#fdf6ee",
      "--accent-2": "#7a8a5b",
      "--ink": "#20201d",
    },
  },
  {
    id: "verde-bebe",
    name: "Verde Bebê",
    isLight: true,
    tokens: {
      "--background": "#dde9d4",
      "--surface": "#d2e0c7",
      "--surface-elevated": "#c6d6b9",
      "--foreground": "#1e261c",
      "--foreground-muted": "#4f594a",
      "--muted": "#4f594a",
      "--accent": "#4f7a46",
      "--accent-hover": "#5c8a52",
      "--accent-active": "#3f6437",
      "--accent-foreground": "#f3f7ef",
      "--accent-2": "#c08038",
      "--ink": "#1e261c",
    },
  },
  {
    id: "azul-sereno",
    name: "Azul Sereno",
    isLight: true,
    tokens: {
      "--background": "#d8e6ea",
      "--surface": "#cadde2",
      "--surface-elevated": "#bcd2d8",
      "--foreground": "#1d2528",
      "--foreground-muted": "#51595c",
      "--muted": "#51595c",
      "--accent": "#2f6f7e",
      "--accent-hover": "#387f8f",
      "--accent-active": "#265a66",
      "--accent-foreground": "#eef7f8",
      "--accent-2": "#c98a3f",
      "--ink": "#1d2528",
    },
  },
  {
    id: "rose-pale",
    name: "Rosé Pâle",
    isLight: true,
    tokens: {
      "--background": "#f3ddd6",
      "--surface": "#ecd0c8",
      "--surface-elevated": "#e2c2b8",
      "--foreground": "#2a201c",
      "--foreground-muted": "#61524b",
      "--muted": "#61524b",
      "--accent": "#a8484a",
      "--accent-hover": "#b85659",
      "--accent-active": "#8f3b3d",
      "--accent-foreground": "#fbeeec",
      "--accent-2": "#8a9a5b",
      "--ink": "#2a201c",
    },
  },
  {
    id: "areia-savassi",
    name: "Areia Savassi",
    isLight: true,
    tokens: {
      "--background": "#efddc0",
      "--surface": "#e6d1ad",
      "--surface-elevated": "#dbc499",
      "--foreground": "#2a2118",
      "--foreground-muted": "#5f5343",
      "--muted": "#5f5343",
      "--accent": "#b85c38",
      "--accent-hover": "#c76b46",
      "--accent-active": "#9f4d2e",
      "--accent-foreground": "#fbf0e8",
      "--accent-2": "#6f7d3e",
      "--ink": "#2a2118",
    },
  },
  {
    id: "lavanda",
    name: "Lavanda",
    isLight: true,
    tokens: {
      "--background": "#e6e2ee",
      "--surface": "#dcd6e7",
      "--surface-elevated": "#cfc8dd",
      "--foreground": "#232030",
      "--foreground-muted": "#565066",
      "--muted": "#565066",
      "--accent": "#6a5aa0",
      "--accent-hover": "#7868af",
      "--accent-active": "#574a86",
      "--accent-foreground": "#f2eff8",
      "--accent-2": "#c08038",
      "--ink": "#232030",
    },
  },
];

export const DARK_PALETTES = PALETTES.filter((palette) => !palette.isLight);
export const LIGHT_PALETTES = PALETTES.filter((palette) => palette.isLight);

function syncPaletteDataset(id: PaletteId) {
  const root = document.documentElement;
  if (LIGHT_PALETTE_ID_SET.has(id)) {
    root.dataset.palette = id;
    root.dataset.theme = "light";
  } else {
    delete root.dataset.palette;
    delete root.dataset.theme;
  }
}

export function resetPaletteOverrides() {
  const root = document.documentElement;
  for (const key of OVERRIDE_KEYS) {
    root.style.removeProperty(key);
  }
  syncPaletteDataset("default");
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

  syncPaletteDataset(id);

  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
}

export function readStoredPaletteId(): PaletteId {
  try {
    const stored = localStorage.getItem(PALETTE_STORAGE_KEY);
    if (stored && ALL_PALETTE_IDS.has(stored)) {
      return stored as Exclude<PaletteId, "default">;
    }
  } catch {
    /* ignore */
  }
  return "default";
}

/** Chamar antes do primeiro paint do React para evitar flash de tema. */
export function hydrateStoredPalette(): PaletteId {
  const id = readStoredPaletteId();
  if (id !== "default") {
    applyPalette(id);
  } else {
    syncPaletteDataset("default");
  }
  return id;
}

export function getPaletteById(id: PaletteId) {
  if (id === "default") return null;
  return PALETTES.find((entry) => entry.id === id) ?? null;
}
