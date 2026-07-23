/**
 * Gera WebPs hi-res Blue Moon a partir dos masters.
 * Pasta Cloudinary canônica: blue-moon (cloud dmqa0cxay)
 * Uso: node scripts/optimize-blue-moon.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("src/assets/images/blue-moon");

const jobs = [
  {
    input: "foto-9.jpg",
    output: "blue-moon-hero.webp",
    width: 2400,
    height: 1600,
    quality: 84,
  },
  {
    input: "foto-9.jpg",
    output: "blue-moon-mesa-hi.webp",
    width: 2000,
    height: 1335,
    quality: 82,
  },
  {
    input: "foto-22.jpg",
    output: "blue-moon-servindo-hi.webp",
    width: 1400,
    height: 2100,
    quality: 84,
  },
  {
    input: "foto-63.jpg",
    output: "blue-moon-petiscos-hi.webp",
    width: 1400,
    height: 2100,
    quality: 84,
  },
  {
    input: "foto-28.jpg",
    output: "blue-moon-branding-hi.webp",
    width: 2000,
    height: 1335,
    quality: 82,
  },
  {
    input: "foto-8.jpg",
    output: "blue-moon-brinde-hi.webp",
    width: 1400,
    height: 2100,
    quality: 82,
  },
  {
    input: "03.jpg",
    output: "blue-moon-ambiente-hi.webp",
    width: 1600,
    height: 1070,
    quality: 85,
  },
  {
    input: "croquete-decarne.jpg",
    output: "blue-moon-croquetes-hi.webp",
    width: 1400,
    height: 2100,
    quality: 88,
  },
  {
    input: "blue-moon-07.webp",
    output: "blue-moon-abrir-hi.webp",
    width: 1400,
    height: 2100,
    quality: 88,
  },
  {
    input: "prato-maispra-baixo.jpg",
    output: "blue-moon-prato-hi.webp",
    width: 1400,
    height: 2100,
    quality: 88,
  },
];

/** Recorte hi-res do copo com laranja a partir do master de petiscos. */
async function exportLaranjaFromPetiscosMaster() {
  const input = path.join(dir, "foto-63.jpg");
  const output = path.join(dir, "blue-moon-laranja-hi.webp");
  const meta = await sharp(input).metadata();
  const width = meta.width ?? 2670;
  const height = meta.height ?? 4000;
  const extract = {
    left: Math.round(width * 0.12),
    top: 0,
    width: Math.round(width * 0.76),
    height: Math.round(height * 0.48),
  };

  await sharp(input)
    .rotate()
    .extract(extract)
    .resize(1400, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86, effort: 5 })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  const after = (await fs.stat(output)).size;
  console.log(
    `blue-moon-laranja-hi.webp (crop): ${outMeta.width}x${outMeta.height} · ${Math.round(after / 1024)}KB`,
  );
}

for (const job of jobs) {
  const input = path.join(dir, job.input);
  const output = path.join(dir, job.output);
  const before = (await fs.stat(input)).size;

  await sharp(input)
    .rotate()
    .resize(job.width, job.height, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: job.quality, effort: 5 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  const after = (await fs.stat(output)).size;
  console.log(
    `${job.output}: ${meta.width}x${meta.height} · ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`,
  );
}

await exportLaranjaFromPetiscosMaster();
