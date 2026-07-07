"use client";

import React from "react";
import { EXPERIENCE_CERTIFICATES } from "../data/vault";
import {
  ShieldCheck,
  Award,
  MapPin,
  Calendar,
  ExternalLink,
  Cpu,
  Sparkles,
  Music,
  Trophy,
  Compass,
  Terminal,
  Server,
  Workflow,
  Cloud,
  Box,
  RefreshCw,
  GitBranch,
  Globe,
  Layers,
  Code,
  FileCode,
  Coffee,
  Database,
  Waves,
  Brain,
  Radio,
  Key,
  Activity,
  BarChart3,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ExperiencePanel() {
  const { education, certifications, leadershipAchievements, experience } =
    EXPERIENCE_CERTIFICATES;

  return (
    <div className="w-full relative rounded-2xl overflow-hidden glass-panel border-zinc-700 p-[1px]">
      {/* Background texture wrapper */}
      <div className="w-full bg-[#1a1412] p-6 sm:p-8 flex flex-col gap-8 relative overflow-hidden rounded-2xl">
        {/* Retro studio folder borders overlay */}
        <div className="absolute inset-4 border border-zinc-800/30 pointer-events-none z-0" />

        {/* EPK Header Folder Tab */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800/50 pb-4 gap-4 z-10 select-none">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-6 bg-amber-600/80 rounded-sm"></span>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-zinc-300 font-mono">
                ELECTRONIC PRESS KIT & RIDER
              </h2>
              <span className="text-xs text-zinc-500 font-bold font-mono tracking-widest uppercase mt-0.5">
                Contract Document Ref: #2006052027
              </span>
            </div>
          </div>
          <span className="text-xs sm:text-sm text-zinc-500 font-bold font-mono uppercase bg-zinc-950 px-3 py-1 rounded border border-zinc-850">
            Status: Active Ingestion
          </span>
        </div>

        {/* EPK Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full z-10">
          {/* Left Column: The Backstage VIP Laminate Pass (Col Span 4) */}
          <ScrollReveal className="col-span-1 lg:col-span-4 flex justify-center w-full lg:h-full">
            <div className="w-full max-w-[270px] bg-zinc-950 border border-zinc-850 p-5 rounded-2xl relative shadow-2xl flex flex-col items-center justify-start gap-5 text-center font-mono select-none lg:h-full lg:min-h-[750px]">
              <div className="w-full flex flex-col items-center gap-4">
                {/* Card Lanyard Hang Slot */}
                <div className="w-10 h-2.5 bg-[#120e0d] border border-zinc-800 rounded-full mb-1 shadow-inner" />

                {/* Pass Header */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black text-amber-600/80 tracking-[0.2em] uppercase">
                    BACKSTAGE ACCESS
                  </span>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
                    SYSTEM DEPLOYMENT PASSPORT
                  </span>
                </div>

                <div className="w-full border-t border-dashed border-zinc-850" />

                {/* Photo Slot / Monogram Sticker */}
                <div className="w-40 h-40 rounded-xl bg-gradient-to-b from-[#1a1412] to-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-650 relative overflow-hidden shadow-inner group hover:border-amber-600/40 transition-all duration-300">
                  <div className="absolute inset-0.5 rounded-lg border border-dashed border-zinc-850/40 z-10 pointer-events-none" />
                  <img src="/Close-up.jpeg" alt="YK Portrait" className="w-full h-full object-cover transition-all duration-500" />
                  {/* Holographic lines effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20 pointer-events-none" />
                </div>

                {/* Member metadata */}
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-black text-zinc-200 font-display tracking-wide uppercase">
                    Y. KHANNA
                  </h4>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                    LEAD SYSTEM DEVELOPER
                  </p>
                </div>

                <div className="w-full border-t border-dashed border-zinc-850" />

                {/* Accreditations & Certifications Badges */}
                <div className="w-full flex flex-col gap-2 pt-1.5">
                  <span className="text-[8.5px] font-black text-zinc-500 uppercase tracking-widest text-left">
                    ACCREDITATIONS:
                  </span>

                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="w-full py-2 px-2.5 bg-[#120e0d] border border-zinc-900 rounded-lg flex items-center justify-between gap-2 hover:border-zinc-800 hover:bg-[#1a1412]/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 text-left">
                        <ShieldCheck className="w-4 h-4 text-amber-600/80 flex-shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[9.5px] font-extrabold text-zinc-300 uppercase tracking-wide leading-snug">
                            {cert.name.split(",")[0]}
                          </span>
                          <span className="text-[7.5px] font-bold text-zinc-550 uppercase tracking-wider mt-0.5">
                            {cert.issuer || "Accredited"} //{" "}
                            {cert.status || "Active"}
                          </span>
                        </div>
                      </div>
                      {cert.credlyUrl && (
                        <a
                          href={cert.credlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 hover:text-amber-600/80 transition-colors"
                          aria-label={`Verify ${cert.name}`}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Laminate Authorization Metadata */}
              <div className="w-full grid grid-cols-2 gap-2 text-left text-[8.5px] text-zinc-550 font-mono mt-1 border-t border-dashed border-zinc-850/60 pt-3 mb-2">
                <div>
                  <span className="block font-black text-zinc-600">
                    SECTOR:
                  </span>
                  <span className="font-extrabold text-zinc-400">
                    DEVOPS/CLOUD
                  </span>
                </div>
                <div>
                  <span className="block font-black text-zinc-650">
                    CLEARANCE:
                  </span>
                  <span className="font-extrabold text-amber-600/80">
                    LEVEL 01 (VIP)
                  </span>
                </div>
                <div className="col-span-2 mt-1">
                  <span className="block font-black text-zinc-600">
                    LAMINATE ID:
                  </span>
                  <span className="font-extrabold text-zinc-400">
                    YK-360-STATION-3080
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Tour Riders (Col Span 8) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 w-full">
            {/* TOUR HISTORY (Work Experience) */}
            {experience && experience.length > 0 && (
              <ScrollReveal delay={0.05}>
                <div className="w-full rounded-2xl border border-zinc-850 bg-zinc-950/30 p-5 sm:p-6 flex flex-col gap-4 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-600/80 opacity-60 shadow-[0_0_6px_rgba(217,119,6,0.3)]" />
                  <h3 className="text-xs font-black text-amber-600/80 font-mono tracking-widest uppercase">
                    TOUR HISTORY & GIG LOG (WORK EXPERIENCE)
                  </h3>
                  <div className="flex flex-col gap-5 mt-1">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="text-sm font-extrabold text-zinc-200 font-display">
                            {exp.role} <span className="text-amber-600/80 font-mono">@ {exp.company}</span>
                          </h4>
                          <span className="text-[10px] font-bold text-zinc-500 font-mono tracking-wider bg-[#120e0d] px-2 py-0.5 rounded border border-zinc-900 w-fit">
                            {exp.duration}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-zinc-400 font-sans leading-relaxed">
                              <span className="text-amber-600/80 mt-1 flex-shrink-0">▹</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Sheet 1: Stage Hardware Rider (Technical Skills) */}
            <ScrollReveal delay={0.1}>
              <div className="w-full rounded-2xl border border-zinc-850 bg-zinc-950/30 p-5 sm:p-6 flex flex-col gap-4 shadow-md relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-600/80 opacity-60 shadow-[0_0_6px_rgba(217,119,6,0.3)]" />

                <h3 className="text-xs font-black text-amber-600/80 font-mono tracking-widest uppercase">
                  STAGE HARDWARE RIDER (TECH SPECIFICATIONS)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  {/* DevOps & Automation */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Server className="w-4 h-4 text-amber-600/80" />
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-350 font-mono uppercase tracking-wider">
                        DevOps & Automation
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <GitBranch className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">GitOps</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Cpu className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Jenkins</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Terminal className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Actions</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">ArgoCD</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Box className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Terraform</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Box className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Docker</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Terminal className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">n8n</span>
                      </div>
                    </div>
                  </div>

                  {/* Cloud & Security */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Cloud className="w-4 h-4 text-amber-600/80" />
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Cloud & Security
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Cloud className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">AWS</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Brain className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">LLMs</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Terminal className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Prompt Eng</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Database className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">DynamoDB</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Brain className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">SageMaker</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Ethical Hacker</span>
                      </div>
                    </div>
                  </div>

                  {/* Data Engineering */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Database className="w-4 h-4 text-amber-600/80" />
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Data Engineering
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Terminal className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Python</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Database className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">SQL</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Database className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">PySpark</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Database className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">AWS Glue</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Database className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">ETL/ELT</span>
                      </div>
                    </div>
                  </div>

                  {/* Practices & Tools */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Workflow className="w-4 h-4 text-amber-600/80" />
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Practices & Tools
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Code className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Design Thinking</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Activity className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Agile/Scrum</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Globe className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">REST APIs</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#120e0d] border border-zinc-900 rounded-lg hover:border-amber-600/30 hover:bg-[#1a1412]/30 transition-all duration-200">
                        <Server className="w-3.5 h-3.5 text-amber-650" />
                        <span className="text-[11px] font-mono text-zinc-300">Microservices</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Full Width Bottom Row: Character Comfort & Hospitality Rider */}
          <div className="col-span-1 lg:col-span-12 w-full pt-4">
            <ScrollReveal delay={0.18}>
              <div className="w-full rounded-2xl border border-zinc-850 bg-zinc-950/30 p-5 sm:p-6 flex flex-col gap-4 shadow-md relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-600/80 opacity-60 shadow-[0_0_6px_rgba(217,119,6,0.3)]" />

                <h3 className="text-xs font-black text-amber-600/80 font-mono tracking-widest uppercase">
                  ARTIST COMFORT & HOSPITALITY RIDER (CHARACTER OUTLINES)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-1">
                  {/* Leadership Card */}
                  <div className="flex gap-3 items-start p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <Award className="w-5 h-5 text-amber-600/80 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Leadership & Comms
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        Elected Head Boy. Chaired and organized regional MUN
                        conferences managing debate logistics for 200+
                        delegates.
                      </p>
                    </div>
                  </div>

                  {/* Sports Card */}
                  <div className="flex gap-3 items-start p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <Trophy className="w-5 h-5 text-amber-600/80 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Athletics & Discipline
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        National-level Athlete. Reinforced physical stamina,
                        team collaboration, and high-pressure endurance.
                      </p>
                    </div>
                  </div>

                  {/* Music Card */}
                  <div className="flex gap-3 items-start p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <Music className="w-5 h-5 text-amber-600/80 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Musical DNA
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        Acoustic & Electric Guitar. Core understanding of
                        musical structures, record compilation rhythms, and
                        audio synthesis.
                      </p>
                    </div>
                  </div>

                  {/* Soft Skills / Character Card */}
                  <div className="flex gap-3 items-start p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors">
                    <Sparkles className="w-5 h-5 text-amber-600/80 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-extrabold text-zinc-355 font-mono uppercase tracking-wider">
                        Performance Traits
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        Low-latency adaptability, cross-functional project
                        execution, and precise modular problem solving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Perforated ticket stub border details & Ticket Footer (Education Newspaper Section) */}
        <div className="w-full flex flex-col items-center gap-5 z-10 border-t border-zinc-950 pt-6 mt-4 relative select-none">
          {/* Perforation circle mockups (on sides) */}
          <div className="absolute top-0 -left-9 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-850 z-20" />
          <div className="absolute top-0 -right-9 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-850 z-20" />

          {/* Newspaper academic snippet */}
          <ScrollReveal className="w-full flex flex-col gap-4 pl-1 text-left font-mono">
            <span className="text-[10px] font-black text-amber-600/80 tracking-widest uppercase">
              PRESS RELEASE - ACADEMIC DISPATCH & CHRONICLES
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-zinc-950 pb-5">
              <div className="flex flex-col gap-1.5 p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-zinc-200 uppercase tracking-wide font-display">
                    SRM Institute of Science and Technology
                  </h4>
                  <span className="text-[9px] font-bold text-zinc-550 bg-zinc-950 border border-zinc-900 px-1.5 py-0.5 rounded flex-shrink-0 uppercase">
                    UNDERGRADUATE
                  </span>
                </div>
                <p className="text-xs text-amber-600/80 font-bold font-mono">
                  B.Tech in Computer Science (Cloud Computing)
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-xs text-zinc-500 font-semibold font-mono mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-600" /> Chennai, TN
                  </span>
                  <span className="text-zinc-850">|</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-600" /> 2023 – 2027
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-black text-zinc-200 uppercase tracking-wide font-display">
                    Delhi Public School
                  </h4>
                  <span className="text-[9px] font-bold text-zinc-550 bg-zinc-950 border border-zinc-900 px-1.5 py-0.5 rounded flex-shrink-0 uppercase">
                    HIGH SCHOOL
                  </span>
                </div>
                <p className="text-xs text-amber-600/80 font-bold font-mono">
                  CBSE Curriculum (Class XII: 83.4% | Class X: 90.2%)
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-xs text-zinc-500 font-semibold font-mono mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-600" /> Jodhpur, RJ
                  </span>
                  <span className="text-zinc-850">|</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-600" /> 2021 – 2023
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Ticket Barcode Footer */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs sm:text-sm text-zinc-500 px-4 mt-1">
            <div className="font-semibold">DOORS OPEN: 00:00 UTC</div>

            {/* Mock Ticket Barcode graphic */}
            <div className="flex items-center gap-0.5 h-6 bg-zinc-950 px-2 py-1 rounded border border-zinc-800/50">
              <div className="w-[1px] h-full bg-zinc-650" />
              <div className="w-[2px] h-full bg-zinc-650" />
              <div className="w-[1px] h-full bg-zinc-650" />
              <div className="w-[3px] h-full bg-zinc-650" />
              <div className="w-[1px] h-full bg-zinc-650" />
              <div className="w-[2px] h-full bg-zinc-650" />
              <div className="w-[4px] h-full bg-zinc-650" />
              <div className="w-[1px] h-full bg-zinc-650" />
              <div className="w-[2px] h-full bg-zinc-650" />
              <div className="w-[1px] h-full bg-zinc-650" />
              <div className="w-[3px] h-full bg-zinc-650" />
              <span className="text-[10px] sm:text-xs text-zinc-500 ml-2 font-black tracking-wider">
                ADMIT ONE - PORTFOLIO GUEST
              </span>
            </div>

            <div className="font-semibold">TICKET NO: #202-YASH</div>
          </div>
        </div>
      </div>
    </div>
  );
}
