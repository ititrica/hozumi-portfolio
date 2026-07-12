/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Photo } from "../types";

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
}

export default function Lightbox({ photo, photos, onClose, onNavigate }: LightboxProps) {
  const [showExif, setShowExif] = useState(true);

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-neutral-950/98 flex flex-col justify-between"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="h-20 px-6 flex items-center justify-between z-30 bg-gradient-to-b from-neutral-950/80 to-transparent w-full">
          {/* Title & Index */}
          <div className="font-mono text-[9.5px] tracking-[0.15em] text-neutral-400">
            <span className="text-white font-sans tracking-[0.1em] font-medium text-[13px] mr-3 uppercase">{photo.title}</span>
            <span>[ {currentIndex + 1} / {photos.length} ]</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Toggle EXIF */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowExif(!showExif);
              }}
              className={`p-2 rounded-none border transition-all duration-300 ${
                showExif 
                  ? "bg-white text-black border-white" 
                  : "text-neutral-400 border-neutral-800 hover:text-white"
              }`}
              title="Toggle EXIF Metadata"
              data-cursor="nav"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-none bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              data-cursor="nav"
            >
              <X className="w-4 h-4" />
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

          {/* Render Active Image with drag capabilities if zoomed */}
          <div 
            className="relative max-w-full max-h-full flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              layoutId={`photo-active-${photo.id}`}
              src={photo.url}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="object-contain transition-transform duration-500 rounded-none shadow-2xl max-h-[75vh] max-w-[85vw]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>

          {/* EXIF Panel Drawer overlay */}
          <AnimatePresence>
            {showExif && photo.exif && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-6 mx-auto bg-neutral-900/90 border border-neutral-800 backdrop-blur-md px-6 py-4 rounded-none flex flex-wrap gap-x-8 gap-y-2.5 justify-center items-center font-mono text-[9.5px] tracking-[0.15em] text-neutral-400 z-40 max-w-[90%] select-text"
              >
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[8px] text-neutral-500 uppercase">Camera System</span>
                  <span className="text-white font-medium mt-0.5">{photo.exif.camera}</span>
                </div>
                <div className="w-px h-5 bg-neutral-800 hidden sm:block" />
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[8px] text-neutral-500 uppercase">Optics Lens</span>
                  <span className="text-white font-medium mt-0.5">{photo.exif.lens}</span>
                </div>
                <div className="w-px h-5 bg-neutral-800 hidden sm:block" />
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[8px] text-neutral-500 uppercase">Focal / Aperture</span>
                  <span className="text-white font-medium mt-0.5">{photo.exif.focalLength} @ {photo.exif.aperture}</span>
                </div>
                <div className="w-px h-5 bg-neutral-800 hidden sm:block" />
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[8px] text-neutral-500 uppercase">Shutter / ISO</span>
                  <span className="text-white font-medium mt-0.5">{photo.exif.shutterSpeed} // ISO {photo.exif.iso}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom Metadata Info panel */}
        <div className="h-16 px-6 flex items-center justify-between font-mono text-[9.5px] tracking-[0.15em] text-neutral-500 z-30 bg-gradient-to-t from-neutral-950/80 to-transparent w-full select-text">
          <span>LOCATION: {photo.location || "EUROPE"}</span>
          <span>DATE: {photo.date || "2025"}</span>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
