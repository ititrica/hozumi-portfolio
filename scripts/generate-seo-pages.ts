import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { PHOTOGRAPHY_DATA } from "../src/data";

const SITE_URL = "https://hozumifolio.uk";
const DIST_DIR = resolve(process.cwd(), "dist");

type RouteMeta = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "article";
  jsonLdType: "CollectionPage" | "AboutPage" | "ImageGallery";
  keywords: string;
  seriesId?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function absoluteUrl(value: string) {
  return value.startsWith("http") ? value : `${SITE_URL}${value}`;
}

function replaceMeta(html: string, attribute: "name" | "property", key: string, value: string) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  const element = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, element) : html.replace("</head>", `    ${element}\n  </head>`);
}

function replaceCanonical(html: string, url: string) {
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i;
  const element = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  return pattern.test(html) ? html.replace(pattern, element) : html.replace("</head>", `    ${element}\n  </head>`);
}

function replaceStructuredData(html: string, data: unknown) {
  const pattern = /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i;
  const content = JSON.stringify(data, null, 2);
  const element = `<script id="structured-data" type="application/ld+json">\n    ${content}\n    </script>`;
  return pattern.test(html) ? html.replace(pattern, element) : html.replace("</head>", `    ${element}\n  </head>`);
}

function makeStructuredData(meta: RouteMeta) {
  const pageUrl = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const page: Record<string, unknown> = {
    "@type": meta.jsonLdType,
    "@id": `${pageUrl}#page`,
    name: meta.title,
    url: pageUrl,
    description: meta.description,
    image: meta.image,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en",
  };

  if (meta.seriesId) {
    const series = PHOTOGRAPHY_DATA.find((item) => item.id === meta.seriesId);
    if (series) {
      page.about = {
        "@type": "Photograph",
        name: series.title,
        description: series.description,
        contentUrl: absoluteUrl(series.coverImage),
      };
      page.hasPart = series.images.map((photo) => ({
        "@type": "Photograph",
        name: photo.title,
        description: photo.caption,
        contentUrl: absoluteUrl(photo.url),
      }));
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Hozumi Photography",
        alternateName: ["Hozumi", "hozumifolio", "Hozumi 摄影集", "Hozumi 写真集"],
        url: SITE_URL,
        description: "Hozumi's photography and visual art portfolio.",
        inLanguage: ["en", "zh-CN", "ja"],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Hozumi",
        alternateName: "hozumifolio",
        url: `${SITE_URL}/about`,
        image: `${SITE_URL}/images/about-profile.webp`,
        jobTitle: "Photographer and Visual Artist",
        knowsAbout: ["Photography", "Visual Art", "Street Photography", "Architecture Photography", "Portrait Photography"],
        worksFor: { "@id": websiteId },
      },
      page,
    ],
  };
}

function renderRoute(template: string, meta: RouteMeta) {
  const pageUrl = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  let html = template.replace(/<html\s+[^>]*>/i, '<html lang="en" translate="no" class="dark">');
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceMeta(html, "name", "description", meta.description);
  html = replaceMeta(html, "name", "keywords", meta.keywords);
  html = replaceMeta(html, "property", "og:title", meta.title);
  html = replaceMeta(html, "property", "og:description", meta.description);
  html = replaceMeta(html, "property", "og:type", meta.type);
  html = replaceMeta(html, "property", "og:url", pageUrl);
  html = replaceMeta(html, "property", "og:image", meta.image);
  html = replaceMeta(html, "property", "og:image:alt", meta.imageAlt);
  html = replaceMeta(html, "name", "twitter:title", meta.title);
  html = replaceMeta(html, "name", "twitter:description", meta.description);
  html = replaceMeta(html, "name", "twitter:image", meta.image);
  html = replaceMeta(html, "name", "twitter:image:alt", meta.imageAlt);
  html = replaceCanonical(html, pageUrl);
  html = replaceStructuredData(html, makeStructuredData(meta));
  return html;
}

function getRoutes(): RouteMeta[] {
  const commonKeywords = "Hozumi, hozumifolio, Hozumi Photography, photography portfolio, visual art, portrait photography, street photography, architecture photography, Japan photography, 摄影集, 写真集";
  const routes: RouteMeta[] = [
    {
      path: "/",
      title: "Hozumi Photography | Visual Art Portfolio",
      description: "Hozumi (hozumifolio) is a photography and visual art portfolio featuring portraits, street photography, architecture, and quiet visual stories from Japan and Asia.",
      image: `${SITE_URL}/images/about-profile.webp`,
      imageAlt: "Hozumi photography and visual art",
      type: "website",
      jsonLdType: "CollectionPage",
      keywords: commonKeywords,
    },
    {
      path: "/about",
      title: "About Hozumi | Photographer & Visual Artist",
      description: "Learn about Hozumi, a photographer and visual artist working across portraits, street photography, architecture, and film.",
      image: `${SITE_URL}/images/about-profile.webp`,
      imageAlt: "Portrait of Hozumi, photographer and visual artist",
      type: "website",
      jsonLdType: "AboutPage",
      keywords: commonKeywords,
    },
    {
      path: "/playground",
      title: "Photography Playground | Hozumi",
      description: "Explore Hozumi's interactive photography playground and browse images from the complete series collection.",
      image: `${SITE_URL}/images/about-profile.webp`,
      imageAlt: "Hozumi interactive photography playground",
      type: "website",
      jsonLdType: "CollectionPage",
      keywords: commonKeywords,
    },
  ];

  for (const series of PHOTOGRAPHY_DATA) {
    routes.push({
      path: `/series/${series.id}`,
      title: `${series.title} | Hozumi Photography`,
      description: series.description,
      image: absoluteUrl(series.coverImage),
      imageAlt: `${series.title} photography series cover`,
      type: "article",
      jsonLdType: "ImageGallery",
      keywords: `${commonKeywords}, ${series.title}, ${series.subtitle}, ${series.category}`,
      seriesId: series.id,
    });
  }

  return routes;
}

const template = await readFile(resolve(DIST_DIR, "index.html"), "utf8");

for (const route of getRoutes()) {
  const routeDirectory = resolve(DIST_DIR, route.path === "/" ? "." : route.path.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(resolve(routeDirectory, "index.html"), renderRoute(template, route), "utf8");
}

console.log(`Generated static SEO HTML for ${getRoutes().length} routes.`);
