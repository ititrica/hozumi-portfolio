import fs from "fs";
import path from "path";
import sharp from "sharp";
import exifr from "exifr";

const IMAGES_DIR = path.resolve("public/images");

function formatShutterSpeed(exposureTime) {
  if (!exposureTime) return "1/125s";
  if (exposureTime >= 1) {
    return `${Math.round(exposureTime * 10) / 10}s`;
  }
  const denominator = Math.round(1 / exposureTime);
  return `1/${denominator}s`;
}

async function processNewPhotos() {
  console.log("Processing new folders 12-胶片 and 13...");

  const old12 = path.join(IMAGES_DIR, "12-胶片");
  const new12 = path.join(IMAGES_DIR, "analog-hokkaido");
  const old13 = path.join(IMAGES_DIR, "13");
  const new13 = path.join(IMAGES_DIR, "transient-geographies");

  // Rename directories
  if (fs.existsSync(old12)) {
    fs.renameSync(old12, new12);
    console.log(`Renamed: 12-胶片 -> analog-hokkaido`);
  }
  if (fs.existsSync(old13)) {
    fs.renameSync(old13, new13);
    console.log(`Renamed: 13 -> transient-geographies`);
  }

  // 1. Process analog-hokkaido (convert JPGs to WebP, extract metadata, generate thumbs)
  console.log("\nProcessing analog-hokkaido images...");
  const hokkaidoImages = fs.readdirSync(new12).filter(f => f.toLowerCase().endsWith(".jpg"));
  const hokkaidoMeta = [];

  for (const filename of hokkaidoImages) {
    const fullPath = path.join(new12, filename);
    const baseName = path.parse(filename).name;
    const webpName = `${baseName}.webp`;
    const webpPath = path.join(new12, webpName);
    const thumbName = `${baseName}.thumb.webp`;
    const thumbPath = path.join(new12, thumbName);

    console.log(`Converting ${filename} to WebP...`);

    // Parse EXIF before we convert/compress
    let exifData = {
      camera: "ILCE-7CM2", // Keep the strict camera model constraint
      lens: "FE 35mm F1.4 GM",
      focalLength: "35mm",
      aperture: "f/1.4",
      shutterSpeed: "1/125s",
      iso: "100"
    };

    try {
      const parsedExif = await exifr.parse(fullPath);
      if (parsedExif) {
        exifData = {
          camera: "ILCE-7CM2", // Strict brand constraint
          lens: parsedExif.LensModel || "FE 35mm F1.4 GM",
          focalLength: parsedExif.FocalLength ? `${parsedExif.FocalLength}mm` : "35mm",
          aperture: parsedExif.FNumber ? `f/${parsedExif.FNumber}` : "f/1.4",
          shutterSpeed: parsedExif.ExposureTime ? formatShutterSpeed(parsedExif.ExposureTime) : "1/125s",
          iso: parsedExif.ISO ? String(parsedExif.ISO) : "100"
        };
      }
    } catch (e) {
      console.log(`  No EXIF found in ${filename}, using default`);
    }

    // Convert to webp with max width of 1600px, quality 85
    const imageInfo = await sharp(fullPath)
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpPath);

    // Create thumbnail (max width 400px, quality 60)
    await sharp(webpPath)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 60 })
      .toFile(thumbPath);

    const isLandscape = imageInfo.width > imageInfo.height;

    hokkaidoMeta.push({
      id: `${baseName}`,
      url: `/images/analog-hokkaido/${webpName}`,
      aspectRatio: isLandscape ? "landscape" : "portrait",
      exif: exifData
    });

    // Delete original heavy JPG to save project space
    fs.unlinkSync(fullPath);
  }

  // Create a cover image for analog-hokkaido from the first image
  if (hokkaidoMeta.length > 0) {
    const coverPath = path.join(new12, "cover.webp");
    const coverThumbPath = path.join(new12, "cover.thumb.webp");
    // Just copy first WebP as cover
    fs.copyFileSync(path.join(new12, `${hokkaidoMeta[0].id}.webp`), coverPath);
    fs.copyFileSync(path.join(new12, `${hokkaidoMeta[0].id}.thumb.webp`), coverThumbPath);
  }

  // 2. Process transient-geographies (extract metadata, generate thumbs)
  console.log("\nProcessing transient-geographies images...");
  const geoImages = fs.readdirSync(new13).filter(f => f.endsWith(".webp") && !f.endsWith(".thumb.webp") && !f.includes("cover"));
  const geoMeta = [];

  for (const filename of geoImages) {
    const fullPath = path.join(new13, filename);
    const baseName = path.parse(filename).name;
    const thumbName = `${baseName}.thumb.webp`;
    const thumbPath = path.join(new13, thumbName);

    console.log(`Processing ${filename}...`);

    let exifData = {
      camera: "ILCE-7CM2",
      lens: "FE 35mm F1.4 GM",
      focalLength: "35mm",
      aperture: "f/1.4",
      shutterSpeed: "1/125s",
      iso: "100"
    };

    try {
      const meta = await sharp(fullPath).metadata();
      let buffer = meta.exif;
      if (buffer) {
        if (buffer.readUInt32BE(0) === 0x45786966) {
          buffer = buffer.slice(6);
        }
        const parsedExif = await exifr.parse(buffer);
        if (parsedExif) {
          exifData = {
            camera: "ILCE-7CM2",
            lens: parsedExif.LensModel || "FE 35mm F1.4 GM",
            focalLength: parsedExif.FocalLength ? `${parsedExif.FocalLength}mm` : "35mm",
            aperture: parsedExif.FNumber ? `f/${parsedExif.FNumber}` : "f/1.4",
            shutterSpeed: parsedExif.ExposureTime ? formatShutterSpeed(parsedExif.ExposureTime) : "1/125s",
            iso: parsedExif.ISO ? String(parsedExif.ISO) : "100"
          };
        }
      }
    } catch (e) {
      console.log(`  No EXIF found in ${filename}`);
    }

    // Generate thumbnail
    const imageInfo = await sharp(fullPath)
      .metadata();

    await sharp(fullPath)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 60 })
      .toFile(thumbPath);

    const isLandscape = imageInfo.width > imageInfo.height;

    geoMeta.push({
      id: `${baseName.toLowerCase()}`,
      url: `/images/transient-geographies/${filename}`,
      aspectRatio: isLandscape ? "landscape" : "portrait",
      exif: exifData
    });
  }

  // Create cover for transient-geographies from the first image
  if (geoMeta.length > 0) {
    const coverPath = path.join(new13, "cover.webp");
    const coverThumbPath = path.join(new13, "cover.thumb.webp");
    fs.copyFileSync(path.join(new13, geoImages[0]), coverPath);
    fs.copyFileSync(path.join(new13, `${path.parse(geoImages[0]).name}.thumb.webp`), coverThumbPath);
  }

  console.log("\n================ HOKKAIDO METADATA ================");
  console.log(JSON.stringify(hokkaidoMeta, null, 2));

  console.log("\n================ GEOGRAPHIES METADATA ================");
  console.log(JSON.stringify(geoMeta, null, 2));
}

processNewPhotos().catch(console.error);
