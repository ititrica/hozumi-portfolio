import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

async function generateCardCovers() {
  console.log("Starting card cover generation in:", IMAGES_DIR);

  const coverFiles = [];
  walkDir(IMAGES_DIR, (filePath) => {
    // Look for cover.webp files specifically
    if (filePath.endsWith("cover.webp")) {
      coverFiles.push(filePath);
    }
  });

  console.log(`Found ${coverFiles.length} cover.webp images.`);

  let count = 0;
  for (const filePath of coverFiles) {
    const dir = path.dirname(filePath);
    const cardPath = path.join(dir, "cover.card.webp");

    try {
      // Resize cover to max width of 1000px, quality 85 for sharp visual display
      await sharp(filePath)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(cardPath);

      count++;
      console.log(`Generated card cover: ${path.relative(IMAGES_DIR, cardPath)}`);
    } catch (err) {
      console.error(`Error generating card cover for ${filePath}:`, err);
    }
  }

  console.log(`Finished! Generated ${count} card covers.`);
}

generateCardCovers();
