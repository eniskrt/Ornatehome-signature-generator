import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/assets/signature/source");
const outputDirectory = path.dirname(sourceDirectory);
const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith(".svg"));

await Promise.all(files.map(async (file) => {
  const source = await readFile(path.join(sourceDirectory, file));
  const target = path.join(outputDirectory, file.replace(/\.svg$/, ".png"));
  await sharp(source).png({ compressionLevel: 9 }).toFile(target);
}));

console.log(`Rendered ${files.length} placeholder PNG assets.`);
