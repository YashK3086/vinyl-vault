"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Volume2 } from "lucide-react";
import vinylAudioEngine from "../utils/audioSynthesizer";

// Interactive Mixer Knob component with mouse drag and touch rotation support
function MixerKnob({ label, value = 0, onChange }) {
  const [rotation, setRotation] = React.useState(value);
  const startYRef = useRef(0);
  const startValRef = useRef(0);

  const handleMouseDown = (e) => {
    startYRef.current = e.clientY;
    startValRef.current = rotation;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const dy = startYRef.current - e.clientY; // drag up increases value
    const delta = dy * 2.5; // sensitivity
    const newVal = Math.min(135, Math.max(-135, startValRef.current + delta));
    setRotation(newVal);
    if (onChange) onChange(newVal);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 0) return;
    startYRef.current = e.touches[0].clientY;
    startValRef.current = rotation;
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 0) return;
    const dy = startYRef.current - e.touches[0].clientY;
    const delta = dy * 2.5;
    const newVal = Math.min(135, Math.max(-135, startValRef.current + delta));
    setRotation(newVal);
    if (onChange) onChange(newVal);
    if (e.cancelable) e.preventDefault();
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <span className="text-[8px] font-mono font-bold text-zinc-500 tracking-wider uppercase leading-none">
        {label}
      </span>
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="w-7 h-7 rounded-full border border-zinc-800 bg-gradient-to-b from-zinc-850 to-zinc-950 flex items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_2px_4px_rgba(0,0,0,0.6)] cursor-ns-resize hover:border-amber-600/30 transition-colors"
        style={{ touchAction: "none" }}
      >
        {/* Rotating dial line */}
        <div
          className="w-full h-full rounded-full relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Indicator tick */}
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-amber-650 rounded-full" />
        </div>
        
        {/* Center dot cap */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-800" />
      </div>
    </div>
  );
}

