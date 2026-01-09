"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data
const projects = [
  {
    id: "apt",
    year: "2024",
    title: "APT Cleaning",
    href: "https://aptcleaningservices.com",
    image: "/kona websites screenshots/apt_macbook.png",
  },
  {
    id: "tdk",
    year: "2024",
    title: "TDK Performance",
    href: "https://tdkperformance.com",
    image: "/kona websites screenshots/tdk_macbook.png",
  },
  {
    id: "lossantos",
    year: "2024",
    title: "Los Santos Barbers",
    href: "https://lossantosbarbers.com",
    image: "/kona websites screenshots/lossantosbarbers.png",
  },
  {
    id: "sivory",
    year: "2024",
    title: "Sivory Design",
    href: "https://sivory.vercel.app",
    image: "/kona websites screenshots/sivory_macbook.png",
  },
];

// CSS custom properties for our earthy theme
const cssVars = {
  "--white": "#1a1d18",
  "--black": "#f8f7f5",
  "--layout-columns-gap": "1.5rem",
  "--layout-margin": "2rem",
} as React.CSSProperties;

export function GiatsProjectsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // Check for mobile and get window height
  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowHeight(window.innerHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Setup GSAP animations - matching giats.me exactly
  useEffect(() => {
    if (typeof window === "undefined" || !windowHeight) return;

    const root = rootRef.current;
    if (!root) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate each canvas EXCEPT the last one (slice 0 to -1)
        canvasRefs.current.slice(0, -1).forEach((canvas, index) => {
          if (!canvas) return;

          // Reset position
          gsap.set(canvas, { yPercent: 0 });

          // Create timeline with ScrollTrigger
          gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: `top+=${windowHeight * index}`,
              end: `+=${windowHeight * (projects.length - 1)}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }).to(canvas, {
            yPercent: 100, // Move DOWN (positive = down)
            ease: "none",
          });
        });
      }, root);

      return () => ctx.revert();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [windowHeight, isMobile]);

  // Calculate projectsWrap height based on giats.me formula
  const getProjectsWrapHeight = (index: number): string => {
    if (isMobile) {
      return index === projects.length - 1
        ? "100svh"
        : `${200 + 100 * index}svh`;
    }
    return index === projects.length - 1
      ? "200svh"
      : `${200 + 100 * index}svh`;
  };

  // Calculate projectsWrap top position
  const getProjectsWrapTop = (index: number): string => {
    if (isMobile) {
      return index === 0 ? "0px" : "-50svh";
    }
    return index === 0 ? "0px" : "-100svh";
  };

  return (
    <div style={{ ...cssVars, backgroundColor: "#1a1d18" }}>
      {/* Section Title */}
      <section
        className="px-4 md:px-8 lg:px-16 py-12 md:py-20"
        style={{ backgroundColor: "#1a1d18" }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight">
          <span style={{ color: "#f8f7f5" }}>Our</span>{" "}
          <span style={{ color: "#a89080" }}>Work</span>
        </h2>
      </section>

      {/* Projects Root Container */}
      <section
        ref={rootRef}
        className="relative w-full block"
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          contain: "paint",
        }}
      >
        {/* Inner Container */}
        <div
          className="relative w-full block"
          style={{
            borderRadius: "var(--layout-columns-gap)",
            boxShadow: "0 0 0 calc(var(--layout-columns-gap) * 1) #1a1d18",
          }}
        >
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
              className="block relative w-full cursor-pointer group"
              style={{
                height: isMobile ? "50svh" : "100svh",
                padding: 0,
                contain: "paint", // CRUCIAL - clips the animated canvas
              }}
            >
              {/* Projects Wrap - Contains sticky content, z-index: 1 (in front) */}
              <div
                className="absolute left-0 right-0 w-full pointer-events-none"
                style={{
                  zIndex: 1,
                  height: getProjectsWrapHeight(index),
                  top: getProjectsWrapTop(index),
                  willChange: "transform",
                }}
              >
                {/* Sticky Container - stays fixed while scrolling */}
                <div
                  className="sticky top-0 w-full flex items-center"
                  style={{
                    height: isMobile ? "50svh" : "100svh",
                    transform: "translateZ(0)", // Creates stacking context for sticky
                  }}
                >
                  {/* Content Grid */}
                  <div className="w-full h-full px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 items-center">
                    {/* Project Details - Left Side */}
                    <div
                      className="flex flex-col gap-2 md:gap-4 md:col-span-1 z-10"
                      style={{
                        position: isMobile ? "absolute" : "relative",
                        bottom: isMobile ? "2rem" : "auto",
                        left: isMobile ? "1rem" : "auto",
                        width: isMobile ? "calc(100% - 2rem)" : "auto",
                      }}
                    >
                      <h6
                        className="text-xs md:text-sm font-medium tracking-widest uppercase transition-all duration-500"
                        style={{ color: "#a89080" }}
                      >
                        {project.year}
                      </h6>
                      <h3
                        className="text-2xl md:text-4xl lg:text-6xl font-light transition-all duration-500"
                        style={{
                          color: "#f8f7f5",
                          textShadow: "none",
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Project Image Preview - Right Side (Desktop) */}
                    <div
                      className="hidden md:block md:col-span-1 relative"
                      style={{
                        position: "absolute",
                        right: "4rem",
                        width: "50%",
                        aspectRatio: "1920 / 900",
                        borderRadius: "var(--layout-columns-gap)",
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg"
                        style={{
                          boxShadow: "0 0 0 0.01vw rgba(40, 40, 43, 0.3)",
                          borderRadius: "calc(var(--layout-columns-gap) * 0.5)",
                        }}
                        sizes="50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Canvas - Background image that animates (z-index: auto, behind projectsWrap) */}
              <div
                ref={(el) => {
                  canvasRefs.current[index] = el;
                }}
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  opacity: 0.4,
                  willChange: "transform",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${
                    index === 0
                      ? "rounded-t-[1.5rem]"
                      : index === projects.length - 1
                      ? "rounded-b-[1.5rem]"
                      : ""
                  }`}
                  style={{
                    borderTopLeftRadius: index === 0 ? "var(--layout-columns-gap)" : 0,
                    borderTopRightRadius: index === 0 ? "var(--layout-columns-gap)" : 0,
                    borderBottomLeftRadius: index === projects.length - 1 ? "var(--layout-columns-gap)" : 0,
                    borderBottomRightRadius: index === projects.length - 1 ? "var(--layout-columns-gap)" : 0,
                  }}
                  sizes="100vw"
                  priority={index < 2}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* All Projects Button */}
        <div
          className="w-full flex justify-center py-16 md:py-24"
          style={{ backgroundColor: "#1a1d18" }}
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-300 hover:gap-5 hover:bg-white/5"
            style={{
              borderColor: "#6b5545",
              color: "#e6e1d7",
            }}
          >
            <span className="text-sm md:text-base font-medium tracking-wider uppercase">
              Start Your Project
            </span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default GiatsProjectsSection;
