/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { PhotographySeries, Photo } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";

const RANDOM_PHRASES = [
  "Chasing Shadows",
  "Temporary Silence",
  "Grain & Gravitation",
  "光影的褶皱",
  "Nocturnal Drift",
  "The Invisible City",
  "冬の瞬き",
  "Existence in Grain",
  "Resonance",
  "Silent Monolith",
  "Analog Memory",
  "Time Elapsed",
  "Portrait of an Hour",
  "城市与潮汐",
  "Unresolved Focus",
  "Refracted Light",
  "A Moment's Heaviness",
  "颗粒之美",
  "Shadows of the Soul",
  "Flowing Scenes",
  "Otaru Snowfall",
  "Tokyo Flash",
  "Hokkaido Frost",
  "Bangkok Transit",
  "Jiufen Rain",
  "ILCE-7CM2",
  "35mm F1.4 ASPH",
  "SHUTTER 1/125s",
  "ISO 100",
  "HOZUMI",
  "▢"
];

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
  const isZoomTriggeredRef = useRef(false);

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

  // Generate a square grid layout slots (N x N)
  // Photos are mixed with black concept cards containing random phrases.
  const { gridSlots, N, canvasW, canvasH } = useMemo(() => {
    const totalPhotos = allPhotos.length;
    
    // Target ratio: photos fill ~75% of the square area.
    // N is the grid side size (columns and rows)
    const targetSlots = Math.ceil(totalPhotos / 0.75);
    const calculatedN = Math.max(8, Math.ceil(Math.sqrt(targetSlots)));
    const totalSlots = calculatedN * calculatedN;

    const slots: (Photo | { type: "phrase"; content: string })[] = [];

    // Add all photos
    allPhotos.forEach((photo) => {
      slots.push(photo);
    });

    // Fill the rest with black phrase cards
    const phraseCount = totalSlots - totalPhotos;

    // Shuffle phrases so they are randomly selected
    const shuffledPhrases = [...RANDOM_PHRASES];
    for (let i = shuffledPhrases.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPhrases[i], shuffledPhrases[j]] = [shuffledPhrases[j], shuffledPhrases[i]];
    }

    for (let i = 0; i < phraseCount; i++) {
      slots.push({
        type: "phrase",
        content: shuffledPhrases[i % shuffledPhrases.length]
      });
    }

    // Fisher-Yates shuffle the final slots array
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    const calculatedW = calculatedN * 280 + (calculatedN - 1) * 210 + 320;
    const calculatedH = calculatedN * 350 + (calculatedN - 1) * 262 + 320;

    return { gridSlots: slots, N: calculatedN, canvasW: calculatedW, canvasH: calculatedH };
  }, [allPhotos, lang]);

  // Center the canvas initially upon mount
  useEffect(() => {
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    canvasX.set((viewportW - canvasW) / 2);
    canvasY.set((viewportH - canvasH) / 2);
  }, [canvasW, canvasH, canvasX, canvasY]);

  // Calculate drag boundaries dynamically based on current scale and resize events
  // This keeps a 200x200px center detection area inside the canvas at all times.
  // When pulled beyond this, it acts like a slingshot pulling it back inside.
  useEffect(() => {
    const updateConstraints = () => {
      if (canvasRef.current) {
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        const s = motionScale.get();

        // Size of the detection area at the center of the window
        const dW = Math.min(200, canvasW * s - 50);
        const dH = Math.min(200, canvasH * s - 50);

        // Calculate limits so the detection area stays completely inside the canvas
        const left = viewportW / 2 + dW / 2 - canvasW / 2 - (canvasW * s) / 2;
        const right = viewportW / 2 - dW / 2 - canvasW / 2 + (canvasW * s) / 2;
        const top = viewportH / 2 + dH / 2 - canvasH / 2 - (canvasH * s) / 2;
        const bottom = viewportH / 2 - dH / 2 - canvasH / 2 + (canvasH * s) / 2;

        setDragConstraints({ left, right, top, bottom });
      }
    };

    updateConstraints();

    // Subscribe to both motionScale changes and window resize events
    const unsubscribeScale = motionScale.on("change", updateConstraints);
    window.addEventListener("resize", updateConstraints);
    const timer = setTimeout(updateConstraints, 200);

    return () => {
      unsubscribeScale();
      window.removeEventListener("resize", updateConstraints);
      clearTimeout(timer);
    };
  }, [canvasW, canvasH, motionScale]);

  // Listen to wheel events for zooming the board (scroll down to zoom out, scroll up to zoom in)
  // We perform the zoom centering on the user's cursor position without changing transform origin
  useEffect(() => {
    const container = constraintsRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop default browser zoom/scroll

      if (!container || !canvasRef.current) return;

      const rectParent = container.getBoundingClientRect();
      
      // Mouse coordinates relative to parent viewport container
      const mouseParentX = e.clientX - rectParent.left;
      const mouseParentY = e.clientY - rectParent.top;

      const cx = canvasW / 2;
      const cy = canvasH / 2;

      // Stop any active drag inertia or slide animations immediately when zoom starts
      canvasX.stop();
      canvasY.stop();
      motionScale.stop();

      const xOld = smoothX.get();
      const yOld = smoothY.get();
      const sOld = smoothScale.get();

      // Calculate the next target scale (speed increased for responsive wheel/touchpad zoom)
      const zoomSpeed = 0.0032;
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
  }, [canvasW, canvasH, canvasX, canvasY, motionScale, smoothX, smoothY, smoothScale]);

  // Listen to scale changes: if scale reaches 2.1 (zooming in), select the photo closest to viewport center
  useEffect(() => {
    const unsubscribe = motionScale.on("change", (latestScale) => {
      if (latestScale >= 2.1) {
        if (isZoomTriggeredRef.current) return;
        isZoomTriggeredRef.current = true;

        const cards = document.querySelectorAll(".playground-photo-card");
        if (cards.length === 0) {
          isZoomTriggeredRef.current = false;
          return;
        }

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
      } else if (latestScale < 2.0) {
        // Reset the trigger flag when user zooms back out below 2.0
        isZoomTriggeredRef.current = false;
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
        dragElastic={0.04}
        dragTransition={{
          power: 0.08,
          timeConstant: 250,
          bounceStiffness: 180,
          bounceDamping: 30,
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x: smoothX, y: smoothY, scale: smoothScale, originX: 0.5, originY: 0.5, width: canvasW, height: canvasH, gridTemplateColumns: `repeat(${N}, 280px)`, columnGap: "210px", rowGap: "262px" }}
        className="absolute p-40 grid cursor-grab active:cursor-grabbing select-none"
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

          // If it is a phrase card
          if ("type" in slot && slot.type === "phrase") {
            return (
              <div
                key={index}
                className="w-[280px] h-[350px] flex flex-col justify-between group select-none pointer-events-none"
              >
                {/* Black Page Frame */}
                <div className="w-full h-[320px] overflow-hidden bg-neutral-950 dark:bg-black border border-neutral-900 dark:border-neutral-800/60 shadow-lg flex items-center justify-center p-6 rounded-none relative">
                  <span className="font-serif text-[10px] tracking-[0.2em] text-neutral-350 dark:text-neutral-500 uppercase text-center leading-relaxed">
                    {slot.content}
                  </span>
                </div>
                {/* Under-label */}
                <div className="h-6 flex items-center justify-between font-mono text-[8px] tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mt-2">
                  <span>Concept</span>
                  <span>
                    {(index + 1 < 10 ? "0" : "") + (index + 1)}
                  </span>
                </div>
              </div>
            );
          }

          // Fallback
          return (
            <div
              key={index}
              className="w-[280px] h-[350px]"
            />
          );
        })}
      </motion.div>
    </div>
  );
}
