/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { PhotographySeries, Photo } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";
import { playButtonFeedback } from "../utils/uiSound";

interface SeriesViewProps {
  series: PhotographySeries;
  onBack: () => void;
  onSelectPhoto: (photo: Photo, photos: Photo[]) => void;
  lang: Language;
  onReady?: () => void;
  key?: string | number;
}

export default function SeriesView({ series, onBack, onSelectPhoto, lang, onReady }: SeriesViewProps) {
  const t = UI_TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const photosColRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);

  // Dynamic gutter measurement for progress bar positioning
  const [gutterInfo, setGutterInfo] = useState({ centerX: 0, width: 0, vpHeight: 600 });
  useEffect(() => {
    const measure = () => {
      const el = photosColRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const photosRight = rect.right;
      const vpWidth = window.innerWidth;
      const vpHeight = window.innerHeight;
      const gutterW = vpWidth - photosRight;
      const centerX = photosRight + gutterW / 2;
      setGutterInfo({ centerX, width: gutterW, vpHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (photosColRef.current) ro.observe(photosColRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  // Prevent body scroll when active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) return;
    scrollProgressRef.current = scrollTop / totalScroll;
    if (scrollFrameRef.current !== null) return;
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      setScrollProgress(scrollProgressRef.current);
    });
  };

  useEffect(() => () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }
  }, []);

  // Combine cover image and other images
  const { allPhotos, hasVirtualCover } = useMemo(() => {
    const hasCoverInImages = series.images.some(img => img.url === series.coverImage);
    if (hasCoverInImages) {
      return { allPhotos: series.images, hasVirtualCover: false };
    }
    
    const coverPhoto: Photo = {
      id: `${series.id}-cover`,
      url: series.coverImage,
      title: series.coverTitle ?? series.title,
      caption: series.coverCaption ?? series.description,
      aspectRatio: "landscape",
      location: series.location,
      date: series.year
    };
    return { allPhotos: [coverPhoto, ...series.images], hasVirtualCover: true };
  }, [series]);

  const scrollToPhoto = (idx: number) => {
    const el = document.getElementById(`photo-row-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Thumbnail size derived from gutter width (clamped 64–160px wide, 4:3 ratio)
  const thumbW = Math.max(64, Math.min(160, Math.floor(gutterInfo.width * 0.7)));
  const thumbH = Math.round(thumbW * 0.75);
  const framePad = 4; // gap between indicator frame and thumbnail edge

  // Scale strip down if total height exceeds viewport
  const totalStripH = allPhotos.length * thumbH;
  const maxStripH = gutterInfo.vpHeight * 0.78;
  const stripScale = totalStripH > maxStripH ? maxStripH / totalStripH : 1;

  const photosList = useMemo(() => {
    return (
      <div ref={photosColRef} className="col-span-12 lg:col-span-10 flex flex-col space-y-3">
        {allPhotos.map((photo, index) => {
          const plateNumber = index + 1;

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
                    {`[ ${t.plates} #${plateNumber} ]`}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-sans text-[13.5px] tracking-[0.08em] font-medium text-neutral-900 dark:text-neutral-100 uppercase transition-colors duration-1000">
                    {photo.title}
                  </h3>
                  <p className="font-serif text-[12.5px] font-normal text-neutral-700 dark:text-neutral-300 leading-loose transition-colors duration-1000">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Middle Column: Photo itself */}
              <div 
                className="col-span-10 lg:col-span-7 group relative cursor-pointer overflow-hidden bg-neutral-100 dark:bg-neutral-900/40 select-none shadow-xs transition-colors duration-1000"
                onClick={() => {
                  playButtonFeedback();
                  onSelectPhoto(photo, allPhotos);
                }}
                data-cursor="view"
              >
                {/* Visual filter overlay */}
                <div className="absolute inset-0 bg-neutral-950/2 group-hover:bg-transparent transition-all duration-300 z-10" />

                <img
                  src={photo.url.replace(/\.webp$/, "-display.webp")}
                  alt={photo.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.src.endsWith("-display.webp")) image.src = photo.url;
                  }}
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
    <>
    <motion.div
      ref={containerRef}
      onScroll={handleScroll}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#fafafa] dark:bg-[#0e0c0b] flex flex-col pt-36 transition-colors duration-1000 scrollbar-none"
    >
      {/* Static header backdrop wrapper */}
      <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col pb-32">
        

        {/* Page Header — title left, location+date right-aligned with photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 pb-12 transition-colors duration-1000">
          {/* Left: Category, Year, Title, Subtitle & Description */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
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

            <p className="font-serif text-[14px] leading-loose font-normal text-neutral-700 dark:text-neutral-300 max-w-xl transition-colors duration-1000">
              {series.description}
            </p>
          </div>

          {/* Right: Location & Date only, right-aligned within col 7-10 */}
          <div className="lg:col-span-4 flex flex-col items-end gap-6 pt-6 lg:pt-14 transition-colors duration-1000">
            <div className="flex flex-col items-end space-y-1">
              <span className="font-mono text-[7px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">{t.location}</span>
              <span className="font-sans text-[10px] tracking-wide font-medium text-neutral-850 dark:text-neutral-200 uppercase transition-colors duration-1000">{series.location}</span>
            </div>

            <div className="flex flex-col items-end space-y-1">
              <span className="font-mono text-[7px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">{t.timeline}</span>
              <span className="font-sans text-[10px] tracking-wide font-medium text-neutral-850 dark:text-neutral-200 transition-colors duration-1000">2024 — {series.year}</span>
            </div>
          </div>

          {/* Empty spacer to match photo grid */}
          <div className="hidden lg:block lg:col-span-2" />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
          {/* Photos list (Left text + Middle photo) */}
          {photosList}

          {/* Empty spacer column to reserve grid layout space */}
          <div className="hidden lg:block lg:col-span-2" />
        </div>

        {/* Fixed Progress Navigation — dynamically centered in gutter */}
        {gutterInfo.centerX > 0 && (
          <div
            className="fixed top-1/2 z-40 hidden lg:flex flex-col items-center pointer-events-auto"
            style={{
              left: gutterInfo.centerX,
              transform: `translate(-50%, -50%) scale(${stripScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="relative flex flex-col space-y-0">
              {allPhotos.map((photo, index) => (
                <button
                  key={`thumb-${photo.id}`}
                  onClick={() => scrollToPhoto(index)}
                  className="overflow-hidden opacity-50 hover:opacity-85 transition-opacity block focus:outline-none"
                  style={{ width: thumbW, height: thumbH }}
                  data-cursor="nav"
                >
                  <img
                    src={photo.url.replace(/\.webp$/, "-thumb.webp")}
                    alt={`Thumbnail ${index}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* Freely moving stepless indicator frame — larger than thumb with inner gap */}
              <motion.div
                className="absolute border border-neutral-950 dark:border-white pointer-events-none z-10"
                style={{
                  width: thumbW + framePad * 2,
                  height: thumbH + framePad * 2,
                  left: -framePad,
                  top: -framePad,
                }}
                animate={{ y: scrollProgress * (allPhotos.length - 1) * thumbH }}
                transition={{ type: "spring", stiffness: 180, damping: 25, mass: 0.35 }}
              />
            </div>
          </div>
        )}



      </div>
    </motion.div>

    {/* Scroll progress percentage indicator */}
    <div className="fixed bottom-[48px] left-6 z-[60] font-mono text-[12px] tracking-[0.2em] text-neutral-950 dark:text-white select-none pointer-events-none uppercase transition-colors duration-1000">
      {Math.round(scrollProgress * 100)}%
    </div>

    {/* Fixed bottom-left BACK button */}
    <button
      onClick={onBack}
      className="fixed bottom-0 left-0 z-[60] px-6 pb-5 pt-4 group select-none focus:outline-none"
      data-cursor="nav"
      aria-label="Back"
    >
      <span className="relative inline-block font-serif text-2xl font-medium tracking-widest text-neutral-950 dark:text-white leading-none uppercase">
        {t.cursorBack}
        <span className="absolute left-0 bottom-[-2px] h-[1.5px] bg-neutral-950 dark:bg-white w-0 group-hover:w-full transition-all duration-300 ease-out block" />
      </span>
    </button>
    </>
  );
}
