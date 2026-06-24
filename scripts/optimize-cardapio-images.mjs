import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const roots = [
  path.resolve("src/assets/images/cardapio/pt"),
  path.resolve("src/assets/images/cardapio/en"),
];

let totalBefore = 0;
let totalAfter = 0;

for (const dir of roots) {
  const files = (await fs.readdir(dir)).filter((file) => file.endsWith(".png"));

  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(/\.png$/i, ".webp"));
    const before = (await fs.stat(input)).size;
    const isHeroPage =
      file.includes("01_info_geral") || file === "01.png";
    const quality = isHeroPage ? 80 : 82;

    await sharp(input)
      .resize(1000, null, { fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(output);

    const after = (await fs.stat(output)).size;
    totalBefore += before;
    totalAfter += after;

    console.log(
      `${path.relative(process.cwd(), output)}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB (q${quality})`,
    );
  }
}

console.log(
  `\nTotal PNG: ${Math.round(totalBefore / 1024)}KB → WebP: ${Math.round(totalAfter / 1024)}KB`,
);
