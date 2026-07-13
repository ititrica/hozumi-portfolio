import fs from "fs";
import path from "path";

const MAPPINGS = [
  { oldDir: "silent-monoliths", oldId: "silent-monoliths", newDir: "solitary-drift", newId: "solitary-drift" },
  { oldDir: "paris-spleen", oldId: "paris-spleen", newDir: "monochrome-studies", newId: "monochrome-studies" },
  { oldDir: "ethereal-shores", oldId: "ethereal-shores", newDir: "expressions", newId: "expressions" },
  { oldDir: "human-landscapes", oldId: "human-landscapes", newDir: "urban-connection", newId: "urban-connection" },
  { oldDir: "interstate-chronicles", oldId: "interstate-chronicles", newDir: "winter-illusion", newId: "winter-illusion" },
  { oldDir: "6", oldId: "thresholds", newDir: "northern-fragments", newId: "northern-fragments" },
  { oldDir: "7", oldId: "ephemera", newDir: "tracks-and-tides", newId: "tracks-and-tides" },
  { oldDir: "8", oldId: "inscapes", newDir: "xiao-yuanhang", newId: "xiao-yuanhang" },
  { oldDir: "9", oldId: "outskirts", newDir: "okinawa-breeze", newId: "okinawa-breeze" },
  { oldDir: "10", oldId: "vistas", newDir: "transient-states", newId: "transient-states" },
  { oldDir: "11", oldId: "pairing", newDir: "diptych-of-her", newId: "diptych-of-her" }
];

const IMAGES_DIR = path.resolve("public/images");

function renameFolders() {
  console.log("Renaming folders in", IMAGES_DIR);

  MAPPINGS.forEach((m) => {
    const oldPath = path.join(IMAGES_DIR, m.oldDir);
    const newPath = path.join(IMAGES_DIR, m.newDir);

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed directory: ${m.oldDir} -> ${m.newDir}`);
    } else {
      console.log(`Directory not found (or already renamed): ${m.oldDir}`);
    }
  });
}

function updateCodebase() {
  console.log("\nUpdating codebase references...");

  const filesToUpdate = [
    { filepath: path.resolve("src/data.ts"), type: "content" },
    { filepath: path.resolve("src/i18n.ts"), type: "content" },
    { filepath: path.resolve("src/components/HomeWheelView.tsx"), type: "content" }
  ];

  filesToUpdate.forEach((f) => {
    if (!fs.existsSync(f.filepath)) {
      console.log(`File not found: ${f.filepath}`);
      return;
    }

    let content = fs.readFileSync(f.filepath, "utf-8");
    let original = content;

    MAPPINGS.forEach((m) => {
      // 1. Replace folder image URLs
      // E.g. /images/6/ -> /images/northern-fragments/
      const regexUrl1 = new RegExp(`/images/${m.oldDir}/`, "g");
      content = content.replace(regexUrl1, `/images/${m.newDir}/`);

      // E.g. /images/6\" -> /images/northern-fragments\" (if there's no trailing slash, or backslash)
      // E.g. \\"images/6/
      const regexUrl2 = new RegExp(`images/${m.oldDir}/`, "g");
      content = content.replace(regexUrl2, `images/${m.newDir}/`);

      // 2. Replace series ID values in TS/TSX files
      // E.g. "id": "thresholds" -> "id": "northern-fragments"
      // or "thresholds": { -> "northern-fragments": {
      // or series.id === "inscapes" -> series.id === "xiao-yuanhang"
      const regexId1 = new RegExp(`"${m.oldId}"`, "g");
      content = content.replace(regexId1, `"${m.newId}"`);

      const regexId2 = new RegExp(`'${m.oldId}'`, "g");
      content = content.replace(regexId2, `'${m.newId}'`);

      // Special case for properties key in i18n
      const regexId3 = new RegExp(`^(\\s*)${m.oldId}:`, "gm");
      content = content.replace(regexId3, `$1${m.newId}:`);

      // E.g. series.id === "inscapes" -> series.id === "xiao-yuanhang"
      const regexId4 = new RegExp(`series.id === "${m.oldId}"`, "g");
      content = content.replace(regexId4, `series.id === "${m.newId}"`);
    });

    if (content !== original) {
      fs.writeFileSync(f.filepath, content, "utf-8");
      console.log(`Updated references in: ${path.basename(f.filepath)}`);
    } else {
      console.log(`No changes made to: ${path.basename(f.filepath)}`);
    }
  });
}

renameFolders();
updateCodebase();
console.log("\nFolder renaming and reference update completed successfully.");
