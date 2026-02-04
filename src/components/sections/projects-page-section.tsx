"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data with more details
const projects = [
  {
    id: "glmetalworks",
    year: "2024",
    title: "GL Metal Works",
    href: "https://glmetalworks.com",
    image: "/kona websites screenshots/glmetalworks.png",
    description: "A modern, high-performance website for a leading metal construction company in Cyprus. Features stunning visuals and seamless user experience.",
    services: ["Web Development", "UI/UX Design", "SEO"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "tdk",
    year: "2024",
    title: "TDK Design & Build",
    href: "https://tdkdb.com/",
    image: "/kona websites screenshots/tdk_macbook.png",
    description: "Residential development company website showcasing luxury apartments and homes. Built with a focus on elegant presentation and lead generation.",
    services: ["Web Development", "Brand Identity", "Content Strategy"],
    tech: ["WordPress", "Custom Theme", "PHP"],
  },
  {
    id: "lossantos",
    year: "2024",
    title: "Los Santos Barbers",
    href: "https://lossantosbarbers.com",
    image: "/kona websites screenshots/lossantosbarbers.png",
    description: "A stylish booking platform for a premium barbershop. Features online appointments, service showcase, and a bold visual identity.",
    services: ["Web Development", "Booking System", "Social Media"],
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "sivory",
    year: "2024",
    title: "Sivory Design",
    href: "https://sivorydesigns.com/",
    image: "/kona websites screenshots/sivory_macbook.png",
    description: "Elegant portfolio website for an interior and outdoor design company. Showcases premium pergolas and architectural elements with stunning imagery.",
    services: ["Web Development", "Photography", "SEO"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "leanthia",
    year: "2024",
    title: "Leanthia Bakery",
    href: "https://leanthiabakery.com",
    image: "/kona websites screenshots/LeanthiaBakery.png",
    description: "A delightful bakery website showcasing artisanal pastries and baked goods. Features an elegant design that captures the warmth and craftsmanship of traditional baking.",
    services: ["Web Development", "UI/UX Design", "E-commerce"],
    tech: ["Next.js", "Tailwind CSS", "Stripe"],
  },
  {
    id: "apt",
    year: "2024",
    title: "APT Metal Construction",
    href: "https://www.aptmetalconstruction.com/",
    image: "/kona websites screenshots/apt_macbook.png",
    description: "Professional metal construction company website highlighting 10+ years of excellence. Features project showcases, service details, and seamless lead generation.",
    services: ["Web Development", "SEO", "Lead Generation"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "velricon",
    year: "2024",
    title: "Velricon",
    href: "https://velricon.com",
    image: "/kona websites screenshots/velricon.png",
    description: "Modern digital platform showcasing innovative solutions and services. Built with cutting-edge technology for optimal performance and user experience.",
    services: ["Web Development", "UI/UX Design", "Performance Optimization"],
    tech: ["Next.js", "TypeScript", "Vercel"],
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

export function ProjectsPageSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileProjectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Check for mobile and get window height
  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setWindowHeight(window.innerHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Setup GSAP animations
  useEffect(() => {
    if (typeof window === "undefined" || !windowHeight) return;

    const root = rootRef.current;
    if (!root) return;

    const cardHeight = windowHeight;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (isMobile) {
          // Mobile animations - scroll-triggered fade and slide
          mobileProjectRefs.current.forEach((projectEl, index) => {
            if (!projectEl) return;

            const imageEl = projectEl.querySelector(".mobile-project-image");
            const yearEl = projectEl.querySelector(".mobile-project-year");
            const titleEl = projectEl.querySelector(".mobile-project-title");
            const descEl = projectEl.querySelector(".mobile-project-desc");
            const servicesEl = projectEl.querySelector(".mobile-project-services");
            const techEl = projectEl.querySelector(".mobile-project-tech");
            const ctaEl = projectEl.querySelector(".mobile-project-cta");

            // Set initial states
            gsap.set([imageEl, yearEl, titleEl, descEl, servicesEl, techEl, ctaEl], {
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
                
                // Image - fade + slide up
                tl.to(imageEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                })
                // Year badge - fade + slide up
                .to(yearEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                }, "-=0.4")
                // Title - fade + slide up
                .to(titleEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                }, "-=0.3")
                // Description - fade + slide up
                .to(descEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                }, "-=0.4")
                // Services - stagger fade
                .to(servicesEl?.children || [], {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.1,
                }, "-=0.3")
                // Tech stack - fade
                .to(techEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                }, "-=0.2")
                // CTA - fade + slide up
                .to(ctaEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                }, "-=0.2");
              },
            });
          });
        } else {
          // Desktop animations
          // Track active index based on scroll
          projects.forEach((_, index) => {
            ScrollTrigger.create({
              trigger: root,
              start: `top+=${cardHeight * index} top`,
              end: `top+=${cardHeight * (index + 1)} top`,
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            });
          });

          // Animate each image EXCEPT the last one
          imageRefs.current.slice(0, -1).forEach((imageEl, index) => {
            if (!imageEl) return;

            gsap.set(imageEl, { yPercent: 0 });

            gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: `top+=${cardHeight * index}`,
                end: `+=${cardHeight * (projects.length - 1)}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            }).to(imageEl, {
              yPercent: 100,
              ease: "none",
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
  }, [windowHeight, isMobile]);

  // Calculate wrapper heights
  const getWrapperHeight = (index: number): string => {
    if (isMobile) return "auto";
    return index === projects.length - 1
      ? "200svh"
      : `${200 + 100 * index}svh`;
  };

  const getWrapperTop = (index: number): string => {
    if (isMobile) return "0";
    return index === 0 ? "0px" : "-100svh";
  };

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
            Our Work
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extralight"
            style={{ color: colors[50] }}
          >
            Selected <span style={{ color: colors[300] }}>Projects</span>
          </h1>
        </div>
      </div>

      {/* Projects Container */}
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              if (isMobile) {
                mobileProjectRefs.current[index] = el;
              }
            }}
            className={`relative w-full ${isMobile ? "mb-24" : ""}`}
            style={{
              height: isMobile ? "auto" : "100svh",
              contain: isMobile ? undefined : "paint",
            }}
          >
            {/* Content Wrapper - Contains sticky content */}
            <div
              className={`${isMobile ? "relative" : "absolute"} left-0 right-0 w-full`}
              style={{
                zIndex: 1,
                height: isMobile ? "auto" : getWrapperHeight(index),
                top: isMobile ? undefined : getWrapperTop(index),
              }}
            >
              {/* Sticky Container */}
              <div
                className={`${isMobile ? "relative" : "sticky top-0"} w-full`}
                style={{
                  height: isMobile ? "auto" : "100svh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="w-full px-6 md:px-12 lg:px-24 py-12 lg:py-0">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    {/* Left Side - Project Info */}
                    <div className="order-2 lg:order-1 flex flex-col gap-6">
                      {/* Project Number */}
                      <div
                        className="text-[10rem] md:text-[12rem] font-extralight leading-none opacity-10 absolute -left-4 lg:left-0 top-0 lg:top-auto pointer-events-none select-none hidden lg:block"
                        style={{ color: colors[200] }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Year Badge */}
                      <div
                        className="mobile-project-year text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2"
                        style={{ 
                          color: colors[400],
                          ...(isMobile ? { opacity: 0 } : {})
                        }}
                      >
                        <span className="w-8 h-px" style={{ backgroundColor: colors[400] }} />
                        {project.year}
                      </div>

                      {/* Title */}
                      <h2
                        className="mobile-project-title text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
                        style={{ 
                          color: colors[50],
                          ...(isMobile ? { opacity: 0 } : {})
                        }}
                      >
                        {project.title}
                      </h2>

                      {/* Description */}
                      <p
                        className="mobile-project-desc text-base md:text-lg font-light leading-relaxed max-w-md"
                        style={{ 
                          color: colors[200], 
                          opacity: isMobile ? 0 : 0.8
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Services */}
                      <div className="mobile-project-services flex flex-wrap gap-2 mt-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border"
                            style={{
                              color: colors[300],
                              borderColor: `${colors[300]}40`,
                              backgroundColor: `${colors[300]}10`,
                              ...(isMobile ? { opacity: 0 } : {})
                            }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div 
                        className="mobile-project-tech flex items-center gap-4 mt-2"
                        style={isMobile ? { opacity: 0 } : {}}
                      >
                        <span
                          className="text-xs font-mono uppercase tracking-wider"
                          style={{ color: colors[400] }}
                        >
                          Built with:
                        </span>
                        <div className="flex gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs font-mono"
                              style={{ color: colors[200] }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Link */}
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-project-cta group inline-flex items-center gap-2 mt-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:gap-4"
                        style={{ 
                          color: colors[50],
                          ...(isMobile ? { opacity: 0 } : {})
                        }}
                      >
                        View Live Project
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    </div>

                    {/* Right Side - Project Image (Desktop) */}
                    <div className="order-1 lg:order-2 relative">
                      {/* This is visible only on mobile */}
                      {isMobile && (
                        <Link
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mobile-project-image block relative aspect-[16/10] rounded-xl overflow-hidden"
                          style={{
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                            opacity: 0,
                          }}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Image Card (Desktop Only) - Behind the content */}
            {!isMobile && (
              <div
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 w-[45%] aspect-[16/10] transition-opacity duration-500"
                style={{
                  zIndex: 0,
                  willChange: "transform",
                }}
              >
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-full rounded-xl overflow-hidden group"
                  style={{
                    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                    priority={index < 2}
                  />
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    style={{ backgroundColor: `${colors[900]}90` }}
                  >
                    <span 
                      className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
                      style={{ color: colors[50] }}
                    >
                      View Project <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Indicator (Desktop) */}
      {!isMobile && (
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
    </section>
  );
}

export default ProjectsPageSection;
