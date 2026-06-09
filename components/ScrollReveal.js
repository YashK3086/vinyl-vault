"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
