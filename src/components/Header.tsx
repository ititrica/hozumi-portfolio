/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ViewState } from "../types";
import { Language, UI_TRANSLATIONS } from "../i18n";

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ currentView, setView, theme, setTheme, lang, setLang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        setScrollProgress(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = UI_TRANSLATIONS[lang];

  const navItems: { label: string; view: ViewState }[] = [
    { label: t.selectedWork, view: "home" },
    { label: t.biography, view: "about" },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[90] backdrop-blur-xl transition-all duration-1000 bg-white/45 dark:bg-black/10">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <div
              onClick={() => handleNavClick("home")}
              className="cursor-pointer group"
              data-cursor="nav"
            >
              <span className="font-serif text-[16px] tracking-[0.16em] font-medium transition-all duration-1000 group-hover:translate-x-1 uppercase text-neutral-900 dark:text-neutral-100">
                Hozumi
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                   className={`relative py-2 font-mono text-[10px] tracking-[0.14em] font-medium uppercase transition-colors duration-1000 ${
                    isActive 
                      ? "text-neutral-950 dark:text-neutral-100" 
                      : "text-neutral-750 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                  }`}
                  data-cursor="nav"
                >
                  {item.label}
                  {isActive && (
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
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-1000 ml-2"
              aria-label="Toggle Theme"
              data-cursor="nav"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Language Switcher Borderless Segmented Control */}
            <div className="flex items-center space-x-1 ml-4 relative select-none">
              {(["en", "zh", "ja"] as const).map((l) => {
                const isActive = lang === l;
                const label = l === "en" ? "EN" : l === "zh" ? "中" : "日";
                return (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="relative px-3 py-1.5 font-mono text-[9px] tracking-widest font-medium uppercase transition-colors duration-300 cursor-pointer focus:outline-none"
                    data-cursor="nav"
                  >
                    {/* Active Background Pill (slides between items) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeLangPill"
                        className="absolute inset-0 bg-neutral-500/8 dark:bg-white/10 rounded-md z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${
                      isActive 
                        ? "text-neutral-900 dark:text-white font-medium" 
                        : "text-neutral-450 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                    }`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-none text-neutral-800 dark:text-neutral-100 focus:outline-none transition-colors duration-1000"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-none text-neutral-800 dark:text-neutral-100 focus:outline-none transition-colors duration-1000"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-950/5 dark:bg-white/5 transition-colors duration-1000">
          <motion.div 
            className="h-full bg-neutral-900 dark:bg-white transition-colors duration-1000 origin-left"
            style={{ width: `${scrollProgress}%` }}
          />
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
                  key={item.view}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index }}
                >
                  <button
                    onClick={() => handleNavClick(item.view)}
                    className="text-left font-serif text-lg tracking-[0.2em] font-light hover:text-neutral-500 text-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-400 transition-colors uppercase"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 flex flex-col space-y-4">
              <div className="flex items-center space-x-1 relative select-none">
                {(["en", "zh", "ja"] as const).map((l) => {
                  const isActive = lang === l;
                  const label = l === "en" ? "EN" : l === "zh" ? "中文" : "日本語";
                  return (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setIsMenuOpen(false); }}
                      className="relative px-4 py-2 font-mono text-[10px] tracking-widest font-medium uppercase transition-colors duration-300 cursor-pointer focus:outline-none"
                    >
                      {/* Active Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="activeLangPillMobile"
                          className="absolute inset-0 bg-neutral-500/8 dark:bg-white/10 rounded-md z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 transition-colors duration-300 ${
                        isActive 
                          ? "text-neutral-900 dark:text-white font-medium" 
                          : "text-neutral-450 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                      }`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="font-mono text-[8px] tracking-[0.2em] text-neutral-500">
                <p>{t.timeZone} / {localTime || "12:00:00"} CST</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
