"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  Code2, 
  Rocket, 
  Instagram, 
  BarChart3, 
  Sparkles,
  Zap,
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: "design",
    title: "Web Design",
    subtitle: "Stunning visuals that convert",
    description: "We craft pixel-perfect, conversion-focused websites that make your brand unforgettable. Every design tells your story.",
    icon: Palette,
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
    size: "large",
    stats: [
      { value: "100+", label: "Projects" },
      { value: "98%", label: "Satisfaction" },
    ],
  },
  {
    id: "dev",
    title: "Development",
    subtitle: "Code that performs",
    description: "From React to Next.js, we build fast, scalable web applications with clean, maintainable code.",
    icon: Code2,
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
    size: "medium",
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Grow your presence",
    description: "Strategic content and community management that builds your brand and drives engagement.",
    icon: Instagram,
    color: "from-pink-500 to-orange-500",
    bgGlow: "bg-pink-500/20",
    size: "medium",
  },
  {
    id: "seo",
    title: "SEO",
    subtitle: "Rank higher",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
    bgGlow: "bg-green-500/20",
    size: "small",
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Lightning fast",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgGlow: "bg-yellow-500/20",
    size: "small",
  },
  {
    id: "branding",
    title: "Branding",
    subtitle: "Stand out",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-500",
    bgGlow: "bg-indigo-500/20",
    size: "small",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.58, 1] as const,
    },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full overflow-hidden -mt-px -mb-px pt-32 md:pt-40 pb-24 md:pb-32">
      {/* Top fade gradient for smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-10" />
      
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium tracking-wider uppercase mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            What We{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Do Best
            </span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            End-to-end digital solutions that transform your vision into reality
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {/* Large Card - Web Design */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-8 md:p-10 hover:border-blue-500/30 transition-all duration-500"
          >
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${services[0].color} p-0.5 mb-6`}>
                <div className="w-full h-full rounded-2xl bg-[#0a0a1a] flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {services[0].title}
              </h3>
              <p className="text-blue-400 font-medium mb-4">{services[0].subtitle}</p>
              <p className="text-white/50 text-lg leading-relaxed mb-8 flex-grow">
                {services[0].description}
              </p>

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                {services[0].stats?.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-blue-400 font-medium group/link cursor-pointer">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Medium Card - Development */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-6 md:p-8 hover:border-purple-500/30 transition-all duration-500"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${services[1].color} p-0.5 shrink-0`}>
                <div className="w-full h-full rounded-xl bg-[#0a0a1a] flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white mb-1">{services[1].title}</h3>
                <p className="text-purple-400 font-medium text-sm mb-2">{services[1].subtitle}</p>
                <p className="text-white/40">{services[1].description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </motion.div>

          {/* Medium Card - Social Media */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-6 md:p-8 hover:border-pink-500/30 transition-all duration-500"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${services[2].color} p-0.5 shrink-0`}>
                <div className="w-full h-full rounded-xl bg-[#0a0a1a] flex items-center justify-center">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white mb-1">{services[2].title}</h3>
                <p className="text-pink-400 font-medium text-sm mb-2">{services[2].subtitle}</p>
                <p className="text-white/40">{services[2].description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </motion.div>

          {/* Small Cards Row */}
          {services.slice(3).map((service, i) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.06] p-6 hover:border-white/20 transition-all duration-500"
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 ${service.bgGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-xl bg-[#0a0a1a] flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                <p className="text-white/40 text-sm">{service.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 md:mt-24"
        >
          <a 
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300"
          >
            <span>Start Your Project</span>
            <Rocket className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none z-10" />
    </section>
  );
}
