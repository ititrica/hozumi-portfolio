/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface HeaderProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isMuted: boolean;
  toggleMute: () => void;
  onNavigate?: (path: string) => void;
}

export default function Header({ theme, setTheme, lang, setLang, isMuted, toggleMute, onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live Beijing clock ticking
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      setLocalTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const t = UI_TRANSLATIONS[lang];

  const navItems = [
    { label: t.selectedWork, path: "/" },
    { label: t.biography, path: "/about" },
    { label: t.playground, path: "/playground" },
  ];

  const handleNavClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (path === "/" && location.pathname.startsWith("/series")) {
      navigate("/", { state: { restoreWheel: true } });
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/series");
    }
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[90]">
        <div className="w-full px-6 md:px-10 h-20 flex items-center justify-between -translate-y-1">
          
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <div
              onClick={() => handleNavClick("/")}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              className="cursor-pointer group flex items-center text-[19px] tracking-[0.16em] font-medium uppercase text-neutral-950 dark:text-neutral-100"
              style={{ fontFamily: "'DM Sans', 'DM Sans Local', sans-serif" }}
              data-cursor="nav"
            >
              <LogoSegment english="HO" japanese="ホ" isHovered={logoHovered} index={0} />
              <LogoSegment english="ZU" japanese="ズ" isHovered={logoHovered} index={1} />
              <LogoSegment english="MI" japanese="ミ" isHovered={logoHovered} index={2} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative py-2 font-mono text-[10px] tracking-[0.14em] font-medium uppercase transition-colors duration-1000 ${
                    active
                      ? "text-neutral-950 dark:text-neutral-100"
                       : "text-neutral-800 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                  }`}
                  data-cursor="nav"
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white transition-colors duration-1000"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 text-neutral-700 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-1000 ml-2"
              aria-label="Toggle Theme"
              data-cursor="nav"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="p-2 text-neutral-700 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-1000 ml-1"
              aria-label={isMuted ? "Unmute Music" : "Mute Music"}
              data-cursor="nav"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-5 ml-6 relative select-none" style={{ fontFamily: "'DM Sans', 'DM Sans Local', sans-serif" }}>
              {(["en", "zh", "ja"] as const).map((l) => {
                const langActive = lang === l;
                const label = l === "en" ? "EN" : l === "zh" ? "中" : "日";
                return (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`relative py-2 text-[10px] tracking-[0.14em] font-medium uppercase transition-colors duration-1000 ${
                      langActive
                        ? "text-neutral-950 dark:text-neutral-100"
                        : "text-neutral-800 dark:text-neutral-400"
                    }`}
                    data-cursor="nav"
                  >
                    {label}
                    {langActive && (
                      <motion.div
                        layoutId="activeLangIndicator"
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white transition-colors duration-1000"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleMute}
                  className="p-2 rounded-none text-neutral-950 dark:text-neutral-100 focus:outline-none transition-colors duration-1000"
              aria-label="Toggle Music"
            >
              {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="p-2 rounded-none text-neutral-950 dark:text-neutral-100 focus:outline-none transition-colors duration-1000"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-none text-neutral-950 dark:text-neutral-100 focus:outline-none transition-colors duration-1000"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

      </header>

      {/* Fullscreen Mobile Navigation Menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#fbfbfb]/95 dark:bg-[#0e0c0b]/95 backdrop-blur-xl flex flex-col justify-between px-8 py-10"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-serif text-xs tracking-[0.25em] font-medium text-neutral-900 dark:text-white">
                  HOZUMI
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-neutral-800 dark:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-6 my-auto font-mono">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index }}
                >
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className="text-left font-serif text-lg tracking-[0.2em] font-light hover:text-neutral-600 text-neutral-950 dark:text-neutral-100 dark:hover:text-neutral-400 transition-colors uppercase"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 flex flex-col space-y-4">
              <div className="flex items-center space-x-6 relative select-none">
                {(["en", "zh", "ja"] as const).map((l) => {
                  const langActive = lang === l;
                  const label = l === "en" ? "EN" : l === "zh" ? "中文" : "日本語";
                  return (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setIsMenuOpen(false); }}
                      className={`relative py-2 font-mono text-[10px] tracking-[0.14em] font-medium uppercase transition-colors duration-300 ${
                        langActive
                          ? "text-neutral-950 dark:text-neutral-100"
                         : "text-neutral-800 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                      }`}
                    >
                      {label}
                      {langActive && (
                        <motion.div
                          layoutId="activeLangIndicatorMobile"
                          className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white transition-colors duration-300"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="font-mono text-[8px] tracking-[0.2em] text-neutral-500">
                <p className="text-neutral-700 dark:text-neutral-500">{t.timeZone} / {localTime || "12:00:00"} CST</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LogoSegment({ english, japanese, isHovered, index }: { english: string; japanese: string; isHovered: boolean; index: number }) {
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden leading-none select-none align-middle">
      {/* English state */}
      <motion.span
        animate={{
          y: isHovered ? "-100%" : "0%",
          opacity: isHovered ? 0 : 1
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08
        }}
        className="inline-block"
        style={{ fontFamily: "'DM Sans', 'DM Sans Local', sans-serif" }}
      >
        {english}
      </motion.span>
      {/* Japanese state */}
      <motion.span
        animate={{
          y: isHovered ? "-100%" : "0%",
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08
        }}
        className="absolute left-0 top-full inline-block"
        style={{ fontFamily: "'Hiragino Mincho ProN', 'Noto Serif JP', 'Yu Mincho', 'MS PMincho', serif" }}
      >
        {japanese}
      </motion.span>
    </span>
  );
}
