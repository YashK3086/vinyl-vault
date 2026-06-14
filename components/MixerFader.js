"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Volume2, Radio } from "lucide-react";

export default function MixerFader({ activeSection, setActiveSection }) {
  const containerRef = useRef(null);
  
  // Heights of track: 180px total height for the track
  // Snap heights:
  // Top (Source A): 0px offset
  // Middle (Source B): 76px offset
  // Bottom (Source C): 152px offset
  const trackHeight = 152;
  const sections = ["crate-a", "crate-b", "crate-c"];
  
  // Find current index
  const currentIndex = sections.indexOf(activeSection);
  
  // Motion value for visual knob Y positioning
  const y = useMotionValue(currentIndex * 76);

  // Sync state changes back to fader knob position with smooth animation
  useEffect(() => {
    animate(y, currentIndex * 76, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });
  }, [activeSection, currentIndex, y]);

  // Handle snapping on drag end
  const handleDragEnd = (event, info) => {
    const dragY = y.get();
    
    // Determine closest index
    const closestIndex = Math.min(
      2,
      Math.max(0, Math.round(dragY / 76))
    );
    
    setActiveSection(sections[closestIndex]);
    
    // Snap to snap point smoothly
    animate(y, closestIndex * 76, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });
  };

  const handleTrackClick = (idx) => {
    setActiveSection(sections[idx]);
    animate(y, idx * 76, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl bg-[#1a1412] border border-zinc-800/50 shadow-xl w-full">
      
      {/* Visual Mixer Strip Branding */}
      <div className="flex flex-row md:flex-col justify-between md:justify-center items-center gap-3 w-full md:w-auto md:border-r md:border-zinc-850/45 md:pr-6 md:min-h-[180px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800/50 flex items-center justify-center text-amber-600/80 shadow-inner flex-shrink-0">
            <Volume2 className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black font-mono tracking-widest text-zinc-300 uppercase leading-none">
              CHANNEL SELECT
            </span>
            <span className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-wider font-bold">
              INPUT FADER
            </span>
          </div>
        </div>
        
        {/* Status display */}
        <div className="bg-zinc-950 border border-zinc-800/50 px-3 py-1.5 rounded font-mono text-xs text-zinc-350 flex items-center gap-1.5 md:mt-4">
          <span className="w-2 h-2 rounded-full bg-amber-600/80 animate-ping inline-block" />
          <span className="font-semibold">FADER ACTIVE</span>
        </div>
      </div>

      {/* Main Fader Interface */}
      <div className="flex-1 grid grid-cols-12 items-center gap-6 w-full select-none">
        
        {/* Fader Track & Knob (Col Span 4) */}
        <div className="col-span-4 flex justify-center py-2">
          <div 
            ref={containerRef}
            className="relative w-8 h-[184px] bg-zinc-950 rounded-lg border border-zinc-800/50 flex justify-center py-4 shadow-inner"
          >
            {/* Center metal slot track */}
            <div className="absolute top-4 bottom-4 w-1 bg-zinc-900 border-x border-zinc-800/50 rounded" />
            
            {/* Level tick marks */}
            <div className="absolute inset-y-4 left-1 flex flex-col justify-between font-mono text-[9.5px] text-zinc-500 select-none pointer-events-none font-bold">
              <span>+6</span>
              <span>+3</span>
              <span>0</span>
              <span>-3</span>
              <span>-10</span>
              <span>-25</span>
              <span>-40</span>
            </div>
            
            <div className="absolute inset-y-4 right-1 flex flex-col justify-between font-mono text-[9.5px] text-zinc-500 select-none pointer-events-none font-bold">
              <span>dB</span>
              <span>—</span>
              <span>—</span>
              <span>—</span>
              <span>—</span>
              <span>—</span>
              <span>∞</span>
            </div>

            {/* Draggable Knob */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: trackHeight }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ y }}
              className="absolute left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded border border-zinc-750 shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center z-10 hover:border-amber-600/40"
            >
              {/* Metallic center line */}
              <div className="w-full h-[2px] bg-amber-600/80 shadow-[0_0_6px_rgba(217,119,6,0.5)]" />
              
              {/* Grip lines */}
              <div className="absolute top-1 w-3 h-[1px] bg-zinc-600/40" />
              <div className="absolute bottom-1 w-3 h-[1px] bg-zinc-600/40" />
            </motion.div>
          </div>
        </div>

        {/* Channels / Section Labels & Clickable Toggles (Col Span 8) */}
        <div className="col-span-8 flex flex-col justify-between h-[184px] py-3 pr-2">
          {sections.map((sec, idx) => {
            const isActive = activeSection === sec;
            
            // Text values
            const titles = {
              "crate-a": "SOURCE A: PROJECT CRATES // 33 RPM",
              "crate-b": "SOURCE B: GIG POSTER // EXPERIENCE",
              "crate-c": "SOURCE C: LISTENING LOUNGE // JUKEBOX"
            };

            const subtitles = {
              "crate-a": "Playable case-studies and coding records",
              "crate-b": "Accredited credentials and certificates",
              "crate-c": "Favorite music records and artist lounge"
            };

            return (
              <div 
                key={sec}
                onClick={() => handleTrackClick(idx)}
                className={`group flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                  isActive 
                    ? "bg-zinc-950 border-amber-600/30 shadow-md" 
                    : "bg-transparent border-transparent hover:bg-zinc-950/20 hover:border-zinc-850"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className={`text-xs font-extrabold font-mono tracking-wider transition-colors ${
                    isActive ? "text-amber-600/80 glow-text-amber" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}>
                    {titles[sec]}
                  </span>
                  <span className="text-xs text-zinc-300 font-sans font-semibold leading-relaxed">
                    {subtitles[sec]}
                  </span>
                </div>

                {/* Glowing LED status dot */}
                <div className="flex items-center justify-center pl-3">
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-amber-600/80 shadow-[0_0_10px_rgba(217,119,6,0.5)] animate-pulse" 
                        : "bg-zinc-800"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
