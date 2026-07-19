/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Instagram, Twitter, Mail, ArrowUp } from "lucide-react";

import { PHOTOGRAPHY_DATA } from "./data";

// Types
import { PhotographySeries, Photo } from "./types";

// Components
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import SeoManager from "./components/SeoManager";
import { Language, getLocalizedData, UI_TRANSLATIONS } from "./i18n";
import { playButtonFeedback } from "./utils/uiSound";

const HomeWheelView = lazy(() => import("./components/HomeWheelView"));
const loadSeriesView = () => import("./components/SeriesView");
const SeriesView = lazy(loadSeriesView);
const Lightbox = lazy(() => import("./components/Lightbox"));
const AboutContact = lazy(() => import("./components/AboutContact"));
const loadPlaygroundView = () => import("./components/Playground");
const Playground = lazy(loadPlaygroundView);

type RouteTransitionPhase =
  | "idle"
  | "page-exit"
  | "loader-playing"
  | "loader-exit"
  | "page-enter";

const LOADER_FADE_DURATION = 500;
const LOADER_TOTAL_DURATION = 1250;
const LOADER_PLAY_DURATION = LOADER_TOTAL_DURATION - LOADER_FADE_DURATION;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasEnteredSession = typeof sessionStorage !== "undefined" && sessionStorage.getItem("hasEnteredSite") === "true";

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [hasEntered, setHasEntered] = useState(hasEnteredSession);
  const [isExpanding, setIsExpanding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entranceSequenceDone, setEntranceSequenceDone] = useState(hasEnteredSession);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [routeTransitionPhase, setRouteTransitionPhase] = useState<RouteTransitionPhase>("idle");
  const [seriesChunkReady, setSeriesChunkReady] = useState(false);
  const [routePageReady, setRoutePageReady] = useState(false);
  const [routeLoaderCycleComplete, setRouteLoaderCycleComplete] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('themePreference');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return "dark";
  });
  const [lang, setLang] = useState<Language>("en");

  const localizedData = useMemo(() => getLocalizedData(lang), [lang]);
  const t = UI_TRANSLATIONS[lang];

  const homeCardUrls = useMemo(() => {
    return Array.from(new Set(PHOTOGRAPHY_DATA.map((series) => (
      series.cardImage ?? series.coverImage
    ).replace(/\.webp$/, "-card.webp"))));
  }, []);
  const [homeAssetsReady, setHomeAssetsReady] = useState(false);

  // Warm every homepage card while the entry screen is visible so large wheel jumps never
  // wait for a newly mounted image. Decode completion is included where supported.
  useEffect(() => {
    let cancelled = false;

    const preloadCard = (src: string) => new Promise<void>((resolve) => {
      const image = new Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (image.decode) {
          image.decode().catch(() => undefined).finally(resolve);
        } else {
          resolve();
        }
      };
      image.onload = finish;
      image.onerror = () => {
        console.error(`Failed to preload homepage card: ${src}`);
        resolve();
      };
      image.src = src;
      if (image.complete) finish();
    });

    Promise.all(homeCardUrls.map(preloadCard)).then(() => {
      if (!cancelled) setHomeAssetsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [homeCardUrls]);

  useEffect(() => {
    if (entranceSequenceDone && homeAssetsReady) {
      setLoading(false);
    }
  }, [entranceSequenceDone, homeAssetsReady]);

  // Toggle dark class on document when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('themePreference', theme);
  }, [theme]);

  // Update html lang attribute for CSS font switching
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh" : lang === "ja" ? "ja" : "en";
  }, [lang]);

  const aboutContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (aboutContainerRef.current) {
      aboutContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle Photo selection from series
  const handleSelectPhoto = useCallback((photo: Photo, photos: Photo[]) => {
    setSelectedPhoto(photo);
    setLightboxPhotos(photos);
  }, []);

  const startRouteTransition = useCallback((loadRoute: () => Promise<unknown>, path: string) => {
    if (routeTransitionPhase !== "idle") return;
    setRouteTransitionPhase("page-exit");
    setSeriesChunkReady(false);
    setRoutePageReady(false);
    setRouteLoaderCycleComplete(false);
    void loadRoute().finally(() => setSeriesChunkReady(true));
    navigate(path);
  }, [navigate, routeTransitionPhase]);

  const handleSelectSeries = useCallback((series: PhotographySeries) => {
    startRouteTransition(loadSeriesView, `/series/${series.id}`);
  }, [startRouteTransition]);

  const handleHeaderNavigate = useCallback((path: string) => {
    if (path === "/playground") {
      startRouteTransition(loadPlaygroundView, path);
      return;
    }

    if (path === "/" && location.pathname.startsWith("/series")) {
      navigate("/", { state: { restoreWheel: true } });
    } else {
      navigate(path);
    }
  }, [location.pathname, navigate, startRouteTransition]);

  const handleRoutePageReady = useCallback(() => {
    setRoutePageReady(true);
  }, []);

  const handleRouteLoaderCycleComplete = useCallback(() => {
    setRouteLoaderCycleComplete(true);
  }, []);

  // Minimalist Background Music with Fade Transitions
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof sessionStorage !== 'undefined') {
      const hasEnteredBefore = sessionStorage.getItem('hasEnteredSite') === 'true';
      if (hasEnteredBefore) {
        return sessionStorage.getItem('isMutedPreference') === 'true';
      }
    }
    return true;
  });
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMuted) return;

    const handleButtonClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const button = event.target.closest("button");
      if (!button || button.disabled || button.closest("#home-wheel-viewport")) return;

      playButtonFeedback(theme);
    };

    window.addEventListener("click", handleButtonClick, true);
    return () => window.removeEventListener("click", handleButtonClick, true);
  }, [isMuted, theme]);

  const fadeAudio = (targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const step = 0.04;
    const intervalTime = 60; // ms (reduced frequency for Safari/Webkit CPU load reduction)

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
    if (audio) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('isMutedPreference', nextMute ? 'true' : 'false');
      }

      if (!nextMute) {
        if (audio.paused) {
          audio.volume = 0;
          audio.play()
            .then(() => fadeAudio(0.20))
            .catch((err) => console.log("Safari sync play blocked:", err));
        } else {
          fadeAudio(0.20);
        }
      } else {
        fadeAudio(0, () => {
          audio.pause();
        });
      }
    }
  };

  // Only clear the active fade interval when the application actually unmounts
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Sync state and handle browser autoplay constraints with unified state effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isMuted) {
      if (audio.paused) {
        audio.volume = 0;
        audio.play()
          .then(() => fadeAudio(0.20))
          .catch((err) => {
            // Autoplay blocked by browser. User gesture on entry button will trigger play.
            console.log("Audio play blocked on mount:", err);
          });
      } else {
        fadeAudio(0.20);
      }
    } else {
      fadeAudio(0, () => {
        audio.pause();
      });
    }
  }, [isMuted]);

  // Global interaction listener to resume audio if autoplay was blocked on mount/refresh
  useEffect(() => {
    const resumeAudio = () => {
      const audio = audioRef.current;
      if (audio && !isMuted && audio.paused) {
        audio.play()
          .then(() => fadeAudio(0.20))
          .catch((err) => console.log("Failed to play audio on interaction:", err));
        
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", resumeAudio);
      window.removeEventListener("keydown", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
    };

    if (!isMuted) {
      window.addEventListener("click", resumeAudio);
      window.addEventListener("keydown", resumeAudio);
      window.addEventListener("touchstart", resumeAudio);
    }

    return () => {
      removeListeners();
    };
  }, [isMuted]);

  const shouldLoadRoute = (path: string) => {
    return path.startsWith("/series") || path === "/playground";
  };

  // Keep the previous route mounted while the transition layer is visible.
  // The new route is only handed to Routes after the loader has completed, so
  // the existing AnimatePresence exit/enter lifecycle remains intact.
  const getRouteIdentity = (route: typeof location) => (
    `${route.key}:${route.pathname}${route.search}`
  );
  const routeIdentity = getRouteIdentity(location);
  const routeRequiresLoader = shouldLoadRoute(location.pathname);
  const [displayLocation, setDisplayLocation] = useState(location);
  const displayRouteIdentity = getRouteIdentity(displayLocation);
  const routeChanged = displayRouteIdentity !== routeIdentity;
  const externalRouteLoading = routeRequiresLoader && routeChanged;
  const routeLoading = routeTransitionPhase !== "idle"
    ? true
    : externalRouteLoading;
  const showRouteLoader = routeTransitionPhase === "page-exit"
    || routeTransitionPhase === "loader-playing"
    || routeTransitionPhase === "loader-exit"
    || routeTransitionPhase === "page-enter"
    || (routeTransitionPhase === "idle" && externalRouteLoading);
  const renderedLocation = routeTransitionPhase === "page-enter"
    ? location
    : routeLoading ? displayLocation : location;
  const renderedRouteIdentity = getRouteIdentity(renderedLocation);

  useEffect(() => {
    if (routeTransitionPhase !== "idle") return;

    if (!routeRequiresLoader) {
      setDisplayLocation(location);
      return;
    }

    if (!routeLoading) return;

    const timer = window.setTimeout(() => {
      setDisplayLocation(location);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [location, routeLoading, routeRequiresLoader, routeTransitionPhase]);

  // Card-to-detail navigation uses one timed sequence so the page and loader
  // never compete to reveal themselves in separate animation lifecycles.
  useEffect(() => {
    if (routeTransitionPhase === "idle") return;
    if (routeTransitionPhase === "loader-playing" && !seriesChunkReady) return;
    if (routeTransitionPhase === "page-enter" && (!routePageReady || !routeLoaderCycleComplete)) return;

    let duration = 0;
    let nextPhase: RouteTransitionPhase | null = null;

    switch (routeTransitionPhase) {
      case "page-exit":
        duration = LOADER_FADE_DURATION;
        nextPhase = "loader-playing";
        break;
      case "loader-playing":
        duration = LOADER_PLAY_DURATION;
        nextPhase = "page-enter";
        break;
      case "loader-exit":
        duration = LOADER_FADE_DURATION;
        nextPhase = "idle";
        break;
      case "page-enter":
        duration = 0;
        nextPhase = "loader-exit";
        break;
    }

    const timer = window.setTimeout(() => {
      if (routeTransitionPhase === "loader-playing") {
        setDisplayLocation(location);
      }
      if (nextPhase) setRouteTransitionPhase(nextPhase);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [location, routePageReady, routeTransitionPhase, seriesChunkReady]);

  const pageTransition = {
    duration: 0.8,
    ease: "easeInOut" as const
  };

  const safariTransitionFix = {
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
    transform: "translate3d(0, 0, 0)",
    WebkitTransform: "translate3d(0, 0, 0)"
  };

  const handleEnterSite = () => {
    if (isExpanding) return;
    setIsMuted(false);
    setIsExpanding(true);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('hasEnteredSite', 'true');
      sessionStorage.setItem('isMutedPreference', 'false');
    }
    
    // Play audio synchronously on click to satisfy iOS Safari
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.volume = 0;
      audio.play()
        .then(() => fadeAudio(0.20))
        .catch((err) => console.log("Audio play blocked on enter site:", err));
    }

    // Trigger hasEntered at 350ms (midway through expansion) so loading animation mounts and starts playing earlier
    setTimeout(() => {
      setHasEntered(true);
      // Keep the outer loading layer aligned with the shortened text animation.
      setTimeout(() => {
        setEntranceSequenceDone(true);
      }, 2950);
    }, 350);
  };


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
    <div className="font-sans bg-[#fdfdfd] dark:bg-[#0e0c0b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 dark:selection:bg-white selection:text-white dark:selection:text-neutral-900 transition-colors duration-1000 min-h-screen flex flex-col isolate">
      <SeoManager photographyData={localizedData} lang={lang} />
      {/* Background Audio Node - always mounted so it's ready to play */}
      <audio ref={audioRef} src="/music.mp3" loop playsInline preload="none" />

      {/* Premium Interactive Cursor */}
      <CustomCursor lang={lang} />

      <AnimatePresence mode="wait">
        {!hasEntered && (
          <motion.div
            key="enter-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={handleEnterSite}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#ffffff] select-none cursor-pointer"
          >
            {/* Center Layout wrapper */}
            <div className="relative flex items-center justify-center">
              {/* Dynamic Cursor Click & Ripple Guide Animation (Centered, Black) */}
              <div className="flex items-center justify-center pointer-events-none select-none">
                 {/* Mock Circular Cursor Dot */}
                <motion.div
                  animate={{
                    scale: [1, 1, 0.68, 1.08, 1],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.35, 0.38, 0.46, 1],
                    repeatDelay: 1.0
                  }}
                  className="w-5 h-5 bg-black rounded-full z-20 shadow-md"
                />

                {/* Concentric Organic Ripple - Layer 1 (Instantly triggered at the start of click) */}
                <motion.div
                  animate={{
                    scale: [0.1, 0.1, 0.15, 7.0, 7.0],
                    opacity: [0, 0, 0.65, 0, 0],
                    rotate: [0, 15, 30, 45, 45],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.35, 0.36, 0.90, 1],
                    repeatDelay: 1.0
                  }}
                  className="absolute w-[12vmax] h-[12vmax] border-2 border-black/28 z-10"
                  style={{ borderRadius: "48% 52% 51% 49% / 50% 49% 52% 51%" }}
                />

                {/* Concentric Organic Ripple - Layer 2 */}
                <motion.div
                  animate={{
                    scale: [0.1, 0.1, 0.15, 7.0, 7.0],
                    opacity: [0, 0, 0.55, 0, 0],
                    rotate: [15, 30, 45, 60, 60],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.37, 0.38, 0.92, 1],
                    repeatDelay: 1.0
                  }}
                  className="absolute w-[12vmax] h-[12vmax] border-2 border-black/22 z-10"
                  style={{ borderRadius: "51% 49% 52% 48% / 48% 52% 50% 50%" }}
                />

                {/* Concentric Organic Ripple - Layer 3 */}
                <motion.div
                  animate={{
                    scale: [0.1, 0.1, 0.15, 7.0, 7.0],
                    opacity: [0, 0, 0.45, 0, 0],
                    rotate: [30, 45, 60, 75, 75],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.39, 0.40, 0.94, 1],
                    repeatDelay: 1.0
                  }}
                  className="absolute w-[12vmax] h-[12vmax] border-2 border-black/16 z-10"
                  style={{ borderRadius: "49% 51% 48% 52% / 52% 48% 51% 49%" }}
                />

                {/* Concentric Organic Ripple - Layer 4 */}
                <motion.div
                  animate={{
                    scale: [0.1, 0.1, 0.15, 7.0, 7.0],
                    opacity: [0, 0, 0.35, 0, 0],
                    rotate: [45, 60, 75, 90, 90],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.41, 0.42, 0.96, 1],
                    repeatDelay: 1.0
                  }}
                  className="absolute w-[12vmax] h-[12vmax] border-2 border-black/10 z-10"
                  style={{ borderRadius: "52% 48% 50% 50% / 49% 51% 48% 52%" }}
                />

                {/* "CLICK" Text Hint - Shrinks & expands in sync with the cursor dot */}
                <motion.div
                  animate={{
                    scale: [1, 1, 0.68, 1.08, 1],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.35, 0.38, 0.46, 1],
                    repeatDelay: 1.0
                  }}
                  className="absolute font-mono text-[13px] sm:text-[16px] md:text-[19px] tracking-[0.35em] text-black font-black uppercase z-30 whitespace-nowrap"
                  style={{ y: 42 }}
                >
                  CLICK
                </motion.div>
              </div>

              {/* Expanding Black Circle Overlay for Entrance Transition */}
              {isExpanding && (
                <motion.div
                  initial={{ width: 20, height: 20 }}
                  animate={{ width: "300vmax", height: "300vmax" }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute bg-black rounded-full z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site contents, mounted only after entering */}
      {hasEntered && (
        <>
          {/* Entrance loading iframe on top */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="fixed inset-0 w-full h-full z-[9999] pointer-events-none bg-black"
              >
                <iframe
                  src="/loading/index.html"
                  className="w-full h-full border-0"
                  title="Loading"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Persistent Menu & Headers */}
          <div
            className={`${
              loading || routeTransitionPhase !== "idle" || externalRouteLoading
                ? "opacity-0 pointer-events-none"
                : "opacity-100 transition-opacity duration-500"
            }`}
          >
            <Header
              theme={theme}
              setTheme={setTheme}
              lang={lang}
              setLang={setLang}
              isMuted={isMuted}
              toggleMute={toggleMute}
              onNavigate={handleHeaderNavigate}
            />
          </div>

          {/* Main Orchestrated Contents */}
          <main
            className={`flex-grow relative flex flex-col transition-opacity duration-500 ${
              loading || routeLoading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {!loading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={renderedRouteIdentity}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={pageTransition}
                  className="absolute inset-0"
                >
                  <Suspense
                    fallback={routeRequiresLoader && routeTransitionPhase === "idle" && !externalRouteLoading
                      ? <RouteLoaderScreen />
                      : null}
                  >
                    {/* @ts-ignore Routes uses the current displayed location as its transition key. */}
                    <Routes location={renderedLocation}>
                {/* Home — Selected Work */}
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={pageTransition}
                      style={safariTransitionFix}
                      className="fixed inset-0 w-full h-full overflow-hidden"
                    >
                      <HomeWheelView
                        onSelectSeries={handleSelectSeries}
                        photographyData={localizedData}
                        lang={lang}
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
                      transition={pageTransition}
                      style={safariTransitionFix}
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
                      transition={pageTransition}
                      style={safariTransitionFix}
                      className="fixed inset-0 w-full h-full overflow-hidden"
                    >
                      <Playground
                        photographyData={localizedData}
                        onSelectPhoto={handleSelectPhoto}
                        lang={lang}
                        onReady={handleRoutePageReady}
                      />
                    </motion.div>
                  }
                />

                {/* Series Details wrapper */}
                <Route
                  path="/series/:seriesId"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={pageTransition}
                      style={safariTransitionFix}
                      className="fixed inset-0 w-full h-full overflow-hidden"
                    >
                      <SeriesRouteWrapper
                        localizedData={localizedData}
                        onSelectPhoto={handleSelectPhoto}
                        lang={lang}
                        onReady={handleRoutePageReady}
                      />
                    </motion.div>
                  }
                />
                    </Routes>
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            )}
          </main>

          {/* Lightbox for Selected Photo */}
          <AnimatePresence>
            {selectedPhoto && (
              <Suspense fallback={null}>
                <Lightbox
                  photo={selectedPhoto}
                  photos={lightboxPhotos}
                  onClose={() => setSelectedPhoto(null)}
                  onNavigate={(photo) => setSelectedPhoto(photo)}
                  lang={lang}
                />
              </Suspense>
            )}
          </AnimatePresence>

          {/* Scroll to Top for About Page */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-8 right-8 z-50 p-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-none shadow-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 focus:outline-none"
                onClick={scrollToTop}
                data-cursor="nav"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4.5 h-4.5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Route transition layer stays outside Routes so page exit/enter animations can run. */}
          <AnimatePresence>
            {showRouteLoader && (
              <motion.div
                key={`route-loader-${routeIdentity}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: routeTransitionPhase === "loader-exit" ? 0 : 1
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: LOADER_FADE_DURATION / 1000, ease: "easeInOut" }}
                className="fixed inset-0 z-[9998] flex items-center justify-center bg-white dark:bg-[#0e0c0b]"
              >
                <RouteLoader
                  onCycleComplete={routeTransitionPhase !== "idle"
                    ? handleRouteLoaderCycleComplete
                    : undefined}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

// Sub-component to resolve seriesId param and render SeriesView
function SeriesRouteWrapper({
  localizedData,
  onSelectPhoto,
  lang,
  onReady,
}: {
  localizedData: ReturnType<typeof getLocalizedData>;
  onSelectPhoto: (photo: Photo, photos: Photo[]) => void;
  lang: Language;
  onReady: () => void;
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
      onReady={onReady}
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

function RouteLoader({ onCycleComplete }: { onCycleComplete?: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const onCycleCompleteRef = useRef(onCycleComplete);

  useEffect(() => {
    onCycleCompleteRef.current = onCycleComplete;
  }, [onCycleComplete]);

  useEffect(() => {
    const currentStep = LOADER_STEPS[stepIndex];
    const timer = setTimeout(() => {
      if (stepIndex === LOADER_STEPS.length - 1) {
        onCycleCompleteRef.current?.();
      }
      setStepIndex((prev) => (prev + 1) % LOADER_STEPS.length);
    }, currentStep.duration);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const currentGrid = LOADER_STEPS[stepIndex].grid;

  return (
    <div className="grid grid-cols-2 gap-x-16 sm:gap-x-24 md:gap-x-32 gap-y-12 sm:gap-y-16 md:gap-y-20 text-center">
      {currentGrid.map((char, index) => (
        <div key={index} className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {char && (
              <motion.span
                key={char}
                className="absolute text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.2em] text-neutral-950 dark:text-white select-none"
                style={{ fontFamily: /^[A-Z]$/.test(char) ? '"DM Sans Local", "DM Sans", monospace' : '"Tsukushi Mincho", serif', fontWeight: /^[A-Z]$/.test(char) ? 400 : 300 }}
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

function RouteLoaderScreen() {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white dark:bg-[#0e0c0b]">
      <RouteLoader />
    </div>
  );
}
