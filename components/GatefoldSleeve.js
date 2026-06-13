"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, AlertCircle, Compass, HardDrive, Cpu, Terminal } from "lucide-react";

const limitWords = (str, limit = 3) => {
  if (!str) return "";
  const words = str.trim().split(/\s+/);
  if (words.length <= limit) return str;
  return words.slice(0, limit).join(" ");
};

export default function GatefoldSleeve({ activeRecord }) {
  if (!activeRecord) {
    return (
      <div className="w-full h-full min-h-[400px] rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-zinc-950/60 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
          <Music className="w-6 h-6 animate-pulse" />
        </div>
        <h4 className="text-zinc-400 font-mono text-sm font-semibold tracking-wider uppercase mb-2">
          Jacket Closed
        </h4>
        <p className="text-zinc-600 font-mono text-xs max-w-[280px] leading-relaxed">
          Select a project spine from the record shelves on the left to slide out the vinyl and open the liner notes.
        </p>
      </div>
    );
  }

  // Split tracks into A-Side and B-Side for the Gatefold layout
  // (Usually tracks index 0,1 are A-Side and 2,3 are B-Side)
  const aSideTracks = activeRecord.tracks.filter(t => t.name.toLowerCase().includes("a-side") || activeRecord.tracks.indexOf(t) < 2);
  const bSideTracks = activeRecord.tracks.filter(t => t.name.toLowerCase().includes("b-side") || activeRecord.tracks.indexOf(t) >= 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-6"
    >
      {/* The Opened Cardboard Gatefold Sleeve Folder */}
      <div className="w-full rounded-2xl overflow-hidden glass-panel-glow border-zinc-800/80 shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Cardboard Spine Fold Accent Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/40 border-r border-zinc-800/50 hidden md:block z-20 pointer-events-none" />

        {/* Panel 1: A-Side (Liner Notes / Implementation) */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col gap-6 border-b border-zinc-800 md:border-b-0 md:border-r border-black/20 z-10 bg-gradient-to-br from-zinc-950/80 to-zinc-900/60">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-black text-amber-400 font-mono tracking-widest uppercase">
                A-Side // Architecture & Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight font-display">
                {limitWords(activeRecord.title)}
              </h2>
              <p className="text-sm text-zinc-200 font-mono italic font-semibold">
                {activeRecord.subtitle}
              </p>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <span className="text-2xl font-black text-zinc-300 font-mono">33⅓ RPM</span>
              <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider font-semibold">STEREO / LP</span>
            </div>
          </div>

          <div className="border-t border-zinc-800/60 my-1" />

          {/* Tracks List (A-Side details) */}
          <div className="flex flex-col gap-5">
            {aSideTracks.map((track, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-center flex-shrink-0 text-zinc-300 font-mono text-xs font-extrabold shadow-inner group-hover:text-amber-400 group-hover:border-amber-400/40 transition-all">
                  A{index + 1}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-sm font-extrabold text-white tracking-wide font-mono uppercase">
                    {track.name.replace(/^A-Side:\s*/i, "")}
                  </h4>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans font-medium">
                    {track.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: B-Side (Outcomes & System Metrics) */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-6 z-10 bg-gradient-to-br from-zinc-950/60 to-zinc-950/80">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black text-amber-400 font-mono tracking-widest uppercase">
                B-Side // Performance & Outcomes
              </span>
              <h3 className="text-xl font-extrabold text-white font-display">
                Release Track Listings
              </h3>
              <p className="text-sm text-zinc-300 font-mono">
                System efficiency optimizations, audit responses, and user metrics.
              </p>
            </div>

            <div className="border-t border-zinc-800/60 my-1" />

            {/* Tracks List (B-Side details) */}
            <div className="flex flex-col gap-5">
              {bSideTracks.map((track, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-center flex-shrink-0 text-zinc-300 font-mono text-xs font-extrabold shadow-inner group-hover:text-amber-400 group-hover:border-amber-400/40 transition-all">
                    B{index + 1}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-extrabold text-white tracking-wide font-mono uppercase">
                      {track.name.replace(/^B-Side:\s*/i, "")}
                    </h4>
                    <p className="text-sm text-zinc-200 leading-relaxed font-sans font-medium">
                      {track.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits / Personnel Section */}
          <div className="mt-8 pt-4 border-t border-zinc-800/80 flex flex-col gap-2.5">
            <h5 className="text-xs font-black tracking-widest text-amber-400 uppercase font-mono">
              Personnel & Production Credits
            </h5>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-200">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-zinc-400 font-bold uppercase text-[10px]">Lead Dev:</span> 
                <span className="truncate font-semibold text-white">Y. Khanna</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-zinc-400 font-bold uppercase text-[10px]">Released:</span> 
                <span className="font-semibold text-white">{activeRecord.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200 col-span-2">
                <Cpu className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-zinc-400 font-bold uppercase text-[10px] flex-shrink-0">Instruments:</span> 
                <span className="text-white truncate font-semibold text-[11px]">
                  {activeRecord.tags.join(", ")}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
