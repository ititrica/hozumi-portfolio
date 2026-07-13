import sharp from "sharp";
import path from "path";
import fs from "fs";

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

async function checkCovers() {
  const covers = [];
  walkDir(IMAGES_DIR, (p) => {
    if (p.includes("cover.webp")) {
      covers.push(p);
    }
  });

  for (const cover of covers) {
    const meta = await sharp(cover).metadata();
    console.log(`COVER: ${path.relative(IMAGES_DIR, cover)} | WIDTH: ${meta.width} | HEIGHT: ${meta.height} | RATIO: ${(meta.width / meta.height).toFixed(2)}`);
  }
}
checkCovers();
