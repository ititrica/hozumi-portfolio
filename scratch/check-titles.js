import { PHOTOGRAPHY_DATA } from "../src/data.js";

PHOTOGRAPHY_DATA.forEach((s, idx) => {
  console.log(`INDEX: ${idx + 1}`);
  console.log(`  ID: ${s.id}`);
  console.log(`  TITLE: ${s.title}`);
  console.log(`  COVER: ${s.coverImage}`);
  if (s.images.length > 0) {
    console.log(`  FIRST IMAGE: ${s.images[0].url}`);
  }
});
