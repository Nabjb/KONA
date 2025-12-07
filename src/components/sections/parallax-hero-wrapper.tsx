"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";

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
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    parallaxSpeed?: number;
    scrollYProgress?: any;
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
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            style={{ y: parallaxSpeed ? y : 0 }}
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

// Project data for the gallery
const projects: GalleryItem[] = [
  {
    id: 1,
    title: "APT Metal Construction",
    description: "Metal construction company in Cyprus",
    src: "/kona websites screenshots/apt_macbook.png",
    link: "https://www.aptmetalconstruction.com",
  },
  {
    id: 2,
    title: "Sivory Design",
    description: "Premium pergolas & outdoor design",
    src: "/kona websites screenshots/sivory_macbook.png",
    link: "https://sivory.vercel.app",
  },
  {
    id: 3,
    title: "TDK Design & Build",
    description: "Residential development in Nicosia",
    src: "/kona websites screenshots/tdk_macbook.png",
    link: "https://tdkdb.com",
  },
  {
    id: 4,
    title: "Corn Revolution",
    description: "Interactive brand experience by Pioneer",
    src: "/kona websites screenshots/cornrevolution.png",
    link: "https://cornrevolution.resn.global",
  },
  {
    id: 5,
    title: "E-Cars Cyprus",
    description: "Luxury car dealership - Bentley & Maserati",
    src: "/kona websites screenshots/ecars.png",
    link: "https://www.e-carscyprus.com",
  },
  {
    id: 6,
    title: "Inter-M Traders",
    description: "Strategic consulting & investment firm",
    src: "/kona websites screenshots/interM.png",
    link: "https://www.intermtraders.com",
  },
];

const desktopProjects = projects.slice(0, 3);

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
            {/* Unified background that spans all sections */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep blue luxury gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/[0.15] via-transparent to-indigo-950/[0.15] blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
            </div>

            {/* Floating shapes with parallax */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                
                {/* Lower shapes for portfolio/gallery sections */}
                <ElegantShape
                    delay={0.8}
                    width={450}
                    height={110}
                    rotate={15}
                    gradient="from-blue-400/[0.10]"
                    className="right-[5%] top-[75%]"
                    parallaxSpeed={-120}
                    scrollYProgress={scrollYProgress}
                />
                <ElegantShape
                    delay={0.9}
                    width={380}
                    height={95}
                    rotate={-18}
                    gradient="from-indigo-500/[0.10]"
                    className="left-[-5%] top-[85%]"
                    parallaxSpeed={-100}
                    scrollYProgress={scrollYProgress}
                />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    className="relative z-10 container mx-auto px-4 md:px-6"
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
                                KONA SOCIALS
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
                        >
                            <button
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
                                Book a Free Strategy Call
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
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
                            <p className="text-white/30 text-sm tracking-wide">
                                Trusted by <span className="text-white/50 font-medium">50+</span> brands worldwide
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ===== PORTFOLIO SECTION (MacBook) ===== */}
            <section className="relative w-full overflow-hidden hidden md:block">
                <div className="relative z-[5]">
                    <MacbookScroll
                        projects={desktopProjects}
                        title={
                            <span className="text-4xl md:text-5xl">
                                Our Work Speaks <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                    For Itself
                                </span>
                            </span>
                        }
                        showGradient={false}
                    />
                </div>
            </section>

            {/* ===== PROJECTS GALLERY ===== */}
            <section className="relative w-full py-16 md:py-32 overflow-hidden">
                <div className="relative z-[5] max-w-7xl mx-auto px-4">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Explore Our{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                Projects
                            </span>
                        </h2>
                        <p className="text-white/50 text-lg max-w-2xl mx-auto">
                            Drag to explore or let it spin. Click any project to see it live.
                        </p>
                    </motion.div>

                    {/* 3D Gallery */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="pb-40 md:pb-56"
                    >
                        <CircularGallery 
                            items={projects} 
                            radius={isMobile ? 220 : 380}
                            autoRotateSpeed={0.35}
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

