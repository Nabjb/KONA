"use client";

import React, { useEffect, useState } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
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
  link?: string;
}

// Real KONA SOCIALS projects (for MacBook on desktop)
const desktopProjects: Project[] = [
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
];

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

  // On mobile, don't show this section (Projects Gallery will handle it)
  if (isMobile) {
    return null;
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

      {/* Content - MacBook only on desktop */}
      <div className="relative z-[5]">
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
      </div>
    </section>
  );
}
