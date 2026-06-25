import catalogEn from "@/data/cardapio/catalog.en.json";
import catalogPt from "@/data/cardapio/catalog.pt.json";
import infoGeralEn from "@/data/cardapio/info-geral.en.json";
import infoGeralPt from "@/data/cardapio/info-geral.pt.json";
import type { CardapioLang } from "@/lib/cardapio-images";

export type CardapioIntroBlock = {
  title: string;
  body: string;
};

export type CardapioInfoLine = {
  label?: string;
  value: string;
  href?: string;
};

export type CardapioInfoProgramItem = {
  name: string;
  detail?: string;
  href?: string;
};

export type CardapioInfoBlock = {
  id: string;
  title: string;
  variant?: "default" | "policy" | "schedule" | "list" | "contact" | "program" | "payment";
  column?: 1 | 2 | "full";
  lines?: CardapioInfoLine[];
  items?: CardapioInfoProgramItem[];
  body?: string;
  footnote?: string;
};

export type CardapioCatalogItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceLabel?: string;
  tags?: string[];
  sectionId?: string;
  available?: boolean;
};

export type CardapioCatalogSection = {
  id: string;
  label: string;
  heading?: string;
  eyebrow?: string;
  intro?: string;
  introBlocks?: CardapioIntroBlock[];
  infoLayout?: "groups";
  infoBlocks?: CardapioInfoBlock[];
  columns?: number;
  items: CardapioCatalogItem[];
};

export type CardapioCatalog = {
  lang: CardapioLang;
  updatedAt: string;
  sections: CardapioCatalogSection[];
};

type InfoGeralFile = {
  label: string;
  heading: string;
  infoLayout: string;
  blocks: CardapioInfoBlock[];
};

const INFO_GERAL: Record<CardapioLang, InfoGeralFile> = {
  pt: infoGeralPt as InfoGeralFile,
  en: infoGeralEn as InfoGeralFile,
};

const CATALOGS: Record<CardapioLang, CardapioCatalog> = {
  pt: mergeInfoGeral(catalogPt as CardapioCatalog, "pt"),
  en: mergeInfoGeral(catalogEn as CardapioCatalog, "en"),
};

function mergeInfoGeral(catalog: CardapioCatalog, lang: CardapioLang): CardapioCatalog {
  const info = INFO_GERAL[lang];
  const sections = catalog.sections.map((section) => {
    if (section.id !== "info-geral") return section;
    return {
      ...section,
      label: info.label,
      heading: info.heading,
      infoLayout: info.infoLayout as "groups",
      infoBlocks: info.blocks,
      introBlocks: [],
      items: [],
    };
  });
  return { ...catalog, sections };
}

function sectionHasContent(section: CardapioCatalogSection) {
  return (
    section.items.length > 0 ||
    (section.introBlocks?.length ?? 0) > 0 ||
    (section.infoBlocks?.length ?? 0) > 0
  );
}

export function getCatalog(lang: CardapioLang): CardapioCatalog {
  return CATALOGS[lang];
}

export function getCatalogSectionsWithItems(lang: CardapioLang) {
  return getCatalog(lang).sections.filter(sectionHasContent);
}

export function getCatalogItemById(lang: CardapioLang, itemId: string) {
  for (const section of getCatalog(lang).sections) {
    const item = section.items.find((entry) => entry.id === itemId);
    if (item) return { section, item };
  }
  return null;
}

/** @deprecated Use getCatalog("pt") — mantido para compatibilidade. */
export function getLegacyHomeCategories(lang: CardapioLang = "pt") {
  return getCatalog(lang).sections;
}
