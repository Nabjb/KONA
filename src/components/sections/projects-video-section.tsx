"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Radio, Signal, Wifi, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const projects = [
  {
    id: "apt",
    title: "APT Metal Construction",
    category: "Construction",
    link: "https://www.aptmetalconstruction.com",
    description: "Modern construction company website with project galleries and client testimonials.",
    technologies: ["React", "Next.js", "TypeScript"],
    achievement: "3x increase in lead generation",
    image: "/Konaverse websites screenshots/apt_macbook.png",
    coordinates: "47.6062° N, 122.3321° W",
    signal: "98%",
  },
  {
    id: "sivory",
    title: "Sivory Design",
    category: "Outdoor Design",
    link: "https://sivory.vercel.app",
    description: "Elegant outdoor design portfolio showcasing luxury landscape projects.",
    technologies: ["React", "Next.js", "Tailwind"],
    achievement: "98% client satisfaction rate",
    image: "/Konaverse websites screenshots/sivory_macbook.png",
    coordinates: "34.0522° N, 118.2437° W",
    signal: "95%",
  },
  {
    id: "tdk",
    title: "TDK Design & Build",
    category: "Development",
    link: "https://tdkdb.com",
    description: "Full-stack development solution for design and construction services.",
    technologies: ["React", "Next.js", "TypeScript"],
    achievement: "50% faster page load time",
    image: "/Konaverse websites screenshots/tdk_macbook.png",
    coordinates: "40.7128° N, 74.0060° W",
    signal: "99%",
  },
  {
    id: "lossantos",
    title: "Los Santos Barbers",
    category: "Barbershop",
    link: "https://lossantosbarbers.com",
    description: "Stylish barbershop booking system with online scheduling and gallery.",
    technologies: ["React", "Next.js", "Tailwind"],
    achievement: "2x online bookings increase",
    image: "/Konaverse websites screenshots/lossantosbarbers.png",
    coordinates: "33.9425° N, 118.4081° W",
    signal: "97%",
  },
];

// Transmission Card Component
function TransmissionCard({ 
  project, 
  isActive, 
  onClick 
}: { 
  project: typeof projects[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'col-span-2 row-span-2' 
          : 'col-span-1 row-span-1'
      }`}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
    >
      <div className={`relative h-full rounded-xl overflow-hidden border transition-all duration-300 ${
        isActive 
          ? 'border-green-500/50 bg-black/60' 
          : 'border-white/10 bg-black/40 hover:border-green-500/30'
      }`}>
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[200%] animate-scan" />
        </div>

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-xs font-mono">LIVE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-mono">{project.signal}</span>
          </div>
        </div>

        {/* Project image */}
        <div className="relative w-full h-full min-h-[200px]">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isActive ? 'opacity-100' : 'opacity-70 hover:opacity-90'
            }`}
            style={{ filter: isActive ? 'none' : 'saturate(0.8)' }}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/800x600/0a1a0a/00ff00?text=TRANSMISSION';
            }}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
            isActive ? 'opacity-90' : 'opacity-70'
          }`} />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Category tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-green-500/20 text-green-400 border border-green-500/30">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-white mb-1 transition-all duration-300 ${
            isActive ? 'text-xl md:text-2xl' : 'text-sm md:text-base'
          }`}>
            {project.title}
          </h3>

          {/* Extended info for active card */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-white/60 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-white/50 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievement */}
                <div className="flex items-center gap-2 mb-4 text-green-400 text-sm">
                  <Radio className="w-4 h-4" />
                  <span className="font-mono">{project.achievement}</span>
                </div>

                {/* CTA */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Access Transmission</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coordinates */}
          <div className={`flex items-center gap-1.5 text-white/30 font-mono transition-all ${
            isActive ? 'text-xs mt-3' : 'text-[10px] mt-1'
          }`}>
            <Wifi className="w-3 h-3" />
            <span>{project.coordinates}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// HUD Corner decoration
function HUDCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const positionClasses = {
    tl: 'top-0 left-0 border-t border-l',
    tr: 'top-0 right-0 border-t border-r',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  };

  return (
    <div className={`absolute w-8 h-8 border-green-500/30 ${positionClasses[position]}`} />
  );
}

export default function ProjectsVideoSection() {
  const [activeProject, setActiveProject] = useState<string>("apt");
  const [currentTime, setCurrentTime] = useState("");

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().split('T')[1].split('.')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  const currentIndex = projects.findIndex(p => p.id === activeProject);
  
  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex].id);
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex].id);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <section id="work" className="relative min-h-screen bg-black overflow-hidden py-16 md:py-24">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-sm font-mono tracking-wider">SPACE_STATION</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Incoming{" "}
                <span className="text-green-400">Transmissions</span>
          </h2>
              <p className="text-white/50 text-lg">
                Signals from the digital worlds we&apos;ve built
              </p>
            </div>

            {/* Status panel */}
            <div className="flex items-center gap-6 text-sm font-mono">
              <div className="flex items-center gap-2 text-white/40">
                <Monitor className="w-4 h-4" />
                <span>ACTIVE: {projects.length}</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>UTC {currentTime}</span>
              </div>
            </div>
        </motion.div>
        </div>

        {/* Main display area */}
        <div className="relative">
          {/* HUD corners */}
          <HUDCorner position="tl" />
          <HUDCorner position="tr" />
          <HUDCorner position="bl" />
          <HUDCorner position="br" />

          {/* Projects grid */}
        <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
          {projects.map((project) => (
              <TransmissionCard
              key={project.id}
                project={project}
                isActive={activeProject === project.id}
                onClick={() => setActiveProject(
                  activeProject === project.id ? project.id : project.id
                )}
              />
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-green-500/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
              
            <div className="flex items-center gap-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeProject === project.id 
                      ? 'bg-green-500 w-6' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
                </div>
                
            <button
              onClick={goNext}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-green-500/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
                </div>
              </div>
              
        {/* Bottom status bar */}
        <motion.div 
          className="mt-12 p-4 rounded-xl bg-black/40 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/30">
            <div className="flex items-center gap-6">
              <span>STATION: Konaverse-01</span>
              <span>SECTOR: DIGITAL</span>
              <span>STATUS: OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">■</span>
              <span>ALL SYSTEMS NOMINAL</span>
            </div>
              </div>
        </motion.div>
      </div>

      {/* Scan line animation CSS */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

