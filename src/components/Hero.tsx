/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const titleLetters = "REVEALING THE INVISIBLE".split("");

  const slideshowImages = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200",
      title: "Concrete Angle I",
      series: "Silent Monoliths",
      location: "Berlin, Germany",
    },
    {
      url: "https://images.unsplash.com/photo-1499856126468-b5134766f6aa?auto=format&fit=crop&q=85&w=1200",
      title: "Midnight Silhouette",
      series: "Paris Spleen",
      location: "Paris, France",
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=85&w=1200",
      title: "Sea Mist Whispers",
      series: "Ethereal Shores",
      location: "Normandy, France",
    },
    {
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=85&w=1200",
      title: "Quiet Contemplation",
      series: "Human Landscapes",
      location: "Paris, France",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  const handleScrollDown = () => {
    const galleryEl = document.getElementById("gallery-section");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 max-w-[1600px] mx-auto overflow-hidden">
      
      {/* Visual background atmospheric lights - very subtle */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neutral-400/5 dark:bg-neutral-100/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-stone-400/5 dark:bg-stone-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top section: Poetic Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full z-10 border-b border-neutral-500/5 pb-6">
        <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-start">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase"
          >
            ARTIST PORTFOLIO
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 mt-3 font-light max-w-md"
          >
            A visual documentation of concrete gravity, fine art portrait geometries, and nocturnal streetscapes. Quiet, structured frames captured across Europe and North America.
          </motion.p>
        </div>

        <div className="hidden md:flex md:col-start-8 md:col-span-5 items-end justify-end font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500 uppercase text-right space-y-1 flex-col">
          <p>STREET / ARCHITECTURE / PORTRAIT</p>
          <p>SHOTS ON MEDIUM FORMAT & 35MM FILM</p>
        </div>
      </div>

      {/* Middle section: Dynamic Split Layout with Typography & Image Slideshow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-auto py-8 z-10">
        
        {/* Left Column: Title */}
        <div className="lg:col-span-7 flex flex-col items-start select-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-mono text-[10px] tracking-[0.4em] text-neutral-400 dark:text-neutral-500 uppercase ml-1 mb-2"
          >
            SELECTED PHOTOGRAPHS
          </motion.span>

          <h1 className="font-serif text-[9vw] sm:text-[7vw] lg:text-[5.5vw] leading-[0.9] tracking-tighter text-neutral-900 dark:text-neutral-50 uppercase font-light">
            <span className="block">
              {titleLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.02 * index,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <motion.span 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block font-serif italic font-normal text-neutral-400 dark:text-neutral-400 lowercase mt-1 text-[10vw] sm:text-[8vw] lg:text-[6vw]"
            >
              through silent lines.
            </motion.span>
          </h1>
        </div>

        {/* Right Column: Immersive Slideshow Frame */}
        <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-500/10 rounded-none shadow-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-neutral-950/5 z-10 pointer-events-none" />
                
                <img
                  src={slideshowImages[currentIndex].url}
                  alt={slideshowImages[currentIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1s] ease-in-out"
                />
              </motion.div>
            </AnimatePresence>

            {/* In-image caption indicator */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-baseline mix-blend-difference text-white/85 font-mono text-[8px] tracking-widest uppercase">
              <span>{slideshowImages[currentIndex].title}</span>
              <span>[ 0{currentIndex + 1} // 04 ]</span>
            </div>
          </motion.div>
          
          {/* Metadata of active photo directly under slideshow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-[420px] flex justify-between items-center mt-3 font-mono text-[9px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500"
          >
            <span>SERIES: {slideshowImages[currentIndex].series}</span>
            <span>{slideshowImages[currentIndex].location}</span>
          </motion.div>
        </div>

      </div>

      {/* Bottom section: Metadata & Scroll Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-neutral-500/10 pt-6 w-full z-10">
        
        {/* Left: Exhibition notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-start font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500 uppercase"
        >
          <span className="text-neutral-900 dark:text-neutral-100 font-semibold">CURRENT EXHIBITION</span>
          <span className="mt-1">“ARCHITECTURES OF GRAVITY” — GALERIE OUEST, PARIS</span>
          <span className="text-neutral-400 font-light">JULY 15 — AUGUST 30, 2026</span>
        </motion.div>

        {/* Right: Scroll down circular button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
          onClick={handleScrollDown}
          className="group relative flex items-center justify-center w-14 h-14 rounded-none border border-neutral-900/10 dark:border-white/10 hover:border-neutral-900 hover:dark:border-white transition-all duration-500 mt-6 sm:mt-0"
          data-cursor="view"
          aria-label="Scroll down"
        >
          {/* Pulsing visual outer ring */}
          <div className="absolute inset-0 rounded-none border border-neutral-400/5 dark:border-white/5 scale-125 group-hover:scale-150 transition-all duration-700 opacity-50 group-hover:opacity-100" />
          
          <ArrowDown className="w-5 h-5 text-neutral-800 dark:text-neutral-200 group-hover:translate-y-1 transition-transform duration-300" />
        </motion.button>

      </div>

    </section>
  );
}
