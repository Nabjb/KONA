"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { Marquee } from "@/components/ui/marquee";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FloatingParticles } from "@/components/ui/floating-particles";

// Elegant floating shape with parallax
function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    parallaxSpeed = 0,
    scrollYProgress,
    shapeOpacity,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    parallaxSpeed?: number;
    scrollYProgress?: any;
    shapeOpacity?: any;
}) {
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
            style={{ y: parallaxSpeed ? y : 0, opacity: shapeOpacity }}
            className={cn("absolute pointer-events-none", className)}
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


export default function ParallaxHeroWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms for hero content
    const heroTitleY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
    const heroSubtitleY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
    const heroBadgeY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    
    // Shapes fade out when MacBook screen fades (around 50-75% scroll progress)
    const shapesOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

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
        <div ref={containerRef} className="relative bg-[#030014]">
            {/* Unified background that spans all sections - simplified on mobile */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep blue luxury gradient background - no blur on mobile */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/[0.15] via-transparent to-indigo-950/[0.15] md:blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)]" />
                <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
                
                {/* Floating particles - mobile only (lightweight alternative to shapes) */}
                {isMobile && <FloatingParticles particleCount={40} enableParallax={true} />}
            </div>

            {/* Floating shapes with parallax - DESKTOP ONLY for performance */}
            {!isMobile && (
                <motion.div 
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ opacity: shapesOpacity }}
                >
                    {/* Top layer shapes */}
                    <ElegantShape
                        delay={0.3}
                        width={600}
                        height={140}
                        rotate={12}
                        gradient="from-blue-500/[0.12]"
                        className="left-[-10%] md:left-[-5%] top-[15%]"
                        parallaxSpeed={-150}
                        scrollYProgress={scrollYProgress}
                    />
                    <ElegantShape
                        delay={0.6}
                        width={200}
                        height={60}
                        rotate={20}
                        gradient="from-blue-300/[0.10]"
                        className="right-[15%] md:right-[20%] top-[10%]"
                        parallaxSpeed={-250}
                        scrollYProgress={scrollYProgress}
                    />
                    <ElegantShape
                        delay={0.7}
                        width={150}
                        height={40}
                        rotate={-25}
                        gradient="from-indigo-300/[0.10]"
                        className="left-[20%] md:left-[25%] top-[5%]"
                        parallaxSpeed={-300}
                        scrollYProgress={scrollYProgress}
                    />
                    
                    {/* Middle layer shapes */}
                    <ElegantShape
                        delay={0.5}
                        width={500}
                        height={120}
                        rotate={-15}
                        gradient="from-indigo-400/[0.12]"
                        className="right-[-5%] md:right-[0%] top-[45%]"
                        parallaxSpeed={-200}
                        scrollYProgress={scrollYProgress}
                    />
                    <ElegantShape
                        delay={0.4}
                        width={300}
                        height={80}
                        rotate={-8}
                        gradient="from-sky-500/[0.12]"
                        className="left-[5%] md:left-[10%] top-[55%]"
                        parallaxSpeed={-180}
                        scrollYProgress={scrollYProgress}
                    />
                </motion.div>
            )}

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                {/* MOBILE HERO - Full-width bold takeover */}
                <div className="md:hidden relative z-10 w-full min-h-screen flex flex-col justify-center px-5 py-20">
                    {/* Konaverse VERSE header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8"
                    >
                        <span className="text-2xl font-bold tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Konaverseverse
                        </span>
                    </motion.div>

                    {/* Title - HUGE stacked lines */}
                    <div className="space-y-1 mb-8">
                        <motion.h1
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
                            className="text-[13vw] leading-[0.9] font-semibold tracking-tight text-white"
                        >
                            We Build
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] as const }}
                            className="text-[13vw] leading-[0.9] font-semibold tracking-tight text-white"
                        >
                            Websites
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
                            className="text-[13vw] leading-[0.9] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400"
                        >
                            That Print
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.75, ease: [0.25, 0.4, 0.25, 1] as const }}
                            className="text-[13vw] leading-[0.9] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400"
                        >
                            Money
                        </motion.h1>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="text-white/50 text-base leading-relaxed mb-10 max-w-[280px]"
                    >
                        Premium web design for brands that refuse to blend in.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.05 }}
                    >
                        <a 
                            href="#contact"
                            className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-blue-500/25"
                        >
                            Book a Free Call
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>

                    {/* Trust badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="mt-12 flex items-center gap-3"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-[#030014]" />
                            ))}
                        </div>
                        <p className="text-white/40 text-sm">
                            Trusted by <span className="text-white/60 font-medium">50+</span> brands
                        </p>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-8 left-5"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
                            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* DESKTOP HERO - Original centered layout */}
                <motion.div 
                    className="hidden md:block relative z-10 container mx-auto px-4 md:px-6"
                    style={{ opacity: heroOpacity }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ y: heroBadgeY }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                        >
                            <Circle className="h-2 w-2 fill-blue-400 text-blue-400" />
                            <span className="text-sm text-white/60 tracking-widest uppercase font-medium">
                                Konaverse SOCIALS
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ y: heroTitleY }}
                        >
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                    We Build Websites
                                </span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-sky-300">
                                    That Print Money
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ y: heroSubtitleY }}
                        >
                            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 md:mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                                Premium web design & social media management for brands that refuse to blend in.
                            </p>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ y: heroSubtitleY }}
                            className="flex justify-center"
                        >
                            <a href="#contact">
                                <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    className="bg-[#030014] text-white flex items-center gap-3 px-6 py-3 text-lg font-semibold"
                                >
                                    Book a Free Strategy Call
                                    <ArrowRight className="w-5 h-5" />
                                </HoverBorderGradient>
                            </a>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div
                            custom={4}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ y: heroSubtitleY }}
                            className="mt-12 md:mt-16"
                        >
                            <p className="text-white/30 text-sm tracking-wide mb-6">
                                Trusted by <span className="text-white/50 font-medium">50+</span> brands worldwide
                            </p>
                            
                            {/* Tech Stack Marquee - hidden on mobile for performance */}
                            <Marquee pauseOnHover speed={30} className="max-w-3xl mx-auto hidden md:flex">
                                {/* React */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
                                        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
                                        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
                                        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">React</span>
                                </div>
                                
                                {/* Next.js */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">Next.js</span>
                                </div>
                                
                                {/* TypeScript */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3178C6">
                                        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">TypeScript</span>
                                </div>
                                
                                {/* JavaScript */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F7DF1E">
                                        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">JavaScript</span>
                                </div>
                                
                                {/* HTML5 */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E34F26">
                                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">HTML5</span>
                                </div>
                                
                                {/* CSS3 */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1572B6">
                                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">CSS3</span>
                                </div>
                                
                                {/* Tailwind CSS */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#06B6D4">
                                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">Tailwind</span>
                                </div>
                                
                                {/* Node.js */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#339933">
                                        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147.037c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">Node.js</span>
                                </div>
                                
                                {/* Framer Motion */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0055FF">
                                        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">Framer</span>
                                </div>
                                
                                {/* Figma */}
                                <div className="mx-4 flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#F24E1E" d="M5.5 8.5c0-1.933 1.567-3.5 3.5-3.5H12v7H9c-1.933 0-3.5-1.567-3.5-3.5z"/>
                                        <path fill="#FF7262" d="M12 5h3c1.933 0 3.5 1.567 3.5 3.5S16.933 12 15 12h-3V5z"/>
                                        <path fill="#A259FF" d="M5.5 15.5c0-1.933 1.567-3.5 3.5-3.5H12v3.5c0 1.933-1.567 3.5-3.5 3.5S5.5 17.433 5.5 15.5z"/>
                                        <path fill="#1ABCFE" d="M12 12h3c1.933 0 3.5 1.567 3.5 3.5S16.933 19 15 19s-3.5-1.567-3.5-3.5V12z"/>
                                        <path fill="#0ACF83" d="M5.5 1.5C5.5-.433 7.067-2 9-2h3v7H9c-1.933 0-3.5-1.567-3.5-3.5z" transform="translate(0 7)"/>
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">Figma</span>
                                </div>
                            </Marquee>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll hint - Desktop only */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
                >
                    <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
                    >
                        <motion.div className="w-1 h-2 rounded-full bg-white/40" />
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}


