"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    parallaxSpeed = 0,
    scrollYProgress,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    parallaxSpeed?: number;
    scrollYProgress?: MotionValue<number>;
}) {
    // Create parallax transform based on scroll
    const y = useTransform(
        scrollYProgress || { get: () => 0, getVelocity: () => 0 },
        [0, 1],
        [0, parallaxSpeed]
    );

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96] as const,
                opacity: { duration: 1.2 },
            }}
            style={{ y: parallaxSpeed ? y : 0 }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Konaverse SOCIALS",
    title1 = "We Build Websites",
    title2 = "That Print Money",
    subtitle = "Premium web design & social media management for brands that refuse to blend in.",
    ctaText = "Book a Free Strategy Call",
    onCtaClick,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    subtitle?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms for different elements
    const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const badgeY = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as const,
            },
        }),
    };

    return (
        <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030014]">
            {/* Deep blue luxury gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/[0.15] via-transparent to-indigo-950/[0.15] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
            
            {/* Floating shapes with parallax - different speeds create depth */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Slowest (furthest back) */}
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-500/[0.12]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                    parallaxSpeed={-100}
                    scrollYProgress={scrollYProgress}
                />
                {/* Layer 2 */}
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-indigo-400/[0.12]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                    parallaxSpeed={-200}
                    scrollYProgress={scrollYProgress}
                />
                {/* Layer 3 */}
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-sky-500/[0.12]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                    parallaxSpeed={-150}
                    scrollYProgress={scrollYProgress}
                />
                {/* Layer 4 - Fastest (closest) */}
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-blue-300/[0.10]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                    parallaxSpeed={-250}
                    scrollYProgress={scrollYProgress}
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-indigo-300/[0.10]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                    parallaxSpeed={-300}
                    scrollYProgress={scrollYProgress}
                />
            </div>

            {/* Main content with parallax */}
            <motion.div 
                className="relative z-10 container mx-auto px-4 md:px-6"
                style={{ opacity }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: badgeY }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                    >
                        <Circle className="h-2 w-2 fill-blue-400 text-blue-400" />
                        <span className="text-sm text-white/60 tracking-widest uppercase font-medium">
                            {badge}
                        </span>
                    </motion.div>

                    {/* Title with parallax */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: titleY }}
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-sky-300"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle with parallax */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: subtitleY }}
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 md:mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                            {subtitle}
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: subtitleY }}
                    >
                        <button
                            onClick={onCtaClick}
                            className={cn(
                                "group relative inline-flex items-center gap-3 px-8 py-4 rounded-full",
                                "bg-gradient-to-r from-blue-500 to-indigo-500",
                                "text-white font-semibold text-lg",
                                "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
                                "hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]",
                                "hover:scale-105 transition-all duration-300",
                                "border border-white/10"
                            )}
                        >
                            {ctaText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: subtitleY }}
                        className="mt-12 md:mt-16"
                    >
                        <p className="text-white/30 text-sm tracking-wide">
                            Trusted by <span className="text-white/50 font-medium">50+</span> brands worldwide
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric, ElegantShape };


