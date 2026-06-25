import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";

const pdfPath =
  process.argv[2] ??
  path.resolve("c:/Users/User1/Downloads/Cardápio geral - Junho-26.pdf");

const buffer = await fs.readFile(pdfPath);
const parser = new PDFParse({ data: buffer });
const data = await parser.getText();
await parser.destroy();

const outDir = path.resolve("scripts/.cache");
await fs.mkdir(outDir, { recursive: true });
const outFile = path.join(outDir, "cardapio-junho-26.txt");
await fs.writeFile(outFile, data.text, "utf8");

const pagesFile = path.join(outDir, "cardapio-junho-26-pages.json");
await fs.writeFile(
  pagesFile,
  JSON.stringify(
    data.pages.map((page) => ({ num: page.num, text: page.text })),
    null,
    2,
  ),
  "utf8",
);

console.log(`Pages: ${data.total}`);
console.log(`Chars: ${data.text.length}`);
console.log(`Written: ${outFile}`);
console.log(`Written: ${pagesFile}`);
