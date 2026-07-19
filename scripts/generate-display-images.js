import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(entryPath, files);
    } else if (/-.+\.webp$/.test(entry.name) && !entry.name.includes("-thumb") && !entry.name.includes("-card") && !entry.name.includes("-display")) {
      files.push(entryPath);
    }
  }
  return files;
}

async function generateDisplayImages() {
  const originals = walkDir(IMAGES_DIR).filter((filePath) => /-\d{2}\.webp$/.test(filePath));
  let generated = 0;

  for (const filePath of originals) {
    const displayPath = filePath.replace(/\.webp$/, "-display.webp");
    if (fs.existsSync(displayPath)) continue;

    await sharp(filePath)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(displayPath);

    generated++;
    console.log(`Generated display image: ${path.relative(IMAGES_DIR, displayPath)}`);
  }

  console.log(`Finished. Generated ${generated} display images.`);
}

generateDisplayImages().catch((error) => {
  console.error(error);
  process.exit(1);
});
