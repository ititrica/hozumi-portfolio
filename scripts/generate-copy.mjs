import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const copyDir = path.join(__dirname, '..', 'copy', 'series');

if (!fs.existsSync(copyDir)) fs.mkdirSync(copyDir, { recursive: true });

const dataSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'data.ts'), 'utf8');
const i18nSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'i18n.ts'), 'utf8');

const seriesRegex = /"id":\s*"([^"]+)",\s*\n\s*"title":\s*"([^"]+)",\s*\n\s*"subtitle":\s*"([^"]+)",\s*\n\s*"description":\s*"([^"]+)",\s*\n\s*"category":\s*"([^"]+)",\s*\n\s*"year":\s*"([^"]+)",\s*\n\s*"location":\s*"([^"]+)",\s*\n\s*"coordinates":\s*"([^"]+)",/g;

// Extract zh section
const zhMatch = i18nSrc.match(/\n\s+zh:\s*\{([\s\S]*?)\n\s+\},?\n/);
const zhSection = zhMatch ? zhMatch[1] : '';
// Extract ja section
const jaMatch = i18nSrc.match(/\n\s+ja:\s*\{([\s\S]*?)\n\s+\};/);
const jaSection = jaMatch ? jaMatch[1] : '';

let count = 0;
let m;
while ((m = seriesRegex.exec(dataSrc)) !== null) {
  const [_, id, title, subtitle, desc, category, year, location, coords] = m;

  const block = dataSrc.slice(m.index, m.index + 5000);
  const ctMatch = block.match(/"coverTitle":\s*"([^"]+)"/);
  const ccMatch = block.match(/"coverCaption":\s*"([^"]+)"/);
  const coverTitle = ctMatch ? ctMatch[1] : '';
  const coverCaption = ccMatch ? ccMatch[1] : '';

  // Extract images
  const imgArrMatch = block.match(/"images":\s*\[([\s\S]*?)\]\s*\];/);
  let images = [];
  if (imgArrMatch) {
    const imgObjs = imgArrMatch[1].match(/\{[\s\S]*?\}(?=\s*,|\s*\])/g) || [];
    for (const obj of imgObjs) {
      const idM = obj.match(/"id":\s*"([^"]+)"/);
      if (idM && idM[1] !== 'cover') {
        images.push({
          id: idM[1],
          title: (obj.match(/"title":\s*"([^"]+)"/) || [,''])[1],
          caption: (obj.match(/"caption":\s*"([^"]+)"/) || [,''])[1],
          location: (obj.match(/"location":\s*"([^"]+)"/) || [,''])[1],
        });
      }
    }
  }

  // Helper: extract translation block for a language section and series id
  const getTrans = (langSection, seriesId) => {
    const seriesMatch = langSection.match(new RegExp('"' + seriesId + '":\\s*\\{([\\s\\S]*?)\\n\\s+\\},?'));
    return seriesMatch ? seriesMatch[1] : '';
  };
  const getField = (block, key) => {
    const r = block.match(new RegExp('\\n\\s+' + key + '?:\\s*"([^"]+)"'));
    return r ? r[1] : '';
  };
  const getImgTrans = (block) => {
    const imgs = {};
    const imgBlock = block.match(/"images":\s*\{([\s\S]*?)\}/);
    if (imgBlock) {
      const entries = imgBlock[1].match(/"(\d+)":\s*\{[\s\S]*?\}/g) || [];
      for (const e of entries) {
        const km = e.match(/"(\d+)"/);
        if (km) imgs[km[1]] = {
          title: (e.match(/title:\s*"([^"]+)"/) || [,''])[1],
          caption: (e.match(/caption:\s*"([^"]+)"/) || [,''])[1],
          location: (e.match(/location:\s*"([^"]+)"/) || [,''])[1],
        };
      }
    }
    return imgs;
  };

  // Collect translations
  const zhTrans = getTrans(zhSection, id);
  const jaTrans = getTrans(jaSection, id);
  const zhImgs = getImgTrans(zhTrans);
  const jaImgs = getImgTrans(jaTrans);

  const writeLang = (lang, langTrans, langImgs) => {
    let lines = [];
    lines.push('[' + lang + ']');
    lines.push('title = ' + (getField(langTrans, 'title') || title));
    lines.push('subtitle = ' + (getField(langTrans, 'subtitle') || subtitle));
    lines.push('description = ' + (getField(langTrans, 'description') || desc));
    lines.push('category = ' + (getField(langTrans, 'category') || category));
    lines.push('location = ' + (getField(langTrans, 'location') || location));
    lines.push('year = ' + year);
    lines.push('coordinates = ' + coords);
    const ct = getField(langTrans, 'coverTitle') || coverTitle;
    const cc = getField(langTrans, 'coverCaption') || coverCaption;
    if (ct) lines.push('coverTitle = ' + ct);
    if (cc) lines.push('coverCaption = ' + cc);
    lines.push('');
    for (const img of images) {
      const t = langImgs[img.id] || {};
      lines.push('img.' + img.id + '.title = ' + (t.title || img.title));
      lines.push('img.' + img.id + '.caption = ' + (t.caption || img.caption));
      const loc = t.location || img.location;
      if (loc) lines.push('img.' + img.id + '.location = ' + loc);
      lines.push('');
    }
    return lines;
  };

  let allLines = [];
  allLines.push(...writeLang('en', '', {}));
  allLines.push(...writeLang('zh', zhTrans, zhImgs));
  allLines.push(...writeLang('ja', jaTrans, jaImgs));
  const filePath = path.join(copyDir, id + '.txt');
  fs.writeFileSync(filePath, allLines.join('\n'));
  count++;
}
console.log('Generated ' + count + ' series copy files');
