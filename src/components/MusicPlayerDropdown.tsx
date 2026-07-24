/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Play, Pause, FastForward } from "lucide-react";
import { motion } from "motion/react";

interface MusicPlayerDropdownProps {
  togglePlayback: () => void;
  currentTrack?: { title: string; artist: string; file: string };
  onNextTrack?: () => void;
}

function TrackTitleMarquee({ title }: { title?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const trackTitle = title || "No track";

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const measurement = measurementRef.current;
    if (!viewport || !measurement) return;

    const updateOverflow = () => {
      const width = measurement.getBoundingClientRect().width;
      setTextWidth(width);
      setIsOverflowing(width > viewport.clientWidth);
    };

    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(viewport);
    observer.observe(measurement);
    return () => observer.disconnect();
  }, [trackTitle]);

  return (
    <div
      ref={viewportRef}
      className="relative flex h-8 w-full items-center justify-center overflow-hidden select-none"
      aria-label={`Current track: ${trackTitle}`}
    >
      <span
        ref={measurementRef}
        className="absolute whitespace-nowrap invisible pointer-events-none font-sans text-[12px] font-semibold tracking-wide"
        aria-hidden="true"
      >
        {trackTitle}
      </span>

      {isOverflowing ? (
        <motion.div
          className="flex w-max shrink-0 items-center gap-8 font-sans text-[12px] font-semibold tracking-wide text-neutral-900 dark:text-neutral-100"
          animate={{ x: [0, 0, -(textWidth + 32), -(textWidth + 32)] }}
          transition={{
            duration: Math.max(8, trackTitle.length * 0.45),
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "linear",
            times: [0, 0.12, 0.62, 1],
          }}
        >
          <span>{trackTitle}</span>
          <span aria-hidden="true">{trackTitle}</span>
        </motion.div>
      ) : (
        <span className="block w-full truncate text-center font-sans text-[12px] font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
          {trackTitle}
        </span>
      )}
    </div>
  );
}

export default function MusicPlayerDropdown({
  togglePlayback,
  currentTrack,
  onNextTrack,
}: MusicPlayerDropdownProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [displacementMapUrl, setDisplacementMapUrl] = useState<string>("");

  useEffect(() => {
    // Generate the liquid glass displacement map
    const width = 240; // card width (w-60 = 15rem = 240px)
    const height = 136; // single-column player height
    const radius = 12;  // rounded-xl = 12px
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;
    
    const length = (x: number, y: number) => Math.sqrt(x * x + y * y);
    const roundedRectSDF = (x: number, y: number, w: number, h: number, r: number) => {
      const qx = Math.abs(x) - w + r;
      const qy = Math.abs(y) - h + r;
      return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - r;
    };
    
    const halfW = width / 2;
    const halfH = height / 2;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cx = x - halfW;
        const cy = y - halfH;
        
        // Calculate SDF distance to card border
        const d = roundedRectSDF(cx, cy, halfW, halfH, radius);
        
        let r = 128;
        let g = 128;
        
        // Border boundary distortion zone (-16px inside edge to 8px outside edge)
        if (d >= -16 && d <= 8) {
          const d_x1 = roundedRectSDF(cx + 1, cy, halfW, halfH, radius);
          const d_x2 = roundedRectSDF(cx - 1, cy, halfW, halfH, radius);
          const d_y1 = roundedRectSDF(cx, cy + 1, halfW, halfH, radius);
          const d_y2 = roundedRectSDF(cx, cy - 1, halfW, halfH, radius);
          
          const dx = (d_x1 - d_x2) / 2;
          const dy = (d_y1 - d_y2) / 2;
          
          // Gaussian peak right at the card border d = 0
          const f = Math.exp(-Math.pow(d / 5, 2));
          
          const dispX = dx * f * 0.7;
          const dispY = dy * f * 0.7;
          
          r = Math.round(128 + dispX * 127);
          g = Math.round(128 + dispY * 127);
        }
        
        const idx = (y * width + x) * 4;
        data[idx] = Math.max(0, Math.min(255, r));     // R channel
        data[idx + 1] = Math.max(0, Math.min(255, g)); // G channel
        data[idx + 2] = 128;                           // B channel
        data[idx + 3] = 255;                           // Alpha
      }
    }
    
    ctx.putImageData(imgData, 0, 0);
    setDisplacementMapUrl(canvas.toDataURL());
  }, []);

  useEffect(() => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (!audio) return;

    setIsPlaying(!audio.paused);

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlayback();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNextTrack) {
      onNextTrack();
    }
  };

  const songTitle = currentTrack?.title || "正義の味方";

  const filterId = "liquid-glass-music-player";

  return (
    <>
      {/* SVG Filter for Liquid Glass Refraction Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
            {displacementMapUrl && (
              <feImage href={displacementMapUrl} result="map" />
            )}
            <feDisplacementMap
              in="blur"
              in2="map"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute top-full left-1/2 mt-3 z-50 w-60 -translate-x-1/2 p-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-white/20 dark:bg-[#181614]/30 border border-white/25 dark:border-neutral-800/40 transition-colors duration-1000 flex flex-col items-center pointer-events-auto"
        style={{
          transformOrigin: "top center",
          backdropFilter: `url(#${filterId}) blur(24px)`,
          WebkitBackdropFilter: "blur(24px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
      <div className="flex w-full max-w-[196px] flex-col items-center gap-2.5 select-none">
        <TrackTitleMarquee title={songTitle} />

        <button
          onClick={handlePlayPause}
          className="p-1 text-neutral-900 dark:text-white hover:scale-110 active:scale-90 transition-transform focus:outline-none"
          data-cursor="nav"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors focus:outline-none"
          data-cursor="nav"
          aria-label="Next"
        >
          <FastForward className="w-4 h-4 fill-current" />
        </button>
      </div>
    </motion.div>
  </>
);
}
