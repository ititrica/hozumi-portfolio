/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { useLocation } from "react-router-dom";
import { PhotographySeries } from "../types";
import { Language } from "../i18n";
import { playButtonFeedback } from "../utils/uiSound";

interface HomeWheelViewProps {
  onSelectSeries: (series: PhotographySeries) => void;
  photographyData: PhotographySeries[];
  lang: Language;
}

// Categories list for the top-center filter menu (excluding the "ALL" button)
const CATEGORIES = [
  { label: "建筑 ARCHITECTURE", value: "ARCHITECTURE" },
  { label: "街道 STREET", value: "STREET" },
  { label: "风景 LANDSCAPE", value: "LANDSCAPE" },
  { label: "人像 PORTRAIT", value: "PORTRAIT" },
  { label: "电影 CINEMATIC", value: "CINEMATIC" },
];

function getBaseSize(index: number, width: number, isMobile: boolean) {
  const patternIndex = index % 5;
  const baseWidth = width * (isMobile ? 0.62 : 0.363);
  const multipliers = isMobile ? [0.9, 0.95, 1, 1.05, 1] : [0.94, 0.97, 1, 1.03, 1];
  return Math.round(baseWidth * multipliers[patternIndex]);
}

function getCardCoords(offset: number, width: number, isMobile: boolean) {
  const baseWidth = width * (isMobile ? 0.62 : 0.363);
  const spacing = isMobile ? Math.round(baseWidth * 0.85) : Math.round(baseWidth * 0.72);
  const cornerRadius = isMobile ? Math.round(baseWidth * 1.3) : Math.round(baseWidth * 0.76);

  if (offset < -1) {
    return { x: 0, y: cornerRadius + (-offset - 1) * spacing };
  }
  if (offset > 1) {
    return { x: cornerRadius + (offset - 1) * spacing, y: 0 };
  }

  const radians = ((offset + 1) / 2) * (Math.PI / 2);
  return {
    x: cornerRadius * (1 - Math.cos(radians)),
    y: cornerRadius * (1 - Math.sin(radians)),
  };
}

interface WheelCardProps {
  series: PhotographySeries;
  index: number;
  activeIndex: number;
  dimensions: { width: number; height: number };
  progress: MotionValue<number>;
  onSelectSeries: (series: PhotographySeries) => void;
  onFocusCard: (index: number) => void;
}

