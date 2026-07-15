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

  // First-mount shuffle order persisted in a ref so language switches don't
  // re-shuffle card positions. Generated once as a deterministic index sequence.
  const permRef = useRef<number[] | null>(null);

  // Flatten all photos in stable series order, then apply the persisted permutation
  const [gridSlots, N, canvasW, canvasH] = React.useMemo(() => {
    // 1. Collect photos in deterministic order (by series, then by image order)
    const ordered: (Photo | { type: "phrase"; content: string })[] = [];

    photographyData.forEach((series) => {
      if (series.coverImage) {
        ordered.push({
          id: `${series.id}-cover`,
          url: series.coverImage,
          title: `${series.title} (Cover)`,
          caption: series.description,
          aspectRatio: "landscape",
          location: series.location,
          date: `${series.year}`,
          exif: { camera: "ILCE-7CM2", lens: "FE 35mm F1.4 GM", focalLength: "35mm", aperture: "f/1.4", shutterSpeed: "1/125s", iso: "100" }
        });
      }
      series.images.forEach((img) => {
        ordered.push({
          ...img,
          location: img.location || series.location,
          date: img.date || `${series.year}`,
        });
      });
    });

    // 2. Build grid: photos + random phrase cards
    const totalPhotos = ordered.length;
    const targetSlots = Math.ceil(totalPhotos / 0.75);
    const calculatedN = Math.max(8, Math.ceil(Math.sqrt(targetSlots)));
    const totalSlots = calculatedN * calculatedN;

    // Fill with photo slots first
    const slots = [...ordered];

    const phraseCount = totalSlots - totalPhotos;
    const shuffledPhrases = [...RANDOM_PHRASES];
    for (let i = shuffledPhrases.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPhrases[i], shuffledPhrases[j]] = [shuffledPhrases[j], shuffledPhrases[i]];
    }

    for (let i = 0; i < phraseCount; i++) {
      slots.push({ type: "phrase", content: shuffledPhrases[i % shuffledPhrases.length] });
    }

    // 3. Build the permutation on first run, reuse on subsequent runs
    if (!permRef.current) {
      const perm = Array.from({ length: slots.length }, (_, i) => i);
      for (let i = perm.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
      }
      permRef.current = perm;
    }

    // 4. Apply permutation to get the displayed order
    const displaySlots = permRef.current.map((idx) => slots[idx]);

    const w = calculatedN * 280 + (calculatedN - 1) * 210 + 320;
    const h = calculatedN * 350 + (calculatedN - 1) * 262 + 320;

    return [displaySlots, calculatedN, w, h] as const;
  }, [photographyData]);

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
  // Also handles touch pinch-to-zoom.
  useEffect(() => {
    const container = constraintsRef.current;
    if (!container) return;

    // --- Wheel zoom ---
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!container || !canvasRef.current) return;
      const rectParent = container.getBoundingClientRect();

      const mouseParentX = e.clientX - rectParent.left;
      const mouseParentY = e.clientY - rectParent.top;

      const cx = canvasW / 2;
      const cy = canvasH / 2;

      canvasX.stop();
      canvasY.stop();
      motionScale.stop();

      const xOld = smoothX.get();
      const yOld = smoothY.get();
      const sOld = smoothScale.get();

      const zoomSpeed = 0.0032;
      const sNew = Math.min(2.2, Math.max(0.35, sOld - e.deltaY * zoomSpeed));
      if (sOld === sNew) return;

      const factor = sNew / sOld;
      const xNew = mouseParentX - cx - (mouseParentX - cx - xOld) * factor;
      const yNew = mouseParentY - cy - (mouseParentY - cy - yOld) * factor;

      canvasX.set(xNew);
      canvasY.set(yNew);
      motionScale.set(sNew);
    };

    // --- Touch pinch-to-zoom ---
    let pinchStartDist = 0;
    let pinchStartScale = 1;
    let pinchCenterX = 0;
    let pinchCenterY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        pinchStartDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        pinchStartScale = smoothScale.get();
        pinchCenterX = (t1.clientX + t2.clientX) / 2;
        pinchCenterY = (t1.clientY + t2.clientY) / 2;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

        if (pinchStartDist === 0) return;
        const ratio = dist / pinchStartDist;
        const sNew = Math.min(2.2, Math.max(0.35, pinchStartScale * ratio));

        canvasX.stop();
        canvasY.stop();
        motionScale.stop();

        const rectParent = container.getBoundingClientRect();
        const cx = canvasW / 2;
        const cy = canvasH / 2;
        const mouseParentX = pinchCenterX - rectParent.left;
        const mouseParentY = pinchCenterY - rectParent.top;
        const xOld = smoothX.get();
        const yOld = smoothY.get();
        const sOld = smoothScale.get();

        if (sOld === sNew) return;
        const factor = sNew / sOld;
        const xNew = mouseParentX - cx - (mouseParentX - cx - xOld) * factor;
        const yNew = mouseParentY - cy - (mouseParentY - cy - yOld) * factor;

        canvasX.set(xNew);
        canvasY.set(yNew);
        motionScale.set(sNew);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinchStartDist = 0;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
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
          const matchedPhoto = gridSlots.find(
            (s): s is Photo => "id" in s && s.id === closestPhotoId && "url" in s
          );
          if (matchedPhoto) {
            onSelectPhoto(matchedPhoto, gridSlots.filter((s): s is Photo => "url" in s));
          }
        }
      } else if (latestScale < 2.0) {
        // Reset the trigger flag when user zooms back out below 2.0
        isZoomTriggeredRef.current = false;
      }
    });

    return () => unsubscribe();
  }, [gridSlots, onSelectPhoto]);

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
    onSelectPhoto(photo, gridSlots.filter((s): s is Photo => "url" in s));
  };



  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 pt-20 w-full h-full overflow-hidden bg-[#fdfdfd] dark:bg-[#0e0c0b] transition-colors duration-1000 z-10 select-none"
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
