"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCw, Volume2, VolumeX } from "lucide-react";
import vinylAudioEngine from "../utils/audioSynthesizer";

const limitWords = (str, limit = 3) => {
  if (!str) return "";
  const words = str.trim().split(/\s+/);
  if (words.length <= limit) return str;
  return words.slice(0, limit).join(" ");
};

export default function TurntableDeck({ activeRecord }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(33); // 33 RPM or 45 RPM
  const [isMuted, setIsMuted] = useState(false);
  
  // Custom states for realistic physics and needle coordination
  const [rotation, setRotation] = useState(0);
  const [tonearmAngle, setTonearmAngle] = useState(0); // Rest position
  const [tonearmY, setTonearmY] = useState(0); // Lift height offset
  const [sheenAngle, setSheenAngle] = useState(120);

  const plinthRef = useRef(null);

  // 1. Sync speed ratio pitch with Audio Engine
  useEffect(() => {
    vinylAudioEngine.setSpeed(rpm);
  }, [rpm]);

  // 2. Physics-Based Platter Rotation Loop
  useEffect(() => {
    let animationFrameId;
    let currentSpeed = 0;
    
    // Target degrees per frame (60 FPS base)
    // 33 RPM: ~3.3 degrees per frame
    // 45 RPM: ~4.5 degrees per frame
    const targetSpeed = rpm === 33 ? 3.3 : 4.5;
    const accel = 0.06; // smooth motor acceleration
    const decel = 0.035; // direct drive drag drift stop
    let running = true;
    let localRotation = rotation;

    const tick = () => {
      if (isPlaying) {
        if (currentSpeed < targetSpeed) {
          currentSpeed = Math.min(targetSpeed, currentSpeed + accel);
        }
      } else {
        if (currentSpeed > 0) {
          currentSpeed = Math.max(0, currentSpeed - decel);
        }
      }

      if (currentSpeed > 0) {
        localRotation = (localRotation + currentSpeed) % 360;
        setRotation(localRotation);
      }

      if (running && (isPlaying || currentSpeed > 0)) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, rpm]);

  // 3. Staggered Needle-Drop state coordination on Record Selection
  useEffect(() => {
    if (activeRecord) {
      // Record placed - Platter is stopped, lift and swing arm over record
      setIsPlaying(false);
      setTonearmAngle(24.5); // Move stylus above outer groove
      setTonearmY(-6); // Lift visual height offset

      // Swing arm time: 700ms
      const dropTimer = setTimeout(() => {
        setTonearmY(0); // Lower arm needle to touch vinyl

        // Touchdown time: 250ms
        const playTimer = setTimeout(() => {
          vinylAudioEngine.triggerNeedleDrop();
          vinylAudioEngine.play();
          setIsPlaying(true); // Platter starts spinning (accelerating)
        }, 250);

        return () => clearTimeout(playTimer);
      }, 750);

      return () => {
        clearTimeout(dropTimer);
      };
    } else {
      // Record removed - Lift arm and swing back to rest
      if (isPlaying) {
        vinylAudioEngine.triggerNeedleLift();
      }
      vinylAudioEngine.pause();
      setIsPlaying(false);
      setTonearmAngle(0);
      setTonearmY(0);
    }
  }, [activeRecord]);

  // 4. Mute Audio engine toggle
  const handleMuteToggle = () => {
    const nextMute = vinylAudioEngine.toggleMute();
    setIsMuted(nextMute);
  };

  // 5. Clean up Web Audio Context on unmount
  useEffect(() => {
    return () => {
      vinylAudioEngine.close();
    };
  }, []);

  // 6. Play/Pause Manual Button Handler
  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause: decelerate spin, lift needle, return to rest
      vinylAudioEngine.triggerNeedleLift();
      vinylAudioEngine.pause();
      setIsPlaying(false);
      setTonearmAngle(0);
      setTonearmY(0);
    } else if (activeRecord) {
      // Play: lift arm, swing over, drop needle, start sound and spin
      setTonearmAngle(24.5);
      setTonearmY(-6);
      
      const playDelay = setTimeout(() => {
        setTonearmY(0);
        
        const startDelay = setTimeout(() => {
          vinylAudioEngine.triggerNeedleDrop();
          vinylAudioEngine.play();
          setIsPlaying(true);
        }, 250);
        
        return () => clearTimeout(startDelay);
      }, 750);
    }
  };

  // 7. Calculate Sheen cursor angle over turntable plinth
  const handleMouseMove = (e) => {
    if (!plinthRef.current) return;
    const rect = plinthRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    setSheenAngle(angle + 180); // shift offset angle
  };

  const handleMouseLeave = () => {
    setSheenAngle(120); // Reset to default static light sheen angle
  };

  // Duration variables for spin control speed displays
  const activeSpinSpeedText = rpm === 33 ? "33⅓ RPM" : "45 RPM";

  return (
    <div className="w-full flex flex-col items-center gap-6 z-10">
      
      {/* Turntable Plinth (Body) */}
      <div 
        ref={plinthRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[500px] aspect-square rounded-2xl bg-[#1a1412] border-2 border-zinc-800/50 p-6 shadow-2xl flex items-center justify-center overflow-hidden"
      >
        {/* Metallic top plate textures & details */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-850/10 via-transparent to-black/50 pointer-events-none animate-pulse-slow" />
        {/* Professional Active Status LED */}
        <div className="absolute top-4 left-4 flex items-center gap-2.5 bg-zinc-950/90 px-3 py-1.5 rounded border border-zinc-800/50 select-none cursor-help group z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.6)] animate-pulse" />
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-zinc-300">
            OPPORTUNITIES ACTIVE
          </span>
          {/* Tooltip */}
          <div className="absolute left-0 top-full mt-1.5 w-52 p-3 rounded-lg bg-[#1a1412] border border-zinc-800/50 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 text-[10.5px] font-mono text-zinc-500 text-left leading-relaxed">
            <span className="text-zinc-300 font-black block mb-1 uppercase text-xs">SYSTEM ONLINE</span>
            Actively seeking roles in Backend, DevOps, and Cloud Infrastructure.
          </div>
        </div>
        
        {/* Brand/Model text */}
        <div className="absolute bottom-5 left-6 font-mono text-[10.5px] uppercase tracking-widest text-zinc-550 select-none font-semibold">
          SL-1200 PORTFOLIO // DIRECT DRIVE
        </div>

        {/* LED Indicator Light */}
        <div className="absolute bottom-5 right-6 flex items-center gap-2 select-none">
          <div 
            className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.5)] transition-colors duration-300 ${
              isPlaying ? "bg-amber-600/80 animate-pulse" : "bg-red-700"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
            {isPlaying ? "ON AIR" : "STDBY"}
          </span>
        </div>

        {/* Strobe Light reflection in corner */}
        <div className="absolute bottom-16 left-6 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800/50 flex items-center justify-center z-10 shadow-inner">
          <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${isPlaying ? "bg-amber-600/80 shadow-[0_0_12px_rgba(217,119,6,0.5)]" : "bg-zinc-800"}`} />
        </div>

        {/* Speed Selector Buttons */}
        <div className="absolute bottom-5 left-1/3 flex gap-2.5 z-20">
          <button 
            onClick={() => setRpm(33)}
            disabled={!activeRecord}
            className={`px-3.5 py-1.5 rounded font-mono text-[11px] border transition-all cursor-pointer ${
              rpm === 33 
                ? "bg-zinc-900 text-amber-600/80 border-zinc-800/50 font-black" 
                : "bg-zinc-950 text-zinc-500 border-zinc-800/50 hover:text-zinc-350 hover:border-zinc-700"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            33
          </button>
          <button 
            onClick={() => setRpm(45)}
            disabled={!activeRecord}
            className={`px-3.5 py-1.5 rounded font-mono text-[11px] border transition-all cursor-pointer ${
              rpm === 45 
                ? "bg-zinc-900 text-amber-600/80 border-zinc-800/50 font-black" 
                : "bg-zinc-950 text-zinc-500 border-zinc-800/50 hover:text-zinc-350 hover:border-zinc-700"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            45
          </button>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          disabled={!activeRecord}
          className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all cursor-pointer z-20 ${
            isPlaying 
              ? "bg-amber-600/80 text-zinc-950 border-amber-600 hover:bg-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.25)]" 
              : "bg-zinc-950 text-zinc-500 border-zinc-800/50 hover:text-zinc-350"
          } disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        {/* Platter (The circular metal rotation base) */}
        <div className="w-[88%] aspect-square rounded-full bg-zinc-950 border-[6px] border-zinc-800/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] flex items-center justify-center relative">
          
          {/* Spindle Pin (Center) */}
          <div className="absolute w-3 h-3 rounded-full bg-zinc-600 border border-zinc-500 z-30 shadow" />
          
          <AnimatePresence mode="wait">
            {!activeRecord ? (
              // Idle Slipmat Placeholder
              <motion.div
                key="slipmat"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-4 rounded-full bg-[#1a1412] border border-zinc-800/50 flex flex-col items-center justify-center p-6 text-center select-none"
              >
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-zinc-800/30 opacity-50 animate-spin-slow" />
                <RotateCw className="w-9 h-9 text-zinc-500 mb-3.5 animate-pulse" />
                <p className="text-zinc-300 font-mono text-xs max-w-[220px] leading-relaxed font-semibold">
                  Select a record from the shelves to spin your experience.
                </p>
              </motion.div>
            ) : (
              // Spinning Vinyl Disc
              <motion.div
                key={activeRecord.id}
                initial={{ y: -200, rotate: -45, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
                exit={{ y: 200, rotate: 45, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute inset-2 rounded-full vinyl-grooves bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black border border-zinc-850/50 flex items-center justify-center relative cursor-pointer z-10 overflow-hidden"
              >
                {/* Physics Rotation Controller */}
                <div
                  className="w-full h-full flex items-center justify-center relative rounded-full"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Conic gloss sheen overlay with dynamic cursor coordinates */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none" 
                    style={{
                      background: `conic-gradient(from ${sheenAngle}deg at 50% 50%, rgba(255, 255, 255, 0.04) 0deg, rgba(255, 255, 255, 0) 30deg, rgba(255, 255, 255, 0.05) 90deg, rgba(255, 255, 255, 0) 150deg, rgba(255, 255, 255, 0.04) 180deg, rgba(255, 255, 255, 0) 210deg, rgba(255, 255, 255, 0.05) 270deg, rgba(255, 255, 255, 0) 330deg, rgba(255, 255, 255, 0.04) 360deg)`
                    }}
                  />
                  
                  {/* Record Paper Label (Center) */}
                  <div 
                    className={`w-[38%] aspect-square rounded-full p-[2px] ${activeRecord.color} shadow-lg z-20 flex flex-col items-center justify-center text-center overflow-hidden border border-black/30`}
                  >
                    <div className="w-full h-full rounded-full bg-zinc-950/50 backdrop-blur-[2px] flex flex-col items-center justify-center p-2.5 relative">
                      {/* Project Title */}
                      <span className="text-[7.5px] font-extrabold text-zinc-300 uppercase font-mono tracking-tight leading-none text-center max-w-[85px] truncate mb-0.5">
                        {limitWords(activeRecord.title)}
                      </span>
                      {/* Year / Format */}
                      <span className="text-[6.5px] font-bold text-zinc-500 font-mono scale-90">
                        {activeRecord.releaseYear} // LP
                      </span>
                      {/* Categories */}
                      <span className="text-[5.5px] font-black text-amber-600/80 font-mono tracking-widest uppercase scale-75 mt-1.5 border-t border-white/20 pt-1">
                        {activeRecord.category}
                      </span>
                      
                      {/* Center Spindle Cutout */}
                      <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shadow-inner" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tonearm & Needle (swings and lowers on state coordination) */}
        <div className="absolute -top-12 -right-8 w-44 h-80 pointer-events-none z-20">
          <motion.div
            className="w-full h-full relative origin-[80px_60px]"
            animate={{
              rotate: tonearmAngle,
              y: tonearmY
            }}
            transition={{ type: "spring", stiffness: 85, damping: 16 }}
          >
            {/* The Pivot Base */}
            <div className="absolute top-[35px] right-[65px] w-14 h-14 rounded-full bg-zinc-800 border-4 border-zinc-700 shadow-md flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* The Arm Pipe/Needle Shaft (SVG) */}
            <svg 
              className="absolute top-[75px] right-[78px] w-32 h-64 overflow-visible"
              viewBox="0 0 100 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Metallic arm piping */}
              <path 
                d="M 50 10 C 50 80, 20 100, 18 160" 
                stroke="#d1d5db" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                className="shadow-sm"
              />
              <path 
                d="M 50 10 C 50 80, 20 100, 18 160" 
                stroke="#9ca3af" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
              
              {/* Cartridge headshell */}
              <rect 
                x="8" 
                y="155" 
                width="16" 
                height="28" 
                rx="2" 
                transform="rotate(6, 16, 160)" 
                fill="#18181b" 
                stroke="#3f3f46" 
                strokeWidth="1"
              />
              
              {/* Head-shell finger lift */}
              <path 
                d="M 23 162 C 28 160, 30 166, 28 170" 
                stroke="#a1a1aa" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />

              {/* Stylus Cartridge label detail (amber accent) */}
              <rect 
                x="11" 
                y="172" 
                width="10" 
                height="6" 
                rx="1" 
                transform="rotate(6, 16, 160)" 
                fill="#d97706" 
              />
            </svg>
          </motion.div>
        </div>

      </div>

      {/* Visual Equalizer Graph & Mute Switch console */}
      <div className="w-full max-w-[500px] h-10 bg-[#1a1412] rounded-xl border border-zinc-800/50 p-3 flex items-center justify-between gap-1 overflow-hidden select-none">
        
        {/* Interactive sound control trigger */}
        <button
          onClick={handleMuteToggle}
          className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-amber-600/80 cursor-pointer transition-all font-mono text-[10.5px] tracking-wider text-zinc-300 uppercase select-none"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-600" />
              <span className="font-extrabold">MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span className="font-extrabold">AUDIO ON ({activeSpinSpeedText})</span>
            </>
          )}
        </button>
        
        {/* Dynamic equalizer columns */}
        <div className="flex items-end gap-[3px] h-full flex-1 justify-end max-w-[200px]">
          {Array.from({ length: 24 }).map((_, i) => {
            const baseHeight = [10, 40, 20, 60, 80, 50, 30, 70, 90, 40, 60, 20, 50, 70, 80, 30, 40, 90, 70, 20, 50, 30, 60, 10][i];
            const isColumnAnimating = isPlaying && !isMuted;
            
            return (
              <motion.div
                key={i}
                className="w-[3px] bg-gradient-to-t from-zinc-800 to-amber-600/80 rounded-t-[1px]"
                animate={isColumnAnimating ? {
                  height: [`${baseHeight}%`, `${Math.max(10, baseHeight - 40)}%`, `${Math.min(100, baseHeight + 35)}%`, `${baseHeight}%`]
                } : { height: "10%" }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + (i % 5) * 0.15,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
