import type { CardapioLang } from "@/lib/cardapio-images";
import type { CardapioCatalogItem, CardapioCatalogSection } from "@/lib/cardapio-catalog";
import itemBadgesEn from "@/data/cardapio/item-badges.en.json";
import itemBadgesPt from "@/data/cardapio/item-badges.pt.json";

export type CardapioChapterId = "inicio" | "beber" | "comer" | "fechar";

export type CardapioChapter = {
  id: CardapioChapterId;
  label: string;
  sectionIds: string[];
};

export type SectionTheme = "default" | "warm" | "night" | "info";
export type SectionOrnament = "dots" | "rule" | "space";

export type SectionItemGroupDef = {
  label: string;
  matchTags?: string[];
  fromId?: string;
  untilBeforeId?: string;
};

export type ItemBadge = {
  key: string;
  label: string;
  title: string;
};

const CHAPTERS_PT: CardapioChapter[] = [
  {
    id: "inicio",
    label: "Início",
    sectionIds: ["info-geral"],
  },
  {
    id: "beber",
    label: "Beber",
    sectionIds: [
      "bebidas-quentes",
      "bebidas-geladas",
      "cervejas-drinks",
      "drinks-coqueteis",
      "licores-destilados",
    ],
  },
  {
    id: "comer",
    label: "Comer",
    sectionIds: [
      "compartilhar-grelhados",
      "carnes-sanduiches",
      "saladas-massas",
      "veganos",
    ],
  },
  {
    id: "fechar",
    label: "Fechar",
    sectionIds: ["sobremesas"],
  },
];

const CHAPTERS_EN: CardapioChapter[] = [
  {
    id: "inicio",
    label: "Start",
    sectionIds: ["info-geral"],
  },
  {
    id: "beber",
    label: "Drink",
    sectionIds: [
      "bebidas-quentes",
      "bebidas-geladas",
      "cervejas-drinks",
      "drinks-coqueteis",
      "licores-destilados",
    ],
  },
  {
    id: "comer",
    label: "Eat",
    sectionIds: [
      "compartilhar-grelhados",
      "carnes-sanduiches",
      "saladas-massas",
      "veganos",
    ],
  },
  {
    id: "fechar",
    label: "Dessert",
    sectionIds: ["sobremesas"],
  },
];

export const CARDAPIO_CHAPTERS: Record<CardapioLang, CardapioChapter[]> = {
  pt: CHAPTERS_PT,
  en: CHAPTERS_EN,
};

const SECTION_THEMES: Record<string, SectionTheme> = {
  "info-geral": "info",
  "bebidas-quentes": "warm",
  "bebidas-geladas": "warm",
  "cervejas-drinks": "night",
  "drinks-coqueteis": "night",
  "licores-destilados": "night",
};

const SECTION_ORNAMENTS: Record<string, SectionOrnament> = {
  "info-geral": "rule",
  "bebidas-quentes": "dots",
  "compartilhar-grelhados": "rule",
  "drinks-coqueteis": "dots",
  "sobremesas": "dots",
  "desserts": "dots",
};

const SECTION_GROUPS_PT: Record<string, SectionItemGroupDef[]> = {
  "compartilhar-grelhados": [
    { label: "Para compartilhar", untilBeforeId: "bifinho-de-soja" },
    { label: "Grelhados", fromId: "bifinho-de-soja" },
  ],
  "saladas-massas": [
    { label: "Massas e risotos", untilBeforeId: "salada-de-pera-e-gorgonzola" },
    { label: "Saladas", matchTags: ["salada"] },
    { label: "Infantil", matchTags: ["infantil"] },
    { label: "Massas simples", fromId: "fettuccine-ao-pomodoro" },
  ],
};

const SECTION_GROUPS_EN: Record<string, SectionItemGroupDef[]> = {
  "compartilhar-grelhados": [
    { label: "To share", untilBeforeId: "bifinho-de-soja" },
    { label: "From the grill", fromId: "bifinho-de-soja" },
  ],
  "saladas-massas": [
    { label: "Pasta & risotto", untilBeforeId: "salada-de-pera-e-gorgonzola" },
    { label: "Salads", matchTags: ["salad"] },
    { label: "Kids", matchTags: ["kids"] },
    { label: "Simple pasta", fromId: "fettuccine-ao-pomodoro" },
  ],
};

const BADGE_TAGS: ItemBadge[] = [
  { key: "destaque", label: "★", title: "Destaque da casa" },
  { key: "vegetariano", label: "V", title: "Vegetariano" },
  { key: "vegano", label: "VG", title: "Vegano" },
  { key: "cafe", label: "C", title: "Café autoral" },
];

