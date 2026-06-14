"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring options for smooth pointer trailing
  const springConfig = { stiffness: 400, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop/touchscreen detection
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // offset half of cursor width (w-8 = 32px)
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer");
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-600/40 pointer-events-none z-50 mix-blend-screen hidden md:block flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? "rgba(217, 119, 6, 0.8)" : "rgba(217, 119, 6, 0.4)",
          backgroundColor: isHovered ? "rgba(217, 119, 6, 0.05)" : "rgba(217, 119, 6, 0)"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {/* Inner Glowing Core Dot */}
        <motion.div
          className="w-1.5 h-1.5 bg-amber-600 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.6)]"
          animate={{
            scale: isHovered ? 1.3 : 1
          }}
        />

        {/* Record needle pivot line inside trailing ring */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-amber-600/60 origin-left"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ x: "-50%", y: "-50%" }}
        />
      </motion.div>
    </>
  );
}
