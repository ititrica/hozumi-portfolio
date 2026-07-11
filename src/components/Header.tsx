/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ViewState } from "../types";

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  const [localTime, setLocalTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Live Beijing Time effect
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
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

  const navItems: { label: string; view: ViewState }[] = [
    { label: "SELECTED WORK", view: "home" },
    { label: "BIOGRAPHY", view: "about" },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[90] border-b border-white/5 backdrop-blur-md transition-colors duration-500 bg-black/10">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-start cursor-pointer group"
            data-cursor="nav"
          >
            <span className="font-serif text-lg tracking-[0.15em] font-medium transition-transform duration-300 group-hover:translate-x-1 uppercase text-neutral-100">
              Cathy Dolle
            </span>
            <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase mt-0.5">
              Digital Art & Photography
            </span>
          </div>

          {/* Desktop Live Metadata */}
          <div className="hidden lg:flex items-center space-x-12 font-mono text-[10px] tracking-widest text-neutral-400">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
              <span>BEIJING / {localTime || "12:00:00"} CST</span>
            </div>
            <div>
              <span>ARTIST PORTFOLIO</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className="relative py-2 font-mono text-[10px] tracking-[0.18em] font-medium uppercase text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
                  data-cursor="nav"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-none text-neutral-100 focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
          <motion.div 
            className="h-full bg-white origin-left"
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
            className="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-between px-8 py-10"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-serif text-lg tracking-widest font-medium text-white">
                  CATHY DOLLE
                </span>
                <span className="block font-mono text-[8px] tracking-widest text-neutral-400 mt-0.5">
                  Art & Space
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-8 my-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.view}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => handleNavClick(item.view)}
                    className="text-left font-serif text-4xl tracking-wide font-light hover:text-neutral-400 text-white transition-colors uppercase"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="border-t border-white/5 pt-6">
              <div className="font-mono text-[9px] tracking-widest text-neutral-400 space-y-1">
                <p>BEIJING / {localTime || "12:00:00"} CST</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
