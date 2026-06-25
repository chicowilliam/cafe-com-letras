import fs from "node:fs/promises";
import path from "node:path";

const roots = [
  path.resolve("src/data/cardapio/catalog.pt.json"),
  path.resolve("src/data/cardapio/catalog.en.json"),
];

const IMAGE_SECTION_IDS = {
  pt: [
    "info-geral",
    "bebidas-quentes",
    "bebidas-geladas",
    "cervejas-drinks",
    "drinks-coqueteis",
    "licores-destilados",
    "compartilhar-grelhados",
    "carnes-sanduiches",
    "saladas-massas",
    "veganos",
    "sobremesas",
  ],
  en: [
    "general-information",
    "to-share-salads",
    "main-courses",
    "drinks-beers",
    "desserts",
  ],
};

let hasError = false;

for (const file of roots) {
  const raw = await fs.readFile(file, "utf8");
  const catalog = JSON.parse(raw);
  const lang = catalog.lang;
  const itemIds = new Set();

  if (!catalog.updatedAt || !Array.isArray(catalog.sections)) {
    console.error(`${file}: invalid catalog shape`);
    hasError = true;
    continue;
  }

  for (const section of catalog.sections) {
    if (!section.id || !section.label || !Array.isArray(section.items)) {
      console.error(`${file}: invalid section`, section.id);
      hasError = true;
      continue;
    }

    const hasContent =
      section.items.length > 0 ||
      (Array.isArray(section.introBlocks) && section.introBlocks.length > 0) ||
      (Array.isArray(section.infoBlocks) && section.infoBlocks.length > 0) ||
      section.infoLayout === "groups";

    if (section.id === "info-geral" && catalog.lang === "pt") {
      const infoFile = path.resolve("src/data/cardapio/info-geral.pt.json");
      const infoRaw = await fs.readFile(infoFile, "utf8");
      const info = JSON.parse(infoRaw);
      if (!info.blocks?.length) {
        console.error(`${infoFile}: missing info blocks`);
        hasError = true;
      }
      for (const block of info.blocks ?? []) {
        if (!block.id || !block.title) {
          console.error(`${infoFile}: invalid info block`, block.id);
          hasError = true;
        }
      }
    }

    if (!hasContent && catalog.lang === "pt" && section.id !== "info-geral") {
      console.warn(`${file}: empty section ${section.id}`);
    }

    if (!IMAGE_SECTION_IDS[lang]?.includes(section.id)) {
      console.warn(`${file}: section id not in image map — ${section.id}`);
    }

    for (const item of section.items) {
      if (!item.id || !item.name || typeof item.price !== "number") {
        console.error(`${file}: invalid item in ${section.id}`, item.id);
        hasError = true;
      }

      if (item.price < 0) {
        console.error(`${file}: negative price for ${item.id}`);
        hasError = true;
      }

      if (itemIds.has(item.id)) {
        console.error(`${file}: duplicate item id ${item.id}`);
        hasError = true;
      }

      itemIds.add(item.id);
    }
  }

  console.log(
    `${path.basename(file)}: ${catalog.sections.length} sections, ${itemIds.size} items`,
  );
}

if (hasError) {
  process.exit(1);
}
