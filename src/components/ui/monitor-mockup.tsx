"use client";

import React from "react";

interface MonitorMockupProps {
  src: string;
  url: string;
  isActive?: boolean;
}

export function MonitorMockup({ src, url, isActive = true }: MonitorMockupProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Monitor Frame */}
      <div className="relative">
        {/* Monitor Body */}
        <div className="relative bg-[#1a1a1a] rounded-2xl p-3 shadow-2xl shadow-black/50 border border-white/5">
          {/* Inner bezel */}
          <div className="relative bg-[#0a0a0a] rounded-lg overflow-hidden">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e1e] border-b border-white/5">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-sm shadow-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-sm shadow-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-sm shadow-green-500/30" />
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 flex items-center justify-center ml-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0a0a0a] border border-white/10 max-w-sm w-full">
                  <svg className="w-3 h-3 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/40 text-xs truncate">{url}</span>
                </div>
              </div>

              {/* Menu */}
              <div className="flex items-center gap-1 opacity-50">
                <div className="w-1 h-1 rounded-full bg-white/50" />
                <div className="w-1 h-1 rounded-full bg-white/50" />
                <div className="w-1 h-1 rounded-full bg-white/50" />
              </div>
            </div>

            {/* Screen Content - Website Preview */}
            <div className="relative aspect-video overflow-hidden bg-[#0d0d0d]">
              <img
                src={src}
                alt="Website preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Webcam/sensor dot */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2a2a2a] border border-white/5">
            <div className="absolute inset-0.5 rounded-full bg-[#1a1a1a]" />
          </div>
        </div>

        {/* Monitor Stand - Neck */}
        <div className="relative mx-auto w-20 h-10">
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg" 
               style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
        </div>

        {/* Monitor Stand - Base */}
        <div className="relative mx-auto">
          <div className="w-40 h-3 mx-auto bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-full shadow-lg" />
          <div className="absolute inset-x-0 -bottom-1 h-1 bg-black/50 blur-sm rounded-full mx-8" />
        </div>
      </div>

      {/* Ambient glow under monitor */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-blue-500/10 blur-2xl rounded-full" />
    </div>
  );
}


