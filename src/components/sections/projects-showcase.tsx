"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { MonitorMockup } from "@/components/ui/monitor-mockup";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "apt",
    title: "APT Metal Construction",
    category: "Construction",
    location: "Cyprus",
    description: "Premium metal construction company website with modern design and seamless user experience.",
    src: "/kona websites screenshots/apt_macbook.png",
    link: "https://www.aptmetalconstruction.com",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "sivory",
    title: "Sivory Design",
    category: "Outdoor Design",
    location: "Premium",
    description: "Elegant pergolas and outdoor living solutions with a focus on luxury aesthetics.",
    src: "/kona websites screenshots/sivory_macbook.png",
    link: "https://sivory.vercel.app",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "tdk",
    title: "TDK Design & Build",
    category: "Development",
    location: "Nicosia",
    description: "Residential development company showcasing premium properties and construction excellence.",
    src: "/kona websites screenshots/tdk_macbook.png",
    link: "https://tdkdb.com",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "lossantos",
    title: "Los Santos Barbers",
    category: "Barbershop",
    location: "Los Santos",
    description: "Classic barbershop website with a bold, stylish design that captures the essence of grooming culture.",
    src: "/kona websites screenshots/lossantosbarbers.png",
    link: "https://lossantosbarbers.com",
    color: "from-red-500 to-rose-500",
  },
];

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState(0);
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
    <>
    {/* ===== MOBILE PROJECTS ===== */}
    <section className="md:hidden relative pt-20 pb-32 px-5 -mt-px -mb-px">
      {/* Section header */}
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-blue-500" />
          <span className="text-blue-400 text-xs tracking-[0.25em] font-medium uppercase">
            Featured Work
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-white"
        >
          Our Projects
        </motion.h2>
      </div>

      {/* Project counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-white">
            {String(activeProject + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30 text-sm">/ {String(projects.length).padStart(2, "0")}</span>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveProject(prev => prev === 0 ? projects.length - 1 : prev - 1)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveProject(prev => prev === projects.length - 1 ? 0 : prev + 1)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Project card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: [0.23, 0.86, 0.39, 0.96] as const }}
          className="relative"
        >
          {/* Glow effect */}
          <div className={`absolute -inset-4 bg-gradient-to-r ${currentProject.color} opacity-15 blur-2xl rounded-3xl`} />
          
          {/* Card */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            {/* Screenshot */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={currentProject.src}
                alt={currentProject.title}
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentProject.color} text-white text-xs font-medium`}>
                  {currentProject.category}
                </span>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-2">
                {currentProject.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {currentProject.description}
              </p>
              
              {/* CTA */}
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium"
              >
                View Live Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeProject
                ? `w-6 bg-gradient-to-r ${project.color}`
                : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
    </section>

    {/* ===== DESKTOP PROJECTS ===== */}
    <section 
      ref={sectionRef}
      id="projects-showcase" 
      className="hidden md:block relative -mt-px -mb-px"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left side - Project Info */}
              <div className="space-y-6">
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
                <div className="relative min-h-[140px]">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentProject.id}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -60 }}
                      transition={{ duration: 0.5, ease: [0.23, 0.86, 0.39, 0.96] as const }}
                      className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
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
                    <span className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${currentProject.color} text-white text-sm font-medium`}>
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

                {/* CTA Button */}
                <motion.a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">View Live Project</span>
                  <ArrowUpRight className="w-5 h-5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>

                {/* Progress & Navigation */}
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  {/* Progress counter */}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-white">
                      {String(activeProject + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col">
                      <div className="w-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${currentProject.color}`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${((activeProject + 1) / projects.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-white/30 text-xs mt-1">
                        of {String(projects.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Project dots */}
                  <div className="flex gap-2">
                    {projects.map((project, idx) => (
                      <button
                        key={project.id}
                        onClick={() => setActiveProject(idx)}
                        className={`relative w-10 h-10 rounded-full border transition-all duration-300 ${
                          idx === activeProject
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <span className={`absolute inset-0 flex items-center justify-center text-sm font-medium transition-colors ${
                          idx === activeProject ? "text-blue-400" : "text-white/40"
                        }`}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Browser Mockup */}
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -30 }}
                    transition={{ duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] as const }}
                    className="w-full"
                  >
                    {/* Glow effect */}
                    <div className={`absolute -inset-10 bg-gradient-to-r ${currentProject.color} opacity-20 blur-3xl`} />
                    
                    {/* Monitor mockup with scrolling website */}
                    <MonitorMockup
                      src={currentProject.src}
                      url={currentProject.link.replace('https://', '')}
                      isActive={true}
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

      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent pointer-events-none z-20" />
    </section>
    </>
  );
}
