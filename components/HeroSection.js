"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, FileText, ArrowRight, Disc, ChevronDown } from "lucide-react";

export default function HeroSection({ handleCopy, copiedText }) {
  const scrollToConsole = () => {
    const consoleElement = document.getElementById("audio-receiver-console");
    if (consoleElement) {
      consoleElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen w-full relative flex flex-col justify-between bg-zinc-950 px-6 sm:px-12 py-8 overflow-hidden">
      
      {/* 1. Ambient Background Glows, Image, & Vinyl SVG silhouette */}
      <div className="absolute inset-0 bg-cover bg-center opacity-70 pointer-events-none transition-all duration-1000" style={{ backgroundImage: "url('/HERO-PAGE-NEW.jpeg')" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950 pointer-events-none z-0" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-amber-600/10 filter blur-[120px] pointer-events-none animate-pulse-slow z-0" />
      
      {/* Giant spinning ambient vinyl vector */}
      <div className="absolute left-[-2%] top-1/2 -translate-y-1/2 w-[70%] h-[100%] opacity-40 pointer-events-none hidden md:block select-none z-0">
        <motion.div
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
        >
          <svg viewBox="0 0 500 500" className="w-full h-full text-amber-500/80 drop-shadow-[0_0_25px_rgba(217,119,6,0.4)]">
            <circle cx="250" cy="250" r="240" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" />
            <circle cx="250" cy="250" r="225" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="195" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="250" cy="250" r="165" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="250" cy="250" r="135" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="250" cy="250" r="105" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="250" cy="250" r="75" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>

      {/* 2. Top Header Navigation on Hero */}
      <div className="w-full flex items-center justify-between z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-600/80 shadow-[0_0_12px_rgba(217,119,6,0.2)] animate-spin-slow">
            <Disc className="w-6 h-6" />
          </div>
          <span className="font-mono text-sm font-black tracking-widest text-zinc-300">YK</span>
        </div>
        
        {/* Contact links / Resume */}
        <div className="flex items-center gap-4">
          <a 
            href="/Yashvardhan_Khanna_Resume.pdf"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600/80 hover:bg-amber-600 text-zinc-950 font-extrabold shadow-[0_0_12px_rgba(217,119,6,0.15)] hover:scale-102 active:scale-98 transition-all text-xs font-mono uppercase tracking-wider"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* 3. Main Content: Name, Subtitles, Details */}
      <div className="w-full max-w-7xl mx-auto z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Big Typography and Info */}
          <div className="col-span-12 md:col-span-8 flex flex-col gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-2"
            >
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black font-display tracking-tight text-zinc-200 leading-none">
                Yashvardhan<br />Khanna
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-2xl sm:text-3xl font-bold font-mono text-amber-500 uppercase tracking-wide">
                Cloud & Data Engineer
              </h3>
              <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed max-w-2xl font-medium">
                Specialized in building zero-downtime Blue-Green deployment pipelines, Snowflake data lakes, serverless cloud architectures, and automated Prometheus & Grafana observability infrastructure.
              </p>
            </motion.div>

            {/* Quick Actions & Copiables */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 mt-2 select-none"
            >
              <button 
                onClick={() => handleCopy("yashvardhankhanna360@gmail.com", "email")}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-zinc-200 transition-all cursor-pointer font-mono text-xs font-bold uppercase"
                title="Copy Email ID"
              >
                <Mail className="w-4 h-4" />
                <span>{copiedText === "email" ? "Copied ID!" : "Get Email"}</span>
              </button>

              <button 
                onClick={() => handleCopy("+919772292339", "phone")}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-zinc-200 transition-all cursor-pointer font-mono text-xs font-bold uppercase"
                title="Copy Phone Number"
              >
                <Phone className="w-4 h-4" />
                <span>{copiedText === "phone" ? "Copied!" : "Get Phone"}</span>
              </button>

              <a 
                href="https://www.linkedin.com/in/yashvardhan-khanna-985b51353/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-zinc-200 transition-all cursor-pointer font-mono text-xs font-bold uppercase"
                title="Open LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <button 
                onClick={scrollToConsole}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-amber-600/10 hover:bg-amber-600/25 border border-amber-600/30 hover:border-amber-600/60 text-amber-500 hover:text-amber-400 transition-all cursor-pointer font-mono text-xs font-bold uppercase shadow-sm"
              >
                <span>ENTER JUKEBOX</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Roles Header */}
          <div className="col-span-12 md:col-span-4 flex flex-col md:items-end justify-center text-left md:text-right border-t border-zinc-800/40 md:border-t-0 pt-6 md:pt-0">
            <span className="text-base sm:text-lg font-black text-zinc-500 font-mono tracking-widest uppercase mb-2">Specialties</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500 uppercase tracking-widest leading-normal">
              Blue-Green DevOps
            </span>
            <span className="text-2xl sm:text-3xl font-black text-zinc-200 uppercase tracking-widest leading-normal mt-1.5">
              Cloud Infrastructure
            </span>
            <span className="text-2xl sm:text-3xl font-black text-zinc-200 uppercase tracking-widest leading-normal mt-1.5">
              Snowflake & Data ETL
            </span>
          </div>

        </div>
      </div>

      <div className="w-full flex items-center justify-between z-10 max-w-7xl mx-auto pt-6 border-t border-zinc-900/60 select-none">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-650">STATION 360 SOURCE CHANNEL</span>
        
        {/* Scroll indicator animation */}
        <button 
          onClick={scrollToConsole}
          className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-350 transition-all cursor-pointer group font-mono text-base sm:text-lg font-extrabold uppercase tracking-wider"
        >
          <span>Scroll to Play</span>
          <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-amber-500 transition-colors" />
        </button>
      </div>

    </section>
  );
}
