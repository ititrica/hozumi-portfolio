/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "motion/react";
import { useLocation } from "react-router-dom";
import { PhotographySeries } from "../types";

interface HomeWheelViewProps {
  onSelectSeries: (series: PhotographySeries) => void;
  photographyData: PhotographySeries[];
}

// Categories list for the top-center filter menu (excluding the "ALL" button)
const CATEGORIES = [
  { label: "建筑 ARCHITECTURE", value: "ARCHITECTURE" },
  { label: "街道 STREET", value: "STREET" },
  { label: "风景 LANDSCAPE", value: "LANDSCAPE" },
  { label: "人像 PORTRAIT", value: "PORTRAIT" },
  { label: "电影 CINEMATIC", value: "CINEMATIC" },
];

export default function HomeWheelView({ onSelectSeries, photographyData }: HomeWheelViewProps) {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Restore scroll position only when returning via BACK button action
  const restoreWheel = location.state?.restoreWheel === true;
  const savedIndex = restoreWheel && typeof sessionStorage !== 'undefined'
    ? parseFloat(sessionStorage.getItem('wheelIndex') || '0')
    : 0;

  // Framer Motion spring scroll state for buttery kinetic movement
  const scrollProgress = useMotionValue(savedIndex);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 75,
    damping: 20,
    mass: 0.8,
  });

  const [currentVal, setCurrentVal] = useState(savedIndex);

  // Track scroll position changes to trigger state updates
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setCurrentVal(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const activeIndex = Math.max(0, Math.min(photographyData.length - 1, Math.round(currentVal)));
  const activeSeries = photographyData[activeIndex];



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

  // Wheel Scroll handler with automatic snapping timeout (native non-passive for Safari compatibility)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Stop any active snapping or programmatic animations to let the wheel scroll freely
      if (activeAnimationRef.current) {
        activeAnimationRef.current.stop();
        activeAnimationRef.current = null;
      }

      const currentTarget = scrollProgress.get();
      const step = e.deltaY * 0.0018;
      const newTarget = Math.max(0, Math.min(photographyData.length - 1, currentTarget + step));
      scrollProgress.set(newTarget);

      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        const nearest = Math.round(scrollProgress.get());
        activeAnimationRef.current = animate(scrollProgress, nearest, {
          type: "spring",
          stiffness: 90,
          damping: 18,
        });
      }, 200);
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [scrollProgress, photographyData.length]);

  // Animate scroll to a target index
  const scrollToIndex = (index: number) => {
    if (activeAnimationRef.current) activeAnimationRef.current.stop();
    activeAnimationRef.current = animate(scrollProgress, index, {
      type: "spring",
      stiffness: 80,
      damping: 18,
    });
  };

  const touchStartRef = useRef<number | null>(null);
  const scrollStartRef = useRef<number>(0);

  // Swipe / Drag Gestures support for mobile browsers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
      activeAnimationRef.current = null;
    }
    touchStartRef.current = e.touches[0].clientX;
    scrollStartRef.current = scrollProgress.get();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchCurrent = e.touches[0].clientX;
    const delta = touchStartRef.current - touchCurrent;
    // Map screen-swipe distance to card-scroll progress
    const scrollDelta = (delta / dimensions.width) * 3.0;
    const newTarget = Math.max(0, Math.min(photographyData.length - 1, scrollStartRef.current + scrollDelta));
    scrollProgress.set(newTarget);
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    // Kinetic snapping to the closest series card index
    const nearest = Math.round(scrollProgress.get());
    activeAnimationRef.current = animate(scrollProgress, nearest, {
      type: "spring",
      stiffness: 90,
      damping: 18,
    });
  };

  // Dynamic card dimension variation for asymmetric design
  const getBaseSize = (i: number, isMob: boolean) => {
    const index = i % 5;
    if (isMob) {
      const baseW = dimensions.width * 0.62;
      switch (index) {
        case 0: return { w: Math.round(baseW * 0.9), h: 0 };
        case 1: return { w: Math.round(baseW * 0.95), h: 0 };
        case 2: return { w: Math.round(baseW * 1.0), h: 0 };
        case 3: return { w: Math.round(baseW * 1.05), h: 0 };
        default: return { w: Math.round(baseW), h: 0 };
      }
    }
    const baseW = dimensions.width * 0.363;
    switch (index) {
      case 0: return { w: Math.round(baseW * 0.94), h: 0 };
      case 1: return { w: Math.round(baseW * 0.97), h: 0 };
      case 2: return { w: Math.round(baseW * 1.0), h: 0 };
      case 3: return { w: Math.round(baseW * 1.03), h: 0 };
      default: return { w: Math.round(baseW), h: 0 };
    }
  };

  // Exact coordinates helper for L-shape corner layout hugging the left & bottom walls
  const getCardCoords = (offset: number) => {
    const isMob = dimensions.width < 768;
    const baseW = isMob ? dimensions.width * 0.62 : dimensions.width * 0.363;

    const spacing = isMob ? Math.round(baseW * 0.85) : Math.round(baseW * 0.72);
    const cornerRadius = isMob ? Math.round(baseW * 1.3) : Math.round(baseW * 0.76);

    let x = 0;
    let y = 0;

    if (offset < -1) {
      x = 0;
      y = cornerRadius + (-offset - 1) * spacing;
    } else if (offset > 1) {
      x = cornerRadius + (offset - 1) * spacing;
      y = 0;
    } else {
      const t = (offset + 1) / 2;
      const radians = t * (Math.PI / 2);
      x = cornerRadius * (1 - Math.cos(radians));
      y = cornerRadius * (1 - Math.sin(radians));
    }

    return { x, y };
  };

  const isMobile = dimensions.width < 768;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full overflow-hidden select-none bg-[#fdfdfd] dark:bg-[#0e0c0b] text-neutral-900 dark:text-neutral-200 cursor-default flex flex-col justify-between transition-colors duration-1000"
      id="home-wheel-viewport"
    >
      {/* Immersive blurred ambient background cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-70 dark:opacity-40 transition-opacity duration-1000">
        {photographyData.map((series, idx) => {
          const distance = Math.abs(currentVal - idx);
          // Only render background images that are close to the current view to optimize GPU memory
          if (distance >= 1.0) return null;

          const opacity = 1 - distance;

          return (
            <div
              key={series.id}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: opacity,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translate3d(0, 0, 0)",
                WebkitTransform: "translate3d(0, 0, 0)",
              }}
            >
              <img
                src={series.coverImage.replace(".webp", ".card.webp")}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-110 grayscale-[30%]"
                style={{
                  filter: "blur(30px)",
                  WebkitFilter: "blur(30px)",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-white/20 dark:bg-neutral-950/50 transition-all duration-1000" />
      </div>

      {/* Background ambient lighting vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-100/20 to-[#fdfdfd] pointer-events-none z-0 transition-opacity duration-1000 opacity-100 dark:opacity-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#12100e]/30 to-[#0e0c0b] pointer-events-none z-0 transition-opacity duration-1000 opacity-0 dark:opacity-100" />

      {/* Main Interactive Stage: The L-Shape Corner Curve */}
      <div className="absolute inset-0 z-10 overflow-visible pointer-events-none">
        {photographyData.map((series, idx) => {
          const offset = idx - currentVal;
          const { x, y } = getCardCoords(offset);

          const baseSize = getBaseSize(idx, isMobile);

          const diff = Math.abs(offset);
          const scale = 0.28 + 0.72 * Math.exp(-Math.pow(diff / 1.35, 2));

          const displayWidth = series.id === "xiao-yuanhang" ? baseSize.w * 0.8 : baseSize.w;

          const blurAmount = Math.min(12, Math.pow(diff, 2) * 12);

          if (Math.abs(offset) > 3.2) return null;
          const opacity = Math.max(0, Math.min(1, 1.1 - Math.abs(offset) / 3.2));
          if (opacity <= 0.01) return null;

          const isSelfActive = idx === activeIndex;

          // Parallax: image inside the masked frame is enlarged and offset
          // so the frame arrives at position first and the image "catches up"
          const clampedOffset = Math.max(-1.3, Math.min(1.3, offset));
          // Use Math.max/min so transition is continuous with no conditional discontinuity at 0
          const parallaxX = Math.max(0, clampedOffset) * 28;
          const parallaxY = Math.min(0, clampedOffset) * 28;

          // All image properties are continuous functions of diff — no discrete jumps
          const imgScale   = 1.20 - 0.07 * Math.exp(-Math.pow(diff / 0.5, 2));
          const imgOpacity = 0.60 + 0.40 * Math.exp(-Math.pow(diff / 0.9, 2));
          const imgGray    = 40  * (1  - Math.exp(-Math.pow(diff / 0.9, 2)));

          return (
            <div
              key={series.id}
              onClick={() => {
                if (isSelfActive) {
                  sessionStorage.setItem('wheelIndex', String(activeIndex));
                  onSelectSeries(series);
                } else {
                  scrollToIndex(idx);
                }
              }}
              className="absolute pointer-events-auto transition-shadow duration-500"
              style={{
                width: `${displayWidth}px`,
                left: `0px`,
                bottom: `0px`,
                transform: `translate3d(${x}px, ${-y}px, 0)`,
                willChange: "transform",
                opacity: opacity,
                // z-index is a continuous function of proximity — no discrete flip when activeIndex changes
                zIndex: Math.round(90 - Math.abs(offset) * 16),
                cursor: "pointer",
              }}
              data-cursor={isSelfActive ? "home-card" : undefined}
            >
              {/* Image Frame Container */}
              <div
                className="relative"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "bottom left",
                  willChange: "transform",
                }}
              >
                <div className="relative w-full overflow-hidden bg-neutral-950 shadow-2xl group">
                  {/* Lazy-loaded imagery — all transforms driven by continuous spring value, no CSS transition needed */}
                  <img
                    src={series.coverImage.replace(".webp", ".card.webp")}
                    alt={series.title}
                    referrerPolicy="no-referrer"
                    className="w-full block select-none pointer-events-none"
                    style={{
                      filter: `blur(${blurAmount}px) grayscale(${imgGray}%)`,
                      transform: `translateX(${parallaxX}px) translateY(${parallaxY}px) scale(${imgScale})`,
                      opacity: imgOpacity,
                      willChange: "transform",
                    }}
                  />
                  {/* Dynamic vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right-side vertical series title list — hidden on mobile, active one highlighted on desktop */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-14 z-30 flex-col items-stretch space-y-5 w-52">
        {photographyData.map((series, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={series.id}
              onClick={() => scrollToIndex(idx)}
              className="flex items-baseline justify-between w-full gap-3 group cursor-pointer"
            >
              <span
                className={`font-mono text-[8px] tracking-[0.1em] tabular-nums inline-block w-6 text-left transition-colors duration-[1400ms] ease-in-out ${
                  isActive
                    ? "text-neutral-500 dark:text-neutral-400"
                    : "text-neutral-300 dark:text-neutral-700"
                }`}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}/
              </span>
              <span
                className={`font-serif uppercase leading-none text-right transition-colors duration-[1400ms] ease-in-out ${
                  isActive
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400"
                }`}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                }}
              >
                {series.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Title display anchored in the top-middle area */}
      {isMobile && activeSeries && (
        <div className="absolute top-[21vh] left-0 right-0 z-30 flex flex-col items-center text-center px-6 select-text pointer-events-none">
          <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-2 uppercase">
            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {photographyData.length}
          </span>
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[0.08em] uppercase text-neutral-900 dark:text-white leading-tight max-w-[85vw] break-words">
            {activeSeries.title}
          </h2>
          <span className="font-mono text-[8px] tracking-[0.2em] text-neutral-450 dark:text-neutral-500 uppercase mt-3">
            {activeSeries.category} — {activeSeries.year}
          </span>
        </div>
      )}
    </div>
  );
}
