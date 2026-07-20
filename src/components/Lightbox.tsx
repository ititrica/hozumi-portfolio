/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Photo } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";
import { playButtonFeedback } from "../utils/uiSound";

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
  lang: Language;
}

export default function Lightbox({ photo, photos, onClose, onNavigate, lang }: LightboxProps) {
  const t = UI_TRANSLATIONS[lang];

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleCloseClick = () => {
    playButtonFeedback();
    onClose();
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      onNavigate(photos[currentIndex - 1]);
    } else {
      // Loop to end
      onNavigate(photos[photos.length - 1]);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < photos.length - 1) {
      onNavigate(photos[currentIndex + 1]);
    } else {
      // Loop to start
      onNavigate(photos[0]);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos]);

  useEffect(() => {
    const nextPhoto = photos[(currentIndex + 1) % photos.length];
    if (!nextPhoto) return;
    const image = new Image();
    image.decoding = "async";
    image.src = nextPhoto.url;
  }, [currentIndex, photos]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-neutral-950/98 flex flex-col justify-between"
      onClick={handleCloseClick}
      data-cursor="close"
    >
      {/* Top Control Bar */}
      <div 
        className="h-20 px-6 flex items-center justify-between z-30 bg-gradient-to-b from-neutral-950/80 to-transparent w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title & Index */}
        <div className="font-mono text-[9.5px] tracking-[0.15em] text-neutral-400 min-w-0 flex-1 mr-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.18 }}
              className="flex items-baseline flex-wrap"
            >
              <span className="text-white font-sans tracking-[0.1em] font-medium text-[13px] mr-3 uppercase truncate">{photo.title}</span>
              <span>[ {currentIndex + 1} / {photos.length} ]</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center">
          {/* Close Button */}
          <button
            onClick={handleCloseClick}
            className="relative font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-400 hover:text-white transition-colors duration-300 focus:outline-none py-1 group"
            data-cursor="nav"
            data-sound-handled="true"
          >
            <span>CLOSE</span>
            <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left block" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden px-12">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 p-4 rounded-none bg-neutral-900/30 border border-neutral-800/10 text-neutral-400 hover:text-white hover:bg-neutral-900/80 transition-all duration-300 z-30"
          data-cursor="nav"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 p-4 rounded-none bg-neutral-900/30 border border-neutral-800/10 text-neutral-400 hover:text-white hover:bg-neutral-900/80 transition-all duration-300 z-30"
          data-cursor="nav"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Render Active Image with close capabilities */}
        <div 
          className="relative max-w-full max-h-full flex items-center justify-center select-none"
          data-cursor="close"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={photo.id}
              src={photo.url}
              alt={photo.title}
              loading="eager"
              decoding="async"
              draggable={false}
              referrerPolicy="no-referrer"
              className="object-contain rounded-none shadow-2xl max-h-[75vh] max-w-[85vw]"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Metadata Info panel */}
      <div 
        className="h-24 md:h-16 px-6 flex flex-col md:flex-row items-center justify-between font-mono text-[8.5px] md:text-[9.5px] tracking-[0.12em] md:tracking-[0.15em] text-neutral-500 z-30 bg-gradient-to-t from-neutral-950/90 to-transparent w-full gap-2.5 md:gap-0 select-text pb-4 md:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.18 }}
            className="w-full flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-0"
          >
            <span className="order-2 md:order-1">{t.location.toUpperCase()}: {photo.location || "EUROPE"}</span>
            
            {/* Integrated EXIF Parameters Row */}
            <div className="order-1 md:order-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-neutral-450 text-[8px] md:text-[9px]">
              {photo.exif && (
                <>
                  <span className="text-neutral-300 font-medium">{photo.exif.camera}</span>
                  <span className="hidden sm:inline text-neutral-700">|</span>
                  <span className="text-neutral-300 font-medium">{photo.exif.lens}</span>
                  <span className="hidden sm:inline text-neutral-700">|</span>
                  <span className="text-neutral-300 font-medium">{photo.exif.focalLength} f/{photo.exif.aperture}</span>
                  <span className="hidden sm:inline text-neutral-700">|</span>
                  <span className="text-neutral-300 font-medium">{photo.exif.shutterSpeed} ISO {photo.exif.iso}</span>
                </>
              )}
            </div>

            <span className="order-3">DATE: {photo.date || "2025"}</span>
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
