import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("src/assets/images/livraria");
const thumbDir = path.join(dir, "thumbs");

await fs.mkdir(thumbDir, { recursive: true });

const files = (await fs.readdir(dir)).filter((file) => file.endsWith(".jpg"));

for (const file of files) {
  const input = path.join(dir, file);
  const temp = path.join(dir, `${file}.tmp`);
  const thumbPath = path.join(thumbDir, file);
  const before = (await fs.stat(input)).size;

  await sharp(input)
    .rotate()
    .resize(1400, 1800, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(temp);

  await fs.rename(temp, input);

  await sharp(input)
    .resize(512, 640, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(thumbPath);

  const after = (await fs.stat(input)).size;
  const thumbSize = (await fs.stat(thumbPath)).size;
  console.log(
    `${file}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB (thumb ${Math.round(thumbSize / 1024)}KB)`,
  );
}
