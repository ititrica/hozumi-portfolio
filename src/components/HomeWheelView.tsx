/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { useLocation } from "react-router-dom";
import { PhotographySeries } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";
import { playButtonFeedback } from "../utils/uiSound";

interface HomeWheelViewProps {
  onSelectSeries: (series: PhotographySeries) => void;
  photographyData: PhotographySeries[];
  lang: Language;
  onTimelineClick?: () => void;
  viewMode?: "wheel" | "timeline";
}

function getCardImagePath(path: string) {
  return path.replace(/\.webp$/, "-card.webp");
}

function getDesktopCardImagePath(path: string) {
  return path.replace(/-card\.webp$/, "-card-640.webp");
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
  timelineTransition: MotionValue<number>;
  viewMode: "wheel" | "timeline";
  onCardClick: (index: number, series: PhotographySeries) => void;
}

const WheelCard = React.memo(function WheelCard({
  series,
  index,
  activeIndex,
  dimensions,
  progress,
  onSelectSeries,
  onFocusCard,
  timelineTransition,
  viewMode,
  onCardClick,
}: WheelCardProps) {
  const isMobile = dimensions.width < 768;
  const baseWidth = getBaseSize(index, dimensions.width, isMobile);
  const displayWidth = series.id === "xiao-yuanhang" ? baseWidth * 0.8 : baseWidth;

  const timelineWidth = isMobile ? 180 : 220;

  const combinedWidth = useTransform(timelineTransition, (trans) => {
    return (1 - trans) * displayWidth + trans * timelineWidth;
  });

  const x = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const wheelX = getCardCoords(index - (current as number), dimensions.width, isMobile).x;
      const cardWidth = (1 - (trans as number)) * displayWidth + (trans as number) * timelineWidth;
      const centerX = (dimensions.width - cardWidth) / 2;
      const timelineX = centerX + (index - (current as number)) * (timelineWidth + 48);
      return (1 - (trans as number)) * wheelX + (trans as number) * timelineX;
    }
  );

  const isAbove = index % 2 === 0;
  const y = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const rawY = -getCardCoords(index - (current as number), dimensions.width, isMobile).y;
      const wheelY = isMobile ? rawY - dimensions.height * 0.12 : rawY;

      const centerY = dimensions.height / 2;
      const timelineHeight = isMobile ? 180 : 220;
      const timelineY = isAbove
        ? -(centerY + 24)
        : -(centerY - 24 - timelineHeight);

      return (1 - (trans as number)) * wheelY + (trans as number) * timelineY;
    }
  );

  const opacity = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const diff = Math.abs(index - (current as number));
      const wheelOpacity = Math.max(0, Math.min(1, 1.1 - diff / 3.2));
      const timelineOpacity = Math.max(0, Math.min(1, 1.3 - diff / 5.0));
      return (1 - (trans as number)) * wheelOpacity + (trans as number) * timelineOpacity;
    }
  );

  const zIndex = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const wheelZ = Math.round(90 - Math.abs(index - (current as number)) * 16);
      const timelineZ = 10;
      return Math.round((1 - (trans as number)) * wheelZ + (trans as number) * timelineZ);
    }
  );

  const scale = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const diff = Math.abs(index - (current as number));
      const wheelScale = 0.28 + 0.72 * Math.exp(-Math.pow(diff / 1.35, 2));
      return (1 - (trans as number)) * wheelScale + (trans as number) * 1.0;
    }
  );

  const imageTransform = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const diff = Math.abs(index - (current as number));
      const offset = Math.max(-1.3, Math.min(1.3, index - (current as number)));
      const parallaxX = Math.max(0, offset) * 28;
      const parallaxY = Math.min(0, offset) * 28;
      const imageScale = 1.2 - 0.07 * Math.exp(-Math.pow(diff / 0.5, 2));
      
      const tScale = 1.0;
      const scaleVal = (1 - (trans as number)) * imageScale + (trans as number) * tScale;
      const tx = (1 - (trans as number)) * parallaxX;
      const ty = (1 - (trans as number)) * parallaxY;
      return `translateX(${tx}px) translateY(${ty}px) scale(${scaleVal})`;
    }
  );

  const imageFilter = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const diff = Math.abs(index - (current as number));
      const blur = Math.min(8, Math.pow(diff, 2) * 8);
      const grayscale = 40 * (1 - Math.exp(-Math.pow(diff / 0.9, 2)));
      const wFilter = `blur(${blur}px) grayscale(${grayscale}%)`;
      return (trans as number) > 0.5 ? "none" : wFilter;
    }
  );

  const imageOpacity = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const diff = Math.abs(index - (current as number));
      const wOpacity = 0.6 + 0.4 * Math.exp(-Math.pow(diff / 0.9, 2));
      return (1 - (trans as number)) * wOpacity + (trans as number) * 1.0;
    }
  );

  const pointerEvents = useTransform(
    [progress, timelineTransition],
    ([current, trans]) => {
      const diff = Math.abs(index - (current as number));
      if ((trans as number) > 0.5) {
        return diff <= 5.0 ? "auto" : "none";
      }
      return diff <= 3.2 ? "auto" : "none";
    }
  );

  const combinedImageHeight = useTransform(timelineTransition, (trans) => {
    const wheelImgHeight = displayWidth * 0.67;
    const timelineImgHeight = isMobile ? 110 : 140;
    return (1 - trans) * wheelImgHeight + trans * timelineImgHeight;
  });

  const handleClick = () => {
    onCardClick(index, series);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="absolute pointer-events-auto transition-shadow duration-500"
      style={{
        width: combinedWidth,
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
      {/* Connector line from card to axis */}
      <motion.div
        className={`absolute left-1/2 w-px bg-neutral-300 dark:bg-neutral-450 transition-colors duration-1000 pointer-events-none ${
          isAbove ? "bottom-0 translate-y-full" : "top-0 -translate-y-full"
        }`}
        style={{
          height: 24,
          transform: `translateX(-0.5px) ${isAbove ? "translateY(100%)" : "translateY(-100%)"}`,
          opacity: timelineTransition,
        }}
      />

      <motion.div
        className="relative"
        style={{ scale, transformOrigin: "bottom left", willChange: "transform" }}
      >
        <div 
          className="relative w-full overflow-hidden bg-neutral-950 shadow-2xl group"
          style={{ height: combinedImageHeight }}
        >
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={`${getDesktopCardImagePath(getCardImagePath(series.cardImage ?? series.coverImage))} 1x, ${getCardImagePath(series.cardImage ?? series.coverImage)} 2x`}
            />
            <img
              src={getCardImagePath(series.cardImage ?? series.coverImage)}
              alt={series.title}
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              draggable={false}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none pointer-events-none"
              style={{ filter: imageFilter, transform: imageTransform, opacity: imageOpacity }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Card info overlay for timeline view */}
        <motion.div
          className="px-3 py-2.5 bg-white dark:bg-[#181614] text-neutral-900 dark:text-neutral-100 border-t border-neutral-100 dark:border-neutral-800/60 shadow-md"
          style={{
            opacity: timelineTransition,
            height: useTransform(timelineTransition, (trans) => trans * 56),
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <h3 className="font-sans text-[11px] tracking-[0.08em] font-medium uppercase truncate">
            {series.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-[8px] tracking-[0.15em] text-neutral-400 uppercase">
              {series.category}
            </span>
            <span className="font-mono text-[8px] tracking-[0.15em] text-neutral-400">
              {series.images.length} plates
            </span>
          </div>
        </motion.div>
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

export default function HomeWheelView({ onSelectSeries, photographyData, lang, onTimelineClick, viewMode = "wheel" }: HomeWheelViewProps) {
  const t = UI_TRANSLATIONS[lang];
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const timelineTransition = useMotionValue(viewMode === "timeline" ? 1 : 0);

  useEffect(() => {
    animate(timelineTransition, viewMode === "timeline" ? 1 : 0, {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    });
  }, [viewMode, timelineTransition]);
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

  const uniqueYears = useMemo(() => {
    const years: { year: string; firstIdx: number }[] = [];
    const seen = new Set<string>();
    photographyData.forEach((s, idx) => {
      if (!seen.has(s.year)) {
        seen.add(s.year);
        years.push({ year: s.year, firstIdx: idx });
      }
    });
    return years.sort((a, b) => a.year.localeCompare(b.year));
  }, [photographyData]);

  const NUM_TICKS = 81;
  const ticks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_TICKS; i++) {
      arr.push({ index: i, id: `tick-${i}` });
    }
    return arr;
  }, []);

  // Framer Motion spring scroll state for buttery kinetic movement
  const scrollProgress = useMotionValue(initialIndex);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 75,
    damping: 20,
    mass: 0.8,
  });

  const maxIndex = photographyData.length - 1;
  const peakIndex = useTransform(smoothProgress, (prog) => {
    const ratio = maxIndex > 0 ? (prog as number) / maxIndex : 0;
    return ratio * (NUM_TICKS - 1);
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

  // Prevent browser from auto-scrolling container when off-screen elements are clicked or focused
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollLeft !== 0) {
        container.scrollLeft = 0;
      }
      if (container.scrollTop !== 0) {
        container.scrollTop = 0;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeAnimationRef = useRef<any | null>(null);
  const scrollStartRef = useRef(0);

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

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIndex = clickRatio * (photographyData.length - 1);
    scrollToIndex(targetIndex);
    playButtonFeedback();
  };

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

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

  const handleCardClick = (index: number, series: PhotographySeries) => {
    playButtonFeedback();
    sessionStorage.setItem("wheelIndex", String(index));

    if (viewMode === "timeline") {
      onSelectSeries(series);
    } else {
      const currentIndex = Math.max(
        0,
        Math.min(photographyData.length - 1, Math.round(smoothProgress.get()))
      );

      if (index === currentIndex) {
        onSelectSeries(series);
      } else {
        scrollToIndex(index);
      }
    }
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
      data-view-mode={viewMode}
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
        className={`absolute -top-12 -bottom-12 -left-12 -right-12 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
          viewMode === "timeline" ? "opacity-0" : "opacity-70 dark:opacity-40"
        }`}
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
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={`${getDesktopCardImagePath(getCardImagePath(series.cardImage ?? series.coverImage))} 1x, ${getCardImagePath(series.cardImage ?? series.coverImage)} 2x`}
                />
                <img
                  src={getCardImagePath(series.cardImage ?? series.coverImage)}
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
              </picture>
            </div>
          );
        })}
        <div className="absolute inset-0 bg-white/10 dark:bg-neutral-950/50 transition-all duration-1000" />
      </motion.div>

      {/* Background ambient lighting vignette */}
      <div className={`absolute inset-0 bg-radial-gradient from-transparent via-neutral-100/10 to-[#fdfdfd] pointer-events-none z-0 transition-opacity duration-1000 dark:opacity-0 ${
        viewMode === "timeline" ? "opacity-0" : "opacity-100"
      }`} />
      <div className={`absolute inset-0 bg-radial-gradient from-transparent via-[#12100e]/30 to-[#0e0c0b] pointer-events-none z-0 transition-opacity duration-1000 ${
        viewMode === "timeline" ? "opacity-0" : "opacity-0 dark:opacity-100"
      }`} />

      {/* Main Interactive Stage: The L-Shape Corner Curve */}
      <div className="absolute inset-0 z-10 overflow-visible pointer-events-none">
        {/* Central horizontal timeline axis */}
        <motion.div
          className="absolute left-0 right-0 bg-neutral-300 dark:bg-neutral-500 transition-colors duration-1000 z-0 pointer-events-none"
          style={{
            top: "50%",
            height: 1,
            transform: "translateY(-0.5px)",
            opacity: timelineTransition,
          }}
        />

        {/* Year markers */}
        {uniqueYears.map(({ year, firstIdx }) => {
          const markerX = useTransform(
            [smoothProgress, timelineTransition],
            ([prog, trans]) => {
              const timelineWidth = isMobile ? 180 : 220;
              const displayWidth = getBaseSize(firstIdx, dimensions.width, isMobile);
              const cardWidth = (1 - (trans as number)) * displayWidth + (trans as number) * timelineWidth;
              const centerX = (dimensions.width - cardWidth) / 2;
              const xVal = centerX + (firstIdx - (prog as number)) * (timelineWidth + 48);
              return xVal;
            }
          );

          return (
            <motion.div
              key={year}
              className="absolute flex flex-col items-center pointer-events-none"
              style={{
                x: markerX,
                top: "50%",
                y: "-50%",
                left: -40,
                opacity: timelineTransition,
              }}
            >
              {/* Year dot on the line */}
              <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-400 transition-colors duration-1000" />
              {/* Year label */}
              <span className="absolute top-5 font-mono text-[11px] tracking-[0.3em] text-neutral-400 dark:text-neutral-400 uppercase whitespace-nowrap transition-colors duration-1000">
                {year}
              </span>
            </motion.div>
          );
        })}

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
              timelineTransition={timelineTransition}
              viewMode={viewMode}
              onCardClick={handleCardClick}
            />
          );
        })}
      </div>

      {/* Right-side vertical series title list — hidden on mobile, active one highlighted on desktop */}
      <motion.div
        className="hidden md:flex absolute top-[calc(50%-40px)] -translate-y-1/2 right-14 z-30 flex-col w-56 h-[360px] overflow-hidden pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
          opacity: useTransform(timelineTransition, (trans) => 1 - trans),
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
      </motion.div>

      {/* Mobile Title display anchored in the top-middle area */}
      {isMobile && activeSeries && (
        <motion.div 
          className="absolute top-[21vh] left-0 right-0 z-30 flex flex-col items-center text-center px-6 select-text pointer-events-none"
          style={{
            opacity: useTransform(timelineTransition, (trans) => 1 - trans),
          }}
        >
          <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-2 uppercase">
            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {photographyData.length}
          </span>
          <h2 className="font-serif text-[28px] sm:text-[32px] tracking-[0.08em] uppercase text-neutral-900 dark:text-white leading-tight max-w-[85vw] break-words">
            {activeSeries.title}
          </h2>
          <span className="font-mono text-[8px] tracking-[0.2em] text-neutral-450 dark:text-neutral-500 uppercase mt-3">
            {activeSeries.category} — {activeSeries.year}
          </span>
        </motion.div>
      )}


      {/* Unified Progress Ruler and Year Navigation Container */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col pointer-events-auto w-[75%] cursor-pointer group/ruler"
        style={{
          opacity: timelineTransition,
          pointerEvents: useTransform(timelineTransition, (trans) => trans > 0.5 ? "auto" : "none"),
        }}
        onClick={handleProgressBarClick}
        data-cursor="nav"
      >
        {/* Ticks Row */}
        <div className="flex items-end justify-between w-full h-8">
          {ticks.map((tick) => {
            const tickHeight = useTransform(peakIndex, (peak) => {
              const distance = Math.abs(tick.index - (peak as number));
              return 8 + 14 * Math.exp(-Math.pow(distance / 4.0, 2));
            });

            const tickOpacity = useTransform(peakIndex, (peak) => {
              const distance = Math.abs(tick.index - (peak as number));
              return 0.25 + 0.75 * Math.exp(-Math.pow(distance / 4.0, 2));
            });

            const tickFactor = useTransform(peakIndex, (peak) => {
              const distance = Math.abs(tick.index - (peak as number));
              return Math.max(0, Math.min(1, Math.exp(-Math.pow(distance / 3.0, 2))));
            });

            return (
              <motion.div
                key={tick.id}
                className="w-[2px] rounded-full progress-tick"
                style={{
                  height: tickHeight,
                  opacity: tickOpacity,
                  "--tick-factor": tickFactor,
                } as any}
              />
            );
          })}
        </div>

        {/* Years Labels Container */}
        <div className="relative w-full h-6 mt-3">
          {uniqueYears.map(({ year, firstIdx }) => {
            const ratio = maxIndex > 0 ? firstIdx / maxIndex : 0;
            const percent = ratio * 100;
            const isActive = activeSeries?.year === year;
            return (
              <div
                key={year}
                className={`absolute -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 select-none ${
                  isActive
                    ? "text-neutral-900 dark:text-white font-medium"
                    : "text-neutral-400 dark:text-neutral-400"
                }`}
                style={{ left: `${percent}%` }}
              >
                {year}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
