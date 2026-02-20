"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/button";

/**
 * CTASection - Concept 3: The Blueprint Legend
 * 
 * This section acts as the final "Authorization" step before the footer.
 * It frames the contact action as approving an architectural project plan.
 */

const colors = {
    900: "#1a1d18", // Deep Forest
    800: "#2a2e26", // Midnight
    500: "#6b5545", // Oak
    200: "#c8b4a0", // Sand
    50: "#f8f7f5",  // Parchment
};

export default function CTASection() {
    const shouldReduceMotion = useReducedMotion() ?? false;

    return (
        <section className="relative w-full bg-[#1a1d18] py-32 md:py-64 overflow-hidden border-t border-white/5">
            {/* Background Architectural Blueprint */}
            <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none grayscale brightness-150">
                <Image
                    src="/images/bg-iso-webdev.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Structural Grid Overlays */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute left-[20%] top-0 w-px h-full" style={{ backgroundColor: colors[200] }} />
                <div className="absolute left-0 top-1/2 w-full h-px" style={{ backgroundColor: colors[200] }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-12 gap-x-4 md:gap-x-12 lg:gap-x-16 items-center">

                    {/* Legend Title Block (Top-Left Feel) */}
                    <div className="col-span-12 lg:col-span-7 space-y-8 md:space-y-12">
                        <div className="space-y-4 md:space-y-6">
                            <div
                                className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] md:tracking-[0.5em] opacity-40"
                                style={{ color: colors[200] }}
                            >
                                Project_Status: Pending_Authorization
                            </div>
                            <h2
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] tracking-tighter"
                                style={{ color: colors[50] }}
                            >
                                Ready to <br />
                                <span style={{ color: colors[500] }}>Authorize</span> Your <br />
                                Next Practice<span style={{ color: colors[500] }}>.</span>
                            </h2>
                        </div>

                        <p className="text-base sm:text-lg md:text-xl font-light max-w-xl opacity-60 leading-relaxed" style={{ color: colors[200] }}>
                            Konaverse is a high-intent technical practice. We do not pitch; we partner.
                            If the logic aligns, we begin the architectural transition.
                        </p>
                    </div>

                    {/* Interaction Zone (Bottom-Right / Signature Feel) */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-end justify-center pt-20 sm:pt-24 lg:pt-0">
                        <div className="relative group w-full sm:w-auto">
                            {/* The "Living Node" - Forever Animation */}
                            <motion.div
                                className="absolute -top-10 -left-10 md:-top-12 md:-left-12 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full z-20"
                                style={{ backgroundColor: colors[500] }}
                                animate={shouldReduceMotion ? {} : {
                                    boxShadow: [
                                        `0 0 0px ${colors[500]}`,
                                        `0 0 15px ${colors[500]}`,
                                        `0 0 0px ${colors[500]}`
                                    ],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            <Button
                                href="/contact"
                                showCorners={true}
                                className="w-full sm:w-auto"
                            >
                                Initialize Engagement
                            </Button>

                            <div className="mt-6 md:mt-8 text-[9px] md:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-25 text-center lg:text-right" style={{ color: colors[200] }}>
                                Approved_for_Transition_v1.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
