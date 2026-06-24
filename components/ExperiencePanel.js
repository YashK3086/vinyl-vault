"use client";

import React from "react";
import { EXPERIENCE_CERTIFICATES } from "../data/vault";
import { ShieldCheck, Award, GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ExperiencePanel() {
  const { education, certifications, leadershipAchievements } = EXPERIENCE_CERTIFICATES;

  return (
    <div className="w-full relative rounded-2xl overflow-hidden glass-panel border-zinc-700 p-[1px]">
      
      {/* Background texture wrapper */}
      <div className="w-full bg-[#1a1412] p-6 sm:p-8 flex flex-col gap-8 relative overflow-hidden rounded-2xl">
        
        {/* Poster Grid Borders overlay (Classic retro gig flyer design) */}
        <div className="absolute inset-4 border border-zinc-800/30 pointer-events-none z-0" />
        
        {/* Concert/Festival Header */}
        <div className="flex flex-col items-center text-center gap-1.5 z-10 select-none">
          <span className="text-sm font-black text-amber-600/80 font-mono tracking-[0.25em] uppercase">
            ✦ THE VINYL VAULT TOUR PRESENTS ✦
          </span>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-zinc-300 uppercase font-display leading-none mt-1.5">
            YASHVARDHAN KHANNA
          </h2>
          <div className="flex items-center gap-3 mt-2.5">
            <span className="h-[1px] w-12 bg-zinc-850" />
            <span className="text-sm text-zinc-500 font-bold font-mono tracking-widest uppercase">
              LIVE IN STAGE DEPLOYMENT // 2023 - 2027
            </span>
            <span className="h-[1px] w-12 bg-zinc-850" />
          </div>
        </div>

        {/* 1. Headliners (Education) */}
        <ScrollReveal className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-3 z-10 w-full">
            <div className="flex items-center gap-2">
              <span className="text-zinc-650 text-xs">✦</span>
              <h3 className="text-base font-extrabold font-mono uppercase tracking-widest text-amber-600/80 bg-zinc-950 border border-zinc-700 px-4 py-1.5 rounded-full">
                THE HEADLINERS
              </h3>
              <span className="text-zinc-650 text-xs">✦</span>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-[600px] mt-3">
              {education.map((edu, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center text-center gap-1.5 border-b border-zinc-950 pb-5 last:border-b-0 last:pb-0"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-zinc-300 uppercase tracking-wide">
                    {edu.institution}
                  </h4>
                  <p className="text-base sm:text-lg text-amber-600/80 font-bold font-mono">
                    {edu.degree}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-500 font-semibold font-mono mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {edu.location}
                    </span>
                    <span className="text-zinc-800">|</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {edu.duration}
                    </span>
                    {edu.grade && (
                      <>
                        <span className="text-zinc-800">|</span>
                        <span className="text-zinc-300 font-bold">{edu.grade}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Supporting Acts (Certifications) */}
        <ScrollReveal className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 z-10 w-full border-t border-dashed border-zinc-950 pt-6">
            <div className="flex items-center gap-2">
              <span className="text-zinc-650 text-xs">★</span>
              <h3 className="text-base font-extrabold font-mono uppercase tracking-widest text-amber-600/80 bg-zinc-950 border border-zinc-700 px-4 py-1.5 rounded-full">
                SUPPORTING ACTS
              </h3>
              <span className="text-zinc-650 text-xs">★</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3.5 max-w-[650px] mt-2">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 text-base text-zinc-350 font-mono font-semibold hover:text-zinc-300 hover:scale-102 transition-all"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-600/80 flex-shrink-0" />
                  <span>{cert.name}</span>
                  {cert.credlyUrl && (
                    <a 
                      href={cert.credlyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-555 hover:text-amber-600/80 transition-colors"
                      aria-label={`Verify ${cert.name}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {cert.status === "Pursuing" && (
                    <span className="text-[10px] bg-zinc-950 text-zinc-500 font-bold font-mono px-1.5 py-0.5 rounded uppercase tracking-wide">
                      {cert.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Festival Features (Leadership & Sports) */}
        <ScrollReveal className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 z-10 w-full border-t border-dashed border-zinc-950 pt-6">
            <div className="flex items-center gap-2">
              <span className="text-zinc-650 text-xs">✦</span>
              <h3 className="text-base font-extrabold font-mono uppercase tracking-widest text-amber-600/80 bg-zinc-950 border border-zinc-700 px-4 py-1.5 rounded-full">
                FESTIVAL FEATURES
              </h3>
              <span className="text-zinc-650 text-xs">✦</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[800px] mt-2 text-center">
              {leadershipAchievements.map((lead, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-2 bg-zinc-950 border border-zinc-700 p-4.5 rounded-xl hover:border-zinc-650 hover:scale-102 transition-all"
                >
                  <Award className="w-5.5 h-5.5 text-amber-600/80 mb-1" />
                  <h4 className="text-base font-extrabold text-zinc-300 uppercase font-mono tracking-wider">
                    {lead.role}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 font-semibold font-mono mb-1 uppercase">
                    {lead.organization}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-medium">
                    {lead.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Perforated ticket stub border details & Ticket Footer */}
        <div className="w-full flex flex-col items-center gap-4 z-10 border-t border-zinc-950 pt-6 mt-2 relative select-none">
          {/* Perforation circle mockups (on sides) */}
          <div className="absolute top-0 -left-9 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-850 z-20" />
          <div className="absolute top-0 -right-9 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-850 z-20" />
          
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs sm:text-sm text-zinc-500 px-4">
            <div className="font-semibold">
              DOORS OPEN: 00:00 UTC // CODE INGESTION ACTIVE
            </div>
            
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
              <span className="text-[10px] sm:text-xs text-zinc-500 ml-2 font-black tracking-wider">ADMIT ONE - PORTFOLIO GUEST</span>
            </div>

            <div className="font-semibold">
              TICKET NO: #2023-2027-YASH
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
