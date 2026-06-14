import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VINYL_VAULT } from "../data/vault";
import { Disc, Tag } from "lucide-react";

const limitWords = (str, limit = 3) => {
  if (!str) return "";
  const words = str.trim().split(/\s+/);
  if (words.length <= limit) return str;
  return words.slice(0, limit).join(" ");
};

export default function RecordShelf({ activeRecord, setActiveRecord }) {
  const [hoveredRecordId, setHoveredRecordId] = useState(null);

  // Group records by category
  const categories = React.useMemo(() => {
    const groups = {};
    VINYL_VAULT.forEach((record) => {
      if (!groups[record.category]) {
        groups[record.category] = [];
      }
      groups[record.category].push(record);
    });
    return groups;
  }, []);

  return (
    <div className="flex flex-col gap-16 w-full z-10 pr-2">
      {Object.entries(categories).map(([category, records]) => {
        // Find index of hovered record in this category
        const hoveredRecordIndex = records.findIndex((r) => r.id === hoveredRecordId);

        return (
          <div key={category} className="flex flex-col gap-3 relative w-full">
            {/* Category Label (Vintage dividers tab style) */}
            <div className="flex items-center justify-between border-b border-zinc-800/50 pb-2">
              <h3 className="text-base font-extrabold uppercase tracking-widest text-amber-600/80 font-mono flex items-center gap-2">
                <span className="w-2 h-4.5 bg-amber-600/80 rounded-sm"></span>
                {category}
              </h3>
              {category === "Cloud & DevOps" && (
                <span className="text-[10px] font-mono font-black text-[#5c4033] bg-[#fdf6e2] px-2 py-0.5 rounded border border-[#eadaa6] animate-pulse tracking-wide select-none">
                  👈 Click a record spine to play it!
                </span>
              )}
              <span className="text-sm text-zinc-500 font-bold font-mono">{records.length} Release(s)</span>
            </div>

            {/* Hollow shelf background */}
            <div className="relative h-72 w-full bg-[#1a1412] border-y border-zinc-800/50 overflow-visible flex items-end px-6 pb-2 pt-6 shadow-inner">
              
              {/* The records container */}
              <div className="flex items-end gap-3 sm:gap-4 md:gap-5 h-full overflow-visible z-10">
                {records.map((record, recordIndex) => {
                  const isActive = activeRecord?.id === record.id;
                  const isHovered = hoveredRecordId === record.id;

                  // Accordion fanning calculations
                  let rotateValue = 0;
                  let xValue = 0;
                  let yValue = isActive ? -12 : 0;
                  let scaleValue = 1;

                  if (hoveredRecordIndex !== -1) {
                    if (isHovered) {
                      rotateValue = -4;
                      yValue = -25;
                      scaleValue = 1.06;
                    } else if (recordIndex < hoveredRecordIndex) {
                      // Fan left
                      rotateValue = -12;
                      xValue = -12;
                      yValue = 4;
                    } else if (recordIndex > hoveredRecordIndex) {
                      // Fan right
                      rotateValue = 12;
                      xValue = 12;
                      yValue = 4;
                    }
                  }

                  // Disc sliding animations
                  const isDiscOut = isHovered || isActive;
                  const discY = isDiscOut ? -65 : -20;
                  const discOpacity = isDiscOut ? 1 : 0;
                  const discScale = isDiscOut ? 1 : 0.8;

                  return (
                    <div
                      key={record.id}
                      className="relative cursor-pointer select-none h-60 flex flex-col items-end overflow-visible"
                      style={{ width: "3.2rem" }}
                      onClick={() => setActiveRecord(record)}
                      onMouseEnter={() => setHoveredRecordId(record.id)}
                      onMouseLeave={() => setHoveredRecordId(null)}
                    >
                      {/* Vinyl Disc (slides out upward behind the sleeve on hover) */}
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black border border-zinc-800/50 flex items-center justify-center z-0 shadow-lg"
                        animate={{
                          y: discY,
                          opacity: discOpacity,
                          scale: discScale,
                          rotate: isDiscOut ? 360 : 0
                        }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      >
                        {/* Grooves visual detail */}
                        <div className="absolute inset-[3px] rounded-full border border-zinc-800/40 opacity-30" />
                        <div className="absolute inset-[6px] rounded-full border border-zinc-850/40 opacity-35" />
                        
                        <div className="w-5 h-5 rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                          {/* Inner color ring */}
                          <div 
                            className="absolute inset-[2px] rounded-full opacity-35" 
                            style={{ backgroundColor: record.labelColor }}
                          />
                          <span className="text-[8px] font-black text-zinc-300 font-mono z-10 scale-95 select-none">
                            {(() => {
                              const map = {
                                "smart-serverless-music-app": "AI",
                                "ai-translator-web-app": "TR",
                                "automated-blue-green-pipeline": "DO",
                                "devops-monitoring-system": "MO",
                                "iot-security-stream-cipher": "LO",
                                "healthcare-devsecops": "SO",
                                "corporate-visitor-data-warehouse": "DB"
                              };
                              return map[record.id] || "LP";
                            })()}
                          </span>
                        </div>
                        <Disc className="w-5 h-5 text-zinc-600/40 absolute animate-spin-slow pointer-events-none" />
                      </motion.div>

                      {/* The Vinyl Sleeve Jacket */}
                      <motion.div
                        className={`relative w-12 h-52 rounded-sm bg-zinc-900 p-[1px] shadow-lg flex flex-col justify-between items-center z-10 border border-zinc-800/50 overflow-hidden`}
                        animate={{
                          y: yValue,
                          x: xValue,
                          rotate: rotateValue,
                          scale: scaleValue,
                          boxShadow: isActive ? "0 0 15px rgba(217, 119, 6, 0.35)" : "0 4px 10px rgba(0,0,0,0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      >
                        {/* Spine Texture Details */}
                        <div className="absolute inset-0 spine-texture pointer-events-none" />

                        {/* Spine text (Vertical title, read bottom-to-top) */}
                        <div className="flex-1 flex items-center justify-center py-4 w-full h-full overflow-hidden">
                          <span 
                            className="text-[11px] font-black tracking-wider uppercase text-zinc-300 font-mono truncate max-w-[130px] whitespace-nowrap rotate-180 select-none"
                            style={{ writingMode: "vertical-rl" }}
                          >
                            {limitWords(record.title)}
                          </span>
                        </div>

                        {/* Spine bottom info (Release Year) */}
                        <div className="py-2 text-[10px] font-black text-zinc-500 font-mono border-t border-zinc-800/50 w-full text-center z-10">
                          {record.releaseYear}
                        </div>
                      </motion.div>

                      {/* Shadow underneath when sliding up */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 rounded-full filter blur-[2px] z-0"
                        animate={{
                          opacity: isHovered ? 0.2 : isActive ? 0.5 : 0.8,
                          scaleX: isHovered ? 0.8 : 1
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      />

                      {/* Pop-up Tag Overlay on Hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full mb-20 left-1/2 -translate-x-1/2 w-52 p-3 rounded-lg bg-[#1a1412] border border-zinc-800/50 text-left pointer-events-none z-30 shadow-2xl flex flex-col gap-2"
                          >
                            <div className="text-xs font-extrabold text-zinc-300 font-mono uppercase tracking-wider truncate">
                              {limitWords(record.title)}
                            </div>
                            <div className="text-[10.5px] text-zinc-500 font-semibold font-mono mb-0.5">
                              {record.subtitle}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {record.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-[9.5px] font-bold font-mono bg-zinc-950 text-amber-600/80 px-1.5 py-0.5 rounded border border-zinc-800/50 flex items-center gap-0.5"
                                >
                                  <Tag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {record.tags.length > 3 && (
                                <span className="text-[9px] font-bold font-mono bg-zinc-950 text-zinc-500 px-1 py-0.5 rounded border border-zinc-800/50">
                                  +{record.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Wooden shelf floor */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#2c201c] via-[#1a1412] to-[#2c201c] border-t border-[#3c2a24] rounded-b shadow-md z-20 flex items-center justify-between px-4 font-mono text-zinc-500">
                {/* Shelf wood grain effect */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="w-3 h-1.5 bg-zinc-950 rounded-full opacity-60" />
                <div className="w-3 h-1.5 bg-zinc-950 rounded-full opacity-60" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

