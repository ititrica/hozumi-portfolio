import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { PhotographySeries } from "../types";
import { Language } from "../i18n";
import { getMediaUrl } from "../utils/media";

const SITE_URL = "https://hozumifolio.uk";

const SEO_COPY = {
  en: {
    siteName: "Hozumi Photography",
    homeTitle: "Hozumi Photography | Visual Art Portfolio",
    homeDescription: "Hozumi (hozumifolio) is a photography and visual art portfolio featuring portraits, street photography, architecture, and quiet visual stories from Japan and Asia.",
    aboutTitle: "About Hozumi | Photographer & Visual Artist",
    aboutDescription: "Learn about Hozumi, a photographer and visual artist working across portraits, street photography, architecture, and film.",
    playgroundTitle: "Photography Playground | Hozumi",
    playgroundDescription: "Explore Hozumi's interactive photography playground and browse images from the complete series collection.",
    imageAlt: "Hozumi photography and visual art",
    locale: "en_US",
    language: "en",
  },
  zh: {
    siteName: "Hozumi 摄影集",
    homeTitle: "Hozumi 摄影集 | 视觉艺术作品集",
    homeDescription: "Hozumi（hozumifolio）摄影集与视觉艺术作品集，收录人像、街头摄影、建筑摄影及来自日本与亚洲的安静视觉故事。",
    aboutTitle: "关于 Hozumi | 摄影师与视觉艺术家",
    aboutDescription: "了解 Hozumi 的创作背景，以及人像、街头摄影、建筑摄影与胶片作品。",
    playgroundTitle: "摄影实验场 | Hozumi 摄影集",
    playgroundDescription: "探索 Hozumi 的互动摄影实验场，浏览完整摄影系列中的图像作品。",
    imageAlt: "Hozumi 摄影集与视觉艺术作品",
    locale: "zh_CN",
    language: "zh-CN",
  },
  ja: {
    siteName: "Hozumi 写真集",
    homeTitle: "Hozumi 写真集 | ビジュアルアート・ポートフォリオ",
    homeDescription: "Hozumi（hozumifolio）の写真集とビジュアルアート作品。人物、ストリート、建築、日本とアジアの静かな物語を紹介します。",
    aboutTitle: "Hozumiについて | 写真家・ビジュアルアーティスト",
    aboutDescription: "人物、ストリート、建築、フィルム写真を制作する写真家・ビジュアルアーティストHozumiについて。",
    playgroundTitle: "写真プレイグラウンド | Hozumi",
    playgroundDescription: "Hozumiのインタラクティブな写真プレイグラウンドで、全シリーズの作品をご覧ください。",
    imageAlt: "Hozumi 写真集とビジュアルアート作品",
    locale: "ja_JP",
    language: "ja",
  },
} as const;

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
  return value.startsWith("http") ? value : SITE_URL + getMediaUrl(value);
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
    const copy = SEO_COPY[lang];

    const title = series
      ? `${series.title} | ${lang === "zh" ? "Hozumi 摄影集" : lang === "ja" ? "Hozumi 写真集" : "Hozumi Photography"}`
      : routePath === "/about"
        ? copy.aboutTitle
        : routePath === "/playground"
          ? copy.playgroundTitle
          : copy.homeTitle;
    const description = series
      ? series.description
      : routePath === "/about"
        ? copy.aboutDescription
        : routePath === "/playground"
          ? copy.playgroundDescription
          : copy.homeDescription;
    const image = series ? absoluteUrl(series.coverImage) : `${SITE_URL}/images/about-profile.webp`;
    const imageAlt = series
      ? `${series.title} ${lang === "zh" ? "摄影系列封面" : lang === "ja" ? "写真シリーズのカバー" : "photography series cover"}`
      : copy.imageAlt;
    const locale = copy.locale;

    document.title = title;
    document.documentElement.lang = copy.language;
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
    setMeta("name", "keywords", lang === "zh"
      ? "Hozumi, hozumifolio, 摄影集, 摄影作品集, 视觉艺术, 人像摄影, 街头摄影, 建筑摄影, 日本摄影"
      : lang === "ja"
        ? "Hozumi, hozumifolio, 写真集, 写真ポートフォリオ, ビジュアルアート, ポートレート, ストリート写真, 建築写真, 日本写真"
        : "Hozumi, hozumifolio, photography portfolio, visual art, portrait photography, street photography, architecture photography, Japan photography");
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
          name: copy.siteName,
          alternateName: ["Hozumi", "hozumifolio", "Hozumi Photography", "Hozumi 摄影集", "Hozumi 写真集"],
          url: SITE_URL,
          description: copy.homeDescription,
          inLanguage: copy.language,
          publisher: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: "Hozumi",
          alternateName: "hozumifolio",
          url: `${SITE_URL}/about`,
          image: `${SITE_URL}/images/about-profile.webp`,
          jobTitle: lang === "zh" ? "摄影师与视觉艺术家" : lang === "ja" ? "写真家・ビジュアルアーティスト" : "Photographer and Visual Artist",
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
