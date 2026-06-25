/**
 * Gera WebPs do topo das folhas PNG do cardápio.
 * Não usado no modo Cardápio (print) — apenas tipografia CSS no viewer.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("src/assets/images/cardapio/pt");
const outDir = path.resolve("src/assets/images/cardapio/print-headers/pt");
await fs.mkdir(outDir, { recursive: true });

const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".png")).sort();

for (const file of files) {
  const input = path.join(dir, file);
  const base = file.replace(/\.png$/i, "");
  const meta = await sharp(input).metadata();
  const headerHeight = Math.min(
    Math.round(meta.height * 0.24),
    Math.round(meta.width * 0.55),
  );

  await sharp(input)
    .extract({
      left: 0,
      top: 0,
      width: meta.width,
      height: headerHeight,
    })
    .webp({ quality: 86 })
    .toFile(path.join(outDir, `${base}.webp`));

  console.log(`${base}: header ${headerHeight}px`);
}
