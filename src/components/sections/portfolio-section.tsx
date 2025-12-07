"use client";

import React, { useEffect, useState } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { IPhoneMockup } from "@/components/ui/iphone-mockup";
import dynamic from "next/dynamic";

// Dynamically import the shader background to avoid SSR issues with Three.js
const AnimatedShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-background"),
  { ssr: false }
);

// Project type shared between components
interface Project {
  id: number;
  title: string;
  description: string;
  src: string;
  mobileSrc: string;
  link?: string;
}

// Real KONA SOCIALS projects
const projects: Project[] = [
  {
    id: 1,
    title: "APT Metal Construction",
    description: "Metal construction company in Cyprus",
    src: "/kona websites screenshots/apt_macbook.png",
    mobileSrc: "/kona websites screenshots/apt_iphone.png",
    link: "https://www.aptmetalconstruction.com",
  },
  {
    id: 2,
    title: "Sivory Design",
    description: "Premium pergolas & outdoor design",
    src: "/kona websites screenshots/sivory_macbook.png",
    mobileSrc: "/kona websites screenshots/sivory_iphone.png",
    link: "https://sivory.vercel.app",
  },
  {
    id: 3,
    title: "TDK Design & Build",
    description: "Residential development in Nicosia",
    src: "/kona websites screenshots/tdk_macbook.png",
    mobileSrc: "/kona websites screenshots/tdk_iphone.png",
    link: "https://tdkdb.com",
  },
];

// Desktop projects (use macbook screenshots)
const desktopProjects = projects.map(p => ({
  id: p.id,
  title: p.title,
  description: p.description,
  src: p.src,
  link: p.link,
}));

// Mobile projects (use iphone screenshots)
const mobileProjects = projects.map(p => ({
  id: p.id,
  title: p.title,
  description: p.description,
  src: p.mobileSrc,
  link: p.link,
}));

export default function PortfolioSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative w-full min-h-screen overflow-hidden bg-[#030014]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-transparent to-[#030014] pointer-events-none z-10" />
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* WebGL Shader Background */}
      <div className="absolute inset-0 bg-[#030014]">
        <AnimatedShaderBackground />
      </div>

      {/* Top fade - smooth transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030014] to-transparent z-10 pointer-events-none" />
      
      {/* Bottom fade - smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030014] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[5]">
        {isMobile ? (
          // iPhone mockup for mobile (uses iphone screenshots)
          <IPhoneMockup
            projects={mobileProjects}
            title={
              <span className="text-3xl">
                Our Work Speaks{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  For Itself
                </span>
              </span>
            }
          />
        ) : (
          // MacBook mockup for desktop (uses macbook screenshots)
          <MacbookScroll
            projects={desktopProjects}
            title={
              <span className="text-4xl md:text-5xl">
                Our Work Speaks <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  For Itself
                </span>
              </span>
            }
            showGradient={false}
          />
        )}
      </div>
    </section>
  );
}
