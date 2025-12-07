"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  src: string;
  link?: string;
}

export const IPhoneMockup = ({
  projects,
  title,
}: {
  projects: Project[];
  title?: string | React.ReactNode;
}) => {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Transform values based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Title animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.3, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 50) {
      prevProject();
    } else if (info.offset.x < -50) {
      nextProject();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex min-h-[120vh] flex-col items-center justify-center px-4 py-20"
      style={{ perspective: 1000 }}
    >
      {/* Title */}
      <motion.h2
        style={{
          opacity: titleOpacity,
          y: titleY,
        }}
        className="mb-12 text-center text-3xl font-bold text-white"
      >
        {title || (
          <span>
            Our Work Speaks{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              For Itself
            </span>
          </span>
        )}
      </motion.h2>

      {/* iPhone Device with Scroll Animation */}
      <motion.div
        style={{
          opacity,
          y,
          rotateX,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* iPhone Frame */}
        <div 
          className="relative mx-auto w-[280px] h-[580px] rounded-[50px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-[12px] shadow-[0_0_60px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.1)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Side buttons - Volume */}
          <div className="absolute -left-[3px] top-[120px] w-[3px] h-[30px] bg-[#1a1a1a] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[160px] w-[3px] h-[50px] bg-[#1a1a1a] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[220px] w-[3px] h-[50px] bg-[#1a1a1a] rounded-l-sm" />
          {/* Side button - Power */}
          <div className="absolute -right-[3px] top-[180px] w-[3px] h-[80px] bg-[#1a1a1a] rounded-r-sm" />

          {/* Inner bezel */}
          <div className="relative w-full h-full rounded-[40px] bg-black overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[28px] bg-black rounded-full flex items-center justify-center">
              {/* Camera */}
              <div className="absolute right-4 w-[10px] h-[10px] rounded-full bg-[#1a1a2e] border border-[#2a2a3e]">
                <div className="absolute inset-[2px] rounded-full bg-[#0f0f1a]" />
              </div>
            </div>

            {/* Screen Content */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject}
                  src={projects[activeProject]?.src}
                  alt={projects[activeProject]?.title || "Project screenshot"}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Swipe hint overlay */}
              <div className="absolute inset-x-0 bottom-16 flex justify-center pointer-events-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="text-white/40 text-xs flex items-center gap-2"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Swipe to explore</span>
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
              </div>
            </motion.div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Reflection/Glow effect */}
        <motion.div 
          style={{ opacity }}
          className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 via-transparent to-indigo-500/10 rounded-[60px] blur-xl -z-10" 
        />
      </motion.div>

      {/* Navigation Controls */}
      <motion.div
        style={{
          opacity,
          y: useTransform(scrollYProgress, [0, 1], [80, 0]),
        }}
        className="mt-10 flex flex-col items-center gap-5"
      >
        {/* Arrow Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevProject}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
          </button>

          {/* Project Info */}
          <div className="text-center min-w-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {projects[activeProject]?.title}
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  {projects[activeProject]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextProject}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProject(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeProject
                  ? "bg-blue-500 w-6"
                  : "bg-white/20 w-2 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        {/* View Project Link */}
        {projects[activeProject]?.link && (
          <motion.a
            href={projects[activeProject].link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
          >
            View Live Project →
          </motion.a>
        )}
      </motion.div>
    </div>
  );
};
