import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { PhotographySeries } from "../types";
import { Language } from "../i18n";

const SITE_URL = "https://hozumipfol.cc.cd";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

function absoluteUrl(value: string) {
  return value.startsWith("http") ? value : `${SITE_URL}${value}`;
}

interface SeoManagerProps {
  photographyData: PhotographySeries[];
  lang: Language;
}

export default function SeoManager({ photographyData, lang }: SeoManagerProps) {
  const location = useLocation();

  useEffect(() => {
    const routePath = location.pathname.replace(/\/+$/, "") || "/";
    const seriesId = routePath.match(/^\/series\/([^/]+)$/)?.[1];
    const series = seriesId ? photographyData.find((item) => item.id === seriesId) : undefined;
    const pageUrl = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;

    const title = series
      ? `${series.title} | Hozumi Photography`
      : routePath === "/about"
        ? "About Hozumi | Photography & Visual Art"
        : routePath === "/playground"
          ? "Playground | Hozumi Photography"
          : "Hozumi 摄影集 | Photography & Visual Art Portfolio";
    const description = series
      ? series.description
      : routePath === "/about"
        ? "Learn about Hozumi, a Chinese digital visual artist and photographer working between architecture, portraits, street photography, and film."
        : routePath === "/playground"
          ? "Explore Hozumi's interactive photography playground and browse images from the complete series collection."
          : "Hozumi（hozumipfol）摄影集与视觉艺术作品集，收录人像、街头摄影、建筑摄影及来自日本与亚洲的安静视觉故事。";
    const image = series ? absoluteUrl(series.coverImage) : `${SITE_URL}/images/about-profile.webp`;
    const imageAlt = series ? `${series.title} photography series cover` : "Hozumi photography and visual art";
    const locale = lang === "zh" ? "zh_CN" : lang === "ja" ? "ja_JP" : "en_US";

    document.title = title;
    document.documentElement.lang = lang;
    setCanonical(pageUrl);
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", series ? "article" : "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("property", "og:site_name", "Hozumi");
    setMeta("property", "og:locale", locale);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:image:alt", imageAlt);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Hozumi 摄影集",
          alternateName: ["Hozumi", "hozumipfol", "Hozumi Photography"],
          url: SITE_URL,
          description: "Hozumi 的摄影集与视觉艺术作品集。",
          inLanguage: ["zh-CN", "en", "ja"],
          publisher: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: "Hozumi",
          alternateName: "hozumipfol",
          url: `${SITE_URL}/about`,
          image: `${SITE_URL}/images/about-profile.webp`,
          jobTitle: "Photographer and Visual Artist",
          knowsAbout: ["Photography", "Visual Art", "Street Photography", "Architecture Photography", "Portrait Photography"],
        },
        {
          "@type": series ? "ImageGallery" : "CollectionPage",
          "@id": `${pageUrl}#page`,
          name: title,
          url: pageUrl,
          description,
          image,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#person` },
          ...(series
            ? {
                about: {
                  "@type": "Photograph",
                  name: series.title,
                  description: series.description,
                  contentUrl: image,
                },
                hasPart: series.images.map((photo) => ({
                  "@type": "Photograph",
                  name: photo.title,
                  description: photo.caption,
                  contentUrl: absoluteUrl(photo.url),
                })),
              }
            : {}),
        },
      ],
    };

    let script = document.head.querySelector<HTMLScriptElement>("#structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [location.pathname, photographyData, lang]);

  return null;
}
