"use client";

import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Only run on desktop/non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");
    if (!cursor || !cursorRing) return;

    // Apply the class to hide default cursor
    document.body.classList.add("cursor-ready");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Direct positioning for core dot
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    // Frame update tick for smooth ring movement
    let rafId;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.15; // 0.15 controls lag speed
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    tick();

    // Scale effects on hover
    const handleMouseEnter = () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      cursorRing.style.width = "52px";
      cursorRing.style.height = "52px";
    };

    const handleMouseLeave = () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      cursorRing.style.width = "36px";
      cursorRing.style.height = "36px";
    };

    const addHoverStates = () => {
      const links = document.querySelectorAll("a, button, [role='button'], .interactive-hover");
      links.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    addHoverStates();

    // Observe DOM mutations to bind new dynamic buttons/links
    const observer = new MutationObserver(addHoverStates);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-ready");
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div className="cursor" />
      <div className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
