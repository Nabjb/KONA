"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "apt",
    title: "APT Metal Construction",
    category: "Construction",
    link: "https://www.aptmetalconstruction.com",
  },
  {
    id: "sivory",
    title: "Sivory Design",
    category: "Outdoor Design",
    link: "https://sivory.vercel.app",
  },
  {
    id: "tdk",
    title: "TDK Design & Build",
    category: "Development",
    link: "https://tdkdb.com",
  },
  {
    id: "lossantos",
    title: "Los Santos Barbers",
    category: "Barbershop",
    link: "https://lossantosbarbers.com",
  },
];

// Brand colors - consistent blue/purple gradient
const brandGradient = "from-blue-500 via-purple-500 to-pink-500";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.58, 1] as const,
    },
  },
};

export default function ProjectsVideoSection() {
  return (
    <section id="work" className="relative -mt-px -mb-px">
      {/* Top fade for blending with previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-10" />

      {/* Full-width Video */}
      <div className="relative w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        >
          <source src="/KONA_WEBSITES_VIDEO.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle overlay for better blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Project Links Section */}
      <div className="relative bg-[#030014] py-20 md:py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium tracking-wider uppercase mb-6">
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Recent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Projects
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Explore our latest work and see how we help businesses thrive online
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 md:p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${brandGradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`} />
              
              <div className="relative flex items-center justify-between">
                <div>
                  {/* Category */}
                  <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${brandGradient} text-white text-xs font-medium mb-3`}>
                    {project.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                {/* Arrow */}
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
              
              {/* Link hint */}
              <div className="mt-4 flex items-center gap-2 text-white/30 text-sm group-hover:text-white/50 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>{project.link.replace('https://', '')}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Bottom fade to blend with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

