"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Zap, TrendingUp, Award } from "lucide-react";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  );
}

// Floating card component
function FloatingCard({ 
  children, 
  className,
  delay = 0,
  direction = "up"
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  direction?: "up" | "down";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "up" ? 40 : -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, direction === "up" ? -10 : 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Only use parallax on desktop
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered", icon: Award },
    { value: 98, suffix: "%", label: "Client Satisfaction", icon: TrendingUp },
    { value: 3, suffix: "x", label: "Average ROI Increase", icon: Zap },
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative w-full pt-32 md:pt-48 pb-24 md:pb-40 overflow-hidden -mt-px -mb-px"
    >
      {/* Top fade gradient for smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-10" />

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating gradient orbs - desktop only for performance */}
      {!isMobile && (
        <>
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left side - Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/60">About KONA</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              We Don't Just Build
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Websites.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/40 mb-8 leading-relaxed"
            >
              We build <span className="text-white/70">digital experiences</span> that turn visitors into customers and customers into{" "}
              <span className="text-blue-400 font-medium">raving fans</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 mb-10"
            >
              {[
                "Obsessed with performance & conversions",
                "Design that makes competitors jealous",
                "Code that's clean, fast & scalable",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-lg">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Creative visual */}
          <div className="relative h-[300px] md:h-[600px] flex items-center justify-center">
            {/* Central image - animated logo on mobile, full image on desktop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Mobile: Animated logo */}
              {isMobile ? (
                <div className="w-[250px] h-[250px]">
                  <img 
                    src="/kona websites screenshots/animatedlogo.gif" 
                    alt="KONA SOCIALS"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                /* Desktop: Full team image */
                <div className="w-[550px] h-[550px]">
                  <img 
                    src="/kona websites screenshots/aboutus_pic.png" 
                    alt="KONA SOCIALS Team"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>


            {/* Orbiting dots - desktop only for performance */}
            {!isMobile && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 md:mt-32 text-center max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-white/5 font-serif">"</div>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/70 font-light leading-relaxed italic">
              Your website is your{" "}
              <span className="text-white font-medium not-italic">24/7 salesperson</span>. 
              Make sure it's{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 font-medium not-italic">
                damn good
              </span>{" "}
              at its job.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
              K
            </div>
            <div className="text-left">
              <div className="text-white font-medium">KONA SOCIALS</div>
              <div className="text-white/40 text-sm">Digital Excellence</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

