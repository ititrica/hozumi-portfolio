/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Play, Pause, FastForward } from "lucide-react";
import { motion } from "motion/react";

interface MusicPlayerDropdownProps {
  togglePlayback: () => void;
  currentTrack?: { title: string; artist: string; file: string };
  onNextTrack?: () => void;
}

export default function MusicPlayerDropdown({
  togglePlayback,
  currentTrack,
  onNextTrack,
}: MusicPlayerDropdownProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displacementMapUrl, setDisplacementMapUrl] = useState<string>("");

  useEffect(() => {
    // Generate the liquid glass displacement map
    const width = 256; // card width (w-64 = 16rem = 256px)
    const height = 144; // compact player height
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

    // Read initial state
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    setIsPlaying(!audio.paused);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
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
    } else {
      const audio = document.getElementById("bg-audio") as HTMLAudioElement;
      if (audio) {
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
      }
    }
  };

  const updateSeekPosition = (clientX: number, track: HTMLDivElement) => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (!audio || !audio.duration) return;

    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  const handleSeekMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const track = e.currentTarget;
    updateSeekPosition(e.clientX, track);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateSeekPosition(moveEvent.clientX, track);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formatRemainingTime = (time: number, dur: number) => {
    if (isNaN(time) || isNaN(dur)) return "0:00";
    const remaining = Math.max(0, dur - time);
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `-${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
      {/* Track title */}
      <div className="text-center w-full mb-2 select-none">
        <h4 className="font-sans text-[12px] font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 uppercase truncate">
          {songTitle}
        </h4>
      </div>

      {/* Progress Track */}
      <div className="flex items-center w-full select-none mb-2.5">
        <span className="font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500 w-8 text-left">
          {formatTime(currentTime)}
        </span>

        <div
          onMouseDown={handleSeekMouseDown}
          className="flex-1 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full relative cursor-pointer group"
        >
          <div
            className="bg-neutral-900 dark:bg-white h-full rounded-full transition-all duration-75 ease-out"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 5px)` }}
          />
        </div>

        <span className="font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500 w-10 text-right">
          {formatRemainingTime(currentTime, duration)}
        </span>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-4 w-full select-none">
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
