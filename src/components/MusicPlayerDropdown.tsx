/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Play, Pause, Rewind, FastForward } from "lucide-react";
import { motion } from "motion/react";

interface MusicPlayerDropdownProps {
  toggleMute: () => void;
  currentTrack?: { title: string; artist: string; file: string };
  onPrevTrack?: () => void;
  onNextTrack?: () => void;
}

export default function MusicPlayerDropdown({
  toggleMute,
  currentTrack,
  onPrevTrack,
  onNextTrack,
}: MusicPlayerDropdownProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    toggleMute();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPrevTrack) {
      onPrevTrack();
    } else {
      const audio = document.getElementById("bg-audio") as HTMLAudioElement;
      if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
      }
    }
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (audio && audio.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      audio.currentTime = ratio * audio.duration;
    }
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
  const songArtist = currentTrack?.artist || "玉置浩二";
  const songAlbum = currentTrack?.file ? "Ryuichi Sakamoto" : "STAR - Single";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
      className="absolute top-12 right-0 z-50 w-72 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white/95 dark:bg-[#181614]/95 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md transition-colors duration-1000 flex flex-col items-center pointer-events-auto"
      style={{ transformOrigin: "top right" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Song Info */}
      <div className="text-center w-full mt-1 mb-4 select-none">
        <h4 className="font-sans text-[13px] font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 uppercase truncate">
          {songTitle}
        </h4>
        <p className="font-sans text-[10px] tracking-wider text-neutral-400 dark:text-neutral-500 mt-1 truncate">
          {songArtist} — {songAlbum}
        </p>
      </div>

      {/* Progress Track */}
      <div className="flex items-center w-full select-none mb-4">
        <span className="font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500 w-8 text-left">
          {formatTime(currentTime)}
        </span>

        <div
          onClick={handleSeek}
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

      {/* Controls */}
      <div className="flex items-center justify-center space-x-8 w-full select-none">
        <button
          onClick={handlePrev}
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors focus:outline-none"
          data-cursor="nav"
          aria-label="Previous"
        >
          <Rewind className="w-4 h-4 fill-current" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full hover:scale-105 active:scale-95 transition-all focus:outline-none flex items-center justify-center shadow-sm"
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
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors focus:outline-none"
          data-cursor="nav"
          aria-label="Next"
        >
          <FastForward className="w-4 h-4 fill-current" />
        </button>
      </div>
    </motion.div>
  );
}
