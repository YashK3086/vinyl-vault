"use client";

import React from "react";
import { FAVORITE_BANDS } from "../data/vault";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-black">
      {/* Dark overlay to ensure perfect readability of content */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950/95 z-10" />

      {/* Grid of album arts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6 opacity-[0.06] blur-[3px] scale-105 h-full w-full">
        {FAVORITE_BANDS.map((band, idx) => (
          <div 
            key={`${band.name}-${idx}`} 
            className="relative aspect-square w-full overflow-hidden rounded-md border border-zinc-800/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={band.coverUrl} 
              alt={`${band.name} - ${band.album}`}
              className="object-cover w-full h-full filter grayscale contrast-125"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
        {/* Duplicate list to fill space on larger viewports if needed */}
        {FAVORITE_BANDS.map((band, idx) => (
          <div 
            key={`${band.name}-dup-${idx}`} 
            className="relative aspect-square w-full overflow-hidden rounded-md border border-zinc-800/40 hidden md:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={band.coverUrl} 
              alt={`${band.name} - ${band.album}`}
              className="object-cover w-full h-full filter grayscale contrast-125"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Modern blueprint grid-axis lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <div className="hero-axis-line hero-axis-line-horizontal top-1/4" />
        <div className="hero-axis-line hero-axis-line-horizontal top-1/2" />
        <div className="hero-axis-line hero-axis-line-horizontal top-3/4" />
        <div className="hero-axis-line hero-axis-line-vertical left-1/4" />
        <div className="hero-axis-line hero-axis-line-vertical left-1/2" />
        <div className="hero-axis-line hero-axis-line-vertical left-3/4" />
      </div>
      
      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none z-10 animate-pulse-slow" />
    </div>
  );
}

