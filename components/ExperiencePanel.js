"use client";

import React from "react";
import { EXPERIENCE_CERTIFICATES } from "../data/vault";
import { ShieldCheck, Award, GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";

export default function ExperiencePanel() {
  const { education, certifications, leadershipAchievements } = EXPERIENCE_CERTIFICATES;

  return (
    <div className="w-full relative rounded-2xl overflow-hidden glass-panel border-zinc-800/80 p-[1px]">
      
      {/* Background texture wrapper */}
      <div className="w-full bg-zinc-950 p-6 sm:p-8 flex flex-col gap-8 relative overflow-hidden rounded-2xl">
        
        {/* Poster Grid Borders overlay (Classic retro gig flyer design) */}
        <div className="absolute inset-4 border border-zinc-800/60 pointer-events-none z-0" />
        
        {/* Concert/Festival Header */}
        <div className="flex flex-col items-center text-center gap-1 z-10 select-none">
          <span className="text-[10px] font-bold text-amber-500 font-mono tracking-[0.25em] uppercase">
            ✦ THE VINYL VAULT TOUR PRESENTS ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white uppercase font-display leading-none mt-1">
            YASHVARDHAN KHANNA
          </h2>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="h-[1px] w-8 bg-zinc-700" />
            <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
              LIVE IN STAGE DEPLOYMENT // 2023 - 2027
            </span>
            <span className="h-[1px] w-8 bg-zinc-700" />
          </div>
        </div>

        {/* 1. Headliners (Education) */}
        <div className="flex flex-col items-center gap-3 z-10 w-full">
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-[10px]">✦</span>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-500/90 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              THE HEADLINERS
            </h3>
            <span className="text-zinc-600 text-[10px]">✦</span>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-[500px] mt-2">
            {education.map((edu, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center gap-1 border-b border-zinc-900 pb-4 last:border-b-0 last:pb-0"
              >
                <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
                  {edu.institution}
                </h4>
                <p className="text-xs text-amber-500/95 font-semibold font-mono">
                  {edu.degree}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {edu.location}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-0.5">
                    <Calendar className="w-2.5 h-2.5" /> {edu.duration}
                  </span>
                  <span>|</span>
                  <span className="text-zinc-400 font-medium">{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Supporting Acts (Certifications) */}
        <div className="flex flex-col items-center gap-4 z-10 w-full border-t border-dashed border-zinc-900 pt-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-[10px]">★</span>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-500/90 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              SUPPORTING ACTS
            </h3>
            <span className="text-zinc-600 text-[10px]">★</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-[550px] mt-1">
            {certifications.map((cert, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono font-medium hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" />
                <span>{cert.name}</span>
                {cert.credlyUrl && (
                  <a 
                    href={cert.credlyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-amber-500 transition-colors"
                    aria-label={`Verify ${cert.name}`}
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {cert.status === "Pursuing" && (
                  <span className="text-[8px] bg-zinc-800 text-zinc-500 font-mono px-1 py-0.2 rounded uppercase tracking-wide">
                    {cert.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Festival Features (Leadership & Sports) */}
        <div className="flex flex-col items-center gap-4 z-10 w-full border-t border-dashed border-zinc-900 pt-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-[10px]">✦</span>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-500/90 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              FESTIVAL FEATURES
            </h3>
            <span className="text-zinc-600 text-[10px]">✦</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[620px] mt-1 text-center">
            {leadershipAchievements.map((lead, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-1 bg-zinc-900/40 border border-zinc-900/60 p-3.5 rounded-xl hover:border-zinc-800/80 transition-all"
              >
                <Award className="w-4 h-4 text-amber-500/80 mb-1" />
                <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono tracking-wider">
                  {lead.role}
                </h4>
                <p className="text-[10px] text-zinc-500 font-mono mb-1.5 uppercase font-medium">
                  {lead.organization}
                </p>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans font-light">
                  {lead.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Perforated ticket stub border details & Ticket Footer */}
        <div className="w-full flex flex-col items-center gap-4 z-10 border-t border-zinc-900 pt-6 mt-2 relative select-none">
          {/* Perforation circle mockups (on sides) */}
          <div className="absolute top-0 -left-9 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-900 z-20" />
          <div className="absolute top-0 -right-9 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-900 z-20" />
          
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-zinc-600 px-4">
            <div>
              DOORS OPEN: 00:00 UTC // CODE INGESTION ACTIVE
            </div>
            
            {/* Mock Ticket Barcode graphic */}
            <div className="flex items-center gap-0.5 h-6 bg-zinc-950 px-2 py-1 rounded border border-zinc-900">
              <div className="w-[1px] h-full bg-zinc-600" />
              <div className="w-[2px] h-full bg-zinc-600" />
              <div className="w-[1px] h-full bg-zinc-600" />
              <div className="w-[3px] h-full bg-zinc-600" />
              <div className="w-[1px] h-full bg-zinc-600" />
              <div className="w-[2px] h-full bg-zinc-600" />
              <div className="w-[4px] h-full bg-zinc-600" />
              <div className="w-[1px] h-full bg-zinc-600" />
              <div className="w-[2px] h-full bg-zinc-600" />
              <div className="w-[1px] h-full bg-zinc-600" />
              <div className="w-[3px] h-full bg-zinc-600" />
              <span className="text-[7px] text-zinc-600 ml-1.5 font-bold">ADMIT ONE - PORTFOLIO GUEST</span>
            </div>

            <div>
              TICKET NO: #2023-2027-YASH
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
