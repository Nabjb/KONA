"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

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

interface ProjectSlideProps {
  project: typeof projects[0];
  index: number;
  totalProjects: number;
}

function ProjectSlide({ project, index, totalProjects }: ProjectSlideProps) {
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

      {/* Content Layer */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
            
            {/* Left Side - Project Info */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              {/* Year Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block mb-4"
              >
                <span 
                  className="text-xs font-mono tracking-[0.3em] px-3 py-1.5 rounded-full"
                  style={{ 
                    background: `${colors[700]}80`,
                    color: colors[300],
                    border: `1px solid ${colors[600]}60`
                  }}
                >
                  {project.year}
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-none mb-1"
                  style={{ color: colors[50] }}
                >
                  {project.title}
                </h2>
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-none"
                  style={{ color: colors[200] }}
                >
                  {project.subtitle}
                </h2>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-16 h-px my-6 origin-left"
                style={{ background: colors[400] }}
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-lg font-light leading-relaxed mb-6"
                style={{ color: colors[200] }}
              >
                {project.description}
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {project.tags.map((tag) => (
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
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href={project.href}
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
            </div>

            {/* Right Side - Floating Mockup Preview */}
            <div className="hidden md:block col-span-7 lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
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
                      {project.href.replace('https://', '')}
                    </div>
                  </div>
                  
                  {/* Website preview */}
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
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
            </div>

          </div>
        </div>
      </div>

      {/* Project Counter */}
      <div 
        className="absolute bottom-8 right-8 flex items-center gap-3"
        style={{ color: colors[400] }}
      >
        <span className="text-2xl font-extralight">{String(index + 1).padStart(2, '0')}</span>
        <div className="w-8 h-px" style={{ background: colors[500] }} />
        <span className="text-sm font-mono">{String(totalProjects).padStart(2, '0')}</span>
      </div>

      {/* Scroll indicator (first slide only) */}
      {index === 0 && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
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
  );
}

export function ProjectsSection() {
  return (
    <section 
      className="relative"
      aria-labelledby="projects-heading"
    >
      {/* Section Header - Sticky */}
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

      {/* Project Slides */}
      {projects.map((project, index) => (
        <ProjectSlide
          key={project.id}
          project={project}
          index={index}
          totalProjects={projects.length}
        />
      ))}

      {/* End spacer for smooth transition */}
      <div className="h-[50vh]" style={{ background: colors[900] }} />
    </section>
  );
}

export default ProjectsSection;
