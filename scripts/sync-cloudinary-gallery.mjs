/**
 * Sincroniza fotos das pastas Cloudinary "fotos antigas" e "fotos novas"
 * para src/data/gallery-manifest.json (commitado no repo).
 *
 * Uso: CLOUDINARY_API_KEY=... CLOUDINARY_API_SECRET=... npm run sync:gallery
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "src/data/gallery-manifest.json");

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? "dmqa0cxay";
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const FOLDERS = [
  { key: "antigas", label: "fotos antigas" },
  { key: "novas", label: "fotos novas" },
];

const MAX_PER_FOLDER = 40;

if (!API_KEY || !API_SECRET) {
  console.error(
    "Defina CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET (ex.: arquivo .env local).",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

async function listFolderImages(folderLabel) {
  const strategies = [
    () =>
      cloudinary.search
        .expression(`resource_type:image AND asset_folder="${folderLabel}"`)
        .sort_by("created_at", "desc")
        .max_results(MAX_PER_FOLDER)
        .execute(),
    () =>
      cloudinary.search
        .expression(`resource_type:image AND folder="${folderLabel}"`)
        .sort_by("created_at", "desc")
        .max_results(MAX_PER_FOLDER)
        .execute(),
    () =>
      cloudinary.api.resources({
        type: "upload",
        resource_type: "image",
        prefix: `${folderLabel}/`,
        max_results: MAX_PER_FOLDER,
      }),
  ];

  for (const run of strategies) {
    try {
      const result = await run();
      const resources = result.resources ?? [];
      if (resources.length > 0) {
        return resources;
      }
    } catch {
      // tenta próxima estratégia
    }
  }

  return [];
}

function loadExistingManifest() {
  try {
    const raw = readFileSync(OUT_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const map = new Map();
    for (const entry of parsed.images ?? []) {
      if (entry?.publicId) map.set(entry.publicId, entry);
    }
    return map;
  } catch {
    return new Map();
  }
}

function toManifestEntry(resource, folderKey, existingById) {
  const publicId = resource.public_id ?? resource.asset_id;
  const context = resource.context?.custom ?? resource.context ?? {};
  const altFromContext =
    typeof context === "object" && context !== null
      ? context.alt ?? context.caption ?? context.title
      : undefined;

  const previous = existingById.get(publicId);

  return {
    publicId,
    folder: folderKey,
    width: resource.width ?? null,
    height: resource.height ?? null,
    alt: previous?.alt ?? altFromContext ?? null,
    caption: previous?.caption ?? null,
    year: previous?.year ?? null,
  };
}

async function main() {
  console.log(`Cloudinary gallery sync — ${CLOUD_NAME}\n`);

  const existingById = loadExistingManifest();
  const images = [];

  for (const { key, label } of FOLDERS) {
    console.log(`▸ ${label}`);
    const resources = await listFolderImages(label);
    console.log(`  ${resources.length} imagem(ns)`);

    if (resources.length > MAX_PER_FOLDER) {
      console.warn(`  ⚠ Mais de ${MAX_PER_FOLDER} — apenas as primeiras foram incluídas.`);
    }

    for (const resource of resources.slice(0, MAX_PER_FOLDER)) {
      images.push(toManifestEntry(resource, key, existingById));
    }
  }

  const manifest = {
    syncedAt: new Date().toISOString(),
    cloudName: CLOUD_NAME,
    images,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`\n✓ ${images.length} imagens → ${OUT_PATH.replace(/\\/g, "/")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
