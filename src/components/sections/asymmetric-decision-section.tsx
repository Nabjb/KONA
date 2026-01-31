"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useReducedMotion
} from "framer-motion";

const colors = {
    900: "#1a1d18", // Deep Forest
    800: "#2a2e26", // Midnight
    500: "#6b5545", // Oak
    200: "#c8b4a0", // Sand
    50: "#f8f7f5",  // Parchment
};

type DecisionStep = {
    idxLabel: string;
    leftTitle: string;
    leftBody: string;
    rightLabel: string;
    rightBody: string;
};

const steps: DecisionStep[] = [
    {
        idxLabel: "IDX_01",
        leftTitle: "THE FILTER",
        leftBody: "We do not accept projects where the solution is already decided. If the destination is fixed, we are merely a delivery service. KONA operates in the tension between what is requested and what is actually required.",
        rightLabel: "Condition",
        rightBody: "IF_SOLUTION_FIXED: ENGAGE ELSEWHERE",
    },
    {
        idxLabel: "IDX_02",
        leftTitle: "SPEED OF TRUST",
        leftBody: "Complexity is a tool; bureaucracy is a deterrent. We optimize for the speed of the smallest decision-making unit. If your structure mandates consensus over conviction, the output will be diluted by compromise.",
        rightLabel: "Risk",
        rightBody: "IF_CONSENSUS_BIAS: OUTPUT DILUTED",
    },
    {
        idxLabel: "IDX_03",
        leftTitle: "THE THOUSANDTH DAY",
        leftBody: "We design for the thousandth day of utility. Launch week is a vanity metric. Any decision that does not withstand three years of use is decoration. Longevity is the only credible metric of premium work.",
        rightLabel: "Horizon",
        rightBody: "IF_SHORT_TERM_GAIN: WORK REJECTED",
    },
    {
        idxLabel: "IDX_04",
        leftTitle: "PRACTICE OVER SCALE",
        leftBody: "Our capacity is a finite resource, not a scaling metric. We maintain a strict inquiry-to-engagement ratio to ensure every partner receives the full architectural weight of our practice.",
        rightLabel: "Capacity",
        rightBody: "IF_VOLUME_OVER_VALUE: NO ALIGNMENT",
    },
];

export default function AsymmetricDecisionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    // Scroll capture logic
    // Progress goes from 0 to 1 over the height of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map the 0-1 progress to our step indices
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const stepSize = 1 / steps.length;
        const index = Math.floor(latest / stepSize);
        const clampedIndex = Math.min(Math.max(index, 0), steps.length - 1);
        if (clampedIndex !== activeIndex) {
            setActiveIndex(clampedIndex);
        }
    });

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Note: This won't override scroll, but provides accessibility
            if (e.key === "ArrowDown" && activeIndex < steps.length - 1) {
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            }
            if (e.key === "ArrowUp" && activeIndex > 0) {
                window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex]);

    return (
        <section
            ref={containerRef}
            className="relative w-full"
            // Height = (Number of steps + 1) * viewport height to allow enough scroll room
            style={{ height: `${(steps.length + 1) * 100}vh` }}
        >
            {/* 
        The Sticky Stage 
        This pinned layer follows the user as they scroll through the parent's height
      */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center bg-[#1a1d18] overflow-hidden">

                {/* Background Architectural Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute left-1/2 top-0 w-px h-full" style={{ backgroundColor: colors[200] }} />
                    <div className="absolute left-0 top-1/2 w-full h-px" style={{ backgroundColor: colors[200] }} />
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">

                    {/* Section Heading - Fixed throughout the pinned sequence */}
                    <div className="mb-24 md:mb-32 relative">
                        <div
                            className="text-[10px] font-mono uppercase tracking-[0.4em] mb-6 opacity-30"
                            style={{ color: colors[200] }}
                        >
                            The Filter / Operational Criteria
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-left">
                            <span style={{ color: colors[50] }}>How We</span>{" "}
                            <span style={{ color: colors[500] }}>Decide</span>
                        </h2>

                        {/* Mobile Progress Line - Horizontal (SVG for pixel precision) */}
                        <div className="mt-8 w-full md:hidden">
                            <svg className="w-full h-px block overflow-visible" preserveAspectRatio="none">
                                <rect width="100%" height="1" className="fill-white/10" />
                                <motion.rect
                                    height="1"
                                    style={{
                                        fill: colors[500],
                                        width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
                                    }}
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Vertical Progress Rail - Architectural Alignment */}
                    <div className="absolute left-0 md:left-1 lg:left-0 top-32 bottom-32 w-px bg-white/5 hidden md:block">
                        <motion.div
                            className="w-full origin-top relative"
                            style={{
                                backgroundColor: colors[500],
                                scaleY: scrollYProgress,
                                height: "100%"
                            }}
                        >
                            {/* Glowing Progress Node */}
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: colors[500],
                                    boxShadow: `0 0 15px ${colors[500]}, 0 0 5px ${colors[500]}`
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-12 gap-x-4 md:gap-x-12 lg:gap-x-16 items-start">

                        {/* 
              Left Column: Core Logic (The Why)
              Fluid scale and adaptive width to follow the title's rhythm.
            */}
                        <div className="col-span-12 md:col-span-7 lg:col-span-6 relative min-h-[250px] md:min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20, filter: "blur(5px)" }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <div className="flex items-center gap-4 opacity-30">
                                        <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase" style={{ color: colors[200] }}>
                                            {steps[activeIndex].idxLabel}
                                        </span>
                                        <div className="h-px flex-1" style={{ background: colors[200] }} />
                                    </div>
                                    <h3 className="text-sm md:text-xl font-mono tracking-[0.2em] md:tracking-widest uppercase opacity-40" style={{ color: colors[50] }}>
                                        {steps[activeIndex].leftTitle}
                                    </h3>
                                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-left" style={{ color: colors[50] }}>
                                        {steps[activeIndex].leftBody}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* 
              Right Column: Conditional Constraints (The What)
              Responsive padding and font sizes synced with title behavior.
            */}
                        <div className="col-span-12 md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-4 mt-8 md:mt-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 10, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -10, filter: "blur(5px)" }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                    className="space-y-3 md:space-y-4 border-l border-white/5 pl-4 md:pl-8 lg:pl-10 py-2 md:py-4"
                                >
                                    <span className="block font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase opacity-60" style={{ color: colors[500] }}>
                                        {steps[activeIndex].rightLabel}
                                    </span>
                                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tighter leading-[1.1]" style={{ color: colors[200] }}>
                                        {steps[activeIndex].rightBody}
                                    </p>

                                    {/* Subtle Geometric Detail */}
                                    <div className="pt-4 md:pt-8 flex gap-2">
                                        {steps.map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-1 transition-all duration-500 rounded-full"
                                                style={{
                                                    width: i === activeIndex ? "2rem" : "0.25rem",
                                                    background: i === activeIndex ? colors[500] : "rgba(255,255,255,0.05)"
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                    {/* Corner Architectural Marks */}
                    <div className="absolute -bottom-12 -left-4 w-12 h-12 opacity-10 pointer-events-none hidden lg:block">
                        <div className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: colors[200] }} />
                        <div className="absolute bottom-0 left-0 w-px h-full" style={{ backgroundColor: colors[200] }} />
                    </div>

                </div>
            </div>
        </section>
    );
}