export default function MixerFader({ activeSection, setActiveSection }) {
  const containerRef = useRef(null);
  
  // Snap heights: 152px total height for the track
  const trackHeight = 152;
  const sections = ["crate-a", "crate-b", "crate-c"];
  
  // Find current index
  const currentIndex = sections.indexOf(activeSection);
  
  // Motion value for visual fader Y positioning
  const y = useMotionValue(currentIndex * 76);

  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [gainVal, setGainVal] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isSolo, setIsSolo] = React.useState(false);

  // Sync state on mount
  useEffect(() => {
    if (sessionStorage.getItem("vinyl-vault-nav-interacted")) {
      setHasInteracted(true);
    }
    setIsMuted(vinylAudioEngine.isMuted);
  }, []);

  const markInteracted = () => {
    setHasInteracted(true);
    sessionStorage.setItem("vinyl-vault-nav-interacted", "true");
  };

  // Sync state changes back to fader knob position with smooth animation
  useEffect(() => {
    if (!sessionStorage.getItem("vinyl-vault-nav-interacted")) {
      const timer = setTimeout(() => {
        animate(y, 76, { duration: 0.5, ease: "easeInOut" }).then(() => {
          setTimeout(() => {
            animate(y, currentIndex * 76, { type: "spring", stiffness: 200, damping: 15 });
          }, 300);
        });
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      animate(y, currentIndex * 76, {
        type: "spring",
        stiffness: 300,
        damping: 20
      });
    }
  }, [activeSection, currentIndex, y]);

  // Snapping on drag end
  const handleDragEnd = (event, info) => {
    const dragY = y.get();
    const closestIndex = Math.min(2, Math.max(0, Math.round(dragY / 76)));
    
    setActiveSection(sections[closestIndex]);
    markInteracted();
    
    animate(y, closestIndex * 76, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });
  };

  const handleTrackClick = (idx) => {
    setActiveSection(sections[idx]);
    markInteracted();
    animate(y, idx * 76, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });
  };

  const handleGainChange = (newVal) => {
    setGainVal(newVal);
    if (typeof window !== "undefined" && vinylAudioEngine.ctx && vinylAudioEngine.mainGain) {
      try {
        const factor = ((newVal + 135) / 270) * 1.5;
        if (vinylAudioEngine.isPlaying && !vinylAudioEngine.isMuted) {
          vinylAudioEngine.mainGain.gain.setValueAtTime(factor * 0.8, vinylAudioEngine.ctx.currentTime);
        }
      } catch (e) {}
    }
  };

  const handleMuteToggle = () => {
    const nextMute = vinylAudioEngine.toggleMute();
    setIsMuted(nextMute);
    triggerAudioFeedbackClick(800);
  };

  const handleSoloToggle = () => {
    setIsSolo(!isSolo);
    triggerAudioFeedbackClick(1000);
  };

  const triggerAudioFeedbackClick = (freq) => {
    if (typeof window !== "undefined" && vinylAudioEngine.ctx) {
      try {
        const ctx = vinylAudioEngine.ctx;
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {}
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl bg-[#1a1412] border border-zinc-800/50 shadow-xl w-full relative font-sans">
      
      {/* Studio Masking Tape Onboarding Label & Swirly Arrow */}
      {!hasInteracted && (
        <div className="absolute -top-14 left-[50%] md:left-[30%] -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none select-none">
          <div className="bg-[#fdf6e2] text-[#5c4033] px-3 py-1 text-[9.5px] font-mono font-black shadow-md border border-[#eadaa6] uppercase tracking-widest rotate-[-1deg] animate-pulse">
            🔥 drag fader!
          </div>
          <svg className="w-8 h-8 text-[#fdf6e2]/60 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 4,2 C 14,0 18,8 12,12 C 6,16 8,8 14,20 L 14,22 M 11,19 L 14,22 L 17,19" />
          </svg>
        </div>
      )}
      
      {/* Visual Mixer Strip Branding */}
      <div className="flex flex-row md:flex-col justify-between md:justify-center items-center gap-3 w-full md:w-auto md:border-r md:border-zinc-850/45 md:pr-6 md:min-h-[180px]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-800/50 flex items-center justify-center text-amber-600/80 shadow-inner flex-shrink-0">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black font-mono tracking-widest text-zinc-300 uppercase leading-none">
              CHANNEL SELECT
            </span>
            <span className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider font-bold">
              INPUT FADER
            </span>
          </div>
        </div>
        
        {/* Status display */}
        <div className="bg-zinc-950 border border-zinc-800/50 px-4 py-2 rounded font-mono text-sm text-zinc-350 flex items-center gap-1.5 md:mt-4">
          <span className="w-2 h-2 rounded-full bg-amber-600/80 animate-ping inline-block" />
          <span className="font-semibold">FADER ACTIVE</span>
        </div>
      </div>

      {/* Main Fader Interface */}
      <div className="flex-1 grid grid-cols-12 items-center gap-6 w-full select-none">
        
        {/* Fader Console Module (Col Span 5 on desktop) */}
        <div className="col-span-12 md:col-span-5 flex items-center justify-center gap-6 py-2 relative pr-0 md:pr-4 md:border-r md:border-zinc-850/45 h-[184px]">
          
          {/* Left Flanking: EQ/Gain Knobs */}
          <div className="flex flex-col justify-between h-full py-1">
            <MixerKnob label="GAIN" value={0} onChange={handleGainChange} />
            <MixerKnob label="HI EQ" value={0} />
            <MixerKnob label="LOW EQ" value={0} />
          </div>

          {/* Center: The Fader Track */}
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

          {/* Right Flanking: Pan Knob & Solo/Mute Buttons */}
          <div className="flex flex-col justify-between h-full py-1">
            <MixerKnob label="PAN" value={0} />
            
            {/* SOLO Button */}
            <div className="flex flex-col items-center gap-1 select-none">
              <span className="text-[8px] font-mono font-bold text-zinc-500 tracking-wider uppercase leading-none">
                SOLO
              </span>
              <button
                onClick={handleSoloToggle}
                className="w-7 h-7 rounded border border-zinc-800 bg-gradient-to-b from-zinc-850 to-zinc-950 flex flex-col items-center justify-center relative shadow-md hover:border-zinc-750 active:scale-95 transition-all cursor-pointer"
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isSolo 
                      ? "bg-amber-600 shadow-[0_0_5px_rgba(217,119,6,0.75)]" 
                      : "bg-zinc-800"
                  }`}
                />
              </button>
            </div>

            {/* MUTE Button */}
            <div className="flex flex-col items-center gap-1 select-none">
              <span className="text-[8px] font-mono font-bold text-zinc-500 tracking-wider uppercase leading-none">
                MUTE
              </span>
              <button
                onClick={handleMuteToggle}
                className="w-7 h-7 rounded border border-zinc-800 bg-gradient-to-b from-zinc-850 to-zinc-950 flex flex-col items-center justify-center relative shadow-md hover:border-zinc-750 active:scale-95 transition-all cursor-pointer"
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isMuted 
                      ? "bg-rose-650 shadow-[0_0_5px_rgba(225,29,72,0.75)] animate-pulse" 
                      : "bg-zinc-800"
                  }`}
                />
              </button>
            </div>
          </div>

        </div>

        {/* Channels / Section Labels & Clickable Toggles (Col Span 7 on desktop) */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between h-[184px] py-1.5 pl-0 md:pl-2">
          {sections.map((sec, idx) => {
            const isActive = activeSection === sec;
            
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
                className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-300 hover:translate-x-2 cursor-pointer ${
                  isActive 
                    ? "bg-zinc-950 border-amber-600/30 shadow-md" 
                    : "bg-transparent border-transparent hover:bg-zinc-950/20 hover:border-zinc-800/40"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className={`text-sm sm:text-base font-extrabold font-mono tracking-wider transition-colors ${
                    isActive ? "text-amber-600/80 glow-text-amber" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}>
                    {titles[sec]}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-300 font-sans font-semibold leading-relaxed">
                    {subtitles[sec]}
                  </span>
                </div>

                {/* Glowing LED status dot */}
                <div className="flex items-center justify-center pl-3">
                  <div 
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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
