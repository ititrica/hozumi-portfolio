/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Language, UI_TRANSLATIONS } from "../i18n";

export default function CustomCursor({ lang }: { lang: Language }) {
  const t = UI_TRANSLATIONS[lang];
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [cursorType, setCursorType] = useState("");
  const [displacementMapUrl, setDisplacementMapUrl] = useState("");
  const [magneticTarget, setMagneticTarget] = useState<{ width: number; height: number } | null>(null);
  const magneticTargetRef = useRef<HTMLElement | null>(null);

  const cursorGlassFilterId = "liquid-glass-custom-cursor";
  const cursorGlassSize = 20;

  useEffect(() => {
    const smoothStep = (edge0: number, edge1: number, value: number) => {
      const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    };

    const length = (x: number, y: number) => Math.sqrt(x * x + y * y);

    const roundedRectSDF = (x: number, y: number, width: number, height: number, radius: number) => {
      const qx = Math.abs(x) - width + radius;
      const qy = Math.abs(y) - height + radius;
      return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
    };

    const canvas = document.createElement("canvas");
    canvas.width = cursorGlassSize;
    canvas.height = cursorGlassSize;

    const context = canvas.getContext("2d");
    if (!context) return;

    const imageData = context.createImageData(cursorGlassSize, cursorGlassSize);
    const data = imageData.data;
    const rawValues: number[] = [];
    let maxScale = 0;

    for (let index = 0; index < data.length; index += 4) {
      const x = (index / 4) % cursorGlassSize;
      const y = Math.floor(index / 4 / cursorGlassSize);
      const uvX = x / cursorGlassSize;
      const uvY = y / cursorGlassSize;
      const ix = uvX - 0.5;
      const iy = uvY - 0.5;
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.3, 0.6);
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
      const scaled = smoothStep(0, 1, displacement);
      const targetX = (ix * scaled + 0.5) * cursorGlassSize;
      const targetY = (iy * scaled + 0.5) * cursorGlassSize;
      const dx = targetX - x;
      const dy = targetY - y;

      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;
    let rawIndex = 0;
    for (let index = 0; index < data.length; index += 4) {
      data[index] = ((rawValues[rawIndex++] / maxScale) + 0.5) * 255;
      data[index + 1] = ((rawValues[rawIndex++] / maxScale) + 0.5) * 255;
      data[index + 2] = 0;
      data[index + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
    setDisplacementMapUrl(canvas.toDataURL());
  }, []);

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

      if (type === "home-card") {
        const homeViewport = interactiveEl.closest("#home-wheel-viewport");
        const viewMode = homeViewport?.getAttribute("data-view-mode");

        if (viewMode === "timeline") {
          setIsCursorHidden(false);
          setIsHovered(true);
          setCursorType("view");
          setCursorText("ENTER");
          return;
        } else {
          const cardIndex = interactiveEl.getAttribute("data-card-index");
          const activeCardIndex = homeViewport?.getAttribute("data-active-card");

          if (homeViewport && cardIndex !== activeCardIndex) {
            setIsCursorHidden(false);
            setIsHovered(false);
            setCursorText("");
            setCursorType("");
            return;
          }
        }
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
    let lastHoverTarget: Element | null = null;
    const style = document.createElement("style");
    style.id = "custom-cursor-hide-style";
    style.innerHTML = `
      html, body, *, *::before, *::after {
        cursor: none !important;
      }
    `;

    const moveMouse = (e: MouseEvent) => {
      const rawX = e.clientX;
      const rawY = e.clientY;
      const magneticThreshold = 44;
      let nearestTarget: HTMLElement | null = null;
      let nearestDistance = magneticThreshold;

      document.querySelectorAll<HTMLElement>("button, a, [role='button']").forEach((element) => {
        if (element.dataset.magnetic === "false") return;

        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const closestX = Math.max(rect.left, Math.min(rawX, rect.right));
        const closestY = Math.max(rect.top, Math.min(rawY, rect.bottom));
        const distance = Math.hypot(rawX - closestX, rawY - closestY);
        if (distance < nearestDistance) {
          nearestTarget = element;
          nearestDistance = distance;
        }
      });

      if (nearestTarget) {
        const targetRect = nearestTarget.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const attraction = 0.28 + 0.22 * (1 - nearestDistance / magneticThreshold);

        mouseX.set(rawX + (targetCenterX - rawX) * attraction);
        mouseY.set(rawY + (targetCenterY - rawY) * attraction);

        if (magneticTargetRef.current !== nearestTarget) {
          magneticTargetRef.current = nearestTarget;
          setMagneticTarget({
            width: Math.min(180, Math.max(cursorGlassSize, targetRect.width + 10)),
            height: Math.min(64, Math.max(cursorGlassSize, targetRect.height + 10)),
          });
        }
      } else {
        magneticTargetRef.current = null;
        setMagneticTarget(null);
        mouseX.set(rawX);
        mouseY.set(rawY);
      }

      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        document.body.style.cursor = "none";
        document.head.appendChild(style);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest("[data-cursor], a, button, [role='button']");
      if (hoverTarget === lastHoverTarget) return;
      lastHoverTarget = hoverTarget;
      updateCursorHoverState(target);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeaveWindow = (e: MouseEvent) => {
      lastHoverTarget = null;
      // Clamp coordinates to stay visible on the window edges
      const clampedX = Math.max(0, Math.min(window.innerWidth, e.clientX));
      const clampedY = Math.max(0, Math.min(window.innerHeight, e.clientY));
      mouseX.set(clampedX);
      mouseY.set(clampedY);

      // Revert hover styling back to default small dot
      setIsHovered(false);
      setCursorText("");
      setCursorType("");
      setIsCursorHidden(false);
      magneticTargetRef.current = null;
      setMagneticTarget(null);
      document.body.style.cursor = "auto";
    };

    const handleMouseEnterWindow = (e: MouseEvent) => {
      // Smoothly transition from the edge to the new pointer position using .set instead of .jump
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
      attributeFilter: ["data-cursor", "data-active-card", "data-card-index"],
    });
    window.addEventListener("home-wheel-motion", scheduleCursorUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("home-wheel-motion", scheduleCursorUpdate);
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
  const isPrevHover = cursorType === "prev";
  const isNextHover = cursorType === "next";
  const isArrowHover = isPrevHover || isNextHover;
  const isLabelHover = isCardHover || isViewHover || isCloseHover;
  const labelText = isCardHover ? t.cursorEnter : isViewHover ? t.cursorView : isCloseHover ? "CLOSE" : "";

  return (
    <>
      <svg
        width="0"
        height="0"
        className="fixed pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={cursorGlassFilterId}
            x="0"
            y="0"
            width={cursorGlassSize}
            height={cursorGlassSize}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            {displacementMapUrl && (
              <feImage
                href={displacementMapUrl}
                x="0"
                y="0"
                width={cursorGlassSize}
                height={cursorGlassSize}
                result="cursor-displacement-map"
              />
            )}
            <feDisplacementMap
              in="SourceGraphic"
              in2="cursor-displacement-map"
              xChannelSelector="R"
              yChannelSelector="G"
              scale="8"
            />
          </filter>
        </defs>
      </svg>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100005] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking
            ? 0.8
            : magneticTarget
              ? 1
            : isArrowHover
              ? 1
              : (isLabelHover || isHovered)
                ? 1.28
                : 1,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: magneticTarget?.width ?? cursorGlassSize,
            height: magneticTarget?.height ?? cursorGlassSize,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.35 }}
        >
          {/* SVG displacement map + backdrop filter create the liquid-glass lens. */}
          <div
            className="absolute inset-0 bg-transparent shadow-[0_4px_8px_rgba(0,0,0,0.22),inset_0_-10px_25px_rgba(0,0,0,0.15)]"
            style={{
              borderRadius: magneticTarget ? "8px" : "9999px",
              backdropFilter: "url(#" + cursorGlassFilterId + ") contrast(1.2) brightness(1.05) saturate(1.1)",
              WebkitBackdropFilter: "url(#" + cursorGlassFilterId + ") contrast(1.2) brightness(1.05) saturate(1.1)",
            }}
          />
          {/* Main circle — shrinks to 0 when arrow is visible */}
          {/* Left Arrow Icon */}
          <motion.div
            className="absolute flex items-center justify-center text-white"
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{
              scale: isPrevHover ? 1.4 : 0,
              opacity: isPrevHover ? 1 : 0,
              rotate: isPrevHover ? 0 : -45,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </motion.div>

          {/* Right Arrow Icon */}
          <motion.div
            className="absolute flex items-center justify-center text-white"
            initial={{ scale: 0, opacity: 0, rotate: 45 }}
            animate={{
              scale: isNextHover ? 1.4 : 0,
              opacity: isNextHover ? 1 : 0,
              rotate: isNextHover ? 0 : 45,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </motion.div>
        </motion.div>
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