const WheelCard = React.memo(function WheelCard({
  series,
  index,
  activeIndex,
  dimensions,
  progress,
  onSelectSeries,
  onFocusCard,
}: WheelCardProps) {
  const isMobile = dimensions.width < 768;
  const baseWidth = getBaseSize(index, dimensions.width, isMobile);
  const displayWidth = series.id === "xiao-yuanhang" ? baseWidth * 0.8 : baseWidth;

  const x = useTransform(progress, (current) => getCardCoords(index - current, dimensions.width, isMobile).x);
  const y = useTransform(progress, (current) => {
    const rawY = -getCardCoords(index - current, dimensions.width, isMobile).y;
    return isMobile ? rawY - dimensions.height * 0.12 : rawY;
  });
  const opacity = useTransform(progress, (current) => Math.max(0, Math.min(1, 1.1 - Math.abs(index - current) / 3.2)));
  const zIndex = useTransform(progress, (current) => Math.round(90 - Math.abs(index - current) * 16));
  const scale = useTransform(progress, (current) => {
    const diff = Math.abs(index - current);
    return 0.28 + 0.72 * Math.exp(-Math.pow(diff / 1.35, 2));
  });
  const imageTransform = useTransform(progress, (current) => {
    const offset = Math.max(-1.3, Math.min(1.3, index - current));
    const diff = Math.abs(index - current);
    const parallaxX = Math.max(0, offset) * 28;
    const parallaxY = Math.min(0, offset) * 28;
    const imageScale = 1.2 - 0.07 * Math.exp(-Math.pow(diff / 0.5, 2));
    return `translateX(${parallaxX}px) translateY(${parallaxY}px) scale(${imageScale})`;
  });
  const imageFilter = useTransform(progress, (current) => {
    const diff = Math.abs(index - current);
    const blur = Math.min(8, Math.pow(diff, 2) * 8);
    const grayscale = 40 * (1 - Math.exp(-Math.pow(diff / 0.9, 2)));
    return `blur(${blur}px) grayscale(${grayscale}%)`;
  });
  const imageOpacity = useTransform(progress, (current) => {
    const diff = Math.abs(index - current);
    return 0.6 + 0.4 * Math.exp(-Math.pow(diff / 0.9, 2));
  });
  const pointerEvents = useTransform(progress, (current) => (
    Math.abs(index - current) <= 3.2 ? "auto" : "none"
  ));

  const handleClick = () => {
    playButtonFeedback();
    sessionStorage.setItem("wheelIndex", String(index));
    if (index === activeIndex) {
      onSelectSeries(series);
    } else {
      onFocusCard(index);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="absolute pointer-events-auto transition-shadow duration-500"
      style={{
        width: displayWidth,
        left: 0,
        bottom: 0,
        x,
        y,
        willChange: "transform",
        opacity,
        zIndex,
        pointerEvents,
        cursor: "pointer",
      }}
      data-cursor="home-card"
      data-card-index={index}
    >
      <motion.div
        className="relative"
        style={{ scale, transformOrigin: "bottom left", willChange: "transform" }}
      >
        <div className="relative w-full overflow-hidden bg-neutral-950 shadow-2xl group">
          <img
            src={(series.cardImage ?? series.coverImage).replace(/\.webp$/, "-card.webp")}
            alt={series.title}
            loading="eager"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            className="w-full block select-none pointer-events-none"
            style={{ filter: imageFilter, transform: imageTransform, opacity: imageOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
});

interface WheelTitleProps {
  series: PhotographySeries;
  idx: number;
  progress: MotionValue<number>;
  currentVal: number;
  lang: Language;
  scrollToIndex: (index: number) => void;
}

const WheelTitle = React.memo(function WheelTitle({
  series,
  idx,
  progress,
  currentVal,
  lang,
  scrollToIndex,
}: WheelTitleProps) {
  const titleOpacity = useTransform(progress, (current) => {
    const titleDistance = Math.abs(current - idx);
    const titleFocus = Math.exp(-Math.pow(titleDistance / 0.5, 2));
    const fadeFactor = Math.max(0, 1 - Math.pow(titleDistance / 6, 2));
    return fadeFactor * (0.48 + titleFocus * 0.52);
  });

  const pointerEvents = useTransform(progress, (current) => {
    const titleDistance = Math.abs(current - idx);
    return titleDistance < 5.5 ? "auto" : "none";
  });

  const isActive = Math.round(currentVal) === idx;

  return (
    <motion.button
      onClick={() => scrollToIndex(idx)}
      className="flex items-center justify-between w-full gap-3 group cursor-pointer pointer-events-auto text-left"
      style={{
        height: "36px",
        opacity: titleOpacity,
        pointerEvents,
      }}
      data-cursor="nav"
    >
      <span 
        className={`font-mono tracking-[0.15em] tabular-nums inline-block w-6 text-left transition-all duration-300 ${
          isActive 
            ? "text-black dark:text-white font-medium text-[10px]" 
            : "text-neutral-400 dark:text-neutral-500 text-[9px]"
        }`}
      >
        {idx + 1 < 10 ? "0" + (idx + 1) : idx + 1}/
      </span>
      <span
        className={`font-serif uppercase leading-none text-right transition-all duration-300 ${
          isActive 
            ? "text-black dark:text-white" 
            : "text-neutral-700 dark:text-neutral-400"
        }`}
        style={{
          fontSize: lang === "ja" ? "0.81rem" : "0.78rem",
          fontWeight: isActive ? 500 : (lang === "ja" ? 400 : 300),
          letterSpacing: "0.04em",
          transform: isActive ? "scale(1.06)" : "scale(1.0)",
          transformOrigin: "right center",
        }}
      >
        {series.title}
      </span>
    </motion.button>
  );
});

export default function HomeWheelView({ onSelectSeries, photographyData, lang }: HomeWheelViewProps) {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = dimensions.width < 768;
  const location = useLocation();

  // Parallax background translation values based on cursor movement
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const parallaxX = useSpring(mouseX, { damping: 50, stiffness: 200, mass: 0.5 });
  const parallaxY = useSpring(mouseY, { damping: 50, stiffness: 200, mass: 0.5 });

  // Map to opposite direction displacement range (e.g., -24px to 24px)
  const bgTranslateX = useTransform(parallaxX, [0, 1], ["24px", "-24px"]);
  const bgTranslateY = useTransform(parallaxY, [0, 1], ["24px", "-24px"]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, mouseX, mouseY]);

  // Restore scroll position only when returning via BACK button action
  const restoreWheel = location.state?.restoreWheel === true;
  const savedIndex = restoreWheel && typeof sessionStorage !== 'undefined'
    ? parseFloat(sessionStorage.getItem('wheelIndex') || '0')
    : 0;
  const initialIndex = Math.max(0, Math.min(photographyData.length - 1, Math.round(savedIndex)));

  // Framer Motion spring scroll state for buttery kinetic movement
  const scrollProgress = useMotionValue(initialIndex);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 75,
    damping: 20,
    mass: 0.8,
  });

  const [currentVal, setCurrentVal] = useState(initialIndex);
  const [settledIndex, setSettledIndex] = useState(initialIndex);
  const settleTimerRef = useRef<number | null>(null);
  const lastVisualUpdateRef = useRef(0);

  // Keep the wheel position live for card motion, but commit the title
  // highlight only after the spring has stopped to avoid flashing through
  // intermediate indices during a multi-series jump.
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      window.dispatchEvent(new Event("home-wheel-motion"));
      const now = performance.now();
      if (now - lastVisualUpdateRef.current >= 32) {
        lastVisualUpdateRef.current = now;
        setCurrentVal(latest);
      }

      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }

      settleTimerRef.current = window.setTimeout(() => {
        const nextIndex = Math.max(
          0,
          Math.min(photographyData.length - 1, Math.round(smoothProgress.get()))
        );
        setCurrentVal(smoothProgress.get());
        setSettledIndex((previous) => previous === nextIndex ? previous : nextIndex);
        settleTimerRef.current = null;
      }, 220);
    });

    return () => {
      unsubscribe();
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    };
  }, [smoothProgress, photographyData.length]);
  const activeIndex = Math.max(0, Math.min(photographyData.length - 1, settledIndex));
  const interactiveIndex = Math.max(0, Math.min(photographyData.length - 1, Math.round(currentVal)));
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

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const scrollStartRef = useRef<number>(0);

  // Swipe / Drag Gestures support for mobile browsers (supporting both horizontal and vertical swipes)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
      activeAnimationRef.current = null;
    }
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    scrollStartRef.current = scrollProgress.get();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    
    // deltaX: positive is swipe left (next), negative is swipe right (prev)
    const deltaX = touchStartXRef.current - touchCurrentX;
    // deltaY: positive is swipe up (next), negative is swipe down (prev)
    const deltaY = touchStartYRef.current - touchCurrentY;

    // Combine deltas: swiping left/up increases progress, swiping right/down decreases progress
    const delta = deltaX + deltaY;

    // Map screen-swipe distance to card-scroll progress
    const scrollDelta = (delta / dimensions.width) * 3.0;
    const newTarget = Math.max(0, Math.min(photographyData.length - 1, scrollStartRef.current + scrollDelta));
    scrollProgress.set(newTarget);
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    // Kinetic snapping to the closest series card index
    const nearest = Math.round(scrollProgress.get());
    activeAnimationRef.current = animate(scrollProgress, nearest, {
      type: "spring",
      stiffness: 90,
      damping: 18,
    });
  };


  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full overflow-hidden select-none bg-[#fdfdfd] dark:bg-[#0e0c0b] text-neutral-900 dark:text-neutral-200 cursor-default flex flex-col justify-between transition-colors duration-1000"
      id="home-wheel-viewport"
       data-active-card={interactiveIndex}
    >
      <div className="sr-only">
        <h1>Hozumi Photography Portfolio</h1>
        <p lang="en">
          Hozumi (hozumifolio) is a photography and visual art portfolio featuring portraits, street photography, architecture, and series from Japan and Asia.
        </p>
        <p lang="zh-CN">
          Hozumi（hozumifolio）视觉艺术与摄影作品集，收录人像摄影、街头摄影、建筑摄影，以及来自日本与亚洲的系列作品。
        </p>
        <p lang="ja">
          Hozumi（hozumifolio）の写真集とビジュアルアート作品。人物、ストリート、建築写真、日本とアジアのシリーズを紹介します。
        </p>
      </div>

      {/* Immersive blurred ambient background cross-fade with mouse parallax */}
      <motion.div
        className="absolute -top-12 -bottom-12 -left-12 -right-12 z-0 overflow-hidden pointer-events-none opacity-70 dark:opacity-40 transition-opacity duration-1000"
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
        }}
      >
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
                src={(series.cardImage ?? series.coverImage).replace(/\.webp$/, "-card.webp")}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[30%]"
                style={{
                  filter: "blur(30px)",
                  WebkitFilter: "blur(30px)",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "scale(1.15) translate3d(0, 0, 0)",
                  WebkitTransform: "scale(1.15) translate3d(0, 0, 0)",
                }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-white/10 dark:bg-neutral-950/50 transition-all duration-1000" />
      </motion.div>

      {/* Background ambient lighting vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-100/10 to-[#fdfdfd] pointer-events-none z-0 transition-opacity duration-1000 opacity-100 dark:opacity-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#12100e]/30 to-[#0e0c0b] pointer-events-none z-0 transition-opacity duration-1000 opacity-0 dark:opacity-100" />

      {/* Main Interactive Stage: The L-Shape Corner Curve */}
      <div className="absolute inset-0 z-10 overflow-visible pointer-events-none">
        {photographyData.map((series, index) => {
          return (
            <WheelCard
              key={series.id}
              series={series}
              index={index}
              activeIndex={interactiveIndex}
              dimensions={dimensions}
              progress={smoothProgress}
              onSelectSeries={onSelectSeries}
              onFocusCard={scrollToIndex}
            />
          );
        })}
      </div>

      {/* Right-side vertical series title list — hidden on mobile, active one highlighted on desktop */}
      <div
        className="hidden md:flex absolute top-[calc(50%-40px)] -translate-y-1/2 right-14 z-30 flex-col w-56 h-[360px] overflow-hidden pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)"
        }}
      >
        <motion.div
          className="flex flex-col w-full"
          style={{
            y: useTransform(smoothProgress, (val) => (4 - val) * 36)
          }}
        >
          {photographyData.map((series, idx) => (
            <WheelTitle
              key={series.id}
              series={series}
              idx={idx}
              progress={smoothProgress}
              currentVal={currentVal}
              lang={lang}
              scrollToIndex={scrollToIndex}
            />
          ))}
        </motion.div>
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
