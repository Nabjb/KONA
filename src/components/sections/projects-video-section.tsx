"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { MasonryGrid } from "@/components/ui/image-testimonial-grid";

const projects = [
  {
    id: "apt",
    title: "APT Metal Construction",
    category: "Construction",
    link: "https://www.aptmetalconstruction.com",
    description: "Modern construction company website with project galleries and client testimonials.",
    technologies: ["React", "Next.js", "TypeScript"],
    achievement: "3x increase in lead generation",
    image: "/kona websites screenshots/apt_macbook.png",
  },
  {
    id: "sivory",
    title: "Sivory Design",
    category: "Outdoor Design",
    link: "https://sivory.vercel.app",
    description: "Elegant outdoor design portfolio showcasing luxury landscape projects.",
    technologies: ["React", "Next.js", "Tailwind"],
    achievement: "98% client satisfaction rate",
    image: "/kona websites screenshots/sivory_macbook.png",
  },
  {
    id: "tdk",
    title: "TDK Design & Build",
    category: "Development",
    link: "https://tdkdb.com",
    description: "Full-stack development solution for design and construction services.",
    technologies: ["React", "Next.js", "TypeScript"],
    achievement: "50% faster page load time",
    image: "/kona websites screenshots/tdk_macbook.png",
  },
  {
    id: "lossantos",
    title: "Los Santos Barbers",
    category: "Barbershop",
    link: "https://lossantosbarbers.com",
    description: "Stylish barbershop booking system with online scheduling and gallery.",
    technologies: ["React", "Next.js", "Tailwind"],
    achievement: "2x online bookings increase",
    image: "/kona websites screenshots/lossantosbarbers.png",
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

// Project Card Component for Masonry Grid
const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] block"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-auto object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/ffffff?text=Website';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-medium mb-3">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {project.title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed drop-shadow-md mb-4">
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <ExternalLink className="w-4 h-4" />
          <span>{project.link.replace('https://', '')}</span>
        </div>
      </div>
    </a>
  );
};

export default function ProjectsVideoSection() {
  const [columns, setColumns] = useState(3);

  // Function to determine columns based on screen width
  const getColumns = (width: number) => {
    if (width < 640) return 1;    // sm
    if (width < 1024) return 2;    // lg
    if (width < 1280) return 3;   // xl
    return 4;                     // 2xl and up
  };

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns(window.innerWidth));
    };

    handleResize(); // Set initial columns on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

        {/* Masonry Grid with Website Screenshots */}
        <div className="max-w-7xl mx-auto px-6">
          <MasonryGrid columns={columns} gap={4}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </MasonryGrid>
        </div>
        
        {/* Bottom fade to blend with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

