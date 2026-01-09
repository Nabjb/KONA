"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

// Project data
const projects = [
  {
    id: 1,
    year: "2024",
    title: "APT Cleaning",
    subtitle: "Services",
    description: "A modern, professional website for a premium cleaning service company with seamless booking integration.",
    tags: ["Next.js", "Tailwind", "UI/UX"],
    href: "https://aptcleaningservices.com",
    image: "/kona websites screenshots/apt_macbook.png",
  },
  {
    id: 2,
    year: "2024",
    title: "TDK",
    subtitle: "Performance",
    description: "High-performance automotive website showcasing premium car detailing services with bold visuals.",
    tags: ["React", "Animation", "Design"],
    href: "https://tdkperformance.com",
    image: "/kona websites screenshots/tdk_macbook.png",
  },
  {
    id: 3,
    year: "2024",
    title: "Los Santos",
    subtitle: "Barbers",
    description: "A stylish barbershop website with online booking and a strong brand identity.",
    tags: ["Next.js", "Booking", "Branding"],
    href: "https://lossantosbarbers.com",
    image: "/kona websites screenshots/lossantosbarbers.png",
  },
];

// Background slide component - just the full-bleed background image
function BackgroundSlide({ project, index }: { project: typeof projects[0]; index: number }) {
  const slideRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  return (
    <div
      ref={slideRef}
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* Background Image - Full Bleed */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={project.image}
          alt={`${project.title} ${project.subtitle}`}
          fill
          className="object-cover object-top"
          priority={index === 0}
        />
        {/* Dark overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${colors[900]}ee 0%, ${colors[900]}cc 40%, ${colors[900]}99 70%, ${colors[900]}66 100%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasExited, setHasExited] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Track which project is active based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Total scroll height: intro (1vh) + projects (3vh) + exit (0.5vh) = 4.5vh sections worth
      // But we're mapping 0-1 across all that
      
      // Intro section takes first ~18% (1 / (1 + 3 + 0.5))
      const introEnd = 1 / (1 + projects.length + 0.5);
      
      // Projects take next ~67% 
      const projectsEnd = (1 + projects.length) / (1 + projects.length + 0.5);
      
      if (value < introEnd) {
        // Still in intro
        setIsInView(false);
        setHasExited(false);
        setActiveIndex(0);
      } else if (value < projectsEnd) {
        // In projects section
        setIsInView(true);
        setHasExited(false);
        
        // Map progress to project index
        const projectProgress = (value - introEnd) / (projectsEnd - introEnd);
        const newIndex = Math.min(
          Math.floor(projectProgress * projects.length),
          projects.length - 1
        );
        setActiveIndex(newIndex);
      } else {
        // Past projects - exit
        setHasExited(true);
        setActiveIndex(projects.length - 1);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentProject = projects[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative"
      aria-labelledby="projects-heading"
    >
      {/* Section Header - Sticky Intro */}
      <div 
        className="sticky top-0 z-0 h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${colors[900]} 0%, #0a0b09 100%)`,
        }}
      >
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="text-xs font-mono uppercase tracking-[0.3em] mb-4"
              style={{ color: colors[400] }}
            >
              Our Work
            </div>
            <h2 
              id="projects-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight"
              style={{ color: colors[50] }}
            >
              Selected
            </h2>
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight"
              style={{ color: colors[200] }}
            >
              Projects
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Background Slides - Stack on scroll */}
      {projects.map((project, index) => (
        <BackgroundSlide
          key={project.id}
          project={project}
          index={index}
        />
      ))}

      {/* FIXED Floating Content - Stays in place, content swaps */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen pointer-events-none transition-opacity duration-500 ${
          isInView && !hasExited ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          zIndex: projects.length + 10,
        }}
      >
        <div className="h-full flex items-center pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
              
              {/* Left Side - Project Info (swaps content) */}
              <div className="col-span-12 md:col-span-5 lg:col-span-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Year Badge */}
                    <div className="inline-block mb-4">
                      <span 
                        className="text-xs font-mono tracking-[0.3em] px-3 py-1.5 rounded-full"
                        style={{ 
                          background: `${colors[700]}80`,
                          color: colors[300],
                          border: `1px solid ${colors[600]}60`
                        }}
                      >
                        {currentProject.year}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-none mb-1"
                        style={{ color: colors[50] }}
                      >
                        {currentProject.title}
                      </h2>
                      <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-none"
                        style={{ color: colors[200] }}
                      >
                        {currentProject.subtitle}
                      </h2>
                    </div>

                    {/* Divider */}
                    <div 
                      className="w-16 h-px my-6"
                      style={{ background: colors[400] }}
                    />

                    {/* Description */}
                    <p
                      className="text-base md:text-lg font-light leading-relaxed mb-6"
                      style={{ color: colors[200] }}
                    >
                      {currentProject.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {currentProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono rounded-full"
                          style={{
                            background: `${colors[800]}90`,
                            color: colors[300],
                            border: `1px solid ${colors[600]}40`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={currentProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:gap-4"
                      style={{
                        background: `${colors[700]}60`,
                        border: `1px solid ${colors[500]}50`,
                        color: colors[100],
                      }}
                    >
                      <span className="text-sm font-light tracking-wide">View Project</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Floating Mockup Preview (swaps content) */}
              <div className="hidden md:block col-span-7 lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="relative ml-auto"
                    style={{ maxWidth: "90%", perspective: "1000px" }}
                  >
                    {/* Floating mockup frame */}
                    <div 
                      className="relative rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        background: colors[800],
                        border: `1px solid ${colors[600]}30`,
                        boxShadow: `0 50px 100px -20px ${colors[900]}80, 0 30px 60px -30px ${colors[500]}20`,
                      }}
                    >
                      {/* Browser chrome */}
                      <div 
                        className="flex items-center gap-2 px-4 py-3"
                        style={{ background: colors[700], borderBottom: `1px solid ${colors[600]}30` }}
                      >
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>
                        <div 
                          className="flex-1 mx-4 px-3 py-1 rounded text-xs font-mono truncate"
                          style={{ background: colors[800], color: colors[400] }}
                        >
                          {currentProject.href.replace('https://', '')}
                        </div>
                      </div>
                      
                      {/* Website preview */}
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={currentProject.image}
                          alt={`${currentProject.title} preview`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div 
                      className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-3xl"
                      style={{ background: colors[500], opacity: 0.1 }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* Project Counter - Also fixed */}
        <div 
          className="absolute bottom-8 right-8 flex items-center gap-3"
          style={{ color: colors[400] }}
        >
          <AnimatePresence mode="wait">
            <motion.span 
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-extralight"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <div className="w-8 h-px" style={{ background: colors[500] }} />
          <span className="text-sm font-mono">{String(projects.length).padStart(2, '0')}</span>
        </div>

        {/* Scroll indicator (first project only) */}
        {activeIndex === 0 && (
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span 
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: colors[400] }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8"
              style={{ background: `linear-gradient(to bottom, ${colors[400]}, transparent)` }}
            />
          </motion.div>
        )}
      </div>

      {/* End spacer for smooth transition */}
      <div className="h-[50vh]" style={{ background: colors[900] }} />
    </section>
  );
}

export default ProjectsSection;
