import fs from "node:fs/promises";
import path from "node:path";

const pagesFile = path.resolve("scripts/.cache/cardapio-junho-26-pages.json");
const infoGeralFile = path.resolve("src/data/cardapio/info-geral.pt.json");
const pages = JSON.parse(await fs.readFile(pagesFile, "utf8"));
const byPage = Object.fromEntries(pages.map((p) => [p.num, p.text]));

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function parsePrice(raw) {
  return Number(raw.replace(/\./g, "").replace(",", "."));
}

function isNoise(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith("--")) return true;
  if (/^A\s*-\s*\d/.test(trimmed)) return true;
  if (/^ITEM VEG/.test(trimmed)) return true;
  if (/^ABV =|^IBU =|^Intensidade/.test(trimmed)) return true;
  if (/^SEM ÁLCOOL$/.test(trimmed)) return true;
  if (/^\d+ anos$/.test(trimmed)) return true;
  if (/^Pale Lager|^ipa |^Lager PREMIUM|^Witbeer/.test(trimmed)) return true;
  if (
    /^CERVEJAS|^DRINKS E COQUETÉIS|^LICORES$|^DESTILADOS|^SEM ÁLCOOL/.test(
      trimmed,
    )
  )
    return true;
  if (
    /^GRELHADOS$|^SANDUÍCHES|^CARNES e PEIXES|^PARA COMPARTILH|^CARDÁPIO INFANTIL$|^MASSAS E RISOTOS$|^SALADAS$|^VEGANOS|^SOBREMESAS$/.test(
      trimmed,
    )
  )
    return true;
  if (/^Proteína com legumes|^Alcoólico \|/.test(trimmed)) return true;
  return false;
}

function parsePriceLine(line) {
  const match = line.match(/^(.+?)\s*\.+\s*(\d{1,4},\d{2})\s*$/);
  if (!match) return null;
  return {
    name: match[1].trim().replace(/\t.*$/, "").trim(),
    price: parsePrice(match[2]),
  };
}

function parseItems(block) {
  const lines = block.split(/\r?\n/);
  const items = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || isNoise(line)) continue;

    const priced = parsePriceLine(line);
    if (priced) {
      if (current) items.push(current);
      current = {
        id: slugify(priced.name),
        name: priced.name,
        price: priced.price,
      };
      continue;
    }

    if (current && /^[a-z(0-9]/.test(line)) {
      current.description = current.description
        ? `${current.description} ${line}`
        : line;
    }
  }

  if (current) items.push(current);

  const seen = new Set();
  return items
    .map((item) => {
      let id = item.id || slugify(item.name);
      if (seen.has(id)) {
        let n = 2;
        while (seen.has(`${id}-${n}`)) n++;
        id = `${id}-${n}`;
      }
      seen.add(id);
      return { ...item, id };
    })
    .filter((item) => item.name && item.price > 0);
}

function slice(text, start, end) {
  const from = start ? text.indexOf(start) : 0;
  if (from === -1) return "";
  const sliceStart = start ? from : 0;
  const to = end ? text.indexOf(end, sliceStart + 1) : -1;
  return to === -1 ? text.slice(sliceStart) : text.slice(sliceStart, to);
}

function parseInfoBlocks(pageText) {
  return pageText
    .split(/>>\s*/)
    .filter(Boolean)
    .map((chunk) => {
      const [titleLine, ...rest] = chunk.trim().split(/\n+/);
      return { title: titleLine?.trim() ?? "", body: rest.join(" ").trim() };
    })
    .filter((block) => block.title);
}

function dedupeItems(items) {
  const map = new Map();
  for (const item of items) {
    const key = `${item.name}|${item.price}`;
    if (!map.has(key)) map.set(key, item);
  }
  return [...map.values()];
}

function ensureGlobalUniqueIds(sections) {
  const seen = new Set();
  return sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }),
  }));
}

const page2 = byPage[2] ?? "";
const page3 = byPage[3] ?? "";
const page4 = byPage[4] ?? "";
const page5 = byPage[5] ?? "";

const bebidasQuentes = parseItems(slice(page2, "Café Espresso", "Água mineral"));
const bebidasGeladas = parseItems(slice(page2, "Água mineral", "ITEM VEGETARIANO"));

const page3Beers = parseItems(slice(page3, "Chope Pilsen", "Moramora"));

const page3Cocktails = parseItems(
  [slice(page3, "Mojito", "LICORES"), slice(page3, "Moramora", "DESTILADOS")].join(
    "\n",
  ),
);

const licoresDestilados = dedupeItems(
  parseItems(
    [
      slice(page3, "LICORES", "SEM ÁLCOOL"),
      slice(page3, "Jack Daniel", "Chope Pilsen"),
    ].join("\n"),
  ),
);

