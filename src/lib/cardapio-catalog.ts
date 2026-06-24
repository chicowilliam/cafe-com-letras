import catalogEn from "@/data/cardapio/catalog.en.json";
import catalogPt from "@/data/cardapio/catalog.pt.json";
import type { CardapioLang } from "@/lib/cardapio-images";

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
  eyebrow?: string;
  intro?: string;
  items: CardapioCatalogItem[];
};

export type CardapioCatalog = {
  lang: CardapioLang;
  updatedAt: string;
  sections: CardapioCatalogSection[];
};

const CATALOGS: Record<CardapioLang, CardapioCatalog> = {
  pt: catalogPt as CardapioCatalog,
  en: catalogEn as CardapioCatalog,
};

export function getCatalog(lang: CardapioLang): CardapioCatalog {
  return CATALOGS[lang];
}

export function getCatalogSectionsWithItems(lang: CardapioLang) {
  return getCatalog(lang).sections.filter((section) => section.items.length > 0);
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
