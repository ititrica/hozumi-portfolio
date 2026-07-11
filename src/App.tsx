/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Instagram, Twitter, Mail, ArrowUp } from "lucide-react";

// Types
import { ViewState, PhotographySeries, Photo } from "./types";

// Components
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import HomeWheelView from "./components/HomeWheelView";
import SeriesView from "./components/SeriesView";
import Lightbox from "./components/Lightbox";
import AboutContact from "./components/AboutContact";

export default function App() {
  const [currentView, setView] = useState<ViewState>("home");
  const [selectedSeries, setSelectedSeries] = useState<PhotographySeries | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Force dark mode globally
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Photo selection from series
  const handleSelectPhoto = (photo: Photo, photos: Photo[]) => {
    setSelectedPhoto(photo);
    setLightboxPhotos(photos);
  };

  const isHome = currentView === "home";

  return (
    <div className={`font-sans bg-neutral-950 text-neutral-100 selection:bg-white selection:text-neutral-900 ${
      isHome ? "h-screen overflow-hidden flex flex-col" : "min-h-screen flex flex-col"
    }`}>
      
      {/* Premium Interactive Cursor */}
      <CustomCursor />
      
      {/* Persistent Menu & Headers */}
      <Header 
        currentView={currentView} 
        setView={(view) => {
          setView(view);
          setSelectedSeries(null); // Reset detail view
        }} 
      />

      {/* Main Orchestrated Contents */}
      <main className={`flex-grow ${isHome ? "h-screen overflow-hidden pt-0" : "pt-20"}`}>
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              {/* Interactive 1/4 Wheel Showcase */}
              <HomeWheelView 
                onSelectSeries={(series) => setSelectedSeries(series)} 
              />
            </motion.div>
          )}

          {currentView === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AboutContact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Immersive Series Overlay Details Page */}
      <AnimatePresence>
        {selectedSeries && (
          <SeriesView 
            series={selectedSeries}
            onBack={() => setSelectedSeries(null)}
            onSelectPhoto={handleSelectPhoto}
          />
        )}
      </AnimatePresence>

      {/* Full-screen Lightbox with Zoom & EXIF toggle */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox 
            photo={selectedPhoto}
            photos={lightboxPhotos}
            onClose={() => setSelectedPhoto(null)}
            onNavigate={(photo) => setSelectedPhoto(photo)}
          />
        )}
      </AnimatePresence>

      {/* Persistent Footer */}
      {currentView !== "home" && (
        <footer className="border-t border-neutral-500/10 py-16 bg-neutral-100/40 dark:bg-neutral-950">
          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Logo & Slogan */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-serif text-xl tracking-[0.15em] font-medium uppercase text-neutral-900 dark:text-neutral-100">
                Cathy Dolle
              </span>
              <p className="font-serif text-xs font-light text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-sm">
                Documenting architectural concrete gravity, fine art portrait geometries, and nocturnal European street aesthetics through analog and high-resolution digital systems.
              </p>
            </div>

            {/* Quick links map */}
            <div className="md:col-span-3 flex flex-col space-y-3 font-mono text-[10px] tracking-widest uppercase">
              <span className="text-neutral-400 dark:text-neutral-600">SECTIONS</span>
              <button onClick={() => { setView("home"); setSelectedSeries(null); }} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
                Selected Work
              </button>
              <button onClick={() => { setView("about"); setSelectedSeries(null); }} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
                Biography
              </button>
            </div>

            {/* Connect social icons */}
            <div className="md:col-span-4 flex flex-col space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
                RESOURCES & CONNECT
              </span>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-none transition-all duration-300"
                  aria-label="Instagram"
                  data-cursor="pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-none transition-all duration-300"
                  aria-label="Twitter"
                  data-cursor="pointer"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:ititrica@gmail.com" 
                  className="p-3 bg-neutral-500/5 hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-none transition-all duration-300"
                  aria-label="Email"
                  data-cursor="pointer"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span className="font-mono text-[9px] text-neutral-400 mt-2">
                © 2026 CATHY DOLLE. ALL RIGHTS RESERVED.
              </span>
            </div>

          </div>
        </footer>
      )}

      {/* Floating Scroll back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded-none shadow-lg z-40 focus:outline-none transition-transform active:scale-95"
            data-cursor="nav"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

