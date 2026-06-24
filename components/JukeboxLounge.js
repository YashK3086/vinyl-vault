"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, Radio, Disc, Play, Link, Headphones } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function JukeboxLounge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-8"
    >
      {/* Listening Room Header */}
      <div className="w-full p-6 rounded-2xl bg-[#1a1412] border border-zinc-700 shadow-md flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-700 flex items-center justify-center text-amber-600/80 shadow-inner flex-shrink-0">
          <Headphones className="w-7 h-7 animate-bounce" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-zinc-300 font-mono">
            Musical DNA & Lounge
          </h2>
          <p className="text-sm text-zinc-500 mt-1 font-medium">
            A space dedicated to the tracks, artists, and playlists that fuel my late-night coding sessions.
          </p>
        </div>
      </div>

      {/* Main Jukebox Interface Wrapper */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Retro Jukebox Display Panel (Left/Center - Col Span 8) */}
        <ScrollReveal className="col-span-1 md:col-span-8 w-full">
          {/* Main Jukebox Cabinet */}
          <div className="relative w-full rounded-2xl bg-[#1a1412] border border-zinc-700 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl overflow-hidden min-h-[420px]">
            {/* Ambient yellow neon tube light overlay */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-600/80 opacity-70 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-amber-600/80 opacity-70 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
            
            {/* Top Lightup Sign */}
            <div className="w-full py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg flex items-center justify-center shadow-inner relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-amber-600/5 filter blur-sm animate-pulse" />
              <span className="text-sm font-extrabold font-mono tracking-[0.3em] text-amber-600/80 uppercase glow-text-amber flex items-center gap-2">
                <Radio className="w-4.5 h-4.5" /> SELECT-A-TRACK JUKEBOX
              </span>
            </div>

            {/* Inactive Jukebox Main Display Screen */}
            <div className="flex-1 rounded-xl bg-zinc-950 border border-zinc-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-zinc-800/20 to-transparent pointer-events-none" />
              
              <div className="w-20 h-20 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center mb-4 text-zinc-500 relative">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-800/60 animate-spin-slow" />
                <Disc className="w-9 h-9 animate-pulse" />
              </div>

              <h3 className="text-base font-extrabold text-zinc-300 font-mono uppercase tracking-wider mb-2">
                Jukebox Offline // Awaiting Ingestion
              </h3>
              <p className="text-sm text-zinc-500 max-w-[350px] leading-relaxed mb-6 font-medium">
                This console will list my favorite albums, current heavy rotations, and curated playlists soon.
              </p>

              {/* Inactive Slot Machine Style Track Listings */}
              <div className="w-full max-w-[350px] flex flex-col gap-2.5 opacity-40 select-none">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-zinc-900 text-xs font-mono">
                    <span className="text-amber-600/80 font-bold">A-{10 + i}</span>
                    <span className="text-zinc-650 truncate max-w-[180px]">---------------------------</span>
                    <span className="text-zinc-400">00:00</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Jukebox Console Push Buttons */}
            <div className="grid grid-cols-6 gap-2 border-t border-zinc-900 pt-6">
              {["A", "B", "C", "1", "2", "3"].map((btn) => (
                <button 
                  key={btn}
                  disabled
                  className="py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-600 font-mono text-xs font-bold border border-zinc-800/50 shadow shadow-black cursor-not-allowed transition-all"
                >
                  {btn}
                </button>
              ))}
            </div>

          </div>
        </ScrollReveal>

        {/* Music Platforms & Links (Right Column - Col Span 4) */}
        <ScrollReveal delay={0.15} className="col-span-1 md:col-span-4 w-full">
          <div className="flex flex-col gap-6 w-full">
            
            <div className="w-full p-5 rounded-2xl bg-[#1a1412] border border-zinc-700 flex flex-col gap-4 shadow-xl">
              <h3 className="text-xs font-black font-mono uppercase tracking-widest text-amber-600/80 border-b border-zinc-900/40 pb-2">
                Streaming Hubs
              </h3>
              
              {/* Apple Music Platform Link */}
              <a 
                href="https://music.apple.com/profile/yashvardhan_k"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-700 hover:border-rose-600/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center text-rose-500 shadow-inner group-hover:text-rose-400">
                    <Music className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-300">Apple Music</span>
                    <span className="text-xs text-zinc-500 font-mono font-medium">Open Profile</span>
                  </div>
                </div>
                <Link className="w-4 h-4 text-zinc-500 group-hover:text-zinc-350" />
              </a>

              {/* Spotify Platform Link */}
              <a 
                href="https://open.spotify.com/user/bjkwxg4hb6c2bls68mvtkgt5i?si=QVqnzYPnR92qqHE_PRtrVQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-700 hover:border-emerald-600/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center text-emerald-600 shadow-inner group-hover:text-emerald-400">
                    {/* Inline Spotify SVG */}
                    <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm5.49 17.306c-.215.353-.677.468-1.03.253-2.853-1.745-6.446-2.14-10.678-1.173-.404.092-.81-.16-.902-.564-.092-.404.16-.81.564-.902 4.636-1.06 8.59-.613 11.792 1.344.354.217.47.678.254 1.031zm1.466-3.26c-.272.443-.853.587-1.296.315-3.267-2.008-8.25-2.593-12.115-1.417-.5.152-1.025-.133-1.177-.633-.15-.5.133-1.025.633-1.178 4.417-1.34 9.9-1.045 13.64 1.258.444.27.59.852.316 1.295zm.126-3.41c-3.918-2.327-10.385-2.542-14.155-1.397-.6.18-1.24-.153-1.422-.756-.18-.6.152-1.24.755-1.422 4.322-1.31 11.455-1.054 15.96 1.62.54.32.716 1.022.395 1.562-.32.54-1.02.716-1.56.395z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-300">Spotify Profile</span>
                    <span className="text-xs text-zinc-500 font-mono font-medium">Open Profile</span>
                  </div>
                </div>
                <Link className="w-4 h-4 text-zinc-500 group-hover:text-zinc-350" />
              </a>

            </div>

            {/* Retro Vinyl Record Stand */}
            <div className="w-full p-5 rounded-2xl bg-[#1a1412] border border-zinc-700 flex flex-col items-center gap-3 shadow-xl relative overflow-hidden text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 mb-1">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-zinc-300 font-mono uppercase tracking-wider">
                Listener Notes
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-semibold font-mono">
                "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything."
              </p>
              <span className="text-[10px] text-zinc-400 font-bold font-mono mt-1.5 uppercase tracking-widest">
                — Plato
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>

  </motion.div>
);
}
