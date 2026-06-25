import fs from "node:fs/promises";
import path from "node:path";
import {
  GROUP_TRANSLATIONS_EN,
  ITEM_TRANSLATIONS,
  mapTags,
  SECTION_TRANSLATIONS,
} from "./cardapio-en-translations.mjs";

const catalogPtFile = path.resolve("src/data/cardapio/catalog.pt.json");
const catalogEnFile = path.resolve("src/data/cardapio/catalog.en.json");

const catalogPt = JSON.parse(await fs.readFile(catalogPtFile, "utf8"));
const missing = [];

const sections = catalogPt.sections.map((section) => {
  const meta = SECTION_TRANSLATIONS[section.id];
  if (!meta) {
    console.error(`Missing section translation: ${section.id}`);
    process.exit(1);
  }

  const items = section.items.map((item) => {
    const translation = ITEM_TRANSLATIONS[item.id];
    if (!translation) {
      missing.push(item.id);
      return item;
    }

    return {
      ...item,
      name: translation.name,
      ...(translation.description
        ? { description: translation.description }
        : item.description
          ? { description: translation.description ?? item.description }
          : {}),
      tags: mapTags(item.tags),
    };
  });

  return {
    id: section.id,
    label: meta.label,
    ...(meta.heading ? { heading: meta.heading } : {}),
    ...(meta.eyebrow ? { eyebrow: meta.eyebrow } : {}),
    ...(section.infoLayout ? { infoLayout: section.infoLayout } : {}),
    introBlocks: [],
    items,
    ...(section.columns ? { columns: section.columns } : {}),
  };
});

if (missing.length > 0) {
  console.error("Missing item translations:", missing.join(", "));
  process.exit(1);
}

const catalogEn = {
  lang: "en",
  updatedAt: catalogPt.updatedAt,
  sections,
};

await fs.writeFile(catalogEnFile, `${JSON.stringify(catalogEn, null, 2)}\n`, "utf8");

console.log(
  `catalog.en.json: ${sections.length} sections, ${sections.reduce((n, s) => n + s.items.length, 0)} items`,
);

export { GROUP_TRANSLATIONS_EN };
