/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PHOTOGRAPHY_DATA } from "../data";
import { PhotographySeries } from "../types";

interface GalleryGridProps {
  onSelectSeries: (series: PhotographySeries) => void;
}

export default function GalleryGrid({ onSelectSeries }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "ARCHITECTURE", "STREET", "LANDSCAPE", "PORTRAIT", "CINEMATIC"];

  const filteredSeries = activeCategory === "ALL"
    ? PHOTOGRAPHY_DATA
    : PHOTOGRAPHY_DATA.filter(item => item.category.toUpperCase() === activeCategory);

  return (
    <section 
      id="gallery-section" 
      className="py-24 border-t border-neutral-500/10 px-6 max-w-[1600px] mx-auto w-full"
    >
      {/* Category Navigation Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase block mb-2">
            CATALOGUE // SECTIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100">
            Selected Series
          </h2>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 md:gap-3 max-w-full overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-none font-mono text-[9px] tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                    : "bg-neutral-500/5 text-neutral-500 hover:bg-neutral-500/10 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
                }`}
                data-cursor="nav"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Series */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        <AnimatePresence mode="popLayout">
          {filteredSeries.map((series, index) => {
            // Alter alignment or height slightly for a organic editorial rhythm
            const isEven = index % 2 === 0;
            const mtClass = isEven ? "md:mt-0" : "md:mt-12";

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                key={series.id}
                onClick={() => onSelectSeries(series)}
                className={`flex flex-col group cursor-pointer ${mtClass}`}
                data-cursor="view"
              >
                {/* Image Container with premium crop & overflow */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-500/10 rounded-none">
                  {/* Outer subtle shadow overlay */}
                  <div className="absolute inset-0 bg-neutral-950/5 group-hover:bg-transparent transition-all duration-500 z-10" />

                  {/* Parallax Image Zoom */}
                  <motion.img
                    src={series.coverImage}
                    alt={series.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  />

                  {/* Top-right index counter */}
                  <div className="absolute top-4 right-4 z-20 mix-blend-difference font-mono text-[9px] tracking-widest text-white/70">
                    [ {index + 1 < 10 ? `0${index + 1}` : index + 1} // {series.images.length} SHOTS ]
                  </div>

                  {/* Hover full screen vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Hover mini metadata overlay at bottom left */}
                  <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col space-y-1">
                    <span className="font-serif text-white text-xl font-light italic">
                      View full series
                    </span>
                  </div>
                </div>

                {/* Meta details under the image */}
                <div className="mt-6 flex flex-col space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-500/10 pb-2">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase">
                      {series.category} — {series.year}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500">
                      {series.location}
                    </span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-300">
                        {series.title}
                      </h3>
                      <p className="font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">
                        COORDINATES: {series.coordinates}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Grid footer line with architectural quote */}
      <div className="mt-32 pt-16 border-t border-neutral-500/10 text-center flex flex-col items-center">
        <span className="font-serif text-sm italic font-light text-neutral-400 dark:text-neutral-500 max-w-md leading-relaxed">
          "Photography is an architectural operation, drawing coordinates of shadow and building structures of memory on a planar canvas."
        </span>
      </div>
    </section>
  );
}
