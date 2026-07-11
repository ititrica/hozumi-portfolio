/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [cursorType, setCursorType] = useState("");

  // Mouse coordinates using motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for a fluid, lag-behind elastic cursor effect
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile touch devices to disable custom cursor
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look up tree to find if hovering over pointer or interactive element
      const interactiveEl = target.closest("[data-cursor]");
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor");
        if (type === "hide-custom" || type === "hidden") {
          setIsCursorHidden(true);
          return;
        }
        setIsCursorHidden(false);
        setIsHovered(true);
        setCursorType(type || "");
        if (type === "view") {
          setCursorText("VIEW");
        } else if (type === "drag") {
          setCursorText("DRAG");
        } else if (type === "close") {
          setCursorText("CLOSE");
        } else if (type === "nav" || type === "home-card") {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
        }
      } else {
        // Fallback check for general link/buttons
        const linkEl = target.closest("a, button, [role='button']");
        setIsCursorHidden(false);
        if (linkEl) {
          setIsHovered(true);
          setCursorText("");
          setCursorType("link");
        } else {
          setIsHovered(false);
          setCursorText("");
          setCursorType("");
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Hide default cursor on desktop
    document.body.style.cursor = "none";
    // Also inject custom style to ensure child elements also have cursor none
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, [role='button'], input, select, textarea, [data-cursor] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;
  if (isCursorHidden) return null;

  return (
    <>
      {/* Outer follow dot with text indicator */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking 
            ? 0.8 
            : isHovered 
              ? (cursorText ? 4.5 : 1.8) 
              : 1,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Main circle */}
          <div
            className={`rounded-full transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
              cursorText 
                ? "bg-white text-black w-16 h-16" 
                : "border border-white w-8 h-8"
            }`}
          >
            {/* White background filling effect radiating from center */}
            <div
              className={`absolute inset-0 bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                cursorType === "home-card" ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
            {cursorText && (
              <span className="text-[9px] font-mono tracking-widest font-semibold uppercase select-none relative z-10">
                {cursorText}
              </span>
            )}
            {cursorType === "home-card" && (
              <span className="text-[7.5px] font-mono tracking-wider font-bold uppercase select-none relative z-10 text-black">
                ENTER
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tiny inner pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
}
