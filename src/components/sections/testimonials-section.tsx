"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const colors = {
    900: "#1a1d18", // Deep Forest
    800: "#2a2e26", // Midnight
    500: "#6b5545", // Oak
    200: "#c8b4a0", // Sand
    50: "#f8f7f5",  // Parchment
};

type Testimonial = {
    id: number;
    quote: string;
    industry: string;
    service: string;
    client: string;
    image: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Konaverse doesn't just build websites; they architect digital ecosystems. The level of intentionality in their decision-making filtered out the noise and left us with a platform that actually moves the needle.",
        industry: "Renewable Energy",
        service: "Product Strategy & Web Dev",
        client: "Solaris Group",
        image: "/images/bg-iso-webdev.png"
    },
    {
        id: 2,
        quote: "The contrast between Konaverse and traditional agencies is stark. They operate with a quiet power that prioritizes longevity over launch-day vanity. Three years in, and the architectural foundation they laid is still rock solid.",
        industry: "High-End Architecture",
        service: "Digital Brand Identity",
        client: "Studio V",
        image: "/images/bg-iso-webapp.png"
    },
    {
        id: 3,
        quote: "Precision is their primary language. They dismantled our initial vision only to rebuild it into something far more credible and effective. They are not vendors; they are partners of the highest calibre.",
        industry: "Venture Capital",
        service: "Strategic Web Application",
        client: "Ember Peak",
        image: "/images/bg-iso-social.png"
    },
];

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);
    useReducedMotion(); // Respect user preference (could be used for animation variants)

    const next = useCallback(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-play logic: Change every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, [next, index]); // Reset timer whenever index changes (manual or auto)

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [next, prev]);

    return (
        <section className="relative min-h-screen w-full bg-[#1a1d18] py-32 md:py-64 flex items-center justify-center overflow-hidden">
            {/* Background Architectural Datum Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute left-1/2 top-0 w-px h-full" style={{ backgroundColor: colors[200] }} />
                <div className="absolute left-0 top-1/2 w-full h-px" style={{ backgroundColor: colors[200] }} />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Section Header */}
                <div className="mb-16 md:mb-24 lg:mb-32">
                    {/* Eyebrow - Who We Are Style */}
                    <div
                        className="text-xs font-mono uppercase tracking-[0.3em] mb-6 text-center md:text-left"
                        style={{ color: "#a89080" }}
                    >
                        The Proof
                    </div>

                    {/* Title - How We Decide Style */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-center md:text-left">
                        <span style={{ color: colors[50] }}>Verified</span>{" "}
                        <span style={{ color: "#a89080" }}>Impact</span>
                    </h2>
                </div>

                <div className="relative h-[600px] md:h-[500px] w-full">

                    <AnimatePresence mode="popLayout">
                        {testimonials.map((t, i) => {
                            // Calculate relative position in the stack
                            const isCurrent = i === index;
                            const isNext = i === (index + 1) % testimonials.length;
                            const isPrev = i === (index - 1 + testimonials.length) % testimonials.length;

                            // Only render current and next/prev for performance/logic
                            if (!isCurrent && !isNext && !isPrev) return null;

                            return (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{
                                        opacity: isCurrent ? 1 : 0.3,
                                        scale: isCurrent ? 1 : 0.95,
                                        y: isCurrent ? 0 : isNext ? 20 : -20,
                                        zIndex: isCurrent ? 30 : 10,
                                        filter: isCurrent ? "blur(0px)" : "blur(4px)",
                                    }}
                                    exit={{ opacity: 0, scale: 1.05, y: -40, filter: "blur(10px)" }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <div
                                        className="relative w-full h-full border border-white/10 p-8 md:p-16 flex flex-col justify-between overflow-hidden shadow-2xl"
                                        style={{ backgroundColor: colors[900] }}
                                    >
                                        {/* Corner Markers */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

                                        {/* Integrated Architectural Image (Absolute Background) */}
                                        <div className="absolute top-[-10%] right-[-10%] w-1/2 h-full opacity-10 pointer-events-none grayscale brightness-150">
                                            <Image
                                                src={t.image}
                                                alt=""
                                                fill
                                                className="object-contain"
                                                sizes="40vw"
                                            />
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div className="space-y-4">
                                                <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-30" style={{ color: colors[200] }}>
                                                    Archive_Ref: 0{t.id}
                                                </span>
                                                <blockquote className="text-2xl md:text-4xl lg:text-5xl font-extralight leading-tight tracking-tight max-w-4xl" style={{ color: colors[50] }}>
                                                    “{t.quote}”
                                                </blockquote>
                                            </div>

                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                                <div className="space-y-1">
                                                    <p className="text-lg md:text-xl font-light tracking-wide transition-all duration-500" style={{ color: colors[50] }}>
                                                        {t.client}
                                                    </p>
                                                    <span className="block text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase opacity-40" style={{ color: colors[200] }}>
                                                        {t.industry} — {t.service}
                                                    </span>
                                                </div>

                                                {/* Pagination Controls embedded in the architectural frame */}
                                                <div className="flex items-center gap-6">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); prev(); }}
                                                        className="group p-2 -m-2 outline-none focus-visible:ring-1 focus-visible:ring-oak"
                                                        aria-label="Previous testimonial"
                                                    >
                                                        <svg className="w-6 h-6 rotate-180 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none">
                                                            <path d="M5 12h14M13 5l7 7-7 7" stroke={colors[200]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                    <div className="flex items-center gap-1">
                                                        {testimonials.map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`h-1 transition-all duration-500 ${i === index ? 'w-4' : 'w-1 bg-white/10'}`}
                                                                style={{ backgroundColor: i === index ? colors[500] : undefined }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); next(); }}
                                                        className="group p-2 -m-2 outline-none focus-visible:ring-1 focus-visible:ring-oak"
                                                        aria-label="Next testimonial"
                                                    >
                                                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                                                            <path d="M5 12h14M13 5l7 7-7 7" stroke={colors[200]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
}

