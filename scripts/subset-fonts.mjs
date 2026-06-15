import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SRC = resolve(
  ROOT,
  "src/assets/Fontes/EB_Garamond/EBGaramond-Italic-VariableFont_wght.ttf",
);
const OUT = resolve(
  ROOT,
  "src/assets/Fontes/EB_Garamond/EBGaramond-Italic.subset.woff2",
);

// Basic Latin + Latin-1 Supplement + Latin Extended-A + pontuação tipográfica.
function buildCharset() {
  const ranges = [
    [0x20, 0x7e],
    [0xa0, 0xff],
    [0x100, 0x17f],
    [0x2013, 0x2014],
    [0x2018, 0x201f],
    [0x2026, 0x2026],
    [0x20ac, 0x20ac],
  ];
  let chars = "";
  for (const [start, end] of ranges) {
    for (let cp = start; cp <= end; cp += 1) chars += String.fromCodePoint(cp);
  }
  return chars;
}

const buffer = await readFile(SRC);
const subset = await subsetFont(buffer, buildCharset(), {
  targetFormat: "woff2",
});
await writeFile(OUT, subset);

console.log(
  `Subset gerado: ${OUT} (${(subset.length / 1024).toFixed(1)} KB, origem ${(
    buffer.length / 1024
  ).toFixed(1)} KB)`,
);
