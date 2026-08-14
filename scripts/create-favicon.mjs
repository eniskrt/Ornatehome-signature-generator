import path from "node:path";
import sharp from "sharp";

const source = path.resolve("public/assets/signature/ornate-home-logo.png");
const mark = await sharp(source)
  .extract({ left: 465, top: 0, width: 570, height: 570 })
  .extend({ top: 34, right: 34, bottom: 34, left: 34, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await Promise.all([
  sharp(mark).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.resolve("app/icon.png")),
  sharp(mark).resize(180, 180).png({ compressionLevel: 9 }).toFile(path.resolve("app/apple-icon.png")),
]);

console.log("Created app/icon.png and app/apple-icon.png from the original logo mark.");
