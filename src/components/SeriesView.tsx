/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { ArrowLeft, MapPin, Calendar, Camera, Hash } from "lucide-react";
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
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 flex flex-col pt-24"
    >
      {/* Static header backdrop wrapper */}
      <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col pb-32">
        
        {/* Navigation back and details */}
        <div className="flex items-center justify-between py-6 border-b border-neutral-500/10 mb-12">
          <button
            onClick={onBack}
            className="group flex items-center space-x-3 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-300 py-2"
            data-cursor="nav"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform duration-300" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
              Back to collections
            </span>
          </button>

          <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
            SERIES ID: {series.id.toUpperCase()}
          </span>
        </div>

        {/* Hero Section of Series */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Poetic description / Specs */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase block mb-3">
                {series.category} // {series.year}
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl font-light tracking-tight text-neutral-950 dark:text-neutral-50 leading-none">
                {series.title}
              </h1>
              <span className="font-serif italic text-xl text-neutral-400 dark:text-neutral-500 block mt-2">
                {series.subtitle}
              </span>
            </div>

            <p className="font-serif text-sm leading-relaxed font-light text-neutral-600 dark:text-neutral-300">
              {series.description}
            </p>

            {/* Structured Specifications Panel */}
            <div className="border-t border-b border-neutral-500/10 py-6 grid grid-cols-2 gap-y-4 gap-x-6">
              <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] tracking-wider text-neutral-400 uppercase">Location</span>
                  <span className="font-mono text-[10px] text-neutral-800 dark:text-neutral-200">{series.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-400">
                <Hash className="w-4 h-4 text-neutral-400" />
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] tracking-wider text-neutral-400 uppercase">Coordinates</span>
                  <span className="font-mono text-[10px] text-neutral-800 dark:text-neutral-200 truncate">{series.coordinates}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-400">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] tracking-wider text-neutral-400 uppercase">Timeline</span>
                  <span className="font-mono text-[10px] text-neutral-800 dark:text-neutral-200">2024 — {series.year}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-400">
                <Camera className="w-4 h-4 text-neutral-400" />
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] tracking-wider text-neutral-400 uppercase">Medium</span>
                  <span className="font-mono text-[10px] text-neutral-800 dark:text-neutral-200">Leica & Hasselblad Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Big Featured Cover Image */}
          <div className="lg:col-span-7">
            <div className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-500/10 rounded-none flex items-center justify-center">
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
        <div className="border-t border-neutral-500/10 pt-16">
          <div className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase block mb-2">
              FRAMES // CAPTURES
            </span>
            <h3 className="font-serif text-3xl font-light text-neutral-900 dark:text-neutral-100">
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
                    className="relative w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-500/10 rounded-none overflow-hidden"
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
                    <div className="absolute top-4 left-4 z-20 mix-blend-difference font-mono text-[10px] tracking-widest text-white/60">
                      [ PLATES #{pIdx + 1} ]
                    </div>

                    {/* Beautiful hover EXIF dashboard on top overlay */}
                    {photo.exif && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-450 z-20 flex flex-col justify-between p-6 text-white font-mono">
                        <div className="flex justify-between items-start border-b border-white/10 pb-4">
                          <div className="flex flex-col">
                            <span className="text-[8px] tracking-wider text-white/50 uppercase">TECHNICAL SPECIFICATIONS</span>
                            <span className="text-xs text-white uppercase font-serif mt-1 italic">{photo.title}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400">EXIF ORIGINAL</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[10px] tracking-widest uppercase my-auto py-4">
                          <div className="flex flex-col">
                            <span className="text-[8px] text-white/40">Camera Body</span>
                            <span className="text-white font-medium mt-0.5 truncate">{photo.exif.camera}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-white/40">Lens Optics</span>
                            <span className="text-white font-medium mt-0.5 truncate">{photo.exif.lens}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-white/40">Focal / Aperture</span>
                            <span className="text-white font-medium mt-0.5">{photo.exif.focalLength} @ {photo.exif.aperture}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-white/40">Shutter / ISO</span>
                            <span className="text-white font-medium mt-0.5">{photo.exif.shutterSpeed} // ISO {photo.exif.iso}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10 text-[9px] text-white/50">
                          <span>LOC: {photo.location || series.location}</span>
                          <span>DATE: {photo.date || "2025"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caption under item */}
                  <div className="mt-4 flex flex-col space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-serif text-lg font-light text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                        {photo.title}
                      </h4>
                      <span className="font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500">
                        {photo.exif?.shutterSpeed} — {photo.exif?.aperture}
                      </span>
                    </div>
                    <p className="font-serif text-xs font-light text-neutral-400 dark:text-neutral-500 leading-relaxed italic">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Series closing button */}
        <div className="mt-32 pt-12 border-t border-neutral-500/10 flex justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3.5 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-mono text-[10px] tracking-widest uppercase transition-colors rounded-none"
          >
            Return to Catalogue
          </button>
        </div>

      </div>
    </motion.div>
  );
}
