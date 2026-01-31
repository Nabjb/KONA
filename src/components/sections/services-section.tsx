"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiVercel,
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiYoutube,
  SiGoogleads,
  SiMeta,
  SiGoogleanalytics,
  SiMailchimp
} from "react-icons/si";

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

const serviceColors = {
  "01": { accent: "#4a6670", gradient: "from-[#1a1d18] via-[#0a1015] to-[#1a2025]" },
  "02": { accent: "#4a6a5a", gradient: "from-[#1a1d18] via-[#0a120f] to-[#1a2520]" },
  "03": { accent: "#7a5a4a", gradient: "from-[#1a1d18] via-[#15100a] to-[#25201a]" },
  "04": { accent: "#5a4a6a", gradient: "from-[#1a1d18] via-[#120a15] to-[#201a25]" },
};

// Icons for each service
const serviceIcons = {
  "01": [
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
    { icon: SiCss3, name: "CSS3", color: "#1572B6" },
    { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  ],
  "02": [
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
    { icon: SiVercel, name: "Vercel", color: "#ffffff" },
  ],
  "03": [
    { icon: SiInstagram, name: "Instagram", color: "#E4405F" },
    { icon: SiFacebook, name: "Facebook", color: "#1877F2" },
    { icon: SiTiktok, name: "TikTok", color: "#ffffff" },
    { icon: SiYoutube, name: "YouTube", color: "#FF0000" },
  ],
  "04": [
    { icon: SiGoogleads, name: "Google Ads", color: "#4285F4" },
    { icon: SiMeta, name: "Meta Ads", color: "#0081FB" },
    { icon: SiGoogleanalytics, name: "Analytics", color: "#E37400" },
    { icon: SiMailchimp, name: "Email", color: "#FFE01B" },
  ],
};

const serviceImages = {
  "01": "/images/bg-iso-webdev.png",
  "02": "/images/bg-iso-webapp.png",
  "03": "/images/bg-iso-social.png",
  "04": "/images/bg-iso-ads.png",
};

interface ServiceCardProps {
  number: "01" | "02" | "03" | "04";
  title: string;
  description: string;
  features: string[];
  zIndex: number;
}

function ServiceCard({ number, title, description, features, zIndex }: ServiceCardProps) {
  const colorScheme = serviceColors[number];
  const icons = serviceIcons[number];
  const imageSrc = serviceImages[number];
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-hidden py-16 md:py-0 isolation-isolate bg-[#1a1d18]"
      style={{
        zIndex,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
    >
      {/* Technical Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Isometric Image with Dark Blueprint Treatment */}
        <motion.div
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{ y }}
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: "invert(1) grayscale(100%) contrast(150%) brightness(0.6) opacity(0.15)",
              mixBlendMode: "screen"
            }}
          />
        </motion.div>

        {/* Architectural Grid Overlay (Light Lines) */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${colors[100]} 1px, transparent 1px),
              linear-gradient(to bottom, ${colors[100]} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] font-bold leading-none pointer-events-none select-none"
        style={{
          color: colors[200],
          opacity: 0.03,
          fontFamily: 'monospace'
        }}
      >
        {number}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-16 w-full">
        <div className="grid grid-cols-12 gap-4 md:gap-8">

          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div
              className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4"
              style={{ color: colorScheme.accent }}
            >
              Service {number}
            </div>
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-extralight leading-tight drop-shadow-2xl"
              style={{ color: colors[50] }}
            >
              {title}
            </h2>
            <div
              className="w-8 md:w-12 h-px mt-4 md:mt-6 mb-4 md:mb-0"
              style={{ background: `linear-gradient(to right, ${colorScheme.accent}, transparent)` }}
            />

            {/* Tech/Platform Icons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {icons.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    style={{
                      background: `${colorScheme.accent}20`,
                      border: `1px solid ${colorScheme.accent}40`
                    }}
                  >
                    <IconComponent
                      className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 drop-shadow-lg"
                      style={{ color: item.color }}
                    />
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                      style={{ background: colors[800], color: colors[100] }}
                    >
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7">
            <p
              className="text-base md:text-xl font-light leading-relaxed mb-5 md:mb-8 drop-shadow-lg"
              style={{ color: colors[100] }}
            >
              {description}
            </p>

            <div className="space-y-2.5 md:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4">
                  <div
                    className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full mt-2 md:mt-2.5 flex-shrink-0 shadow-[0_0_10px_currentColor]"
                    style={{ background: colorScheme.accent, color: colorScheme.accent }}
                  />
                  <p className="text-sm md:text-lg font-light drop-shadow-md" style={{ color: colors[200] }}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-6 md:w-8 h-px" style={{ background: `linear-gradient(to right, ${colorScheme.accent}60, transparent)` }} />
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-px h-6 md:h-8" style={{ background: `linear-gradient(to bottom, ${colorScheme.accent}60, transparent)` }} />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 md:w-8 h-px" style={{ background: `linear-gradient(to left, ${colorScheme.accent}60, transparent)` }} />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-px h-6 md:h-8" style={{ background: `linear-gradient(to top, ${colorScheme.accent}60, transparent)` }} />

      {number === "01" && (
        <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <div className="text-xs font-mono uppercase tracking-widest" style={{ color: colors[400] }}>Scroll</div>
          <div className="w-px h-8 scroll-indicator" style={{ background: `linear-gradient(to bottom, ${colors[400]}, transparent)` }} />
        </div>
      )}
    </div>
  );
}

const services: { number: "01" | "02" | "03" | "04"; title: string; description: string; features: string[] }[] = [
  {
    number: "01",
    title: "Web Development",
    description: "We build fast, scalable, and beautifully crafted websites that perform.",
    features: [
      "Search Engine Optimization (SEO)",
      "Custom web design tailored to your brand",
      "Responsive across all devices",
      "Performance-first architecture",
    ],
  },
  {
    number: "02",
    title: "Web Applications",
    description: "Full-stack applications that solve real problems and scale with your business.",
    features: [
      "Custom dashboards and admin panels",
      "SaaS product development",
      "API integrations and automation",
      "Real-time features and databases",
    ],
  },
  {
    number: "03",
    title: "Social Media",
    description: "Content that captures attention and builds community around your brand.",
    features: [
      "Instagram and Facebook visuals",
      "Curated post strategies",
      "Professional drone videography",
      "Cohesive brand storytelling",
    ],
  },
  {
    number: "04",
    title: "Digital Advertising",
    description: "Strategic campaigns that reach the right people at the right time.",
    features: [
      "Paid social media campaigns",
      "Google Ads management",
      "Conversion tracking and analytics",
      "A/B testing and optimization",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="relative">
      {services.map((service, index) => (
        <ServiceCard
          key={service.number}
          number={service.number}
          title={service.title}
          description={service.description}
          features={service.features}
          zIndex={index + 1}
        />
      ))}
    </section>
  );
}

export default ServicesSection;
