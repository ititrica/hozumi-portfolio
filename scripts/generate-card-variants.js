import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(entryPath, files);
    } else if (entry.isFile() && entry.name.endsWith("-card.webp")) {
      files.push(entryPath);
    }
  }

  return files;
}

const cardFiles = walkDir(IMAGES_DIR);

for (const filePath of cardFiles) {
  const variantPath = filePath.replace(/-card\.webp$/, "-card-640.webp");
  await sharp(filePath)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(variantPath);
  console.log(`Generated ${path.relative(IMAGES_DIR, variantPath)}`);
}

console.log(`Generated ${cardFiles.length} desktop card variants.`);
