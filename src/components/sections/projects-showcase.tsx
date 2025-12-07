"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { IMacMockup } from "@/components/ui/imac-mockup";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: "apt",
    title: "APT Metal Construction",
    category: "Construction",
    location: "Cyprus",
    description: "Premium metal construction company website with modern design and seamless user experience.",
    src: "/kona websites screenshots/apt_macbook.png",
    link: "https://www.aptmetalconstruction.com",
  },
  {
    id: "sivory",
    title: "Sivory Design",
    category: "Outdoor Design",
    location: "Premium",
    description: "Elegant pergolas and outdoor living solutions with a focus on luxury aesthetics.",
    src: "/kona websites screenshots/sivory_macbook.png",
    link: "https://sivory.vercel.app",
  },
  {
    id: "tdk",
    title: "TDK Design & Build",
    category: "Development",
    location: "Nicosia",
    description: "Residential development company showcasing premium properties and construction excellence.",
    src: "/kona websites screenshots/tdk_macbook.png",
    link: "https://tdkdb.com",
  },
];

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Change project based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const projectIndex = Math.min(
        Math.floor(value * projects.length),
        projects.length - 1
      );
      if (projectIndex !== activeProject && projectIndex >= 0) {
        setActiveProject(projectIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeProject]);

  const currentProject = projects[activeProject];

  return (
    <section 
      ref={sectionRef}
      id="projects-showcase" 
      className="hidden md:block relative bg-[#030014]"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left side - Project Info */}
              <div className="space-y-8">
                {/* Section label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                  <span className="text-blue-400 text-sm tracking-[0.3em] font-medium uppercase">
                    Featured Work
                  </span>
                </motion.div>

                {/* Project title with animation */}
                <div className="relative h-[180px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentProject.id}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -60 }}
                      transition={{ duration: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
                      className="text-4xl lg:text-6xl font-bold text-white leading-tight"
                    >
                      {currentProject.title}
                    </motion.h2>
                  </AnimatePresence>
                </div>

                {/* Category & Location */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`meta-${currentProject.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
                      {currentProject.category}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/50 text-sm">{currentProject.location}</span>
                  </motion.div>
                </AnimatePresence>

                {/* Description */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`desc-${currentProject.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-white/50 text-lg leading-relaxed max-w-md"
                  >
                    {currentProject.description}
                  </motion.p>
                </AnimatePresence>

                {/* CTA */}
                <motion.a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg font-medium">View Live Project</span>
                  <ExternalLink className="w-5 h-5 text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>

                {/* Progress indicator */}
                <div className="flex items-center gap-6 pt-8">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      {String(activeProject + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/30">/</span>
                    <span className="text-white/30">
                      {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden max-w-[200px]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((activeProject + 1) / projects.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Project dots */}
                <div className="flex gap-3">
                  {projects.map((project, idx) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveProject(idx)}
                      className={`group relative w-12 h-12 rounded-full border transition-all duration-300 ${
                        idx === activeProject
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className={`absolute inset-0 flex items-center justify-center text-sm font-medium transition-colors ${
                        idx === activeProject ? "text-blue-400" : "text-white/40 group-hover:text-white/60"
                      }`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right side - Mac Mockup */}
              <div ref={containerRef} className="relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -30 }}
                    transition={{ duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
                    className="relative"
                  >
                    {/* Glow effect behind iMac */}
                    <div className="absolute -inset-20 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-purple-500/20 blur-3xl opacity-50" />
                    
                    {/* iMac mockup */}
                    <IMacMockup
                      src={currentProject.src}
                      className="relative z-10 w-[600px] lg:w-[700px] drop-shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
