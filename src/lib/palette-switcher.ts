export const PALETTE_STORAGE_KEY = "cl-palette";

export type PaletteId =
  | "default"
  | "espresso-ambar"
  | "verde-livraria"
  | "vinho-jazz"
  | "cafe-papel"
  | "linho-branco"
  | "nevoa-cinza"
  | "verde-bebe"
  | "areia-savassi"
  | "rose-pale"
  | "azul-sereno";

export const LIGHT_PALETTE_IDS = [
  "cafe-papel",
  "linho-branco",
  "nevoa-cinza",
  "verde-bebe",
  "areia-savassi",
  "rose-pale",
  "azul-sereno",
] as const satisfies readonly Exclude<PaletteId, "default">[];

const LIGHT_PALETTE_ID_SET = new Set<string>(LIGHT_PALETTE_IDS);

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
  {
    id: "linho-branco",
    name: "Linho Branco",
    tokens: {
      "--background": "#fbfaf7",
      "--surface": "#f2f0ea",
      "--surface-elevated": "#eae7df",
      "--foreground": "#20201d",
      "--foreground-muted": "#5c5a52",
      "--muted": "#5c5a52",
      "--accent": "#c0763f",
      "--accent-hover": "#ad6935",
      "--accent-active": "#965a2e",
      "--accent-2": "#7a8a5b",
      "--ink": "#20201d",
    },
  },
  {
    id: "nevoa-cinza",
    name: "Névoa Cinza",
    tokens: {
      "--background": "#ecedea",
      "--surface": "#e2e3df",
      "--surface-elevated": "#d7d8d3",
      "--foreground": "#232422",
      "--foreground-muted": "#585a55",
      "--muted": "#585a55",
      "--accent": "#a8763f",
      "--accent-hover": "#b9854b",
      "--accent-active": "#926534",
      "--accent-2": "#6f7d6a",
      "--ink": "#232422",
    },
  },
  {
    id: "verde-bebe",
    name: "Verde Bebê",
    tokens: {
      "--background": "#e9efe6",
      "--surface": "#dfe7db",
      "--surface-elevated": "#d4ddcf",
      "--foreground": "#1f261d",
      "--foreground-muted": "#51594c",
      "--muted": "#51594c",
      "--accent": "#b0653c",
      "--accent-hover": "#c07548",
      "--accent-active": "#965231",
      "--accent-2": "#6f8f5a",
      "--ink": "#1f261d",
    },
  },
  {
    id: "areia-savassi",
    name: "Areia Savassi",
    tokens: {
      "--background": "#f1e7d6",
      "--surface": "#e8dcc7",
      "--surface-elevated": "#ded0b8",
      "--foreground": "#2a2118",
      "--foreground-muted": "#5f5343",
      "--muted": "#5f5343",
      "--accent": "#b85c38",
      "--accent-hover": "#c76b46",
      "--accent-active": "#9f4d2e",
      "--accent-2": "#c8893f",
      "--ink": "#2a2118",
    },
  },
  {
    id: "rose-pale",
    name: "Rosé Pâle",
    tokens: {
      "--background": "#f4e9e4",
      "--surface": "#ece0da",
      "--surface-elevated": "#e2d3cb",
      "--foreground": "#2a201c",
      "--foreground-muted": "#61524b",
      "--muted": "#61524b",
      "--accent": "#a8554a",
      "--accent-hover": "#b8645a",
      "--accent-active": "#8f463d",
      "--accent-2": "#8a9a5b",
      "--ink": "#2a201c",
    },
  },
  {
    id: "azul-sereno",
    name: "Azul Sereno",
    tokens: {
      "--background": "#e7eced",
      "--surface": "#dde4e6",
      "--surface-elevated": "#d2dadc",
      "--foreground": "#1e2426",
      "--foreground-muted": "#545a5b",
      "--muted": "#545a5b",
      "--accent": "#b07a3c",
      "--accent-hover": "#c08a4a",
      "--accent-active": "#976632",
      "--accent-2": "#5f7d86",
      "--ink": "#1e2426",
    },
  },
];

function syncPaletteDataset(id: PaletteId) {
  const root = document.documentElement;
  if (LIGHT_PALETTE_ID_SET.has(id)) {
    root.dataset.palette = id;
    root.dataset.paletteLight = "";
  } else {
    delete root.dataset.palette;
    delete root.dataset.paletteLight;
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
