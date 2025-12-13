"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface BrowserMockupProps {
  src: string;
  url: string;
  isActive?: boolean;
}

export function BrowserMockup({ src, url, isActive = true }: BrowserMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser Frame */}
      <div className="relative rounded-xl overflow-hidden bg-[#1a1a2e] border border-white/10 shadow-2xl shadow-black/50">
        {/* Browser Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#0d0d1a] border-b border-white/5">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 max-w-md w-full">
              {/* Lock icon */}
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white/50 text-sm truncate">{url}</span>
            </div>
          </div>

          {/* Menu dots */}
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
          </div>
        </div>

        {/* Browser Content - Scrolling Website */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-white">
          {/* Website Screenshot with scroll animation */}
          <motion.img
            src={src}
            alt="Website preview"
            className="w-full object-cover object-top"
            style={{ 
              minHeight: "200%",
              objectPosition: "top"
            }}
            animate={
              isActive && !isHovered
                ? {
                    y: ["0%", "-30%", "0%"],
                  }
                : { y: "0%" }
            }
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          {/* Pause indicator on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Paused
              </div>
            </motion.div>
          )}

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a2e] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Reflection/Shadow effect */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-blue-500/10 blur-2xl rounded-full" />
    </motion.div>
  );
}


