"use client";

import React, { useState, useEffect } from "react";
import AmbientBackground from "../components/AmbientBackground";
import RecordShelf from "../components/RecordShelf";
import TurntableDeck from "../components/TurntableDeck";
import GatefoldSleeve from "../components/GatefoldSleeve";
import ExperiencePanel from "../components/ExperiencePanel";
import JukeboxLounge from "../components/JukeboxLounge";
import Preloader from "../components/Preloader";
import MixerFader from "../components/MixerFader";
import CustomCursor from "../components/CustomCursor";
import ScrollReveal from "../components/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import { Disc, FileText, Sparkles, Phone, Mail, MapPin, Radio, Library, Trophy, Music, ArrowRight } from "lucide-react";



export default function Home() {
  const [activeRecord, setActiveRecord] = useState(null);
  const [activeSection, setActiveSection] = useState("crate-a"); // 'crate-a' | 'crate-b' | 'crate-c'
  const [isLoading, setIsLoading] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = typeof window !== "undefined" ? window.innerHeight - 80 : 700;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = async (text, type) => {
    try {
      if (typeof window !== "undefined" && typeof document !== "undefined" && document.hasFocus() && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(""), 2000);
      } else {
        fallbackCopyText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(""), 2000);
      }
    } catch (err) {
      console.warn("Navigator clipboard failed, trying fallback:", err);
      try {
        fallbackCopyText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(""), 2000);
      } catch (fallbackErr) {
        console.error("Copy fallback failed:", fallbackErr);
      }
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("execCommand fallback failed:", err);
    }
    document.body.removeChild(textArea);
  };

  // Social Links read from LINKS.TXT
  const githubLink = "https://github.com/YashK3086";
  const linkedinLink = "https://www.linkedin.com/in/yashvardhan-khanna-985b51353/";
  const credlyLink = "https://www.credly.com/users/yashvardhan-khanna.1cd7d08c/edit#credly";

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen w-full relative flex flex-col justify-between"
          >
            {/* 1. Ambient Background Grid */}
            <AmbientBackground />

            {/* Full-Screen Hero Landing Section */}
            <HeroSection handleCopy={handleCopy} copiedText={copiedText} />

            {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col z-10 px-6 sm:px-12 lg:px-16 pb-6 pt-0">
        
        {/* Header Navigation */}
        <header className={`sticky top-0 z-50 w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 pb-4 mb-8 transition-all duration-200 ${isScrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-700/80 shadow-lg" : "bg-zinc-950 border-b border-zinc-700"}`}>
          <div className="flex items-center gap-4.5">
            <div className="w-14 h-14 rounded-full bg-amber-600/80 flex items-center justify-center text-zinc-950 shadow-[0_0_24px_rgba(217,119,6,0.35)] animate-spin-slow">
              <Disc className="w-8 h-8 font-bold" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-5xl font-black tracking-wider text-zinc-300 font-display flex items-center gap-1.5 leading-none">
                Yashvardhan Khanna
              </h1>
              <span className="text-base sm:text-lg font-bold font-mono tracking-widest text-zinc-500 mt-2.5 uppercase">
                Open for Jamming!
              </span>

              {/* Copyable Contact Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 mt-4 font-mono text-sm select-none">
                <button 
                  onClick={() => handleCopy("yashvardhankhanna360@gmail.com", "email")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#1a1412] hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-650 text-zinc-450 hover:text-zinc-200 transition-all cursor-pointer font-bold uppercase select-none"
                  title="Copy Email ID"
                >
                  <Mail className="w-4.5 h-4.5" />
                  <span>{copiedText === "email" ? "Copied ID!" : "Get Email"}</span>
                </button>

                <button 
                  onClick={() => handleCopy("+919772292339", "phone")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#1a1412] hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-650 text-zinc-450 hover:text-zinc-200 transition-all cursor-pointer font-bold uppercase select-none"
                  title="Copy Phone Number"
                >
                  <Phone className="w-4.5 h-4.5" />
                  <span>{copiedText === "phone" ? "Copied!" : "Get Phone"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3">
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#1a1412] border border-zinc-700 hover:border-zinc-600 text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all"
              aria-label="GitHub Profile"
            >
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            
            <a 
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#1a1412] border border-zinc-700 hover:border-zinc-600 text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
            </a>

            <a 
              href={credlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#1a1412] border border-zinc-700 hover:border-zinc-600 text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all"
              aria-label="Credly Portfolio"
            >
              <AwardIcon className="w-5.5 h-5.5 text-zinc-500 hover:text-zinc-300" />
            </a>

            {/* Direct access to PDF resume stored locally */}
            <a 
              href="/Resume (7).pdf"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-600/80 hover:bg-amber-600 text-zinc-950 font-extrabold hover:shadow-[0_0_18px_rgba(217,119,6,0.25)] hover:scale-105 transition-all text-base sm:text-lg font-mono"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </header>

        {/* 2. Startup Landing Section: Biography & Details about Yashvardhan */}
        <ScrollReveal>
          <section className="w-full mb-10">
            <div className="w-full rounded-2xl glass-panel-glow border border-zinc-700 p-6 sm:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden">
              
              {/* Ambient subtle vinyl graphic on background */}
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-[10px] border-zinc-850/10 opacity-30 pointer-events-none hidden md:block" />
              
              {/* Bio Left Column: Portrait Slot & Details */}
              <div className="flex flex-col gap-4.5 max-w-[340px] w-full border-b border-zinc-800/30 md:border-b-0 md:border-r md:pr-8 border-black/20 pb-6 md:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800/50 flex items-center justify-center text-amber-600/80 shadow-[0_0_18px_rgba(217,119,6,0.25)] flex-shrink-0 font-extrabold font-mono text-2xl glow-text-amber">
                    YK
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-300 uppercase tracking-wider">
                      Yashvardhan Khanna
                    </h2>
                    <span className="text-sm font-bold font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                      Cloud Architect & Dev
                    </span>
                  </div>
                </div>

                {/* Bio summary paragraph */}
                <p className="text-lg text-zinc-300 leading-relaxed font-medium">
                  Bridging serverless automation pipelines and secure IoT infrastructures with the rhythmic precision of a vinyl DJ. Building scalable systems that play without skip.
                </p>

                {/* Contact Grid */}
                <div className="flex flex-col gap-2.5 mt-2 font-mono text-sm text-zinc-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-zinc-500" />
                    <span className="font-semibold text-zinc-300">Bangalore, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4.5 h-4.5 text-zinc-500" />
                    <a href="mailto:yashvardhankhanna360@gmail.com" className="hover:text-amber-600/80 font-semibold transition-colors text-zinc-300">yashvardhankhanna360@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4.5 h-4.5 text-zinc-500" />
                    <span className="font-semibold text-zinc-300">+91 9772292339</span>
                  </div>
                </div>
              </div>

              {/* Bio Right Column: Core Tech Skills & Cloud Platforms */}
              <div className="flex-1 flex flex-col justify-between gap-6">
                
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-black text-zinc-500 font-mono tracking-widest uppercase">
                    Technical Core Competencies
                  </span>
                  
                  {/* Tech Badges Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    
                    <div className="flex flex-col gap-2 p-4.5 rounded-xl bg-zinc-950 border border-zinc-700 bento-card-hover">
                      <span className="text-sm font-extrabold text-amber-600/80 font-mono uppercase">Full-Stack Engineering</span>
                      <span className="text-base text-zinc-300 font-semibold leading-relaxed">Next.js, React.js, Node.js, JavaScript, HTML/CSS, Java</span>
                    </div>

                    <div className="flex flex-col gap-2 p-4.5 rounded-xl bg-zinc-950 border border-zinc-700 bento-card-hover">
                      <span className="text-sm font-extrabold text-amber-600/80 font-mono uppercase">DevOps & Cloud Orchestration</span>
                      <span className="text-base text-zinc-300 font-semibold leading-relaxed">AWS (EKS, Lambda, S3, Cognito), Terraform, Jenkins, GitOps</span>
                    </div>

                    <div className="flex flex-col gap-2 p-4.5 rounded-xl bg-zinc-950 border border-zinc-700 bento-card-hover">
                      <span className="text-sm font-extrabold text-amber-600/80 font-mono uppercase">Data Science & AI</span>
                      <span className="text-base text-zinc-300 font-semibold leading-relaxed">Python, PySpark, Librosa Audio Analysis, SageMaker KNN Models</span>
                    </div>

                    <div className="flex flex-col gap-2 p-4.5 rounded-xl bg-zinc-950 border border-zinc-700 bento-card-hover">
                      <span className="text-sm font-extrabold text-amber-600/80 font-mono uppercase">Security & Tools</span>
                      <span className="text-base text-zinc-300 font-semibold leading-relaxed">ESP32 Cryptography (ChaCha20), LoRa E2EE, ArgoCD, Prometheus</span>
                    </div>

                  </div>
                </div>

                {/* Education teaser banner */}
                <div className="p-4 rounded-xl bg-[#1a1412] border border-zinc-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5.5 h-5.5 text-amber-600/80 animate-pulse flex-shrink-0" />
                    <span className="text-sm font-mono text-zinc-300 leading-relaxed">
                      B.Tech Student at <strong className="text-zinc-300 font-bold">SRM Institute of Science & Technology</strong> (Cloud Computing, 2023-2027)
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveSection("crate-b");
                      const element = document.getElementById("audio-receiver-console");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-1.5 text-sm font-extrabold text-amber-600/80 uppercase font-mono hover:text-amber-650 cursor-pointer flex-shrink-0"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </section>
        </ScrollReveal>

        {/* 3. Audio Console Channel Selector (Mixer Fader) */}
        <ScrollReveal delay={0.15}>
          <section id="audio-receiver-console" className="w-full mb-10 select-none">
            <MixerFader activeSection={activeSection} setActiveSection={setActiveSection} />
          </section>
        </ScrollReveal>

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

      <footer className="w-full z-10 border-t border-zinc-700 bg-zinc-950 py-6 text-center">
        <div className="w-full px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg sm:text-xl font-black font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest cursor-default">
            YASHVARDHAN KHANNA'S VINYL-VAULT
          </p>
          <p className="text-lg sm:text-xl font-black font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest cursor-default">
            STATION 360
          </p>
        </div>
      </footer>
          </motion.div>
        </>
      )}
    </>
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
