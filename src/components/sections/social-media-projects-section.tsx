"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Social Media Project data
const projects = [
  {
    id: "glmetalworks",
    year: "2024",
    title: "GL Metal Works",
    href: "https://glmetalworks.com",
    images: [
      "/GLMetalWorksSocialMedia/1.png",
      "/GLMetalWorksSocialMedia/2.png",
      "/GLMetalWorksSocialMedia/3.png",
      "/GLMetalWorksSocialMedia/4.png",
    ],
    description: "Strategic social media management for a leading metal construction company. Creating engaging content that showcases their craftsmanship and builds brand authority.",
    services: ["Content Creation", "Social Strategy", "Brand Voice"],
    platforms: ["Instagram", "Facebook", "LinkedIn"],
  },
  {
    id: "leanthia",
    year: "2024",
    title: "Leanthia Bakery",
    href: "https://leanthiabakery.com",
    images: [
      "/LeanthiaSocialMedia/1.png",
      "/LeanthiaSocialMedia/2.png",
      "/LeanthiaSocialMedia/3.png",
      "/LeanthiaSocialMedia/4.png",
    ],
    description: "Curated social media presence for an artisanal bakery. Warm, appetite-driven content that translates the craft of traditional baking into a compelling digital narrative.",
    services: ["Content Creation", "Visual Identity", "Community Management"],
    platforms: ["Instagram", "Facebook"],
  },
  {
    id: "tdkdb",
    year: "2024",
    title: "TDK Design & Build",
    href: "https://tdkdb.com/",
    images: [
      "/TdkDBSocialMedia/1.png",
      "/TdkDBSocialMedia/2.png",
      "/TdkDBSocialMedia/3.png",
      "/TdkDBSocialMedia/4.png",
    ],
    description: "Premium social media strategy for a residential development company. Elevated visual content that positions their luxury properties and reinforces the brand's design-forward identity.",
    services: ["Content Creation", "Social Strategy", "Brand Voice"],
    platforms: ["Instagram", "Facebook", "LinkedIn"],
  },
  {
    id: "velricon",
    year: "2024",
    title: "Velricon",
    href: "https://velricon.com",
    images: [
      "/VelriconSocialMedia/1.png",
      "/VelriconSocialMedia/2.png",
      "/VelriconSocialMedia/3.png",
      "/VelriconSocialMedia/4.png",
    ],
    description: "Authoritative social media presence for a modern digital services brand. Precise, technically confident content that communicates innovation without sacrificing clarity.",
    services: ["Content Creation", "Digital Marketing", "Social Strategy"],
    platforms: ["Instagram", "LinkedIn"],
  },
];

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

