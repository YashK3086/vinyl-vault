"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Radio, Disc, Play, Pause, ExternalLink, Headphones, Search, Volume2, VolumeX, Sparkles, Filter } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { MUSIC_LIBRARY } from "../data/musicLibrary";

export default function JukeboxLounge() {
  const [selectedArtist, setSelectedArtist] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

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

  // Play / Pause track handler
  const handlePlayTrack = (track) => {
    if (currentTrack && currentTrack.previewAudioUrl === track.previewAudioUrl) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.src = track.previewAudioUrl;
        audioRef.current.play().catch((err) => {
          console.warn("Audio playback error:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime || 0;
    const dur = audioRef.current.duration || 30;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !currentTrack) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    const dur = audioRef.current.duration || 30;
    const newTime = percentage * dur;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    const s = Math.floor(seconds || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-8"
    >
      {/* Hidden Global Audio Element for Previews */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

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
              Curated rotation of 70 signature tracks across 14 legendary artists with high-res cover art and instant 30-second previews.
            </p>
          </div>
        </div>

        {/* Live Audio Status Badge */}
        {currentTrack && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-amber-600/40 text-xs font-mono text-amber-500 animate-pulse flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-extrabold uppercase">NOW PREVIEWING: {currentTrack.title}</span>
          </div>
        )}
      </div>

      {/* Main Jukebox Interface Wrapper */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Jukebox Cabinet (Left/Center - Col Span 8) */}
        <div className="col-span-1 lg:col-span-8 w-full flex flex-col gap-6">

          {/* 1. Interactive Retro Jukebox Display & Master Console */}
          <div className="relative w-full rounded-2xl bg-[#1a1412] border border-zinc-700 p-5 sm:p-7 flex flex-col gap-5 shadow-2xl overflow-hidden">
            {/* Ambient neon accents */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-600/80 opacity-70 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-amber-600/80 opacity-70 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
            
            {/* Top Lightup Sign */}
            <div className="w-full py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg flex items-center justify-between px-4 shadow-inner relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-amber-600/5 filter blur-sm animate-pulse" />
              <span className="text-xs sm:text-sm font-black font-mono tracking-[0.25em] text-amber-500 uppercase glow-text-amber flex items-center gap-2">
                <Radio className="w-4 h-4" /> SELECT-A-TRACK JUKEBOX
              </span>
              <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase">
                {currentTrack ? "30s EMBEDDED PREVIEW ACTIVE" : "SELECT ANY TRACK TO PLAY"}
              </span>
            </div>

            {/* Jukebox Master Display Console */}
            <div className="rounded-xl bg-zinc-950 border border-zinc-700 p-4 sm:p-5 flex flex-col gap-4 relative overflow-hidden">
              {currentTrack ? (
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Spinning album cover in Jukebox deck */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-600/50 flex-shrink-0 shadow-lg group">
                    <img 
                      src={currentTrack.coverUrl} 
                      alt={currentTrack.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Disc className="w-8 h-8 text-amber-500 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Track Details & Visualizer */}
                  <div className="flex-1 flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-zinc-200 font-mono tracking-wide">
                          {currentTrack.title}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-amber-500 font-mono">
                          {currentTrack.artist} {currentTrack.album ? `• ${currentTrack.album}` : ""}
                        </span>
                      </div>
                      
                      {/* Equalizer Waveform Animation */}
                      <div className="flex items-end gap-[2px] h-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-[3px] bg-amber-500 rounded-t-sm"
                            animate={isPlaying ? {
                              height: [`${20 + (i % 4) * 20}%`, `${90 - (i % 3) * 25}%`, `${30 + (i % 5) * 15}%`]
                            } : { height: "15%" }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.5 + (i % 4) * 0.1,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar Scrubber */}
                    <div className="flex items-center gap-3 w-full mt-1 font-mono text-xs text-zinc-400">
                      <span>{formatTime(currentTime)}</span>
                      <div 
                        onClick={handleSeek}
                        className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden cursor-pointer relative border border-zinc-800"
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span>0:30</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePlayTrack(currentTrack)}
                      className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
                      title={isPlaying ? "Pause Preview" : "Play Preview"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                      <Disc className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-base font-bold text-zinc-300 font-mono">
                        Jukebox Ready & Standby
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        Click the play button on any song card below to start its 30s preview.
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
                  placeholder="Search song or artist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Artist count indicator */}
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

                  {/* Songs Grid (5 Tracks) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-1">
                    {artistGroup.tracks.map((track, trackIdx) => {
                      const isTrackPlaying = currentTrack?.previewAudioUrl === track.previewAudioUrl && isPlaying;
                      const isTrackSelected = currentTrack?.previewAudioUrl === track.previewAudioUrl;

                      return (
                        <div
                          key={track.title}
                          className={`relative rounded-xl bg-zinc-950 p-3 flex flex-col justify-between gap-3 border transition-all duration-200 group ${
                            isTrackSelected
                              ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-zinc-900/60"
                              : "border-zinc-800 hover:border-zinc-700 hover:shadow-lg"
                          }`}
                        >
                          {/* Album Cover Art with Vinyl Slide Effect */}
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md">
                            {/* Realistic album art image */}
                            <img
                              src={track.coverUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"}
                              alt={`${track.artist} - ${track.title}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />

                            {/* Vinyl Disc that slides out slightly on hover */}
                            <div className="absolute top-1 right-1 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                              <Disc className="w-4 h-4 text-amber-500 animate-spin-slow" />
                            </div>

                            {/* Play Overlay Button */}
                            <button
                              onClick={() => handlePlayTrack(track)}
                              className={`absolute inset-0 flex items-center justify-center transition-all cursor-pointer ${
                                isTrackPlaying
                                  ? "bg-black/50 opacity-100"
                                  : "bg-black/40 opacity-0 group-hover:opacity-100"
                              }`}
                              title={isTrackPlaying ? "Pause Preview" : "Play 30s Preview"}
                            >
                              <div className="w-11 h-11 rounded-full bg-amber-600 hover:bg-amber-500 text-zinc-950 flex items-center justify-center shadow-2xl transition-transform active:scale-90">
                                {isTrackPlaying ? (
                                  <Pause className="w-5 h-5 fill-current" />
                                ) : (
                                  <Play className="w-5 h-5 fill-current ml-0.5" />
                                )}
                              </div>
                            </button>

                            {/* 30s Badge */}
                            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] font-mono font-bold text-zinc-300 border border-white/10 select-none">
                              30s PREVIEW
                            </div>
                          </div>

                          {/* Track Details */}
                          <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-zinc-200 font-mono line-clamp-1 group-hover:text-amber-400 transition-colors" title={track.title}>
                              {track.title}
                            </h4>
                            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                              <span className="truncate max-w-[110px]" title={track.album || track.artist}>
                                {track.album || track.artist}
                              </span>
                              {track.year && <span className="text-zinc-500 font-bold">{track.year}</span>}
                            </div>
                          </div>

                          {/* Action links */}
                          <div className="flex items-center justify-between pt-2 border-t border-zinc-850 text-xs font-mono">
                            <button
                              onClick={() => handlePlayTrack(track)}
                              className={`flex items-center gap-1 font-bold transition-colors cursor-pointer ${
                                isTrackPlaying ? "text-amber-400" : "text-zinc-400 hover:text-zinc-200"
                              }`}
                            >
                              {isTrackPlaying ? (
                                <>
                                  <Pause className="w-3 h-3" />
                                  <span>Playing</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3" />
                                  <span>Preview</span>
                                </>
                              )}
                            </button>

                            {/* External Spotify search link */}
                            <a
                              href={`https://open.spotify.com/search/${track.spotifyEmbedQuery}`}
                              target="_blank"
                              rel="noopener noreferrer"
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
