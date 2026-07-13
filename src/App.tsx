/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Instagram, Twitter, Mail, ArrowUp } from "lucide-react";

// Types
import { Photo } from "./types";

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
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<Language>("en");

  const localizedData = getLocalizedData(lang);
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

  // Minimalist Background Music with Fade Transitions
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const fadeIntervalRef = useRef<number | null>(null);

  const fadeAudio = (targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const step = 0.015;
    const intervalTime = 25; // ms

    fadeIntervalRef.current = window.setInterval(() => {
      let currentVol = audio.volume;
      if (currentVol < targetVolume) {
        currentVol = Math.min(targetVolume, currentVol + step);
      } else if (currentVol > targetVolume) {
        currentVol = Math.max(targetVolume, currentVol - step);
      }

      audio.volume = currentVol;

      if (Math.abs(currentVol - targetVolume) < 0.001) {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (onComplete) onComplete();
      }
    }, intervalTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      setIsMuted(false);
      audio.volume = 0;
      audio.play().catch((err) => console.log("Audio play blocked by browser:", err));
      fadeAudio(0.20); // Softer target volume (20%)
    } else {
      setIsMuted(true);
      fadeAudio(0, () => {
        audio.pause();
      });
    }
  };

  useEffect(() => {
    // Attempt play on mount
    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.volume = 0;
      audio.play()
        .then(() => fadeAudio(0.20))
        .catch(() => {
          // Autoplay blocked by browser. Handled via interaction.
        });
    }

    const handleFirstInteraction = () => {
      const audioVal = audioRef.current;
      if (audioVal && !isMuted && audioVal.paused) {
        audioVal.volume = 0;
        audioVal.play()
          .then(() => fadeAudio(0.20))
          .catch((err) => console.log("Play failed on gesture:", err));
      }
      
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isMuted]);

  const [routeLoading, setRouteLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  const shouldLoadRoute = (path: string) => {
    return path.startsWith("/series") || path === "/playground";
  };

  // Synchronous route interception to prevent paint flash
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setRouteLoading(shouldLoadRoute(location.pathname));
  }

  useEffect(() => {
    if (!shouldLoadRoute(location.pathname)) {
      setRouteLoading(false);
      return;
    }

    let active = true;

    const checkImages = () => {
      if (!active) return;
      const images = Array.from(document.querySelectorAll("main img, img")) as HTMLImageElement[];
      const pendingImages = images.filter((img) => !img.complete);

      if (pendingImages.length === 0) {
        setTimeout(() => {
          if (active) {
            setRouteLoading(false);
          }
        }, 300); // Small buffer for rendering smooth out
      } else {
        let loadedCount = 0;
        const onImageLoad = () => {
          loadedCount++;
          if (loadedCount >= pendingImages.length) {
            setTimeout(() => {
              if (active) {
                setRouteLoading(false);
              }
            }, 300);
          }
        };

        pendingImages.forEach((img) => {
          img.addEventListener("load", onImageLoad);
          img.addEventListener("error", onImageLoad); // handle broken links gracefully
        });
      }
    };

    // Small delay to let React construct/mount the elements for the new route
    const timer = setTimeout(checkImages, 150);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <iframe src="/loading/index.html" className="fixed inset-0 w-full h-full border-0 z-[9999]" title="Loading" />
    );
  }

  // Footer component reused across About page
  const Footer = () => (
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
          <button onClick={() => navigate("/")} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
            {t.selectedWork}
          </button>
          <button onClick={() => navigate("/about")} className="text-left text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white py-1">
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
  );

  return (
    <div className="font-sans bg-[#fdfdfd] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 dark:selection:bg-white selection:text-white dark:selection:text-neutral-900 transition-colors duration-1000 min-h-screen flex flex-col">
      {/* Premium Interactive Cursor */}
      <CustomCursor lang={lang} />

      {/* Background Audio Node */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Persistent Menu & Headers */}
      <Header
        theme={theme}
        setTheme={setTheme}
        lang={lang}
        setLang={setLang}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      {/* Main Orchestrated Contents */}
      <main className={`flex-grow relative flex flex-col transition-opacity duration-200 ${routeLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <AnimatePresence mode="wait">
          <Routes>

            {/* Home — Selected Work */}
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="fixed inset-0 w-full h-full overflow-hidden"
                >
                  <HomeWheelView
                    onSelectSeries={(series) => navigate(`/series/${series.id}`)}
                    photographyData={localizedData}
                  />
                </motion.div>
              }
            />

            {/* About / Biography */}
            <Route
              path="/about"
              element={
                <motion.div
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
                  <Footer />
                </motion.div>
              }
            />

            {/* Playground */}
            <Route
              path="/playground"
              element={
                <motion.div
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
              }
            />

            {/* Series Detail */}
            <Route
              path="/series/:seriesId"
              element={
                <SeriesRouteWrapper
                  localizedData={localizedData}
                  onSelectPhoto={handleSelectPhoto}
                  lang={lang}
                />
              }
            />

          </Routes>
        </AnimatePresence>
      </main>

      {/* Full-screen Lightbox */}
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

      {/* Elegant Minimalist Route Transition Loader */}
      {/* Elegant Minimalist Route Transition Loader */}
      <AnimatePresence>
        {routeLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-white dark:bg-neutral-950 transition-colors duration-1000"
          >
            <RouteLoader />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component to resolve seriesId param and render SeriesView
function SeriesRouteWrapper({
  localizedData,
  onSelectPhoto,
  lang,
}: {
  localizedData: ReturnType<typeof getLocalizedData>;
  onSelectPhoto: (photo: Photo, photos: Photo[]) => void;
  lang: Language;
}) {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();
  const series = localizedData.find((s) => s.id === seriesId);

  if (!series) {
    // Unknown series → redirect home
    navigate("/", { replace: true });
    return null;
  }

  return (
    <SeriesView
      key={series.id}
      series={series}
      onBack={() => navigate("/", { state: { restoreWheel: true } })}
      onSelectPhoto={onSelectPhoto}
      lang={lang}
    />
  );
}

const LOADER_STEPS = [
  { grid: ["ホ", "", "", ""], duration: 150 },
  { grid: ["ホ", "ズ", "", ""], duration: 150 },
  { grid: ["ホ", "ズ", "ミ", ""], duration: 150 },
  { grid: ["ホ", "ズ", "ミ", "＃"], duration: 350 },
  { grid: ["", "ズ", "ミ", "＃"], duration: 100 },
  { grid: ["", "", "ミ", "＃"], duration: 100 },
  { grid: ["", "", "", "＃"], duration: 100 },
  { grid: ["", "", "", ""], duration: 150 }
];

function RouteLoader() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const currentStep = LOADER_STEPS[stepIndex];
    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % LOADER_STEPS.length);
    }, currentStep.duration);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const currentGrid = LOADER_STEPS[stepIndex].grid;

  return (
    <div className="grid grid-cols-2 gap-x-16 sm:gap-x-24 md:gap-x-32 gap-y-12 sm:gap-y-16 md:gap-y-20 font-mono text-center">
      {currentGrid.map((char, index) => (
        <div key={index} className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {char && (
              <motion.span
                key={char}
                className="absolute text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.2em] text-neutral-950 dark:text-white select-none"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
