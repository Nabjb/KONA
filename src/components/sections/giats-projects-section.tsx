"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data
const projects = [
  {
    id: "glmetalworks",
    year: "2024",
    title: "GL Metal Works",
    href: "https://glmetalworks.com",
    image: "/kona websites screenshots/glmetalworks.png",
  },
  {
    id: "tdk",
    year: "2024",
    title: "TDK Design & Build",
    href: "https://tdkdb.com/",
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
    href: "https://sivorydesigns.com/",
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

    // Card height based on device
    const cardHeight = isMobile ? windowHeight * 0.5 : windowHeight;

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
              start: `top+=${cardHeight * index}`,
              end: `+=${cardHeight * (projects.length - 1)}`,
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
      // Mobile: last card (continuous) needs more height to stay visible longer and centered
      return index === projects.length - 1
        ? "150svh" // Increased height so it starts earlier and stays centered longer
        : `${100 + 50 * index}svh`;
    }
    // Desktop
    return index === projects.length - 1
      ? "200svh"
      : `${200 + 100 * index}svh`;
  };

  // Calculate projectsWrap top position
  const getProjectsWrapTop = (index: number): string => {
    if (isMobile) {
      // Last project (continuous) starts earlier to stay centered
      if (index === projects.length - 1) {
        return "-25svh"; // Start earlier so it stays in middle
      }
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
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-center md:text-left">
          <span style={{ color: "#f8f7f5" }}>Our</span>{" "}
          <span style={{ color: "#a89080" }}>Work</span>
        </h2>
      </section>

      {/* Projects Root Container */}
      <section
        ref={rootRef}
        className="relative w-full block px-4 md:px-8 lg:px-16"
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          contain: "paint",
        }}
      >
        {/* Inner Container */}
        <div
          className="relative w-full block mx-auto"
          style={{
            borderRadius: isMobile ? "0.75rem" : "1.5rem",
            boxShadow: `0 0 0 ${isMobile ? "0.75rem" : "1.5rem"} #1a1d18`,
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
                borderRadius: isMobile ? "0.75rem" : 0,
                marginBottom: isMobile && index !== projects.length - 1 ? "1rem" : 0,
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
                  className={`sticky w-full ${isMobile ? "top-[25vh]" : "top-0"}`}
                  style={{
                    height: isMobile ? "50svh" : "100svh",
                    transform: "translateZ(0)", // Creates stacking context for sticky
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* MOBILE Layout */}
                  {isMobile ? (
                    <div className="relative w-full h-full">
                      {/* Centered Image Container (Mobile) */}
                      <div
                        className="absolute"
                        style={{
                          width: "83%",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          aspectRatio: "16 / 9",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                          }}
                          sizes="83vw"
                        />
                      </div>

                      {/* Project Details - Bottom Center (Mobile) */}
                      <div
                        className="absolute w-full flex flex-col items-center justify-end pb-6"
                        style={{
                          height: "100%",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          className="text-xs font-medium tracking-widest uppercase"
                          style={{ color: "#a89080" }}
                        >
                          {project.year}
                        </span>
                        <h3
                          className="text-xl font-light text-center px-4"
                          style={{
                            color: "#f8f7f5",
                            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    /* DESKTOP Layout */
                    <div className="w-full h-full px-8 lg:px-16 grid grid-cols-2 items-center">
                      {/* Project Details - Left Side (Desktop) */}
                      <div className={`flex flex-col gap-4 z-10 ${index === 0 ? "pr-8 lg:pr-12" : ""}`}>
                        <span
                          className="text-sm font-medium tracking-widest uppercase transition-all duration-500"
                          style={{ color: "#a89080" }}
                        >
                          {project.year}
                        </span>
                        <h3
                          className={`font-light transition-all duration-500 ${
                            index === 0 
                              ? "text-3xl lg:text-5xl" 
                              : "text-4xl lg:text-6xl"
                          }`}
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
                        className="relative"
                        style={{
                          position: "absolute",
                          right: "4rem",
                          width: "50%",
                          aspectRatio: "1920 / 900",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          style={{
                            borderRadius: "0.75rem",
                            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                          }}
                          sizes="50vw"
                        />
                      </div>
                    </div>
                  )}
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
                  className="object-cover"
                  style={{
                    // Mobile: all cards have full rounded corners (due to spacing)
                    // Desktop: only first has top radius, last has bottom radius
                    borderRadius: isMobile ? "0.75rem" : undefined,
                    borderTopLeftRadius: !isMobile && index === 0 ? "1.5rem" : undefined,
                    borderTopRightRadius: !isMobile && index === 0 ? "1.5rem" : undefined,
                    borderBottomLeftRadius: !isMobile && index === projects.length - 1 ? "1.5rem" : undefined,
                    borderBottomRightRadius: !isMobile && index === projects.length - 1 ? "1.5rem" : undefined,
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
          className="w-full flex justify-center py-12 md:py-24 px-4"
          style={{ backgroundColor: "#1a1d18" }}
        >
          <Button
            href="#contact"
            className="w-full sm:w-auto px-8 sm:px-16 md:px-24"
          >
            Start Your Project
          </Button>
        </div>
      </section>
    </div>
  );
}

export default GiatsProjectsSection;
