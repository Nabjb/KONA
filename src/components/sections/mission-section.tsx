"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { Target, Zap, TrendingUp, Shield } from "lucide-react";

const missionObjectives = [
  {
    icon: Target,
    stat: "3x",
    label: "ROI Increase",
    status: "ACHIEVED",
  },
  {
    icon: Shield,
    stat: "98%",
    label: "Client Retention",
    status: "ACHIEVED",
  },
  {
    icon: TrendingUp,
    stat: "50+",
    label: "Worlds Created",
    status: "ACHIEVED",
  },
  {
    icon: Zap,
    stat: "2 weeks",
    label: "Avg. Launch Time",
    status: "ACHIEVED",
  },
];

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.2,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${Math.random() * 2 + 2}s`,
  })), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-20 md:py-32"
    >
      {/* Starfield background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.key}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-6"
        style={{ opacity, y }}
      >
        {/* Mission Header */}
        <div className="text-center mb-16 md:mb-24">
          {/* Terminal-style header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/30" />
            </div>
            <span className="text-green-400 text-sm font-mono tracking-wider">
              MISSION_BRIEFING.exe
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Your Mission:
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Dominate the Digital Universe
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            We don&apos;t just build websites. We create digital worlds that turn 
            visitors into customers and brands into legends.
          </motion.p>
        </div>

        {/* Mission Objectives Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24"
        >
          {missionObjectives.map((objective, index) => (
            <motion.div
              key={objective.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-xs font-mono tracking-wider">
                    {objective.status}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                  <objective.icon className="w-6 h-6 text-blue-400" />
                </div>

                {/* Stat */}
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 mb-2">
                  {objective.stat}
                </div>

                {/* Label */}
                <p className="text-white/50 text-sm font-medium">
                  {objective.label}
                </p>

                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-left">
              <p className="text-white/40 text-sm mb-1 font-mono">NEXT_OBJECTIVE:</p>
              <p className="text-white text-lg md:text-xl font-semibold">
                Explore the services we offer
              </p>
            </div>
            <a
              href="#services"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium hover:scale-105 transition-transform"
            >
              <span>Begin Exploration</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom transition - space particles flowing down */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
    </section>
  );
}

