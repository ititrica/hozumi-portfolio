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

async function generateThumbnails() {
  console.log("Starting thumbnail generation in:", IMAGES_DIR);

  const webpFiles = [];
  walkDir(IMAGES_DIR, (filePath) => {
    if (
      filePath.endsWith(".webp") &&
      !filePath.endsWith("-thumb.webp") &&
      !filePath.endsWith("-card.webp")
    ) {
      webpFiles.push(filePath);
    }
  });

  console.log(`Found ${webpFiles.length} original WebP images.`);

  let count = 0;
  for (const filePath of webpFiles) {
    const ext = path.extname(filePath);
    const base = filePath.slice(0, -ext.length);
    const thumbPath = `${base}-thumb.webp`;

    if (fs.existsSync(thumbPath)) {
      // Skip if thumbnail already exists
      continue;
    }

    try {
      // Resize image to max width of 400px, quality 60
      await sharp(filePath)
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 60 })
        .toFile(thumbPath);

      count++;
      console.log(`Generated thumbnail: ${path.relative(IMAGES_DIR, thumbPath)}`);
    } catch (err) {
      console.error(`Error generating thumbnail for ${filePath}:`, err);
    }
  }

  console.log(`Finished! Generated ${count} new thumbnails.`);
}

generateThumbnails();