const BADGE_TITLES_EN: Record<string, string> = {
  destaque: "House favorite",
  vegetariano: "Vegetarian",
  vegano: "Vegan",
  cafe: "Signature coffee",
};

const SEARCH_PLACEHOLDERS_PT = [
  "Buscar pão de queijo…",
  "Buscar cappuccino…",
  "Buscar bruschetta…",
  "Buscar tiramisù…",
  "Buscar vegano…",
  "Buscar jazz na quarta…",
];

const SEARCH_PLACEHOLDERS_EN = [
  "Search espresso…",
  "Search cheese bread…",
  "Search tiramisù…",
  "Search vegetarian…",
];

export function getCardapioChapters(lang: CardapioLang) {
  return CARDAPIO_CHAPTERS[lang];
}

export function getSectionTheme(sectionId: string): SectionTheme {
  return SECTION_THEMES[sectionId] ?? "default";
}

export function getSectionOrnament(sectionId: string): SectionOrnament {
  return SECTION_ORNAMENTS[sectionId] ?? "space";
}

export function getSectionRomanIndex(
  lang: CardapioLang,
  sectionId: string,
): number | null {
  const chapters = getCardapioChapters(lang);
  let index = 0;
  for (const chapter of chapters) {
    for (const id of chapter.sectionIds) {
      if (id === sectionId) return index + 1;
      if (id !== "info-geral" && id !== "general-information") index += 1;
    }
  }
  return null;
}

export function toRomanNumeral(value: number) {
  const numerals: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = value;
  let result = "";
  for (const [n, glyph] of numerals) {
    while (remaining >= n) {
      result += glyph;
      remaining -= n;
    }
  }
  return result;
}

export function getItemBadges(
  item: Pick<CardapioCatalogItem, "id" | "tags">,
  lang: CardapioLang = "pt",
): ItemBadge[] {
  const extraBadges =
    lang === "en"
      ? (itemBadgesEn as Record<string, string[]>)[item.id] ?? []
      : (itemBadgesPt as Record<string, string[]>)[item.id] ?? [];
  const mergedTags = new Set([...(item.tags ?? []), ...extraBadges]);
  if (!mergedTags.size) return [];
  const badges = BADGE_TAGS.filter((badge) => mergedTags.has(badge.key));
  if (lang === "en") {
    return badges.map((badge) => ({
      ...badge,
      title: BADGE_TITLES_EN[badge.key] ?? badge.title,
    }));
  }
  return badges;
}

export function getSearchPlaceholders(lang: CardapioLang) {
  return lang === "pt" ? SEARCH_PLACEHOLDERS_PT : SEARCH_PLACEHOLDERS_EN;
}

export function getSectionItemGroups(
  sectionId: string,
  lang: CardapioLang,
): SectionItemGroupDef[] | null {
  if (lang === "en") return SECTION_GROUPS_EN[sectionId] ?? null;
  return SECTION_GROUPS_PT[sectionId] ?? null;
}

function itemInGroup(
  item: CardapioCatalogItem,
  group: SectionItemGroupDef,
  items: CardapioCatalogItem[],
) {
  const index = items.findIndex((entry) => entry.id === item.id);
  if (index < 0) return false;

  const fromIndex = group.fromId
    ? items.findIndex((entry) => entry.id === group.fromId)
    : 0;
  const untilIndex = group.untilBeforeId
    ? items.findIndex((entry) => entry.id === group.untilBeforeId)
    : items.length;

  if (group.matchTags?.length) {
    return group.matchTags.some((tag) => item.tags?.includes(tag));
  }

  if (fromIndex < 0 || untilIndex < 0) return false;
  return index >= fromIndex && index < untilIndex;
}

export function groupSectionItems(
  section: CardapioCatalogSection,
  lang: CardapioLang,
): Array<{ label: string; items: CardapioCatalogItem[] }> | null {
  const defs = getSectionItemGroups(section.id, lang);
  if (!defs?.length) return null;

  const available = section.items.filter((item) => item.available !== false);
  const groups = defs
    .map((def) => ({
      label: def.label,
      items: available.filter((item) => itemInGroup(item, def, section.items)),
    }))
    .filter((group) => group.items.length > 0);

  return groups.length > 1 ? groups : null;
}

export function formatCardapioEditionDate(
  updatedAt: string,
  lang: CardapioLang,
) {
  return new Date(updatedAt).toLocaleDateString(
    lang === "pt" ? "pt-BR" : "en-US",
    { month: "long", year: "numeric" },
  );
}
