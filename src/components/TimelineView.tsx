/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "motion/react";
import { PhotographySeries } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface TimelineViewProps {
  photographyData: PhotographySeries[];
  onSelectSeries: (series: PhotographySeries) => void;
  lang: Language;
  onReady?: () => void;
}

interface TimelineEntry {
  series: PhotographySeries;
  year: string;
  position: "above" | "below";
}

const CARD_WIDTH = 220;
const CARD_HEIGHT_LANDSCAPE = 148;
const CARD_HEIGHT_PORTRAIT = 295;
const CARD_GAP = 48;
const YEAR_SECTION_GAP = 120;
const TIMELINE_PADDING = 160;

export default function TimelineView({ photographyData, onSelectSeries, lang, onReady }: TimelineViewProps) {
  const t = UI_TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  // Group and sort series by year, alternating above/below
  const { entries, yearMarkers, totalWidth } = useMemo(() => {
    const yearMap = new Map<string, PhotographySeries[]>();
    photographyData.forEach((s) => {
      const arr = yearMap.get(s.year) || [];
      arr.push(s);
      yearMap.set(s.year, arr);
    });

    const sortedYears = Array.from(yearMap.keys()).sort();
    const allEntries: TimelineEntry[] = [];
    const markers: { year: string; x: number }[] = [];
    let currentX = TIMELINE_PADDING;

    sortedYears.forEach((year) => {
      const seriesList = yearMap.get(year)!;
      markers.push({ year, x: currentX });

      seriesList.forEach((series, idx) => {
        allEntries.push({
          series,
          year,
          position: idx % 2 === 0 ? "above" : "below",
        });
        currentX += CARD_WIDTH + CARD_GAP;
      });

      currentX += YEAR_SECTION_GAP;
    });

    return { entries: allEntries, yearMarkers: markers, totalWidth: currentX + TIMELINE_PADDING };
  }, [photographyData]);

  // Wheel → horizontal scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY + e.deltaX;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, scrollLeft: container.scrollLeft };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const dx = e.clientX - dragStartRef.current.x;
    container.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Compute card x positions
  const cardPositions = useMemo(() => {
    const positions: number[] = [];
    let currentX = TIMELINE_PADDING;
    let currentYear = "";

    entries.forEach((entry) => {
      if (entry.year !== currentYear && currentYear !== "") {
        currentX += YEAR_SECTION_GAP;
      }
      if (entry.year !== currentYear) {
        currentYear = entry.year;
      }
      positions.push(currentX);
      currentX += CARD_WIDTH + CARD_GAP;
    });

    return positions;
  }, [entries]);

  // Recompute year marker positions properly
  const computedYearMarkers = useMemo(() => {
    const markers: { year: string; x: number }[] = [];
    let currentYear = "";
    entries.forEach((entry, idx) => {
      if (entry.year !== currentYear) {
        markers.push({ year: entry.year, x: cardPositions[idx] });
        currentYear = entry.year;
      }
    });
    return markers;
  }, [entries, cardPositions]);

  const computedTotalWidth = useMemo(() => {
    if (cardPositions.length === 0) return TIMELINE_PADDING * 2;
    return cardPositions[cardPositions.length - 1] + CARD_WIDTH + TIMELINE_PADDING;
  }, [cardPositions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#fdfdfd] dark:bg-[#0e0c0b] transition-colors duration-1000"
    >
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden scrollbar-none select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          ref={canvasRef}
          className="relative h-full"
          style={{ width: computedTotalWidth, minHeight: "100vh" }}
        >
          {/* Central horizontal timeline axis */}
          <div
            className="absolute left-0 right-0 bg-neutral-300 dark:bg-neutral-700 transition-colors duration-1000"
            style={{ top: "50%", height: 1, transform: "translateY(-0.5px)" }}
          />

          {/* Year markers */}
          {computedYearMarkers.map((marker) => (
            <div
              key={marker.year}
              className="absolute flex flex-col items-center"
              style={{ left: marker.x - 40, top: "50%", transform: "translateY(-50%)" }}
            >
              {/* Year dot on the line */}
              <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 transition-colors duration-1000" />
              {/* Year label */}
              <span className="absolute top-5 font-mono text-[11px] tracking-[0.3em] text-neutral-400 dark:text-neutral-500 uppercase whitespace-nowrap transition-colors duration-1000">
                {marker.year}
              </span>
            </div>
          ))}

          {/* Timeline cards */}
          {entries.map((entry, idx) => {
            const x = cardPositions[idx];
            const isAbove = entry.position === "above";
            const cardImg = (entry.series.cardImage ?? entry.series.coverImage).replace(/\.webp$/, "-card.webp");

            return (
              <motion.div
                key={entry.series.id}
                className="absolute group"
                style={{
                  left: x,
                  width: CARD_WIDTH,
                  top: isAbove ? undefined : "calc(50% + 24px)",
                  bottom: isAbove ? "calc(50% + 24px)" : undefined,
                }}
                initial={{ opacity: 0, y: isAbove ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {/* Connector line from card to axis */}
                <div
                  className={`absolute left-1/2 w-px bg-neutral-300 dark:bg-neutral-600 transition-colors duration-1000 ${
                    isAbove ? "bottom-0 translate-y-full" : "top-0 -translate-y-full"
                  }`}
                  style={{ height: 24, transform: `translateX(-0.5px) ${isAbove ? "translateY(100%)" : "translateY(-100%)"}` }}
                />

                {/* Card */}
                <div
                  onClick={() => onSelectSeries(entry.series)}
                  className="overflow-hidden bg-neutral-100 dark:bg-neutral-900/40 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
                  data-cursor="home-card"
                >
                  <div className="overflow-hidden">
                    <img
                      src={cardImg}
                      alt={entry.series.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Card info overlay */}
                  <div className="px-3 py-2.5">
                    <h3 className="font-sans text-[11px] tracking-[0.08em] font-medium text-neutral-800 dark:text-neutral-200 uppercase truncate transition-colors duration-1000">
                      {entry.series.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-[8px] tracking-[0.15em] text-neutral-400 dark:text-neutral-500 uppercase transition-colors duration-1000">
                        {entry.series.category}
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.15em] text-neutral-400 dark:text-neutral-500 transition-colors duration-1000">
                        {entry.series.images.length} plates
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
