"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, Radio, Disc, Play, Link, Headphones } from "lucide-react";

export default function JukeboxLounge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-8"
    >
      {/* Listening Room Header */}
      <div className="w-full p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm shadow-md flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-inner flex-shrink-0">
          <Headphones className="w-6 h-6 animate-bounce" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-100 font-mono">
            Musical DNA & Lounge
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            A space dedicated to the tracks, artists, and playlists that fuel my late-night coding sessions.
          </p>
        </div>
      </div>

      {/* Main Jukebox Interface Wrapper */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Retro Jukebox Display Panel (Left/Center - Col Span 8) */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
          
          {/* Main Jukebox Cabinet */}
          <div className="relative w-full rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl overflow-hidden min-h-[420px]">
            {/* Ambient neon tube light overlay */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-amber-500 via-rose-500 to-blue-500 opacity-60" />
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-amber-500 via-rose-500 to-blue-500 opacity-60" />
            
            {/* Top Lightup Sign */}
            <div className="w-full py-2 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center shadow-inner relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-amber-500/5 filter blur-sm animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-[0.3em] text-amber-500 uppercase glow-text-amber flex items-center gap-2">
                <Radio className="w-3.5 h-3.5" /> SELECT-A-TRACK JUKEBOX
              </span>
            </div>

            {/* Inactive Jukebox Main Display Screen */}
            <div className="flex-1 rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-zinc-800/20 to-transparent pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-700 relative">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-800/50 animate-spin-slow" />
                <Disc className="w-7 h-7 animate-pulse" />
              </div>

              <h3 className="text-sm font-bold text-zinc-300 font-mono uppercase tracking-wider mb-2">
                Jukebox Offline // Awaiting Ingestion
              </h3>
              <p className="text-xs text-zinc-500 font-sans font-light max-w-[320px] leading-relaxed mb-6">
                This console will list my favorite albums, current heavy rotations, and curated playlists soon.
              </p>

              {/* Inactive Slot Machine Style Track Listings */}
              <div className="w-full max-w-[350px] flex flex-col gap-2 opacity-30 select-none">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-zinc-900 text-[10px] font-mono">
                    <span className="text-amber-500/80 font-bold">A-{10 + i}</span>
                    <span className="text-zinc-600 truncate max-w-[180px]">---------------------------</span>
                    <span className="text-zinc-700">00:00</span>
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
        </div>

        {/* Music Platforms & Links (Right Column - Col Span 4) */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6 w-full">
          
          <div className="w-full p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-4 shadow-xl">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-500/80 border-b border-zinc-900 pb-2">
              Streaming Hubs
            </h3>

            {/* Spotify Platform Link */}
            <div className="w-full p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/30 flex items-center justify-between group cursor-not-allowed opacity-75 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-950 flex items-center justify-center text-emerald-500 shadow-inner group-hover:text-emerald-400">
                  {/* Inline Spotify SVG */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm5.49 17.306c-.215.353-.677.468-1.03.253-2.853-1.745-6.446-2.14-10.678-1.173-.404.092-.81-.16-.902-.564-.092-.404.16-.81.564-.902 4.636-1.06 8.59-.613 11.792 1.344.354.217.47.678.254 1.031zm1.466-3.26c-.272.443-.853.587-1.296.315-3.267-2.008-8.25-2.593-12.115-1.417-.5.152-1.025-.133-1.177-.633-.15-.5.133-1.025.633-1.178 4.417-1.34 9.9-1.045 13.64 1.258.444.27.59.852.316 1.295zm.126-3.41c-3.918-2.327-10.385-2.542-14.155-1.397-.6.18-1.24-.153-1.422-.756-.18-.6.152-1.24.755-1.422 4.322-1.31 11.455-1.054 15.96 1.62.54.32.716 1.022.395 1.562-.32.54-1.02.716-1.56.395z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200">Spotify Profile</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Offline / Ingesting</span>
                </div>
              </div>
              <Link className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />
            </div>

            {/* Apple Music Platform Link */}
            <div className="w-full p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-rose-500/30 flex items-center justify-between group cursor-not-allowed opacity-75 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-950 flex items-center justify-center text-rose-500 shadow-inner group-hover:text-rose-400">
                  <Music className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200">Apple Music</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Offline / Ingesting</span>
                </div>
              </div>
              <Link className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />
            </div>

          </div>

          {/* Retro Vinyl Record Stand */}
          <div className="w-full p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center gap-3 shadow-xl relative overflow-hidden text-center">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-1">
              <Headphones className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider">
              Listener Notes
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-mono">
              \"Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.\"
            </p>
            <span className="text-[8px] text-zinc-600 font-mono mt-1 uppercase tracking-widest">
              — Plato // Philosophy
            </span>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
