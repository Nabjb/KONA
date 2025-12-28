"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Code2, 
  Instagram, 
  Globe, 
  Sparkles,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/grid-glow-effect-purple-blue";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "design",
    title: "Web Design",
    subtitle: "Stunning visuals that convert",
    description: "We craft pixel-perfect, conversion-focused websites that make your brand unforgettable.",
    icon: Palette,
    area: "col-[1/3] row-[1/3]",
  },
  {
    id: "dev",
    title: "Development",
    subtitle: "Code that performs",
    description: "From React to Next.js, we build fast, scalable web applications with clean, maintainable code.",
    icon: Code2,
    area: "col-[4/6] row-[1/3]",
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Grow your presence",
    description: "Strategic content and community management that builds your brand and drives engagement.",
    icon: Instagram,
    area: "col-[1/3] row-[4/6]",
  },
  {
    id: "seo",
    title: "SEO & Performance",
    subtitle: "Rank higher, load faster",
    description: "We optimize your website for search engines and speed, ensuring you're found by the right people.",
    icon: Globe,
    area: "col-[4/6] row-[4/6]",
  },
  {
    id: "branding",
    title: "Branding",
    subtitle: "Stand out from the crowd",
    description: "From logos to complete brand identities, we create memorable visual systems.",
    icon: Sparkles,
    area: "col-[1/6] row-[3/4]",
  },
];

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const GridItem = ({ area, icon, title, subtitle, description }: GridItemProps) => {
  return (
    <li className={cn("list-none min-h-[12rem] max-md:min-h-[16rem]", area)}>
      <div className="relative h-full rounded-[1.25rem] border border-white/10 p-4 md:rounded-[1.5rem] md:p-6 bg-white/[0.03] backdrop-blur-sm">
        <GlowingEffect
          spread={45}
          glow={true}
          disabled={false}
          proximity={70}
          inactiveZone={0.05}
          borderWidth={2}
          variant="blue-purple"
          blur={1}
          movementDuration={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 md:p-6 lg:p-8">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2.5 md:p-3 shadow-sm">
              <div className="text-blue-400">{icon}</div>
            </div>
            <div className="space-y-2">
              <h3 className="pt-0.5 text-lg md:text-xl lg:text-2xl font-semibold text-white">
                {title}
              </h3>
              <p className="text-xs md:text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {subtitle}
              </p>
              <p className="text-sm md:text-base text-white/60 font-medium leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function ServicesStickySection() {
  return (
    <section id="services" className="relative bg-[#030014] overflow-hidden py-20 md:py-32">
      {/* Top fade - blends with section above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-20" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            What We{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Do Best
            </span>
          </h2>
        </motion.div>

        {/* Glowing Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <ul
            className={cn(
              "grid gap-4 w-full max-w-5xl h-auto min-h-[38rem]",
              "grid-cols-[1fr_1fr_0.1fr_1fr_1fr]",
              "grid-rows-[1fr_1fr_0.1fr_1fr_1fr]",
              "max-md:grid-cols-1 max-md:grid-rows-none max-md:min-h-0 max-md:max-w-full max-md:gap-6"
            )}
          >
            {/* Desktop Grid Items */}
            {services.map((service) => (
              <GridItem
                key={service.id}
                area={service.area}
                icon={<service.icon className="h-5 w-5 md:h-6 md:w-6" />}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
              />
            ))}

            {/* Center Element (Desktop only) */}
            <li className="col-[3/4] row-[3/4] hidden md:flex items-center justify-center">
              <div className="relative w-8 h-8 rounded-full bg-white/10 border border-white/20 shadow-lg shadow-blue-500/30">
                <GlowingEffect
                  spread={45}
                  glow={true}
                  disabled={false}
                  proximity={70}
                  inactiveZone={0.05}
                  borderWidth={2}
                  variant="blue-purple"
                  blur={1}
                  movementDuration={2}
                />
                <div className="absolute inset-1 rounded-full bg-[#030014]" />
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030014] via-[#030014] to-transparent pointer-events-none z-20" />
    </section>
  );
}
