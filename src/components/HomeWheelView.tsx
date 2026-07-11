/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "motion/react";
import { MapPin, Compass } from "lucide-react";
import { PHOTOGRAPHY_DATA } from "../data";
import { PhotographySeries } from "../types";

interface HomeWheelViewProps {
  onSelectSeries: (series: PhotographySeries) => void;
}

// Categories list for the top-center filter menu (excluding the "ALL" button)
const CATEGORIES = [
  { label: "建筑 ARCHITECTURE", value: "ARCHITECTURE" },
  { label: "街道 STREET", value: "STREET" },
  { label: "风景 LANDSCAPE", value: "LANDSCAPE" },
  { label: "人像 PORTRAIT", value: "PORTRAIT" },
  { label: "电影 CINEMATIC", value: "CINEMATIC" },
];

export default function HomeWheelView({ onSelectSeries }: HomeWheelViewProps) {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion spring scroll state for buttery kinetic movement
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 75,
    damping: 20,
    mass: 0.8,
  });

  const [currentVal, setCurrentVal] = useState(0);

  // Track scroll position changes to trigger state updates
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setCurrentVal(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const activeIndex = Math.max(0, Math.min(PHOTOGRAPHY_DATA.length - 1, Math.round(currentVal)));

  // Listen to container resizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

 const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 const activeAnimationRef = useRef<any | null>(null);
  
  // Responsive scale based on container width (reference at 1400px)
  const responsiveScale = Math.min(Math.max(dimensions.width / 1400, 0.45), 1.1);

  // Wheel Scroll handler with automatic snapping timeout
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Stop any active snapping or programmatic animations to let the wheel scroll freely
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
      activeAnimationRef.current = null;
    }

    const currentTarget = scrollProgress.get();
    const step = e.deltaY * 0.0018;
    const newTarget = Math.max(0, Math.min(PHOTOGRAPHY_DATA.length - 1, currentTarget + step));
    scrollProgress.set(newTarget);

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      const nearest = Math.round(scrollProgress.get());
      activeAnimationRef.current = animate(scrollProgress, nearest, {
        type: "spring",
        stiffness: 90,
        damping: 18,
      });
    }, 200); // Slightly larger debounce to ensure smooth deceleration before snapping
  };

  // Navigating to first series in category
  const scrollToCategory = (category: string) => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }
    
    const index = PHOTOGRAPHY_DATA.findIndex(
      (s) => s.category.toUpperCase() === category.toUpperCase()
    );
    if (index !== -1) {
      activeAnimationRef.current = animate(scrollProgress, index, { type: "spring", stiffness: 80, damping: 18 });
    }
  };

  // Dynamic card dimension variation for asymmetric design
 const getBaseSize = (i: number, isMobile: boolean) => {
   const index = i % 5;
   if (isMobile) {
     switch (index) {
        case 0: return { w: 180, h: 0 };
        case 1: return { w: 190, h: 0 };
        case 2: return { w: 200, h: 0 };
        case 3: return { w: 220, h: 0 };
        default: return { w: 200, h: 0 };
     }
   }
   switch (index) {
      case 0: return { w: 480, h: 0 };
      case 1: return { w: 500, h: 0 };
      case 2: return { w: 520, h: 0 };
      case 3: return { w: 550, h: 0 };
      default: return { w: 510, h: 0 };
   }
 };

  // Exact coordinates helper for L-shape corner layout hugging the left & bottom walls
 const getCardCoords = (offset: number) => {
   const isMobile = dimensions.width < 768;
    const s = responsiveScale;
    const spacing = isMobile ? Math.round(140 * s) : Math.round(360 * s);
    const cornerRadius = isMobile ? Math.round(180 * s) : Math.round(380 * s);

    let x = 0;
    let y = 0;

    if (offset < -1) {
      // Pin along the left wall, rising vertically up
      x = 0;
      y = cornerRadius + (-offset - 1) * spacing;
    } else if (offset > 1) {
      // Pin along the floor, sliding horizontally right
      x = cornerRadius + (offset - 1) * spacing;
      y = 0;
    } else {
      // Smooth quarter-circle curve transit in the corner [-1, 1]
      const t = (offset + 1) / 2; // Normalizes offset to [0, 1]
      const radians = t * (Math.PI / 2);
      x = cornerRadius * (1 - Math.cos(radians));
      y = cornerRadius * (1 - Math.sin(radians));
    }

    return { x, y };
  };

  const activeSeries = PHOTOGRAPHY_DATA[activeIndex];
  const isMobile = dimensions.width < 768;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="relative w-full h-full overflow-hidden select-none bg-[#0e0c0b] text-neutral-200 cursor-default flex flex-col justify-between"
      id="home-wheel-viewport"
    >
      {/* Immersive blurred ambient background cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSeries.coverImage}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-110 blur-[80px] grayscale-[30%]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-neutral-950/40 mix-blend-multiply" />
      </div>


      {/* Background ambient lighting vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#12100e]/30 to-[#0e0c0b] pointer-events-none z-0" />
      
      {/* Absolute Header Overlay with Top Center Filters (excluding "ALL") */}
      <div className="absolute top-24 md:top-24 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center items-center px-6 py-2 bg-black/25 backdrop-blur-md rounded-none border border-white/5 pointer-events-auto shadow-lg max-w-[90vw]">
          {CATEGORIES.map((cat) => {
            const isSelected = activeSeries.category.toUpperCase() === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => scrollToCategory(cat.value)}
                className={`font-mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-none transition-all duration-300 ${
                  isSelected
                    ? "text-white font-medium bg-white/10"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
                data-cursor="pointer"
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Decorative ultra-fine layout lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5 z-0" xmlns="http://www.w3.org/2000/svg">
        <line x1="120" y1="0" x2="120" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1={dimensions.height - 120} x2="100%" y2={dimensions.height - 120} stroke="white" strokeWidth="0.5" />
      </svg>

      {/* Floating Typography Details Panel (Top-Right Quadrant for Desktop, Top-Left for Mobile) */}
      <div className="absolute top-36 md:top-28 right-6 md:right-16 w-[90vw] md:w-[440px] z-30 pointer-events-none flex flex-col space-y-5 md:space-y-6 text-right md:text-right items-end">
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-end space-x-2.5">
            <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
              SERIES // 0{activeIndex + 1} OF 0{PHOTOGRAPHY_DATA.length}
            </span>
            <div className="h-[1px] w-6 bg-neutral-700" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-100 leading-none">
                {activeSeries.title}
              </h1>
              <p className="font-serif italic text-sm text-neutral-400 mt-1">
                {activeSeries.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Location & EXIF parameters block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-end gap-x-5 gap-y-2 font-mono text-[9px] tracking-widest text-neutral-400 py-3 border-t border-b border-white/5 w-full"
          >
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3 h-3 text-neutral-500" />
              <span>{activeSeries.location.toUpperCase()}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <Compass className="w-3 h-3 text-neutral-500" />
              <span>{activeSeries.coordinates}</span>
            </span>
            <span>•</span>
            <span>YEAR: {activeSeries.year}</span>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-xs font-light text-neutral-300 leading-relaxed max-w-sm"
          >
            {activeSeries.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Interactive Stage: The L-Shape Corner Curve */}
      <div className="absolute inset-0 z-10 overflow-visible pointer-events-none">
        {PHOTOGRAPHY_DATA.map((series, idx) => {
          const offset = idx - currentVal;
          const { x, y } = getCardCoords(offset);

          // Get raw dimensions of the card
          const baseSize = getBaseSize(idx, isMobile);

          // Dynamic scale: active is massive (1.0), side ones shrink exponentially
          const diff = Math.abs(offset);
          const scale = 0.28 + 0.72 * Math.exp(-Math.pow(diff / 1.35, 2));

         const width = baseSize.w * scale * responsiveScale;
          const height = baseSize.h * scale;

          // Fade items out as they get extremely far to keep DOM clean and elegant
          const opacity = Math.max(0, Math.min(1, 1.25 - Math.abs(offset) / 3.8));

          if (opacity <= 0.01) return null;

          const isSelfActive = idx === activeIndex;

          // Dynamic blur values for depth of field and transitions
          // Highly responsive quadratic drop-off: as soon as scrolling starts, the target card starts getting clear very quickly
          const blurAmount = Math.min(12, Math.pow(diff, 2) * 12);

          return (
            <div
              key={series.id}
              onClick={() => {
                if (isSelfActive) {
                  onSelectSeries(series);
                } else {
                  if (activeAnimationRef.current) {
                    activeAnimationRef.current.stop();
                  }
                  activeAnimationRef.current = animate(scrollProgress, idx, {
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                  });
                }
              }}
              className="absolute pointer-events-auto origin-bottom-left transition-shadow duration-500"
             style={{
               left: `${x}px`,
               bottom: `${y}px`,
               width: `${width}px`,
               opacity: opacity,
                zIndex: isSelfActive ? 100 : 50 - Math.abs(Math.round(offset * 10)),
                cursor: "pointer",
              }}
              data-cursor={isSelfActive ? "home-card" : ""}
            >
              {/* Image Frame Container */}
              <div 
               className={`relative w-full overflow-hidden bg-neutral-900 border rounded-none shadow-2xl group transition-all duration-500 ${
                  isSelfActive 
                    ? "border-white/20 scale-100 hover:border-white/40" 
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                {/* Lazy-loaded imagery with real-time hardware-accelerated blur transition */}
                <img
                  src={series.coverImage}
                  alt={series.title}
                 referrerPolicy="no-referrer"
                 className={`w-full block select-none pointer-events-none transition-[opacity,transform] duration-500 ease-out`}
                  style={{
                    filter: `blur(${blurAmount}px) grayscale(${isSelfActive ? 0 : 40}%)`,
                    transform: isSelfActive ? "scale(1)" : "scale(0.98)",
                    opacity: isSelfActive ? 1 : 0.45,
                  }}
                />
                
                {/* Dynamic vignette overlay on the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Corner text labels: 01. Series Title (proportional text scale matches the card) */}
                <div
                  className="absolute left-full top-0 ml-3.5 text-neutral-300 font-mono tracking-widest whitespace-nowrap pointer-events-none origin-left flex items-center"
                  style={{
                    fontSize: `${Math.max(8, Math.min(11, 10 * scale))}px`,
                    opacity: 0.35 + 0.65 * scale,
                  }}
                >
                  <span className="text-white/40 mr-1.5">0{idx + 1}.</span>
                  <span>{series.title.toUpperCase()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fine-art Bottom Rail Metadata */}
      <div className="w-full px-6 md:px-12 py-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-neutral-400 relative z-30 pointer-events-none mt-auto">
        <div className="flex items-center space-x-2.5 font-mono text-[8px] md:text-[9px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span>USE YOUR SCROLL WHEEL TO CHRONOLOGICALLY NAVIGATE</span>
        </div>
        <div className="flex items-center space-x-6 font-mono text-[8px] md:text-[9px] tracking-widest uppercase">
          <span>SYSTEM STATUS: OPTIMAL</span>
        </div>
      </div>
    </div>
  );
}
