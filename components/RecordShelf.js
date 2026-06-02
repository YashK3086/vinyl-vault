import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VINYL_VAULT } from "../data/vault";
import { Disc, Tag } from "lucide-react";

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
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-500/80 font-mono flex items-center gap-2">
                <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
                {category}
              </h3>
              <span className="text-xs text-zinc-500 font-mono">{records.length} Release(s)</span>
            </div>

            {/* Hollow shelf background */}
            <div className="relative h-72 w-full bg-zinc-950/40 rounded-t-lg border-t border-x border-zinc-900/80 overflow-visible flex items-end px-6 pb-2 pt-6 shadow-inner">
              
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
                        className="absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center z-0 shadow-lg"
                        animate={{
                          y: discY,
                          opacity: discOpacity,
                          scale: discScale
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      >
                        <div className="w-4 h-4 rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center">
                          <div 
                            className="w-1.5 h-1.5 rounded-full" 
                            style={{ backgroundColor: record.labelColor }}
                          />
                        </div>
                        <Disc className="w-5 h-5 text-zinc-600/40 absolute animate-spin-slow pointer-events-none" />
                      </motion.div>

                      {/* The Vinyl Sleeve Jacket */}
                      <motion.div
                        className={`relative w-12 h-52 rounded-sm bg-gradient-to-b ${record.color} p-[1px] shadow-lg flex flex-col justify-between items-center z-10 border border-black/40 overflow-hidden`}
                        animate={{
                          y: yValue,
                          x: xValue,
                          rotate: rotateValue,
                          scale: scaleValue,
                          boxShadow: isActive ? "0 0 15px rgba(245, 158, 11, 0.4)" : "0 4px 10px rgba(0,0,0,0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      >
                        {/* Spine Texture Details */}
                        <div className="absolute inset-0 spine-texture pointer-events-none" />

                        {/* Spine text (Vertical title, read bottom-to-top) */}
                        <div className="flex-1 flex items-center justify-center py-4 w-full h-full overflow-hidden">
                          <span 
                            className="text-[10px] font-bold tracking-wider uppercase text-zinc-950/80 font-mono truncate max-w-[130px] whitespace-nowrap rotate-180 select-none"
                            style={{ writingMode: "vertical-rl" }}
                          >
                            {record.title}
                          </span>
                        </div>

                        {/* Spine bottom info (Release Year) */}
                        <div className="py-2 text-[9px] font-bold text-zinc-950/60 font-mono border-t border-black/10 w-full text-center z-10">
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
                            className="absolute bottom-full mb-20 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-lg bg-zinc-900/95 border border-zinc-800 text-left pointer-events-none z-30 shadow-2xl flex flex-col gap-1.5"
                          >
                            <div className="text-[11px] font-bold text-zinc-300 font-mono uppercase tracking-wider truncate">
                              {record.title}
                            </div>
                            <div className="text-[9px] text-zinc-500 font-mono mb-1">
                              {record.subtitle}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {record.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-[8px] font-semibold font-mono bg-zinc-800 text-amber-500/90 px-1.5 py-0.5 rounded border border-zinc-700/50 flex items-center gap-0.5"
                                >
                                  <Tag className="w-2 h-2" />
                                  {tag}
                                </span>
                              ))}
                              {record.tags.length > 3 && (
                                <span className="text-[8px] font-semibold font-mono bg-zinc-800 text-zinc-400 px-1 py-0.5 rounded">
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
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border-t border-zinc-600 rounded-b shadow-md z-20 flex items-center justify-between px-4">
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