const compartilharGrelhados = dedupeItems(
  parseItems(
    [
      slice(page4, "PARA COMPARTILHAr", "CARNES e PEIXES"),
      slice(page4, "GRELHADOS", "SANDUÍCHES E CREPES"),
    ].join("\n"),
  ),
);

const carnesSanduiches = dedupeItems(
  parseItems(
    [
      slice(page4, "CARNES e PEIXES", "GRELHADOS"),
      slice(page4, "GRELHADOS", "SANDUÍCHES E CREPES"),
      slice(page4, "SANDUÍCHES E CREPES", "Ravioli de mussarela"),
    ].join("\n"),
  ),
);

const saladasMassas = dedupeItems(
  parseItems(
    [
      slice(page4, "Ravioli de mussarela", "CARDÁPIO INFANTIL"),
      slice(page4, "SALADAS", "MASSAS E RISOTOS"),
      slice(page4, "MASSAS E RISOTOS", "ITEM VEGETARIANO"),
    ].join("\n"),
  ),
);

const veganos = parseItems(slice(page5, "Dadinhos de tapioca", "Brownie mix"));
const sobremesas = parseItems(slice(page5, "Brownie mix", "ITEM VEGETARIANO"));

const infoGeral = JSON.parse(await fs.readFile(infoGeralFile, "utf8"));

const sections = ensureGlobalUniqueIds([
  {
    id: "info-geral",
    label: infoGeral.label,
    heading: infoGeral.heading,
    infoLayout: infoGeral.infoLayout,
    introBlocks: [],
    items: [],
    columns: 1,
  },
  {
    id: "bebidas-quentes",
    label: "Bebidas quentes",
    eyebrow: "Bebidas quentes",
    items: bebidasQuentes.map((item) => ({ ...item, tags: ["cafe"] })),
    columns: 2,
  },
  {
    id: "bebidas-geladas",
    label: "Bebidas geladas",
    eyebrow: "Bebidas geladas",
    items: bebidasGeladas.map((item) => ({ ...item, tags: ["bebida"] })),
    columns: 2,
  },
  {
    id: "cervejas-drinks",
    label: "Cervejas & drinks",
    eyebrow: "Cervejas e chopes",
    items: dedupeItems(page3Beers).map((item) => ({ ...item, tags: ["cerveja"] })),
    columns: 2,
  },
  {
    id: "drinks-coqueteis",
    label: "Drinks & coquetéis",
    eyebrow: "Drinks e coquetéis",
    items: dedupeItems(page3Cocktails).map((item) => ({ ...item, tags: ["drink"] })),
    columns: 2,
  },
  {
    id: "licores-destilados",
    label: "Licores & destilados",
    eyebrow: "Licores e destilados",
    items: licoresDestilados.map((item) => ({ ...item, tags: ["destilado"] })),
    columns: 2,
  },
  {
    id: "compartilhar-grelhados",
    label: "Compartilhar & grelhados",
    eyebrow: "Para compartilhar",
    items: compartilharGrelhados.map((item) => ({
      ...item,
      tags: ["compartilhar"],
    })),
    columns: 1,
  },
  {
    id: "carnes-sanduiches",
    label: "Carnes & sanduíches",
    eyebrow: "Carnes e sanduíches",
    items: carnesSanduiches.map((item) => ({ ...item, tags: ["prato"] })),
    columns: 1,
  },
  {
    id: "saladas-massas",
    label: "Saladas, massas & infantil",
    eyebrow: "Saladas e massas",
    items: saladasMassas.map((item) => ({
      ...item,
      tags: [
        item.name.toLowerCase().includes("salada")
          ? "salada"
          : item.name.toLowerCase().includes("infantil") ||
              item.name.toLowerCase().includes("sorvete")
            ? "infantil"
            : "prato",
      ],
    })),
    columns: 1,
  },
  {
    id: "veganos",
    label: "Veganos",
    eyebrow: "Veganos",
    items: veganos.map((item) => ({ ...item, tags: ["vegano"] })),
    columns: 1,
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    eyebrow: "Sobremesas",
    items: sobremesas.map((item) => ({ ...item, tags: ["sobremesa"] })),
    columns: 1,
  },
]);

const catalog = {
  lang: "pt",
  updatedAt: "2026-06-01",
  sections,
};

const out = path.resolve("src/data/cardapio/catalog.pt.json");
await fs.writeFile(out, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");

const total = sections.reduce((sum, s) => sum + s.items.length, 0);
console.log(`Items: ${total}`);
for (const section of sections) {
  console.log(`  ${section.id}: ${section.items.length}`);
}
