import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const DIST_IMAGES_DIR = path.resolve("dist/images");
const DIST_AUDIO_DIR = path.resolve("dist/audio");

async function walkDir(dir) {
  const files = [];

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDir(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

const imageFiles = await walkDir(DIST_IMAGES_DIR);
const originalFiles = imageFiles.filter((filePath) =>
  filePath.endsWith(".webp") &&
  !/(?:[-.]thumb|[-.]card(?:-\d+)?|[-.]display)\.webp$/.test(filePath),
);

await Promise.all(originalFiles.map((filePath) => rm(filePath)));
await rm(DIST_AUDIO_DIR, { recursive: true, force: true });
console.log(`Removed ${originalFiles.length} original images and production audio from dist.`);
