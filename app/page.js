"use client";

import React, { useState } from "react";
import AmbientBackground from "../components/AmbientBackground";
import RecordShelf from "../components/RecordShelf";
import TurntableDeck from "../components/TurntableDeck";
import GatefoldSleeve from "../components/GatefoldSleeve";
import ExperiencePanel from "../components/ExperiencePanel";
import JukeboxLounge from "../components/JukeboxLounge";
import { Disc, FileText, Sparkles, Phone, Mail, MapPin, Radio, Library, Trophy, Music, ArrowRight } from "lucide-react";

export default function Home() {
  const [activeRecord, setActiveRecord] = useState(null);
  const [activeSection, setActiveSection] = useState("crate-a"); // 'crate-a' | 'crate-b' | 'crate-c'

  // Social Links read from LINKS.TXT
  const githubLink = "https://github.com/YashK3086";
  const linkedinLink = "https://www.linkedin.com/in/yashvardhan-khanna-985b51353/";
  const credlyLink = "https://www.credly.com/users/yashvardhan-khanna.1cd7d08c/edit#credly";

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden select-none">
      {/* 1. Ambient Background Grid */}
      <AmbientBackground />

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col z-10 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        
        {/* Header Navigation */}
        <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800/80 pb-6 mb-8 select-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.35)] animate-spin-slow">
              <Disc className="w-5 h-5 font-bold" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-base font-bold tracking-wider text-zinc-100 font-display flex items-center gap-1.5 leading-none">
                Yashvardhan Khanna's hand picked collection
              </h1>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 mt-1.5">
                From the CODE, By my Picks, For your Ears
              </span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-2.5">
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            
            <a 
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
            </a>

            <a 
              href={credlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
              aria-label="Credly Portfolio"
            >
              <AwardIcon className="w-4 h-4 text-zinc-400" />
            </a>

            {/* Direct access to PDF resume stored locally */}
            <a 
              href="/Resume (3).pdf"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all text-xs font-mono"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </header>

        {/* 2. Startup Landing Section: Biography & Details about Yashvardhan */}
        <section className="w-full mb-10 select-none">
          <div className="w-full rounded-2xl glass-panel-glow border-zinc-800/80 p-6 sm:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden">
            
            {/* Ambient subtle vinyl graphic on background */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-[10px] border-zinc-900/20 opacity-30 pointer-events-none hidden md:block" />
            
            {/* Bio Left Column: Portrait Slot & Details */}
            <div className="flex flex-col gap-4 max-w-[320px] w-full border-b border-zinc-800/60 md:border-b-0 md:border-r md:pr-8 border-black/20 pb-6 md:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-inner flex-shrink-0">
                  <span className="font-mono text-lg font-bold">YK</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-zinc-100 uppercase tracking-wide">
                    Yashvardhan Khanna
                  </h2>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                    Cloud Architect & Dev
                  </span>
                </div>
              </div>

              {/* Bio summary paragraph */}
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Bridging serverless automation pipelines and secure IoT infrastructures with the rhythmic precision of a vinyl DJ. Building scalable systems that play without skip.
              </p>

              {/* Contact Grid */}
              <div className="flex flex-col gap-2.5 mt-2 font-mono text-[10px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-500/70" />
                  <a href="mailto:yashvardhankhanna360@gmail.com" className="hover:text-amber-500 transition-colors">yashvardhankhanna360@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>+91 9772292339</span>
                </div>
              </div>
            </div>

            {/* Bio Right Column: Core Tech Skills & Cloud Platforms */}
            <div className="flex-1 flex flex-col justify-between gap-6">
              
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-amber-500 font-mono tracking-widest uppercase">
                  Technical Core Competencies
                </span>
                
                {/* Tech Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  
                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-900">
                    <span className="text-[10px] font-bold text-zinc-300 font-mono uppercase">Full-Stack Engineering</span>
                    <span className="text-[10.5px] text-zinc-400 font-light">Next.js, React.js, Node.js, JavaScript, HTML/CSS, Java</span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-900">
                    <span className="text-[10px] font-bold text-zinc-300 font-mono uppercase">DevOps & Cloud Orchestration</span>
                    <span className="text-[10.5px] text-zinc-400 font-light">AWS (EKS, Lambda, S3, Cognito), Terraform, Jenkins, GitOps</span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-900">
                    <span className="text-[10px] font-bold text-zinc-300 font-mono uppercase">Data Science & AI</span>
                    <span className="text-[10.5px] text-zinc-400 font-light">Python, PySpark, Librosa Audio Analysis, SageMaker KNN Models</span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-900">
                    <span className="text-[10px] font-bold text-zinc-300 font-mono uppercase">Security & Tools</span>
                    <span className="text-[10.5px] text-zinc-400 font-light">ESP32 Cryptography (ChaCha20), LoRa E2EE, ArgoCD, Prometheus</span>
                  </div>

                </div>
              </div>

              {/* Education teaser banner */}
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span className="text-[10.5px] font-mono text-zinc-300">
                    B.Tech Student at <strong className="text-white font-semibold">SRM Institute of Science & Technology</strong> (Cloud Computing, 2023-2027)
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setActiveSection("crate-b");
                    const element = document.getElementById("audio-receiver-console");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold text-amber-500 uppercase font-mono hover:text-amber-400 cursor-pointer"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* 3. Audio Console Channel Selector (Switch sections) */}
        <section id="audio-receiver-console" className="w-full mb-10 select-none">
          <div className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            
            {/* LED Status Indicator Display */}
            <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2.5 rounded border border-zinc-800/80 font-mono text-xs w-full md:w-auto">
              <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-bold uppercase">RECEIVER INPUT:</span>
                <span className="text-amber-500 font-bold glow-text-amber uppercase tracking-wider">
                  {activeSection === "crate-a" && "[SOURCE A: PROJECT CRATES]"}
                  {activeSection === "crate-b" && "[SOURCE B: CERTIFICATE FLYER]"}
                  {activeSection === "crate-c" && "[SOURCE C: Listening Lounge]"}
                </span>
              </div>
            </div>

            {/* Input Selection Switches */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={() => setActiveSection("crate-a")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                  activeSection === "crate-a" 
                    ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]" 
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                }`}
              >
                <Library className="w-3.5 h-3.5" />
                <span>SOURCE A: PROJECTS</span>
              </button>

              <button 
                onClick={() => setActiveSection("crate-b")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                  activeSection === "crate-b" 
                    ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]" 
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>SOURCE B: GIG POSTER</span>
              </button>

              <button 
                onClick={() => setActiveSection("crate-c")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                  activeSection === "crate-c" 
                    ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]" 
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>SOURCE C: LISTENING</span>
              </button>
            </div>

          </div>
        </section>

        {/* 4. Display Active Section */}
        <main className="w-full pb-16">
          {activeSection === "crate-a" && (
            /* Section 1: Record Crate & Turntable (Playable projects) */
            <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (Record Shelves) - Narrower area */}
              <div className="col-span-12 lg:col-span-5 xl:col-span-4">
                <RecordShelf 
                  activeRecord={activeRecord} 
                  setActiveRecord={setActiveRecord} 
                />
              </div>

              {/* Right Column (Turntable Player & Liner Notes Sleeve) - Wider area */}
              <div className="col-span-12 lg:col-span-7 xl:col-span-8 lg:sticky lg:top-8 flex flex-col gap-8 items-center h-fit">
                <TurntableDeck activeRecord={activeRecord} />
                <GatefoldSleeve activeRecord={activeRecord} />
              </div>
            </div>
          )}

          {activeSection === "crate-b" && (
            /* Section 2: Gig Poster Board (Credentials & achievements) */
            <div className="w-full max-w-4xl mx-auto">
              <ExperiencePanel />
            </div>
          )}

          {activeSection === "crate-c" && (
            /* Section 3: Listening Lounge (Favorite albums, songs - currently empty placeholders) */
            <div className="w-full">
              <JukeboxLounge />
            </div>
          )}
        </main>

      </div>

      {/* Retro Store Footer */}
      <footer className="w-full z-10 border-t border-zinc-900 bg-zinc-950/80 py-6 text-center select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            HANDCRAFTED BY YASHVARDHAN KHANNA // © 2026 ALL RIGHTS RESERVED
          </p>
          <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block animate-ping" />
            STATION 360 // NEXT.js + TAILWIND CSS v4 + FRAMER MOTION
          </p>
        </div>
      </footer>
    </div>
  );
}

// Custom local Lucide Award Icon definition to bypass trademarked Lucide icon restrictions
function AwardIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}
