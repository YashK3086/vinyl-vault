"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, Radio, Activity } from "lucide-react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("POWERING ON SYSTEM...");

  useEffect(() => {
    // Simulate system diagnostic checks and audio ingestion
    const statuses = [
      { threshold: 0, text: "POWERING ON STATION 360..." },
      { threshold: 20, text: "CONNECTING VACUUM TUBES..." },
      { threshold: 45, text: "INGESTING SOUND ARCHIVES & VINYLS..." },
      { threshold: 70, text: "WARMING UP DIRECT DRIVE PLATTER..." },
      { threshold: 90, text: "CALIBRATING TONEARM STYLUS..." },
      { threshold: 98, text: "READY TO SPIN!" }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        
        // Update status text based on progress thresholds
        const matchingStatus = [...statuses].reverse().find(s => next >= s.threshold);
        if (matchingStatus) {
          setStatusText(matchingStatus.text);
        }
        
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Convert 0-100 progress into decibels (-40dB to +6dB)
  const dbValue = progress === 0 
    ? "-inf" 
    : `${Math.round(-40 + (progress / 100) * 46)} dB`;

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Decorative tech background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, white 1px, transparent 0),
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 20px 20px, 20px 20px"
        }}
      />

      <div className="flex flex-col items-center max-w-md w-full px-8 z-10 relative">
        
        {/* Glowing Spinning Vinyl loader icon */}
        <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
          {/* External glowing ring */}
          <div className="absolute inset-0 rounded-full border border-amber-500/10 shadow-[0_0_50px_rgba(245,158,11,0.05)] animate-pulse" />
          
          {/* Vinyl mock */}
          <div className="absolute w-[85%] h-[85%] rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center animate-spin-slow">
            {/* Grooves */}
            <div className="absolute inset-2 rounded-full border border-zinc-800/40 opacity-30" />
            <div className="absolute inset-4 rounded-full border border-zinc-800/30 opacity-40" />
            <div className="absolute inset-6 rounded-full border border-zinc-800/20 opacity-50" />
            
            {/* Center paper label */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                <Disc className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          </div>
          
          {/* Pulsing indicator LED */}
          <div className="absolute -top-1 right-3 w-3 h-3 rounded-full bg-amber-500 border border-zinc-950 shadow-[0_0_10px_#f59e0b] animate-ping" />
        </div>

        {/* Text diagnostics */}
        <div className="w-full text-center flex flex-col gap-1">
          <h1 className="text-base font-extrabold font-mono tracking-[0.25em] text-white uppercase">
            STATION 360 // DEV PORTFOLIO
          </h1>
          <span className="text-xs font-mono tracking-widest text-zinc-300 mt-0.5 font-bold">
            MODEL: SL-1200 CONSOLE SYSTEM
          </span>
        </div>

        {/* Dynamic Status Text */}
        <div className="w-full mt-8 bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg flex items-center gap-3.5 font-mono text-xs text-zinc-200">
          <Radio className="w-4.5 h-4.5 text-amber-450 animate-pulse flex-shrink-0" />
          <span className="truncate flex-1 tracking-wider uppercase font-semibold">{statusText}</span>
          <span className="text-amber-400 font-extrabold text-sm">{progress}%</span>
        </div>

        {/* DB Meter Loading Visualizer */}
        <div className="w-full mt-6 bg-zinc-900 border border-zinc-850 p-4 rounded-xl flex flex-col gap-3">
          
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Activity className="w-4 h-4 text-zinc-400" /> SYSTEM MASTER INPUT:
            </span>
            <span className="text-amber-400 font-extrabold glow-text-amber tracking-widest">{dbValue}</span>
          </div>

          {/* LED dB Scale Visualizer Segment blocks */}
          <div className="flex gap-[3px] h-4 items-center">
            {Array.from({ length: 24 }).map((_, i) => {
              const isActive = (progress / 100) * 24 > i;
              
              // Segment color coding: Green -> Amber -> Red (at top volume +3dB to +6dB)
              let activeColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
              if (i >= 16 && i < 21) {
                activeColor = "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]";
              } else if (i >= 21) {
                activeColor = "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]";
              }
              
              return (
                <div
                  key={i}
                  className={`flex-1 h-full rounded-[1px] transition-colors duration-150 ${
                    isActive ? activeColor : "bg-zinc-800/60"
                  }`}
                />
              );
            })}
          </div>

          {/* dB Scale Labels */}
          <div className="flex justify-between font-mono text-[10px] text-zinc-300 px-0.5 font-bold">
            <span>-40dB</span>
            <span>-20dB</span>
            <span>-10dB</span>
            <span>0dB</span>
            <span className="text-rose-400 font-black">+6dB</span>
          </div>
        </div>

      </div>

      {/* Decorative footer details */}
      <div className="absolute bottom-6 font-mono text-[11px] text-zinc-300 tracking-wider font-semibold">
        STATUS: SYSTEM ACCELERATING // DIRECT-DRIVE POWER
      </div>
    </div>
  );
}
