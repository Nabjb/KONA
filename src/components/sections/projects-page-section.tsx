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
    image: "/kona websites screenshots/mockup-glmetalworks.png",
    description: "A modern, high-performance website for a leading metal construction company in Cyprus. Features stunning visuals and seamless user experience.",
    services: ["Web Development", "UI/UX Design", "SEO"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "tdk",
    year: "2024",
    title: "TDK Design & Build",
    href: "https://tdkdb.com/",
    image: "/kona websites screenshots/mockup-tdk.png",
    description: "Residential development company website showcasing luxury apartments and homes. Built with a focus on elegant presentation and lead generation.",
    services: ["Web Development", "Brand Identity", "Content Strategy"],
    tech: ["WordPress", "Custom Theme", "PHP"],
  },
  {
    id: "lossantos",
    year: "2024",
    title: "Los Santos Barbers",
    href: "https://lossantosbarbers.com",
    image: "/kona websites screenshots/mockup-lossantos.png",
    description: "A stylish booking platform for a premium barbershop. Features online appointments, service showcase, and a bold visual identity.",
    services: ["Web Development", "Booking System", "Social Media"],
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "sivory",
    year: "2024",
    title: "Sivory Design",
    href: "https://sivorydesigns.com/",
    image: "/kona websites screenshots/mockup-sivory.png",
    description: "Elegant portfolio website for an interior and outdoor design company. Showcases premium pergolas and architectural elements with stunning imagery.",
    services: ["Web Development", "Photography", "SEO"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "leanthia",
    year: "2024",
    title: "Leanthia Bakery",
    href: "https://leanthiabakery.com",
    image: "/kona websites screenshots/mockup-leanthia.png",
    description: "A delightful bakery website showcasing artisanal pastries and baked goods. Features an elegant design that captures the warmth and craftsmanship of traditional baking.",
    services: ["Web Development", "UI/UX Design", "E-commerce"],
    tech: ["Next.js", "Tailwind CSS", "Stripe"],
  },
  {
    id: "apt",
    year: "2024",
    title: "APT Metal Construction",
    href: "https://www.aptmetalconstruction.com/",
    image: "/kona websites screenshots/mockup-apt.png",
    description: "Professional metal construction company website highlighting 10+ years of excellence. Features project showcases, service details, and seamless lead generation.",
    services: ["Web Development", "SEO", "Lead Generation"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "velricon",
    year: "2024",
    title: "Velricon",
    href: "https://velricon.com",
    image: "/kona websites screenshots/mockup-velricon.png",
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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileProjectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
                
                tl.to(imageEl, {
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
                .to(techEl, {
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
          // Desktop animations - Fade transitions between images
          
          // Set all images to opacity 0 except the first
          imageRefs.current.forEach((img, i) => {
            if (img) {
              gsap.set(img, { opacity: i === 0 ? 1 : 0 });
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
                
                // Fade out previous image, fade in current
                imageRefs.current.forEach((img, i) => {
                  if (img) {
                    gsap.to(img, {
                      opacity: i === index ? 1 : 0,
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
                
                // Fade out next image, fade in current
                imageRefs.current.forEach((img, i) => {
                  if (img) {
                    gsap.to(img, {
                      opacity: i === index ? 1 : 0,
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

                      {/* Tech Stack */}
                      <div className="flex items-center gap-4 mt-2">
                        <span
                          className="text-xs font-mono uppercase tracking-wider"
                          style={{ color: colors[400] }}
                        >
                          Built with:
                        </span>
                        <div className="flex gap-3">
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
                        className="group inline-flex items-center gap-2 mt-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:gap-4"
                        style={{ color: colors[50] }}
                      >
                        View Live Project
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Sticky Image Container */}
            <div className="w-[55%] relative">
              <div className="sticky top-0 h-screen flex items-center justify-center pr-12 lg:pr-24">
                <div className="relative w-full aspect-[4/3]">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      className="absolute inset-0"
                      style={{
                        opacity: index === 0 ? 1 : 0,
                      }}
                    >
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative w-full h-full rounded-2xl overflow-hidden group"
                        style={{
                          boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-105"
                          sizes="55vw"
                          priority={index < 2}
                        />
                        {/* Hover Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                          style={{ backgroundColor: `${colors[900]}80` }}
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
              {/* Mobile Image */}
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-project-image block relative aspect-[4/3] rounded-xl overflow-hidden mb-6"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  opacity: 0,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-105"
                  sizes="100vw"
                />
              </Link>

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

                {/* Tech Stack */}
                <div 
                  className="mobile-project-tech flex items-center gap-3 mt-2"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider"
                    style={{ color: colors[400] }}
                  >
                    Built with:
                  </span>
                  <div className="flex gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono"
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
                  className="mobile-project-cta group inline-flex items-center gap-2 mt-4 text-xs font-medium uppercase tracking-wider transition-all duration-300 hover:gap-4"
                  style={{ color: colors[50], opacity: 0 }}
                >
                  View Live Project
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
