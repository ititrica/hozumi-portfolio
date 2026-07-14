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
  const smoothX = useSpring(canvasX, { stiffness: 90, damping: 24, mass: 1.0 });
  const smoothY = useSpring(canvasY, { stiffness: 90, damping: 24, mass: 1.0 });
  const motionScale = useMotionValue(1.0);
  const smoothScale = useSpring(motionScale, { stiffness: 90, damping: 24, mass: 1.0 });



  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const isDraggingRef = useRef(false);

  // Flatten and randomly shuffle all photos (including cover images) from all photography series
  const allPhotos = React.useMemo(() => {
    const photos: Photo[] = [];
    
    photographyData.forEach((series) => {
      // 1. Add cover image if it exists
      if (series.coverImage) {
        photos.push({
          id: `${series.id}-cover`,
          url: series.coverImage,
          title: `${series.title} (Cover)`,
          caption: series.description,
          aspectRatio: "landscape",
          location: series.location,
          date: `${series.year}`,
          exif: {
            camera: "ILCE-7CM2",
            lens: "FE 35mm F1.4 GM",
            focalLength: "35mm",
            aperture: "f/1.4",
            shutterSpeed: "1/125s",
            iso: "100"
          }
        });
      }
      
      // 2. Add series sub-images
      series.images.forEach((img) => {
        photos.push({
          ...img,
          location: img.location || series.location,
          date: img.date || `${series.year}`,
        });
      });
    });

    // Fisher-Yates Shuffle Algorithm for random board layouts
    for (let i = photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    return photos;
  }, [photographyData]);

  // Generate an asymmetric/spaced-out grid layout slots
  // We calculate rows dynamically to ensure all photos (plus spacers/decorations) are placed.
  const { gridSlots, rows } = (() => {
    const columns = 8;
    const totalPhotos = allPhotos.length;
    
    // Target density of ~60% photos and ~40% decorations/gaps
    const neededSlots = Math.ceil(totalPhotos / 0.60);
    const calculatedRows = Math.max(7, Math.ceil(neededSlots / columns));
    const totalSlots = columns * calculatedRows;

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
      { type: "text", content: "35.67°N 139.65°E" },
      { type: "square", content: "▢" },
      { type: "text", content: "MINIMAL FRAME" },
      { type: "text", content: "EXPOSURE +0.3" },
    ];

    let photoIndex = 0;
    let detailIndex = 0;

    for (let i = 0; i < totalSlots; i++) {
      // Determine if this index qualifies as a spacer/decoration
      const isSpacer = i % 7 === 3 || i % 9 === 5 || i === 12 || i === 31 || i === 44 || (i > 56 && i % 8 === 2);
      
      const remainingSlots = totalSlots - i;
      const remainingPhotos = totalPhotos - photoIndex;

      // We only insert decoration/spacer if we have enough remaining slots for the remaining photos
      if (isSpacer && remainingSlots > remainingPhotos) {
        if (detailIndex < details.length && Math.random() > 0.4) {
          slots[i] = details[detailIndex++];
        } else {
          slots[i] = { type: "text", content: "" }; // Empty spacer
        }
      } else {
        if (photoIndex < totalPhotos) {
          slots[i] = allPhotos[photoIndex++];
        } else if (detailIndex < details.length) {
          slots[i] = details[detailIndex++];
        } else {
          slots[i] = { type: "text", content: "" };
        }
      }
    }

    return { gridSlots: slots, rows: calculatedRows };
  })();

  // Calculate constraints dynamically based on viewport and canvas size
  // We expand the drag limits (overscroll buffer) so edge photos can be dragged to the center of the screen
  useEffect(() => {
    const updateConstraints = () => {
      if (constraintsRef.current && canvasRef.current) {
        const viewportW = constraintsRef.current.clientWidth;
        const viewportH = constraintsRef.current.clientHeight;
        const canvasW = canvasRef.current.scrollWidth;
        const canvasH = canvasRef.current.scrollHeight;

        // Allow centering outermost cards, but restrict overscroll so the board cannot be lost off-screen
        const left = -(canvasW - viewportW / 2 + 100);
        const right = viewportW / 2 - 100;
        const top = -(canvasH - viewportH / 2 + 150);
        const bottom = viewportH / 2 - 150;

        setDragConstraints({ left, right, top, bottom });

        // Center the canvas initially
        canvasX.set((viewportW - canvasW) / 2);
        canvasY.set((viewportH - canvasH) / 2);
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    const timer = setTimeout(updateConstraints, 200);

    return () => {
      window.removeEventListener("resize", updateConstraints);
      clearTimeout(timer);
    };
  }, [allPhotos.length, canvasX, canvasY]);

  // Listen to wheel events for zooming the board (scroll down to zoom out, scroll up to zoom in)
  // We perform the zoom centering on the user's cursor position without changing transform origin
  useEffect(() => {
    const container = constraintsRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop default browser zoom/scroll

      if (!container || !canvasRef.current) return;

      const rawWidth = 3600;
      const rawHeight = rows * 350 + (rows - 1) * 96 + 320;
      
      const rectParent = container.getBoundingClientRect();
      
      // Mouse coordinates relative to parent viewport container
      const mouseParentX = e.clientX - rectParent.left;
      const mouseParentY = e.clientY - rectParent.top;

      const cx = rawWidth / 2;
      const cy = rawHeight / 2;

      const xOld = smoothX.get();
      const yOld = smoothY.get();
      const sOld = smoothScale.get();

      // Calculate the next target scale
      const zoomSpeed = 0.0012;
      const sNew = Math.min(2.2, Math.max(0.35, sOld - e.deltaY * zoomSpeed));

      if (sOld === sNew) return;

      // Apply scale transition center math (keeping origin at 0.5, 0.5 static)
      const factor = sNew / sOld;
      const xNew = mouseParentX - cx - (mouseParentX - cx - xOld) * factor;
      const yNew = mouseParentY - cy - (mouseParentY - cy - yOld) * factor;

      // Set translations and scale together (springs will animate them smoothly in sync)
      canvasX.set(xNew);
      canvasY.set(yNew);
      motionScale.set(sNew);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [rows, canvasX, canvasY, motionScale, smoothX, smoothY, smoothScale]);

  // Listen to scale changes: if scale reaches 2.1 (zooming in), select the photo closest to viewport center
  useEffect(() => {
    const unsubscribe = motionScale.on("change", (latestScale) => {
      if (latestScale >= 2.1) {
        const cards = document.querySelectorAll(".playground-photo-card");
        if (cards.length === 0) return;

        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        let closestPhotoId: string | null = null;
        let minDistance = Infinity;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;

          const dist = Math.sqrt(
            Math.pow(cardCenterX - viewportCenterX, 2) +
            Math.pow(cardCenterY - viewportCenterY, 2)
          );

          if (dist < minDistance) {
            minDistance = dist;
            closestPhotoId = card.getAttribute("data-photo-id");
          }
        });

        if (closestPhotoId) {
          const matchedPhoto = allPhotos.find((p) => p.id === closestPhotoId);
          if (matchedPhoto) {
            onSelectPhoto(matchedPhoto, allPhotos);
          }
        }

        // Reset scale back to 1.5 with a slight bounce-back delay to prevent infinite triggers
        setTimeout(() => {
          motionScale.set(1.5);
        }, 100);
      }
    });

    return () => unsubscribe();
  }, [allPhotos, onSelectPhoto]);

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
        style={{ x: smoothX, y: smoothY, scale: smoothScale, originX: 0.5, originY: 0.5, width: 3600, height: rows * 350 + (rows - 1) * 96 + 320 }}
        className="absolute p-40 grid grid-cols-8 gap-x-28 gap-y-24 cursor-grab active:cursor-grabbing select-none"
      >
        {gridSlots.map((slot, index) => {
          if (!slot) return <div key={index} className="w-[280px] h-[350px]" />;

          // If it is a photo card
          if ("url" in slot) {
            return (
              <div
                key={slot.id}
                onClick={() => handlePhotoClick(slot)}
                className="w-[280px] h-[350px] flex flex-col justify-between group cursor-pointer playground-photo-card"
                data-photo-id={slot.id}
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
