import type {
  CardapioCatalog,
  CardapioCatalogItem,
  CardapioInfoBlock,
} from "@/lib/cardapio-catalog";
import { normalizeSearchText } from "@/lib/cardapio-format";

function itemMatchesQuery(item: CardapioCatalogItem, query: string) {
  if (item.available === false) return false;

  const haystack = normalizeSearchText(
    [item.name, item.description ?? "", ...(item.tags ?? [])].join(" "),
  );

  return haystack.includes(query);
}

function infoBlockMatchesQuery(block: CardapioInfoBlock, query: string) {
  const parts = [
    block.title,
    block.body ?? "",
    block.footnote ?? "",
    ...(block.lines?.flatMap((line) => [line.label ?? "", line.value]) ?? []),
    ...(block.items?.flatMap((item) => [item.name, item.detail ?? ""]) ?? []),
  ];
  return normalizeSearchText(parts.join(" ")).includes(query);
}

function sectionMatchesInfoQuery(
  section: CardapioCatalog["sections"][number],
  query: string,
) {
  if (!section.infoBlocks?.length) return false;
  return section.infoBlocks.some((block) => infoBlockMatchesQuery(block, query));
}

export function searchCatalog(
  catalog: CardapioCatalog,
  rawQuery: string,
): CardapioCatalog {
  const query = normalizeSearchText(rawQuery);
  if (!query) return catalog;

  const sections = catalog.sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => itemMatchesQuery(item, query)),
    }))
    .filter(
      (section) =>
        section.items.length > 0 ||
        sectionMatchesInfoQuery(section, query) ||
        (section.introBlocks?.length ?? 0) > 0,
    );

  return { ...catalog, sections };
}

export function countCatalogItems(catalog: CardapioCatalog) {
  return catalog.sections.reduce(
    (total, section) => total + section.items.length,
    0,
  );
}
