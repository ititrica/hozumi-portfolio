/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { motion } from "motion/react";
import { PhotographySeries, Photo } from "../types";

interface SeriesViewProps {
  series: PhotographySeries;
  onBack: () => void;
  onSelectPhoto: (photo: Photo, photos: Photo[]) => void;
}

export default function SeriesView({ series, onBack, onSelectPhoto }: SeriesViewProps) {
  // Prevent body scroll when active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 flex flex-col pt-24 transition-colors duration-1000"
    >
      {/* Static header backdrop wrapper */}
      <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col pb-32">
        
        {/* Navigation back and details */}
        <div className="flex items-center justify-between py-6 mb-12 transition-colors duration-1000">
          <button
            onClick={onBack}
            className="group text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-1000 py-2"
            data-cursor="nav"
          >
            <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase font-medium transition-colors duration-1000">
              Back to collections
            </span>
          </button>
        </div>

        {/* Hero Section of Series */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Poetic description / Specs */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <span className="font-mono text-[9.5px] tracking-[0.2em] text-neutral-600 dark:text-neutral-450 uppercase block mb-2 transition-colors duration-1000">
                {series.category} — {series.year}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.1em] text-neutral-950 dark:text-neutral-50 leading-none uppercase transition-colors duration-1000">
                {series.title}
              </h1>
              <span className="font-mono text-[11.5px] tracking-[0.12em] text-neutral-700 dark:text-neutral-400 uppercase block mt-1.5 transition-colors duration-1000">
                {series.subtitle}
              </span>
            </div>

            <p className="font-serif text-[12.5px] leading-relaxed font-light text-neutral-750 dark:text-neutral-350 max-w-md transition-colors duration-1000">
              {series.description}
            </p>

            {/* Structured Specifications Panel */}
            <div className="py-5 grid grid-cols-2 gap-y-3.5 gap-x-6 transition-colors duration-1000">
              <div className="flex flex-col text-neutral-500 dark:text-neutral-400">
                <span className="font-mono text-[7.5px] tracking-wider text-neutral-500 dark:text-neutral-455 uppercase">Location</span>
                <span className="font-mono text-[9.5px] text-neutral-850 dark:text-neutral-200 transition-colors duration-1000">{series.location}</span>
              </div>

              <div className="flex flex-col text-neutral-500 dark:text-neutral-400">
                <span className="font-mono text-[7.5px] tracking-wider text-neutral-500 dark:text-neutral-455 uppercase">Coordinates</span>
                <span className="font-mono text-[9.5px] text-neutral-850 dark:text-neutral-200 truncate transition-colors duration-1000">{series.coordinates}</span>
              </div>

              <div className="flex flex-col text-neutral-500 dark:text-neutral-400">
                <span className="font-mono text-[7.5px] tracking-wider text-neutral-500 dark:text-neutral-455 uppercase">Timeline</span>
                <span className="font-mono text-[9.5px] text-neutral-850 dark:text-neutral-200 transition-colors duration-1000">2024 — {series.year}</span>
              </div>

              <div className="flex flex-col text-neutral-500 dark:text-neutral-400">
                <span className="font-mono text-[7.5px] tracking-wider text-neutral-500 dark:text-neutral-455 uppercase">Medium</span>
                <span className="font-mono text-[9.5px] text-neutral-850 dark:text-neutral-200 transition-colors duration-1000">Sony ILCE-7CM2 System</span>
              </div>
            </div>
          </div>

          {/* Big Featured Cover Image */}
          <div className="lg:col-span-7">
            <div className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-none flex items-center justify-center">
              <img
                src={series.coverImage}
                alt={series.title}
                referrerPolicy="no-referrer"
                className="w-full object-contain shadow-sm max-h-[75vh]"
              />
            </div>
          </div>
        </div>

        {/* Photographic Grid items */}
        <div className="pt-16">
          <div className="mb-12">
            <span className="font-mono text-[8px] tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase block mb-2">
              FRAMES & CAPTURES
            </span>
            <h3 className="font-serif text-lg font-light tracking-[0.1em] text-neutral-900 dark:text-neutral-100 uppercase">
              Series Index ({series.images.length} works)
            </h3>
          </div>

          {/* Staggered Masonry-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {series.images.map((photo, pIdx) => {
              const isLandscape = photo.aspectRatio === "landscape";
              const colSpan = isLandscape ? "md:col-span-2" : "md:col-span-1";
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo, series.images)}
                  className={`flex flex-col group cursor-pointer ${colSpan}`}
                  data-cursor="view"
                >
                  <div 
                    className="relative w-full bg-neutral-100 dark:bg-neutral-900 rounded-none overflow-hidden"
                  >
                    {/* Visual filter overlay */}
                    <div className="absolute inset-0 bg-neutral-950/5 group-hover:bg-transparent transition-all duration-300 z-10" />

                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full block transition-transform duration-[1.2s] group-hover:scale-102"
                    />

                    {/* Left overlay badge containing order index */}
                    <div className="absolute top-4 left-4 z-20 mix-blend-difference font-mono text-[8px] tracking-[0.15em] text-white/60">
                      [ PLATES #{pIdx + 1} ]
                    </div>

                    {/* Beautiful hover EXIF dashboard on top overlay */}
                    {photo.exif && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-450 z-20 flex flex-col justify-between p-6 text-white font-mono">
                        <div className="flex justify-between items-start border-b border-white/10 pb-4">
                          <div className="flex flex-col">
                            <span className="text-[7.5px] tracking-wider text-white/50 uppercase">TECHNICAL SPECIFICATIONS</span>
                            <span className="text-[10px] text-white uppercase font-sans font-medium mt-1">{photo.title}</span>
                          </div>
                          <span className="text-[8.5px] text-emerald-400 font-sans tracking-[0.1em]">EXIF ORIGINAL</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[8px] tracking-[0.15em] uppercase my-auto py-4">
                          <div className="flex flex-col">
                            <span className="text-[7px] text-white/40">Camera Body</span>
                            <span className="text-white font-medium mt-0.5 truncate">{photo.exif.camera}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] text-white/40">Lens Optics</span>
                            <span className="text-white font-medium mt-0.5 truncate">{photo.exif.lens}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] text-white/40">Focal / Aperture</span>
                            <span className="text-white font-medium mt-0.5">{photo.exif.focalLength} @ {photo.exif.aperture}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] text-white/40">Shutter / ISO</span>
                            <span className="text-white font-medium mt-0.5">{photo.exif.shutterSpeed} // ISO {photo.exif.iso}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10 text-[8px] text-white/50">
                          <span>LOC: {photo.location || series.location}</span>
                          <span>DATE: {photo.date || "2025"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caption under item */}
                  <div className="mt-4 flex flex-col space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-sans text-[12.5px] tracking-[0.08em] font-medium text-neutral-900 dark:text-neutral-100 uppercase group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-1000">
                        {photo.title}
                      </h4>
                      <span className="font-mono text-[9px] tracking-widest text-neutral-500 dark:text-neutral-400 transition-colors duration-1000">
                        {photo.exif?.shutterSpeed} — {photo.exif?.aperture}
                      </span>
                    </div>
                    <p className="font-serif text-[11.5px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed italic transition-colors duration-1000">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Series closing button */}
        <div className="mt-32 pt-12 flex justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-mono text-[8.5px] tracking-[0.18em] uppercase transition-colors rounded-none"
          >
            Return to Catalogue
          </button>
        </div>

      </div>
    </motion.div>
  );
}
