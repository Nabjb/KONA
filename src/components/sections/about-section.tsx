"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Animated counter that counts up
function CountUp({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Glitch text effect
function GlitchText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 -ml-[2px] text-cyan-400 opacity-70 animate-pulse"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
    >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 ml-[2px] text-pink-400 opacity-70 animate-pulse"
        style={{ clipPath: 'inset(50% 0 0 0)', animationDelay: '0.1s' }}
      >
        {children}
      </span>
    </span>
  );
}

// Typing effect
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return <span ref={ref}>{displayed}<span className="animate-pulse">_</span></span>;
}

// Radar ping effect
function RadarPing() {
  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 rounded-full border border-cyan-500/30" />
      <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-8 rounded-full border border-cyan-500/10" />
    <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent origin-left" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
    </div>
  );
}

// Audio wave visualizer - uses stable random values from useMemo
function AudioWave() {
  const bars = React.useMemo(() => [...Array(12)].map((_, i) => ({
    key: i,
    peak: 20 + Math.random() * 12,
    duration: 0.5 + Math.random() * 0.5,
    delay: i * 0.05,
  })), []);
  return (
    <div className="flex items-end gap-1 h-8">
      {bars.map(({ key, peak, duration, delay }) => (
        <motion.div
          key={key}
          className="w-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full"
          animate={{ height: [8, peak, 8] }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
          }}
        />
      ))}
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').slice(0, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    { value: 50, suffix: "+", label: "MISSIONS COMPLETED", status: "VERIFIED" },
    { value: 98, suffix: "%", label: "SUCCESS RATE", status: "OPTIMAL" },
    { value: 3, suffix: "x", label: "ROI MULTIPLIER", status: "ACTIVE" },
  ];

  const capabilities = [
    { code: "CAP-001", name: "Performance Optimization", status: "ONLINE" },
    { code: "CAP-002", name: "Competitor Analysis", status: "SCANNING" },
    { code: "CAP-003", name: "Clean Architecture", status: "DEPLOYED" },
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative w-full py-32 md:py-48 overflow-hidden"
    >
      {/* Scan lines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
          }}
        />
        </motion.div>
      </div>

      {/* Floating orbs */}
          <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"
          />
          <motion.div 
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-40 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]"
          />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          
        {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
              />
              <span className="text-green-400 text-sm font-mono">TRANSMISSION ACTIVE</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <span className="text-cyan-400/60 text-xs font-mono">{currentTime} UTC</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-cyan-400 font-mono text-sm">{'>'}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <GlitchText className="text-white">Konaverse</GlitchText>
              <span className="text-cyan-400">_</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                SYSTEMS
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-sm overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50 rounded-br-2xl" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-white/40 text-sm font-mono">mission_brief.exe</span>
                </div>

                <div className="font-mono text-sm mb-6 text-cyan-400/60">
                  <TypeWriter text="// INITIALIZING MISSION PARAMETERS..." delay={200} />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  We Don&apos;t Just Build<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                    Digital Experiences.
                  </span>
                </h3>

                <p className="text-lg text-white/50 mb-8 leading-relaxed">
                  We architect <span className="text-cyan-400">mission-critical systems</span> that transform visitors into customers and customers into{" "}
                  <span className="text-purple-400 font-semibold">loyal advocates</span>.
                </p>

                {/* Capabilities List */}
                <div className="space-y-3">
                  {capabilities.map((cap, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-colors"
                    >
                      <span className="text-cyan-400/60 font-mono text-xs">[{cap.code}]</span>
                      <span className="text-white/70 flex-1">{cap.name}</span>
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        cap.status === 'ONLINE' ? 'bg-green-500/20 text-green-400' :
                        cap.status === 'SCANNING' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {cap.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Radar */}
          <div className="space-y-6">
            {/* Radar Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-cyan-400 font-mono text-sm">SIGNAL_TRACKER</span>
                <AudioWave />
              </div>
              <div className="flex justify-center">
                <RadarPing />
              </div>
              <div className="mt-4 text-center">
                <span className="text-green-400 font-mono text-sm">▲ TRACKING ACTIVE</span>
              </div>
            </motion.div>

            {/* Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-purple-400"
                />
                <span className="text-purple-400 font-mono text-sm">SYSTEM_METRICS</span>
              </div>
              
              <div className="space-y-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/40 text-xs font-mono">{stat.label}</span>
                      <span className="text-green-400 text-xs">{stat.status}</span>
                  </div>
                    <div className="text-3xl font-bold text-white">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                    <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
              viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                      />
                    </div>
                  </div>
                ))}
                </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Quote Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="text-cyan-400 font-mono text-2xl">{'//'}</div>
            <div>
              <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-4">
                &quot;Your website is your{" "}
                <span className="text-cyan-400 font-medium">24/7 revenue engine</span>. 
                We make sure it&apos;s{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-bold">
                  unstoppable
                </span>.&quot;
            </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
                <div>
                  <div className="text-white font-mono text-sm">Konaverse_COMMAND</div>
                  <div className="text-white/40 text-xs font-mono">AUTHORITY: LEVEL_MAX</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