export function SocialMediaProjectsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileProjectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  // Check for mobile
  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Setup GSAP animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = rootRef.current;
    if (!root) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (isMobile) {
          // Mobile animations - scroll-triggered fade and slide
          mobileProjectRefs.current.forEach((projectEl) => {
            if (!projectEl) return;

            const gridEl = projectEl.querySelector(".mobile-project-grid");
            const yearEl = projectEl.querySelector(".mobile-project-year");
            const titleEl = projectEl.querySelector(".mobile-project-title");
            const descEl = projectEl.querySelector(".mobile-project-desc");
            const servicesEl = projectEl.querySelector(".mobile-project-services");
            const platformsEl = projectEl.querySelector(".mobile-project-platforms");
            const ctaEl = projectEl.querySelector(".mobile-project-cta");

            // Set initial states
            gsap.set([gridEl, yearEl, titleEl, descEl, servicesEl, platformsEl, ctaEl], {
              opacity: 0,
              y: 30,
            });

            // Create scroll trigger for this project
            ScrollTrigger.create({
              trigger: projectEl,
              start: "top 80%",
              end: "bottom 20%",
              onEnter: () => {
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                
                tl.to(gridEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                })
                .to(yearEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                }, "-=0.4")
                .to(titleEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                }, "-=0.3")
                .to(descEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                }, "-=0.4")
                .to(servicesEl?.children || [], {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.1,
                }, "-=0.3")
                .to(platformsEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                }, "-=0.2")
                .to(ctaEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                }, "-=0.2");
              },
            });
          });
        } else {
          // Desktop animations - Fade transitions between grids
          
          // Set all grids to autoAlpha 0 except the first
          gridRefs.current.forEach((grid, i) => {
            if (grid) {
              gsap.set(grid, { autoAlpha: i === 0 ? 1 : 0 });
            }
          });

          // Set all text sections to opacity 0 except the first
          textRefs.current.forEach((text, i) => {
            if (text) {
              gsap.set(text, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
            }
          });

          // Create scroll triggers for each section
          sectionRefs.current.forEach((section, index) => {
            if (!section) return;

            ScrollTrigger.create({
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => {
                setActiveIndex(index);

                // Fade out previous grid, fade in current
                gridRefs.current.forEach((grid, i) => {
                  if (grid) {
                    gsap.to(grid, {
                      autoAlpha: i === index ? 1 : 0,
                      duration: 0.6,
                      ease: "power2.inOut",
                    });
                  }
                });

                // Animate text
                textRefs.current.forEach((text, i) => {
                  if (text) {
                    gsap.to(text, {
                      opacity: i === index ? 1 : 0,
                      y: i === index ? 0 : 30,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }
                });
              },
              onEnterBack: () => {
                setActiveIndex(index);

                // Fade out next grid, fade in current
                gridRefs.current.forEach((grid, i) => {
                  if (grid) {
                    gsap.to(grid, {
                      autoAlpha: i === index ? 1 : 0,
                      duration: 0.6,
                      ease: "power2.inOut",
                    });
                  }
                });

                // Animate text
                textRefs.current.forEach((text, i) => {
                  if (text) {
                    gsap.to(text, {
                      opacity: i === index ? 1 : 0,
                      y: i === index ? 0 : 30,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }
                });
              },
            });
          });
        }
      }, root);

      return () => ctx.revert();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={rootRef}
      className="relative w-full"
      style={{ backgroundColor: colors[900] }}
    >
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs font-mono uppercase tracking-[0.3em] mb-4"
            style={{ color: colors[400] }}
          >
            Social Media
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extralight"
            style={{ color: colors[50] }}
          >
            Creative <span style={{ color: colors[300] }}>Campaigns</span>
          </h1>
        </div>
      </div>

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="relative">
          <div className="flex">
            {/* Left Side - Scrolling Content */}
            <div className="w-[45%] relative z-20">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className="min-h-screen flex items-center"
                  style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
                >
                  <div className="w-full px-6 md:px-12 lg:px-24">
                    <div
                      ref={(el) => {
                        textRefs.current[index] = el;
                      }}
                      className="flex flex-col gap-6 relative"
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                      {/* Project Number */}
                      <div
                        className="text-[8rem] md:text-[10rem] font-extralight leading-none opacity-10 absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
                        style={{ color: colors[200] }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Year Badge */}
                      <div
                        className="text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2"
                        style={{ color: colors[400] }}
                      >
                        <span className="w-8 h-px" style={{ backgroundColor: colors[400] }} />
                        {project.year}
                      </div>

                      {/* Title */}
                      <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
                        style={{ color: colors[50] }}
                      >
                        {project.title}
                      </h2>

                      {/* Description */}
                      <p
                        className="text-base md:text-lg font-light leading-relaxed"
                        style={{ color: colors[200], opacity: 0.8 }}
                      >
                        {project.description}
                      </p>

                      {/* Services */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border"
                            style={{
                              color: colors[300],
                              borderColor: `${colors[300]}40`,
                              backgroundColor: `${colors[300]}10`,
                            }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      {/* Platforms */}
                      <div className="flex items-center gap-4 mt-2">
                        <span
                          className="text-xs font-mono uppercase tracking-wider"
                          style={{ color: colors[400] }}
                        >
                          Platforms:
                        </span>
                        <div className="flex gap-3">
                          {project.platforms.map((platform) => (
                            <span
                              key={platform}
                              className="text-xs font-mono"
                              style={{ color: colors[200] }}
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Link */}
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 mt-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:gap-4"
                        style={{ color: colors[50] }}
                      >
                        View Client Website
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Sticky Grid Container */}
            <div className="w-[55%] relative">
              <div className="sticky top-0 h-screen flex items-start pt-16 lg:pt-20 justify-center pr-12 lg:pr-24">
                <div className="relative w-full max-w-[600px]">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      ref={(el) => {
                        gridRefs.current[index] = el;
                      }}
                      className="absolute inset-0"
                      style={{
                        opacity: index === 0 ? 1 : 0,
                        visibility: index === 0 ? "visible" : "hidden",
                      }}
                    >
                      {/* 2x2 Grid of Images */}
                      <div className="grid grid-cols-2 gap-4">
                        {project.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                            style={{
                              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                              transformOrigin: "center",
                              transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLDivElement).style.transform = "rotate(2deg)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg)";
                            }}
                            onClick={() => setSelectedImage(image)}
                          >
                            <Image
                              src={image}
                              alt={`${project.title} - Visual ${imgIndex + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 1024px) 50vw, 25vw"
                              priority={index < 1}
                            />
                            {/* Hover Overlay */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                              style={{ backgroundColor: `${colors[900]}70` }}
                            >
                              <span
                                className="text-[10px] font-mono uppercase tracking-[0.2em]"
                                style={{ color: colors[200] }}
                              >
                                Inspect Me
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="relative">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                mobileProjectRefs.current[index] = el;
              }}
              className="relative w-full mb-24 px-6"
            >
              {/* Mobile Grid */}
              <div 
                className="mobile-project-grid grid grid-cols-2 gap-3 mb-6"
                style={{ opacity: 0 }}
              >
                {project.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                    style={{
                      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Visual ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Content */}
              <div className="flex flex-col gap-4">
                {/* Year Badge */}
                <div
                  className="mobile-project-year text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2"
                  style={{ color: colors[400], opacity: 0 }}
                >
                  <span className="w-8 h-px" style={{ backgroundColor: colors[400] }} />
                  {project.year}
                </div>

                {/* Title */}
                <h2
                  className="mobile-project-title text-2xl md:text-3xl font-light leading-tight"
                  style={{ color: colors[50], opacity: 0 }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p
                  className="mobile-project-desc text-sm md:text-base font-light leading-relaxed"
                  style={{ color: colors[200], opacity: 0 }}
                >
                  {project.description}
                </p>

                {/* Services */}
                <div className="mobile-project-services flex flex-wrap gap-2 mt-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border"
                      style={{
                        color: colors[300],
                        borderColor: `${colors[300]}40`,
                        backgroundColor: `${colors[300]}10`,
                        opacity: 0,
                      }}
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Platforms */}
                <div 
                  className="mobile-project-platforms flex items-center gap-3 mt-2"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider"
                    style={{ color: colors[400] }}
                  >
                    Platforms:
                  </span>
                  <div className="flex gap-2">
                    {project.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="text-[10px] font-mono"
                        style={{ color: colors[200] }}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Link */}
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-project-cta group inline-flex items-center gap-2 mt-4 text-xs font-medium uppercase tracking-wider transition-all duration-300 hover:gap-4"
                  style={{ color: colors[50], opacity: 0 }}
                >
                  View Client Website
                  <ArrowUpRight
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress Indicator (Desktop) */}
      {!isMobile && projects.length > 1 && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex items-center justify-end"
            >
              <span
                className="absolute right-6 text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                style={{ color: colors[300] }}
              >
                {project.title}
              </span>
              <div
                className="w-2 h-2 rounded-full transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: activeIndex === index ? colors[300] : `${colors[300]}40`,
                  transform: activeIndex === index ? "scale(1.5)" : "scale(1)",
                  boxShadow: activeIndex === index ? `0 0 10px ${colors[300]}60` : "none",
                }}
              />
            </div>
          ))}
        </div>
      )}
      {/* Lightbox */}
      {selectedImage && (
        <>
          <style>{`
            @keyframes kona-lb-bg {
              from { opacity: 0 }
              to   { opacity: 1 }
            }
            @keyframes kona-lb-img {
              from { opacity: 0; transform: scale(0.96) }
              to   { opacity: 1; transform: scale(1) }
            }
          `}</style>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              backgroundColor: "rgba(17,17,17,0.92)",
              backdropFilter: "blur(8px)",
              animation: "kona-lb-bg 300ms ease forwards",
            }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 border transition-colors duration-300"
              style={{ borderColor: `${colors[300]}50`, color: colors[300] }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.borderColor = colors[300])
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.borderColor = `${colors[300]}50`)
              }
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Full image */}
            <div
              style={{
                animation: "kona-lb-img 400ms cubic-bezier(0.16, 1, 0.3, 1) 0.08s both",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Full view"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SocialMediaProjectsSection;
