import fs from "fs";
import path from "path";
import sharp from "sharp";
import exifr from "exifr";
import { PHOTOGRAPHY_DATA } from "../src/data";

function formatShutterSpeed(exposureTime: number): string {
  if (!exposureTime) return "1/125s";
  if (exposureTime >= 1) {
    return `${Math.round(exposureTime * 10) / 10}s`;
  }
  const denominator = Math.round(1 / exposureTime);
  return `1/${denominator}s`;
}

async function extractAndUpdateExif() {
  console.log("Starting real EXIF extraction...");

  // Deep copy the photography data to avoid mutations
  const updatedData = JSON.parse(JSON.stringify(PHOTOGRAPHY_DATA));

  let updateCount = 0;

  for (const series of updatedData) {
    console.log(`Processing series: ${series.title}`);
    for (const image of series.images) {
      const filePath = path.join("public", image.url);
      if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        continue;
      }

      try {
        const meta = await sharp(filePath).metadata();
        if (meta.exif) {
          let buffer = meta.exif;
          // Strip "Exif\0\0" header (6 bytes) if present
          if (buffer.readUInt32BE(0) === 0x45786966) {
            buffer = buffer.slice(6);
          }
          const parsed = await exifr.parse(buffer);

          if (parsed && (parsed.ExposureTime || parsed.FNumber || parsed.ISO || parsed.FocalLength)) {
            // Update EXIF data using real extracted parameters, keeping Camera Body constraint as ILCE-7CM2
            image.exif = {
              camera: "ILCE-7CM2", // Keep the strict camera model constraint
              lens: parsed.LensModel || image.exif?.lens || "FE 35mm F1.4 GM",
              focalLength: parsed.FocalLength ? `${parsed.FocalLength}mm` : (image.exif?.focalLength || "35mm"),
              aperture: parsed.FNumber ? `f/${parsed.FNumber}` : (image.exif?.aperture || "f/1.4"),
              shutterSpeed: parsed.ExposureTime ? formatShutterSpeed(parsed.ExposureTime) : (image.exif?.shutterSpeed || "1/125s"),
              iso: parsed.ISO ? String(parsed.ISO) : (image.exif?.iso || "100")
            };

            updateCount++;
            console.log(`  [UPDATED EXIF] ${image.title}: ${JSON.stringify(image.exif)}`);
          }
        }
      } catch (err) {
        console.error(`  Error parsing EXIF for ${image.title}:`, err);
      }
    }
  }

  // Generate output TS file content
  const outputCode = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographySeries } from "./types";

export const PHOTOGRAPHY_DATA: PhotographySeries[] = ${JSON.stringify(updatedData, null, 2)};
`;

  const destPath = path.resolve("src/data.ts");
  fs.writeFileSync(destPath, outputCode, "utf-8");
  console.log(`\nSuccessfully updated ${destPath} with ${updateCount} parsed EXIF entries.`);
}

extractAndUpdateExif().catch(console.error);
