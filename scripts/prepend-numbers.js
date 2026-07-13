import fs from "fs";
import path from "path";

const MAPPINGS = [
  { oldDir: "solitary-drift", newDir: "01-solitary-drift" },
  { oldDir: "monochrome-studies", newDir: "02-monochrome-studies" },
  { oldDir: "expressions", newDir: "03-expressions" },
  { oldDir: "urban-connection", newDir: "04-urban-connection" },
  { oldDir: "winter-illusion", newDir: "05-winter-illusion" },
  { oldDir: "northern-fragments", newDir: "06-northern-fragments" },
  { oldDir: "tracks-and-tides", newDir: "07-tracks-and-tides" },
  { oldDir: "xiao-yuanhang", newDir: "08-xiao-yuanhang" },
  { oldDir: "okinawa-breeze", newDir: "09-okinawa-breeze" },
  { oldDir: "transient-states", newDir: "10-transient-states" },
  { oldDir: "diptych-of-her", newDir: "11-diptych-of-her" },
  { oldDir: "analog-hokkaido", newDir: "12-analog-hokkaido" },
  { oldDir: "transient-geographies", newDir: "13-transient-geographies" }
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

  const dataTsPath = path.resolve("src/data.ts");
  if (!fs.existsSync(dataTsPath)) {
    console.log(`File not found: ${dataTsPath}`);
    return;
  }

  let content = fs.readFileSync(dataTsPath, "utf-8");
  let original = content;

  MAPPINGS.forEach((m) => {
    // Replace URL paths in data.ts
    // E.g. /images/solitary-drift/ -> /images/01-solitary-drift/
    const regex = new RegExp(`/images/${m.oldDir}/`, "g");
    content = content.replace(regex, `/images/${m.newDir}/`);
  });

  if (content !== original) {
    fs.writeFileSync(dataTsPath, content, "utf-8");
    console.log(`Updated references in: data.ts`);
  } else {
    console.log(`No changes made to: data.ts`);
  }
}

renameFolders();
updateCodebase();
console.log("\nFolder prepending and reference updates completed.");
