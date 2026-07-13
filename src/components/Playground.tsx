/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { PhotographySeries, Photo } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface PlaygroundProps {
  photographyData: PhotographySeries[];
  onSelectPhoto: (photo: Photo, photos: Photo[]) => void;
  lang: Language;
}

export default function Playground({ photographyData, onSelectPhoto, lang }: PlaygroundProps) {
  const t = UI_TRANSLATIONS[lang];
  const constraintsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);
  const smoothX = useSpring(canvasX, { stiffness: 75, damping: 26, mass: 1.2 });
  const smoothY = useSpring(canvasY, { stiffness: 75, damping: 26, mass: 1.2 });

  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const isDraggingRef = useRef(false);

  // Flatten all photos from all photography series
  const allPhotos = photographyData.flatMap((series) =>
    series.images.map((img) => ({
      ...img,
      // Pass category & series context into photo object for Lightbox references
      location: img.location || series.location,
      date: img.date || `${series.year}`,
    }))
  );

  // Calculate constraints dynamically based on viewport and canvas size
  useEffect(() => {
    const updateConstraints = () => {
      if (constraintsRef.current && canvasRef.current) {
        const viewportW = constraintsRef.current.clientWidth;
        const viewportH = constraintsRef.current.clientHeight;
        const canvasW = canvasRef.current.scrollWidth;
        const canvasH = canvasRef.current.scrollHeight;

        const left = -(canvasW - viewportW);
        const top = -(canvasH - viewportH);

        setDragConstraints({ left, right: 0, top, bottom: 0 });

        // Center the canvas initially
        canvasX.set(left / 2);
        canvasY.set(top / 2);
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    const timer = setTimeout(updateConstraints, 200);

    return () => {
      window.removeEventListener("resize", updateConstraints);
      clearTimeout(timer);
    };
  }, []);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handlePhotoClick = (photo: Photo) => {
    if (isDraggingRef.current) return;
    onSelectPhoto(photo, allPhotos);
  };

  // Generate an asymmetric/spaced-out grid layout slots
  // We have 46 photos. Let's create an grid array of size 54 (9 columns x 6 rows)
  // We can insert photos at random slots, and fill other slots with empty values or architectural icons/coordinates
  const gridSlots = (() => {
    const columns = 8;
    const rows = 7;
    const totalSlots = columns * rows; // 56 slots

    const slots: (Photo | { type: "text" | "square"; content: string })[] = Array(totalSlots).fill(null);

    // Architectural/minimalist text indicators to scatter in the grid
    const details: { type: "text" | "square"; content: string }[] = [
      { type: "square", content: "▢" },
      { type: "text", content: "43.06°N 141.34°E" },
      { type: "text", content: "ILCE-7CM2" },
      { type: "text", content: "35mm F1.4 ASPH" },
      { type: "text", content: "HOZUMI" },
      { type: "square", content: "▢" },
      { type: "text", content: "SHUTTER 1/125s" },
      { type: "text", content: "ISO 100" },
      { type: "text", content: "CHOSHI JAPAN" },
      { type: "text", content: "OKINAWA BREEZE" },
    ];

    let photoIndex = 0;
    let detailIndex = 0;

    for (let i = 0; i < totalSlots; i++) {
      // Create empty gaps periodically to match screenshot spacing
      if (i % 7 === 3 || i % 9 === 5 || i === 12 || i === 31 || i === 44) {
        if (detailIndex < details.length && Math.random() > 0.4) {
          slots[i] = details[detailIndex++];
        } else {
          slots[i] = { type: "text", content: "" }; // Empty spacer
        }
      } else {
        if (photoIndex < allPhotos.length) {
          slots[i] = allPhotos[photoIndex++];
        } else if (detailIndex < details.length) {
          slots[i] = details[detailIndex++];
        }
      }
    }

    return slots;
  })();

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 pt-20 w-full h-full overflow-hidden bg-[#fdfdfd] dark:bg-neutral-950 transition-colors duration-1000 z-10 select-none"
    >
      <motion.div
        ref={canvasRef}
        drag
        _dragX={canvasX}
        _dragY={canvasY}
        dragConstraints={dragConstraints}
        dragElastic={0.06}
        dragTransition={{
          power: 0.3,
          timeConstant: 500,
          bounceStiffness: 90,
          bounceDamping: 26,
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x: smoothX, y: smoothY }}
        className="absolute p-40 grid grid-cols-8 gap-x-28 gap-y-24 w-[3600px] h-[2800px] cursor-grab active:cursor-grabbing select-none"
      >
        {gridSlots.map((slot, index) => {
          if (!slot) return <div key={index} className="w-[280px] h-[350px]" />;

          // If it is a photo card
          if ("url" in slot) {
            return (
              <div
                key={slot.id}
                onClick={() => handlePhotoClick(slot)}
                className="w-[280px] h-[350px] flex flex-col justify-between group cursor-pointer"
              >
                {/* Image Mask Frame */}
                <div className="w-full h-[320px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-lg group-hover:shadow-2xl transition-all duration-500 ease-out rounded-none relative">
                  <img
                    src={slot.url.replace(".webp", ".thumb.webp")}
                    alt={slot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale hover:grayscale-0 duration-1000"
                  />
                  {/* Overlay shadow wash */}
                  <div className="absolute inset-0 bg-neutral-950/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                </div>
                {/* Photo metadata title label */}
                <div className="h-6 flex items-center justify-between font-mono text-[8px] tracking-widest text-neutral-450 dark:text-neutral-500 uppercase mt-2">
                  <span className="truncate max-w-[180px] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                    {slot.title}
                  </span>
                  <span>
                    {(index + 1 < 10 ? "0" : "") + (index + 1)}
                  </span>
                </div>
              </div>
            );
          }

          // If it is an architectural/text segment slot
          return (
            <div
              key={index}
              className="w-[280px] h-[350px] flex items-center justify-center font-mono text-[9px] tracking-[0.25em] text-neutral-350 dark:text-neutral-600 select-none uppercase pointer-events-none"
            >
              {slot.content}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
