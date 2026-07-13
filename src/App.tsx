/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
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
import Playground from "./components/Playground";
import { Language, getLocalizedData, UI_TRANSLATIONS } from "./i18n";

export default function App() {
  const [currentView, setView] = useState<ViewState>("home");
  const [selectedSeries, setSelectedSeries] = useState<PhotographySeries | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<Language>("en");

  const localizedData = getLocalizedData(lang);
  const activeSeries = selectedSeries ? localizedData.find((s) => s.id === selectedSeries.id) || selectedSeries : null;
  const t = UI_TRANSLATIONS[lang];

  // Toggle dark class on document when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const aboutContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (aboutContainerRef.current) {
      aboutContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle Photo selection from series
  const handleSelectPhoto = (photo: Photo, photos: Photo[]) => {
    setSelectedPhoto(photo);
    setLightboxPhotos(photos);
  };

  const isHome = currentView === "home";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <iframe src="/loading/index.html" className="fixed inset-0 w-full h-full border-0 z-[9999]" title="Loading" />
    );
  }

  return (
    <div className="font-sans bg-[#fdfdfd] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 dark:selection:bg-white selection:text-white dark:selection:text-neutral-900 transition-colors duration-1000 min-h-screen flex flex-col">
      
      {/* Premium Interactive Cursor */}
      <CustomCursor />
      
      {/* Persistent Menu & Headers */}
      <Header 
        currentView={currentView} 
        setView={(view) => {
          setView(view);
          setSelectedSeries(null); // Reset detail view
        }} 
        theme={theme}
        setTheme={setTheme}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Orchestrated Contents */}
      <main className="flex-grow relative flex flex-col">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 w-full h-full overflow-hidden"
            >
              {/* Interactive 1/4 Wheel Showcase */}
              <HomeWheelView 
                onSelectSeries={(series) => {
                  setSelectedSeries(series);
                  setView("series");
                }} 
                photographyData={localizedData}
              />
            </motion.div>
          )}

          {currentView === "about" && (
            <motion.div
              key="about"
              ref={aboutContainerRef}
              onScroll={(e) => {
                setShowScrollTop(e.currentTarget.scrollTop > 500);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-40 overflow-y-auto pt-20 flex flex-col bg-[#fdfdfd] dark:bg-[#0e0c0b] transition-colors duration-1000"
            >
              <div className="flex-grow">
                <AboutContact lang={lang} />
              </div>
              <footer className="border-t border-neutral-500/10 py-16 bg-neutral-100/40 dark:bg-neutral-950/20 transition-colors duration-1000">
                <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  
                  {/* Logo & Slogan */}
                  <div className="md:col-span-5 space-y-4">
                    <span className="font-serif text-xl tracking-[0.15em] font-medium uppercase text-neutral-900 dark:text-neutral-100">
                      Hozumi
                    </span>
                    <p className="font-serif text-xs font-light text-neutral-400 dark:text-neutral-500 leading-snug max-w-sm">
                      {t.footerSlogan}
                    </p>
                  </div>

                  {/* Quick links map */}
                  <div className="md:col-span-3 flex flex-col space-y-3 font-mono text-[10px] tracking-widest uppercase">
                    <span className="text-neutral-400 dark:text-neutral-600">{t.sections}</span>
                    <button onClick={() => { setView("home"); setSelectedSeries(null); }} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
                      {t.selectedWork}
                    </button>
                    <button onClick={() => { setView("about"); setSelectedSeries(null); }} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
                      {t.biography}
                    </button>
                  </div>

                  {/* Connect social icons */}
                  <div className="md:col-span-4 flex flex-col space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
                      {t.resourcesConnect}
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
                      {t.copyright}
                    </span>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
          {currentView === "playground" && (
            <motion.div
              key="playground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-45"
            >
              <Playground 
                photographyData={localizedData} 
                onSelectPhoto={handleSelectPhoto} 
                lang={lang} 
              />
            </motion.div>
          )}

          {currentView === "series" && activeSeries && (
            <SeriesView 
              key="series"
              series={activeSeries}
              onBack={() => {
                setView("home");
                setSelectedSeries(null);
              }}
              onSelectPhoto={handleSelectPhoto}
              lang={lang}
            />
          )}
        </AnimatePresence>
      </main>



      {/* Full-screen Lightbox with Zoom & EXIF toggle */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox 
            photo={selectedPhoto}
            photos={lightboxPhotos}
            onClose={() => setSelectedPhoto(null)}
            onNavigate={(photo) => setSelectedPhoto(photo)}
            lang={lang}
          />
        )}
      </AnimatePresence>



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

