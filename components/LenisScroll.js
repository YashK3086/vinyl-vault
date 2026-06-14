"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LenisScroll = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,                // Scroll duration speed (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Linear ease-out expo curve
      smoothWheel: true,            // Enable mouse wheel smoothing
      touchMultiplier: 1.1,         // Touch scroll speed
      anchors: { offset: -96 }      // Offset when jumping to anchor ids (#about, etc.)
    });

    // Update loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default LenisScroll;
