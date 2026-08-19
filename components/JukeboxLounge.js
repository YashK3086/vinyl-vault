"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Radio, Disc, Play, ExternalLink, Headphones, Search, Sparkles, Check, Volume2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { MUSIC_LIBRARY } from "../data/musicLibrary";

export default function JukeboxLounge() {
  const [selectedArtist, setSelectedArtist] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrack, setActiveTrack] = useState(MUSIC_LIBRARY[0]?.tracks[0] || null);

  // Filter artists and tracks based on category & search
  const filteredArtists = MUSIC_LIBRARY.map((artistGroup) => {
    if (selectedArtist !== "All" && artistGroup.artist !== selectedArtist) {
      return null;
    }
    const matchingTracks = artistGroup.tracks.filter((t) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        (t.album && t.album.toLowerCase().includes(q))
      );
    });

    if (matchingTracks.length === 0) return null;

    return {
      ...artistGroup,
      tracks: matchingTracks
    };
  }).filter(Boolean);

  const handleSelectTrack = (track) => {
    setActiveTrack(track);
    // Smooth scroll to jukebox console if on small screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.getElementById("jukebox-master-deck");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-8"
    >
      {/* Listening Room Header */}
      <div className="w-full p-6 rounded-2xl bg-[#1a1412] border border-zinc-700 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-700 flex items-center justify-center text-amber-500 shadow-inner flex-shrink-0">
            <Headphones className="w-7 h-7 animate-bounce" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-zinc-200 font-mono flex items-center gap-2">
              Musical DNA & 30-Sec Lounge
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium leading-relaxed">
              Curated rotation of 70 signature tracks across 14 legendary artists with high-res cover art and official 30-second Spotify preview embeds.
            </p>
          </div>
        </div>

        {/* Live Active Track Badge */}
        {activeTrack && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950 border border-amber-600/40 text-xs font-mono text-amber-500 flex-shrink-0 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="font-extrabold uppercase">LOADED: {activeTrack.artist} - {activeTrack.title}</span>
          </div>
        )}
      </div>

      {/* Main Jukebox Interface Wrapper */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Jukebox Cabinet (Left/Center - Col Span 8) */}
        <div className="col-span-1 lg:col-span-8 w-full flex flex-col gap-6">

          {/* 1. Interactive Retro Jukebox Display & Embedded Player Console */}
          <div id="jukebox-master-deck" className="relative w-full rounded-2xl bg-[#1a1412] border border-zinc-700 p-5 sm:p-7 flex flex-col gap-5 shadow-2xl overflow-hidden">
            {/* Ambient neon accents */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-600/80 opacity-70 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-amber-600/80 opacity-70 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
            
            {/* Top Lightup Sign */}
            <div className="w-full py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg flex items-center justify-between px-4 shadow-inner relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-amber-600/5 filter blur-sm animate-pulse" />
              <span className="text-xs sm:text-sm font-black font-mono tracking-[0.25em] text-amber-500 uppercase glow-text-amber flex items-center gap-2">
                <Radio className="w-4 h-4" /> SELECT-A-TRACK JUKEBOX
              </span>
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                30s EMBEDDED PREVIEW DECK
              </span>
            </div>

            {/* Jukebox Master Display Console with Embedded Spotify Player */}
            <div className="rounded-xl bg-zinc-950 border border-zinc-700 p-4 sm:p-5 flex flex-col gap-4 relative overflow-hidden">
              {activeTrack ? (
                <div className="flex flex-col gap-4">
                  {/* Track Meta Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-zinc-850 pb-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-amber-500/40 flex-shrink-0 shadow-md">
                        <img 
                          src={activeTrack.coverUrl} 
                          alt={activeTrack.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-black text-zinc-200 font-mono tracking-wide">
                            {activeTrack.title}
                          </span>
                          <span className="text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                            {activeTrack.year}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-amber-500 font-mono">
                          {activeTrack.artist} • <span className="text-zinc-400">{activeTrack.album}</span>
                        </span>
                      </div>
                    </div>

                    <a
                      href={activeTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold transition-all flex-shrink-0"
                    >
                      <span>Open Spotify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Official Spotify 30s Embed Preview Player */}
                  <div className="w-full rounded-xl overflow-hidden shadow-inner border border-zinc-800 bg-zinc-900">
                    <iframe
                      key={activeTrack.id}
                      src={activeTrack.embedUrl}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full rounded-xl"
                      title={`${activeTrack.artist} - ${activeTrack.title}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                      <Disc className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-base font-bold text-zinc-300 font-mono">
                        Jukebox Ready & Standby
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        Click on any track card below to load and play its 30s preview.
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-500/80 font-bold">
                    70 TRACKS LOADED
                  </div>
                </div>
              )}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-zinc-800/60">
              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search song, album or artist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Track count indicator */}
              <div className="text-xs font-mono text-zinc-500 select-none">
                Showing <strong className="text-zinc-300">{filteredArtists.reduce((acc, a) => acc + a.tracks.length, 0)}</strong> / 70 Tracks
              </div>
            </div>

            {/* Artist Filter Buttons Pill Carousel */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
              <button
                onClick={() => setSelectedArtist("All")}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedArtist === "All"
                    ? "bg-amber-600 text-zinc-950 shadow-md font-black"
                    : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                All Artists (14)
              </button>
              {MUSIC_LIBRARY.map((item) => {
                const isActive = selectedArtist === item.artist;
                return (
                  <button
                    key={item.artist}
                    onClick={() => setSelectedArtist(item.artist)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-600 text-zinc-950 shadow-md font-black"
                        : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {item.artist}
                  </button>
                );
              })}
            </div>

          </div>

          {/* 2. List of Artists & Songs */}
          <div className="flex flex-col gap-8 w-full">
            {filteredArtists.map((artistGroup) => (
              <ScrollReveal key={artistGroup.artist} className="w-full">
                <div className="w-full rounded-2xl bg-[#1a1412] border border-zinc-700 p-5 sm:p-6 flex flex-col gap-4 shadow-xl">
                  
                  {/* Artist Section Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-6 bg-amber-500 rounded-sm" />
                      <div className="flex flex-col">
                        <h3 className="text-lg sm:text-xl font-black text-zinc-200 uppercase font-mono tracking-wide">
                          {artistGroup.artist}
                        </h3>
                        <span className="text-xs text-amber-500/80 font-mono font-bold">
                          {artistGroup.genre}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                      {artistGroup.tracks.length} Tracks
                    </span>
                  </div>

                  {/* Songs Grid (5 Tracks per artist) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-1">
                    {artistGroup.tracks.map((track) => {
                      const isSelected = activeTrack?.id === track.id;

                      return (
                        <div
                          key={track.id}
                          onClick={() => handleSelectTrack(track)}
                          className={`relative rounded-xl bg-zinc-950 p-3 flex flex-col justify-between gap-3 border transition-all duration-200 cursor-pointer group select-none ${
                            isSelected
                              ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-zinc-900 ring-1 ring-amber-500"
                              : "border-zinc-800 hover:border-zinc-600 hover:shadow-lg"
                          }`}
                        >
                          {/* Album Cover Art with Vinyl Slide Effect */}
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md">
                            {/* Official album art image */}
                            <img
                              src={track.coverUrl}
                              alt={`${track.artist} - ${track.title}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />

                            {/* Vinyl Disc that slides out on hover or active */}
                            <div className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center transition-opacity shadow-md pointer-events-none ${
                              isSelected ? "opacity-100 border-amber-500" : "opacity-0 group-hover:opacity-100"
                            }`}>
                              <Disc className={`w-4 h-4 ${isSelected ? "text-amber-400 animate-spin-slow" : "text-zinc-400"}`} />
                            </div>

                            {/* Play / Active Overlay */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                              isSelected ? "bg-black/30 opacity-100" : "bg-black/40 opacity-0 group-hover:opacity-100"
                            }`}>
                              <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-90 ${
                                isSelected ? "bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "bg-amber-600 hover:bg-amber-500 text-zinc-950"
                              }`}>
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                            </div>

                            {/* 30s Badge */}
                            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] font-mono font-bold text-zinc-300 border border-white/10 select-none">
                              30s PREVIEW
                            </div>
                          </div>

                          {/* Track Details */}
                          <div className="flex flex-col gap-1">
                            <h4 className={`text-sm font-bold font-mono line-clamp-1 transition-colors ${
                              isSelected ? "text-amber-400 font-black" : "text-zinc-200 group-hover:text-amber-400"
                            }`} title={track.title}>
                              {track.title}
                            </h4>
                            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                              <span className="truncate max-w-[110px]" title={track.album}>
                                {track.album}
                              </span>
                              {track.year && <span className="text-zinc-500 font-bold">{track.year}</span>}
                            </div>
                          </div>

                          {/* Action footer */}
                          <div className="flex items-center justify-between pt-2 border-t border-zinc-850 text-xs font-mono">
                            <span className={`font-bold flex items-center gap-1 ${
                              isSelected ? "text-amber-400" : "text-zinc-400 group-hover:text-zinc-200"
                            }`}>
                              {isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Playing</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3" />
                                  <span>Preview</span>
                                </>
                              )}
                            </span>

                            {/* External Spotify link */}
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
                              title="Open on Spotify"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

        {/* Streaming Platforms & Lounge Sidebar (Right Column - Col Span 4) */}
        <div className="col-span-1 lg:col-span-4 w-full flex flex-col gap-6 lg:sticky lg:top-8">
          
          <div className="w-full p-5 rounded-2xl bg-[#1a1412] border border-zinc-700 flex flex-col gap-4 shadow-xl">
            <h3 className="text-xs sm:text-sm font-black font-mono uppercase tracking-widest text-amber-500 border-b border-zinc-800 pb-2">
              Streaming Hubs
            </h3>
            
            {/* Apple Music Platform Link */}
            <a 
              href="https://music.apple.com/profile/yashvardhan_k"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-700 hover:border-rose-600/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-rose-500 shadow-inner group-hover:text-rose-400">
                  <Music className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-zinc-200">Apple Music</span>
                  <span className="text-xs text-zinc-400 font-mono font-medium">@yashvardhan_k</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
            </a>

            {/* Spotify Platform Link */}
            <a 
              href="https://open.spotify.com/user/bjkwxg4hb6c2bls68mvtkgt5i?si=QVqnzYPnR92qqHE_PRtrVQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-700 hover:border-emerald-600/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-emerald-500 shadow-inner group-hover:text-emerald-400">
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm5.49 17.306c-.215.353-.677.468-1.03.253-2.853-1.745-6.446-2.14-10.678-1.173-.404.092-.81-.16-.902-.564-.092-.404.16-.81.564-.902 4.636-1.06 8.59-.613 11.792 1.344.354.217.47.678.254 1.031zm1.466-3.26c-.272.443-.853.587-1.296.315-3.267-2.008-8.25-2.593-12.115-1.417-.5.152-1.025-.133-1.177-.633-.15-.5.133-1.025.633-1.178 4.417-1.34 9.9-1.045 13.64 1.258.444.27.59.852.316 1.295zm.126-3.41c-3.918-2.327-10.385-2.542-14.155-1.397-.6.18-1.24-.153-1.422-.756-.18-.6.152-1.24.755-1.422 4.322-1.31 11.455-1.054 15.96 1.62.54.32.716 1.022.395 1.562-.32.54-1.02.716-1.56.395z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-zinc-200">Spotify Profile</span>
                  <span className="text-xs text-zinc-400 font-mono font-medium">Open Yashvardhan</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
            </a>

          </div>

          {/* Jukebox Curator Note */}
          <div className="w-full p-5 rounded-2xl bg-[#1a1412] border border-zinc-700 flex flex-col items-center gap-3 shadow-xl relative overflow-hidden text-center">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-500 mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-zinc-200 font-mono uppercase tracking-wider">
              Soundtrack to Engineering
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-semibold font-mono">
              "Without music, life would be a mistake."
            </p>
            <span className="text-xs text-zinc-500 font-bold font-mono uppercase tracking-widest">
              — Friedrich Nietzsche
            </span>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
