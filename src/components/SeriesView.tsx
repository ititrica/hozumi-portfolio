/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { PhotographySeries, Photo } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface SeriesViewProps {
  series: PhotographySeries;
  onBack: () => void;
  onSelectPhoto: (photo: Photo, photos: Photo[]) => void;
  lang: Language;
  key?: string | number;
}

export default function SeriesView({ series, onBack, onSelectPhoto, lang }: SeriesViewProps) {
  const t = UI_TRANSLATIONS[lang];
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Prevent body scroll when active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) return;
    setScrollProgress(scrollTop / totalScroll);
  };

  // Combine cover image and other images
  const { allPhotos, hasVirtualCover } = useMemo(() => {
    const hasCoverInImages = series.images.some(img => img.url === series.coverImage);
    if (hasCoverInImages) {
      return { allPhotos: series.images, hasVirtualCover: false };
    }
    
    const coverPhoto: Photo = {
      id: `${series.id}-cover`,
      url: series.coverImage,
      title: series.title,
      caption: series.description,
      aspectRatio: "landscape",
      location: series.location,
      date: series.year
    };
    return { allPhotos: [coverPhoto, ...series.images], hasVirtualCover: true };
  }, [series]);

  // Set up intersection observer for scroll spy
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-25% 0px -45% 0px", // middle quadrant trigger area
      threshold: 0.05,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idStr = entry.target.getAttribute("data-photo-idx");
          if (idStr !== null) {
            setActiveIdx(parseInt(idStr, 10));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // We observe after a tiny delay to let images paint and offsets stabilize
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll("[data-photo-idx]");
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [series, allPhotos]);

  const scrollToPhoto = (idx: number) => {
    const el = document.getElementById(`photo-row-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const photosList = useMemo(() => {
    return (
      <div className="col-span-12 lg:col-span-10 flex flex-col space-y-3">
        {allPhotos.map((photo, index) => {
          const isCover = photo.id === `${series.id}-cover`;
          const plateNumber = hasVirtualCover ? index : index + 1;
          
          return (
            <div
              key={photo.id}
              id={`photo-row-${index}`}
              data-photo-idx={index}
              className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start scroll-mt-28"
            >
              {/* Left Column: Photo details (Minimalist: only plate index, title, caption) */}
              <div className="col-span-10 lg:col-span-3 flex flex-col space-y-3 pt-4 lg:pr-6 text-left">
                <div className="flex items-baseline justify-between pb-1 transition-colors duration-1000">
                  <span className="font-mono text-[9px] tracking-[0.1em] text-neutral-450 uppercase">
                    {isCover 
                      ? (lang === "zh" ? "封面图" : lang === "ja" ? "カバー" : "COVER PLATES")
                      : `[ ${t.plates} #${plateNumber} ]`
                    }
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-sans text-[13.5px] tracking-[0.08em] font-medium text-neutral-900 dark:text-neutral-100 uppercase transition-colors duration-1000">
                    {photo.title}
                  </h3>
                  <p className="font-serif text-[12px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors duration-1000">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Middle Column: Photo itself */}
              <div 
                className="col-span-10 lg:col-span-7 group relative cursor-pointer overflow-hidden bg-neutral-100 dark:bg-neutral-900/40 select-none shadow-xs transition-colors duration-1000"
                onClick={() => onSelectPhoto(photo, allPhotos)}
                data-cursor="view"
              >
                {/* Visual filter overlay */}
                <div className="absolute inset-0 bg-neutral-950/2 group-hover:bg-transparent transition-all duration-300 z-10" />

                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block transition-transform duration-[1.2s] group-hover:scale-101.5"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [allPhotos, hasVirtualCover, lang, onSelectPhoto, series.id, t.plates]);

  return (
    <motion.div
      ref={containerRef}
      onScroll={handleScroll}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#fafafa] dark:bg-neutral-950 flex flex-col pt-24 transition-colors duration-1000 scrollbar-none"
    >
      {/* Static header backdrop wrapper */}
      <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col pb-32">
        
        {/* Navigation back and details */}
        <div className="flex items-center justify-between py-6 mb-8 transition-colors duration-1000">
          <button
            onClick={onBack}
            className="group text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-1000 py-2"
            data-cursor="nav"
          >
            <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase font-medium transition-colors duration-1000">
              {t.backToCollections}
            </span>
          </button>
        </div>
            {/* Page Header (Minimalist Editorial Layout: Info on Left, Specs on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-12 transition-colors duration-1000">
          {/* Left Side: Category, Year, Title, Subtitle & Description */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div>
              <span className="font-mono text-[9px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase block transition-colors duration-1000">
                {series.category} // {series.year}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.03em] text-neutral-900 dark:text-white leading-tight uppercase mt-1 mb-2 transition-colors duration-1000">
                {series.title}
              </h1>
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400 uppercase block transition-colors duration-1000">
                {series.subtitle}
              </span>
            </div>

            <p className="font-serif text-[13.5px] leading-relaxed font-light text-neutral-600 dark:text-neutral-400 max-w-2xl transition-colors duration-1000">
              {series.description}
            </p>
          </div>

          {/* Right Side: Technical Specs / Roles */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-y-6 gap-x-8 lg:pl-12 pt-6 lg:pt-10 transition-colors duration-1000">
            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[7px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">{t.location}</span>
              <span className="font-sans text-[10px] tracking-wide font-medium text-neutral-850 dark:text-neutral-200 uppercase transition-colors duration-1000">{series.location}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[7px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">{t.coordinates}</span>
              <span className="font-mono text-[9.5px] text-neutral-850 dark:text-neutral-200 transition-colors duration-1000 truncate">{series.coordinates}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[7px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">{t.timeline}</span>
              <span className="font-sans text-[10px] tracking-wide font-medium text-neutral-850 dark:text-neutral-200 transition-colors duration-1000">2024 — {series.year}</span>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[7px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">{t.medium}</span>
              <span className="font-sans text-[10px] tracking-wide font-medium text-neutral-850 dark:text-neutral-200 uppercase transition-colors duration-1000">Sony ILCE-7CM2</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
          {/* Photos list (Left text + Middle photo) */}
          {photosList}

          {/* Empty spacer column to reserve grid layout space */}
          <div className="hidden lg:block lg:col-span-2" />
        </div>

        {/* Fixed Progress Navigation Overlay (pixel-perfect mirrored grid layout) */}
        <div className="fixed inset-0 pointer-events-none z-40 hidden lg:block">
          <div className="max-w-[1600px] mx-auto w-full px-6 h-full grid grid-cols-12 gap-8 items-center">
            <div className="col-start-11 col-span-2 flex justify-center pointer-events-auto">
              
              {/* Relative buttons wrapper block - 96x72 per thumbnail, stacked closely */}
              <div className="relative flex flex-col space-y-0">
                {allPhotos.map((photo, index) => (
                  <button
                    key={`thumb-${photo.id}`}
                    onClick={() => scrollToPhoto(index)}
                    className="w-[96px] h-[72px] overflow-hidden opacity-50 hover:opacity-85 transition-opacity block focus:outline-none"
                    data-cursor="nav"
                  >
                    <img
                      src={photo.url.replace(/\.webp$/, ".thumb.webp")}
                      alt={`Thumbnail ${index}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

                {/* Freely moving stepless indicator frame */}
                <motion.div
                  className="absolute top-0 left-0 w-[96px] h-[72px] border-2 border-neutral-950 dark:border-white pointer-events-none z-10"
                  animate={{ y: scrollProgress * (allPhotos.length - 1) * 72 }}
                  transition={{ type: "spring", stiffness: 180, damping: 25, mass: 0.35 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Series closing button */}
        <div className="mt-32 pt-12 flex justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-mono text-[8.5px] tracking-[0.18em] uppercase transition-colors rounded-none"
          >
            {t.returnToCatalogue}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
