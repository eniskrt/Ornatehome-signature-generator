import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/assets/signature/svg-icons");
const outputDirectory = path.resolve("public/assets/signature");
const icons = {
  "Varlık 5.svg": "phone.png",
  "Varlık 3.svg": "email.png",
  "Varlık 2.svg": "location.png",
  "Varlık 4.svg": "website.png",
};

await Promise.all(Object.entries(icons).map(async ([sourceName, outputName]) => {
  const source = await readFile(path.join(sourceDirectory, sourceName));
  await sharp(source, { density: 288 })
    .resize(34, 34, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, outputName));
}));

console.log("Rendered 4 email-safe contact PNGs from the designer SVG icons.");
