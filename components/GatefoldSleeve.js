"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, ExternalLink, Compass, Cpu, Terminal, Activity, ShieldCheck, Zap } from "lucide-react";

function GitHubIcon(props) {
  return (
    <svg className="fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

export default function GatefoldSleeve({ activeRecord }) {
  if (!activeRecord) {
    return (
      <div className="w-full h-full min-h-[400px] rounded-2xl border border-zinc-700 bg-[#1a1412] flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center mb-4 text-zinc-650">
          <Music className="w-6 h-6 animate-pulse" />
        </div>
        <h4 className="text-zinc-500 font-mono text-base font-semibold tracking-wider uppercase mb-2">
          Jacket Closed
        </h4>
        <p className="text-zinc-600 font-mono text-sm max-w-[320px] leading-relaxed">
          Select a project spine from the record shelves on the left to slide out the vinyl and open the liner notes.
        </p>
      </div>
    );
  }

  // Split tracks into A-Side and B-Side for the Gatefold layout
  const aSideTracks = activeRecord.tracks.filter(t => t.name.toLowerCase().includes("a-side") || activeRecord.tracks.indexOf(t) < 2);
  const bSideTracks = activeRecord.tracks.filter(t => t.name.toLowerCase().includes("b-side") || activeRecord.tracks.indexOf(t) >= 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-6"
    >
      {/* The Opened Cardboard Gatefold Sleeve Folder */}
      <div className="w-full rounded-2xl overflow-hidden bg-[#1c1614] border border-zinc-700 shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Cardboard Spine Fold Accent Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/40 border-r border-zinc-700 hidden md:block z-20 pointer-events-none" />

        {/* Panel 1: A-Side (Liner Notes / Architecture) */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col gap-6 border-b border-zinc-700 md:border-b-0 md:border-r border-black/20 z-10 bg-transparent">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-black text-amber-600/90 font-mono tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                A-Side // Architecture & Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 leading-tight font-display">
                {activeRecord.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-mono italic font-semibold">
                {activeRecord.subtitle}
              </p>
            </div>
            
            <div className="text-right flex flex-col items-end flex-shrink-0">
              <span className="text-2xl font-black text-zinc-400 font-mono">33⅓ RPM</span>
              <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider font-semibold">STEREO / LP</span>
            </div>
          </div>

          {/* GitHub Repo Button Banner */}
          {activeRecord.repoUrl && (
            <div className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <GitHubIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-extrabold text-zinc-200 uppercase tracking-wider">
                    Official GitHub Repository
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[240px] sm:max-w-[320px]">
                    {activeRecord.repoUrl}
                  </span>
                </div>
              </div>

              <a
                href={activeRecord.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600/90 hover:bg-amber-600 text-zinc-950 font-black text-xs font-mono uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>View Source Code</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="border-t border-zinc-700/60 my-0.5" />

          {/* Tracks List (A-Side details) */}
          <div className="flex flex-col gap-5">
            {aSideTracks.map((track, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-700 flex items-center justify-center flex-shrink-0 text-amber-500 font-mono text-sm font-black shadow-inner group-hover:border-amber-600/50 transition-all">
                  A{index + 1}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-sm sm:text-base font-extrabold text-zinc-200 tracking-wide font-mono uppercase">
                    {track.name.replace(/^A-Side:\s*/i, "")}
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-medium">
                    {track.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: B-Side (Outcomes, Observability & Telemetry) */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-6 z-10 bg-transparent">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-black text-amber-600/90 font-mono tracking-widest uppercase flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                B-Side // Performance, Observability & Telemetry
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-display">
                Release Track Listings & Observability
              </h3>
              <p className="text-sm text-zinc-400 font-mono">
                System throughput, automated threshold safeguards, and real-time monitoring.
              </p>
            </div>

            {/* Special Observability Highlight Badge for Blue-Green */}
            {activeRecord.id === "automated-blue-green-pipeline" && (
              <div className="p-3.5 rounded-xl bg-[#120e0d] border border-blue-600/40 flex flex-col gap-2 font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 font-black uppercase tracking-wider flex items-center gap-1.5 text-xs">
                    <Zap className="w-4 h-4 text-amber-500" /> Prometheus + Grafana + ZapDats Integration
                  </span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  Configured Prometheus scrape metrics for p99 latency & HTTP 5xx errors, coupled with Grafana visual dashboards and ZapDats telemetry streams to drive automated Canary rollbacks and instant ALB cutovers.
                </p>
              </div>
            )}

            <div className="border-t border-zinc-700/60 my-0.5" />

            {/* Tracks List (B-Side details) */}
            <div className="flex flex-col gap-5">
              {bSideTracks.map((track, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-700 flex items-center justify-center flex-shrink-0 text-amber-500 font-mono text-sm font-black shadow-inner group-hover:border-amber-600/50 transition-all">
                    B{index + 1}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-zinc-200 tracking-wide font-mono uppercase">
                      {track.name.replace(/^B-Side:\s*/i, "")}
                    </h4>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-medium">
                      {track.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits / Personnel Section */}
          <div className="mt-8 pt-4 border-t border-zinc-700 flex flex-col gap-3">
            <h5 className="text-xs font-black tracking-widest text-amber-600/90 uppercase font-mono">
              Personnel & Engineering Stack
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <Terminal className="w-4 h-4 text-amber-600/90 flex-shrink-0" />
                <span className="text-zinc-500 font-bold uppercase text-[11px]">Lead Architect:</span> 
                <span className="truncate font-bold text-zinc-200">Yashvardhan Khanna</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <Compass className="w-4 h-4 text-amber-600/90 flex-shrink-0" />
                <span className="text-zinc-500 font-bold uppercase text-[11px]">Released:</span> 
                <span className="font-bold text-zinc-200">{activeRecord.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200 sm:col-span-2 font-semibold">
                <Cpu className="w-4 h-4 text-amber-600/90 flex-shrink-0" />
                <span className="text-zinc-500 font-bold uppercase text-[11px] flex-shrink-0">Tech Stack:</span> 
                <span className="text-zinc-300 font-semibold text-xs leading-relaxed">
                  {activeRecord.tags.join(" • ")}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

