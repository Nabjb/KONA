"use client";

import React, { useEffect, useState } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { motion } from 'framer-motion';

// KONA SOCIALS projects
const projects: GalleryItem[] = [
  {
    id: 1,
    title: "APT Metal Construction",
    description: "Metal construction company in Cyprus",
    src: "/kona websites screenshots/apt_macbook.png",
    link: "https://www.aptmetalconstruction.com",
  },
  {
    id: 2,
    title: "Sivory Design",
    description: "Premium pergolas & outdoor design",
    src: "/kona websites screenshots/sivory_macbook.png",
    link: "https://sivory.vercel.app",
  },
  {
    id: 3,
    title: "TDK Design & Build",
    description: "Residential development in Nicosia",
    src: "/kona websites screenshots/tdk_macbook.png",
    link: "https://tdkdb.com",
  },
  {
    id: 4,
    title: "Corn Revolution",
    description: "Interactive brand experience by Pioneer",
    src: "/kona websites screenshots/cornrevolution.png",
    link: "https://cornrevolution.resn.global",
  },
  {
    id: 5,
    title: "E-Cars Cyprus",
    description: "Luxury car dealership - Bentley & Maserati",
    src: "/kona websites screenshots/ecars.png",
    link: "https://www.e-carscyprus.com",
  },
  {
    id: 6,
    title: "Inter-M Traders",
    description: "Strategic consulting & investment firm",
    src: "/kona websites screenshots/interM.png",
    link: "https://www.intermtraders.com",
  },
];

const ProjectsGallery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-32 bg-[#030014] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>
      
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent z-10 pointer-events-none" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent z-10 pointer-events-none" />

      <div className="relative z-[5] max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Explore Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Projects
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Drag to explore or let it spin. Click any project to see it live.
          </p>
        </motion.div>

        {/* 3D Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CircularGallery 
            items={projects} 
            radius={isMobile ? 250 : 380}
            autoRotateSpeed={0.08}
          />
        </motion.div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-8"
        >
          ← Drag to rotate →
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsGallery;

