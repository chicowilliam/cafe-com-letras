import { getCatalog, type CardapioCatalogItem } from "@/lib/cardapio-catalog";
import { getItemPriceLabel } from "@/lib/cardapio-format";
import type { CardapioLang } from "@/lib/cardapio-images";

export type HomeCardapioBlock = {
  id: string;
  label: string;
  items: Array<{
    id: string;
    name: string;
    description?: string;
    price: string;
  }>;
  hasMore: boolean;
};

type HomeBlockConfig = {
  id: string;
  label: string;
  sectionIds: string[];
  tags?: string[];
  previewCount?: number;
  featured?: boolean;
};

const HOME_BLOCKS: Record<CardapioLang, HomeBlockConfig[]> = {
  pt: [
    {
      id: "compartilhar",
      label: "Para compartilhar",
      sectionIds: ["compartilhar-grelhados"],
      previewCount: 2,
    },
    {
      id: "saladas",
      label: "Saladas",
      sectionIds: ["saladas-massas"],
      tags: ["salada"],
      previewCount: 2,
    },
    {
      id: "pratos",
      label: "Pratos",
      sectionIds: ["saladas-massas", "carnes-sanduiches"],
      tags: ["prato"],
      featured: true,
    },
    {
      id: "cafes",
      label: "Cafés & bebidas",
      sectionIds: ["bebidas-quentes", "bebidas-geladas"],
      previewCount: 2,
    },
    {
      id: "drinks",
      label: "Drinks & cervejas",
      sectionIds: ["cervejas-drinks", "drinks-coqueteis"],
      previewCount: 2,
    },
    {
      id: "sobremesas",
      label: "Sobremesas",
      sectionIds: ["sobremesas"],
      previewCount: 2,
    },
  ],
  en: [
    {
      id: "share",
      label: "To share",
      sectionIds: ["to-share-salads"],
      tags: ["share"],
      previewCount: 2,
    },
    {
      id: "salads",
      label: "Salads",
      sectionIds: ["to-share-salads"],
      tags: ["salad"],
      previewCount: 2,
    },
    {
      id: "mains",
      label: "Main courses",
      sectionIds: ["main-courses"],
      featured: true,
    },
    {
      id: "drinks",
      label: "Drinks & beers",
      sectionIds: ["drinks-beers"],
      previewCount: 2,
    },
    {
      id: "desserts",
      label: "Desserts",
      sectionIds: ["desserts"],
      previewCount: 2,
    },
  ],
};

function collectItems(
  catalog: ReturnType<typeof getCatalog>,
  config: HomeBlockConfig,
): CardapioCatalogItem[] {
  const items = config.sectionIds.flatMap((sectionId) => {
    const section = catalog.sections.find((entry) => entry.id === sectionId);
    return section?.items ?? [];
  });

  if (!config.tags?.length) return items;

  return items.filter((item) =>
    config.tags!.some((tag) => item.tags?.includes(tag)),
  );
}

export function getHomeCardapioBlocks(lang: CardapioLang = "pt"): HomeCardapioBlock[] {
  const catalog = getCatalog(lang);
  const blocks = HOME_BLOCKS[lang];

  return blocks.map((config) => {
    const filtered = collectItems(catalog, config);
    const visible = config.featured
      ? filtered
      : filtered.slice(0, config.previewCount ?? 2);

    return {
      id: config.id,
      label: config.label,
      items: visible.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: getItemPriceLabel(item, lang),
      })),
      hasMore: !config.featured && filtered.length > visible.length,
    };
  });
}
