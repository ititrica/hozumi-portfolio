/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Language, UI_TRANSLATIONS } from "../i18n";

export default function CustomCursor({ lang }: { lang: Language }) {
  const t = UI_TRANSLATIONS[lang];
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [cursorType, setCursorType] = useState("");

  // Main cursor motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs — slightly tighter to reduce inertia
  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Lagging spring for the ENTER/VIEW/BACK label (more inertia)
  const labelX = useSpring(mouseX, { damping: 22, stiffness: 120, mass: 0.8 });
  const labelY = useSpring(mouseY, { damping: 22, stiffness: 120, mass: 0.8 });

  // Extracted hover resolution logic to allow invocation from outside mousemove/mouseover
  const updateCursorHoverState = useCallback((target: HTMLElement | null) => {
    if (!target) {
      setIsHovered(false);
      setCursorText("");
      setCursorType("");
      setIsCursorHidden(false);
      return;
    }

    const interactiveEl = target.closest("[data-cursor]");
    const type = interactiveEl?.getAttribute("data-cursor");
    if (interactiveEl && type) {
      if (type === "hide-custom" || type === "hidden") {
        setIsCursorHidden(true);
        return;
      }
      setIsCursorHidden(false);
      setIsHovered(true);
      setCursorType(type);
      if (type === "view") {
        setCursorText("VIEW");
      } else if (type === "drag") {
        setCursorText("DRAG");
      } else if (type === "close" || type === "nav" || type === "home-card") {
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
  }, []);

  // Force recheck what is under current cursor coordinates (e.g. after DOM mutation / view change / click)
  const forceUpdateCursorAtCurrentPos = useCallback(() => {
    const x = mouseX.get();
    const y = mouseY.get();
    if (x < 0 || y < 0) return;
    const el = document.elementFromPoint(x, y);
    updateCursorHoverState(el as HTMLElement | null);
  }, [mouseX, mouseY, updateCursorHoverState]);

  useEffect(() => {
    // Detect mobile touch devices to disable custom cursor
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    let hasMoved = false;
    const style = document.createElement("style");
    style.id = "custom-cursor-hide-style";
    style.innerHTML = `
      html, body, *, *::before, *::after {
        cursor: none !important;
      }
    `;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        document.body.style.cursor = "none";
        document.head.appendChild(style);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorHoverState(e.target as HTMLElement);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      document.body.style.cursor = "auto";
    };

    const handleMouseEnterWindow = (e: MouseEvent) => {
      mouseX.jump(e.clientX);
      mouseY.jump(e.clientY);
      if (hasMoved) {
        setIsVisible(true);
        document.body.style.cursor = "none";
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.style.cursor = "auto";
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [mouseX, mouseY, updateCursorHoverState]);

  // Recheck the element under the cursor once after an overlay mounts or unmounts.
  // Coalescing DOM mutations into one animation frame avoids cursor state changes
  // landing repeatedly during the Lightbox entrance animation.
  useEffect(() => {
    let frameId: number | null = null;

    const scheduleCursorUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        forceUpdateCursorAtCurrentPos();
      });
    };

    const observer = new MutationObserver(scheduleCursorUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-cursor"],
    });

    return () => {
      observer.disconnect();
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [forceUpdateCursorAtCurrentPos]);

  if (!isVisible) return null;
  if (isCursorHidden) return null;

  const isCardHover = cursorType === "home-card";
  const isViewHover = cursorType === "view";
  const isCloseHover = cursorType === "close";
  const isLabelHover = isCardHover || isViewHover || isCloseHover;
  const labelText = isCardHover ? t.cursorEnter : isViewHover ? t.cursorView : isCloseHover ? t.cursorBack : "";

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100005] flex items-center justify-center mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking
            ? 0.8
            : (isLabelHover || isHovered)
              ? 2.2
              : 1,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Main circle — uniform size and style for all states */}
          <div
            className="rounded-full transition-all duration-300 relative overflow-hidden flex items-center justify-center bg-white w-3 h-3"
          />
        </div>
      </motion.div>

      {/* Lagging label — ENTER on cards, VIEW on photos, BACK on lightbox background/image */}
      {isLabelHover && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[100004] mix-blend-difference"
          style={{
            x: labelX,
            y: labelY,
            translateX: "14px",
            translateY: "-30px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] font-semibold uppercase text-white select-none whitespace-nowrap">
            {labelText}
          </span>
        </motion.div>
      )}
    </>
  );
}
