"use client";

import React, { useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Palette, 
  Code2, 
  Instagram, 
  Globe, 
  Sparkles,
} from "lucide-react";

// Brand colors - consistent blue/purple gradient
const brandGradient = "from-blue-500 via-purple-500 to-pink-500";

const services = [
  {
    id: "design",
    title: "Web Design",
    subtitle: "Stunning visuals that convert",
    description: "We craft pixel-perfect, conversion-focused websites that make your brand unforgettable. Every design tells your story and drives action.",
    icon: Palette,
  },
  {
    id: "dev",
    title: "Development",
    subtitle: "Code that performs",
    description: "From React to Next.js, we build fast, scalable web applications with clean, maintainable code that grows with your business.",
    icon: Code2,
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Grow your presence",
    description: "Strategic content and community management that builds your brand, drives engagement, and converts followers into customers.",
    icon: Instagram,
  },
  {
    id: "seo",
    title: "SEO & Performance",
    subtitle: "Rank higher, load faster",
    description: "We optimize your website for search engines and speed, ensuring you're found by the right people at the right time.",
    icon: Globe,
  },
  {
    id: "branding",
    title: "Branding",
    subtitle: "Stand out from the crowd",
    description: "From logos to complete brand identities, we create memorable visual systems that resonate with your target audience.",
    icon: Sparkles,
  },
];

export default function ServicesStickySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = React.useState(0);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = services.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Offset for header content (roughly 20% of scroll is header)
    const headerOffset = 0.15;
    // Remaining scroll area for cards
    const scrollableArea = 1 - headerOffset - 0.1; // Leave some buffer at end
    
    // Calculate breakpoints centered on each card
    const cardsBreakpoints = services.map((_, index) => {
      return headerOffset + (index / cardLength) * scrollableArea;
    });
    
    // Find which card should be active based on scroll position
    let activeIndex = 0;
    for (let i = 0; i < cardsBreakpoints.length; i++) {
      if (latest >= cardsBreakpoints[i]) {
        activeIndex = i;
      }
    }
    
    setActiveCard(activeIndex);
  });

  return (
    <section id="services" className="relative bg-[#030014] overflow-hidden">
      {/* Top fade - blends with section above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-20" />

      <div className="flex h-screen">
        {/* Left Side - Sticky Astronaut */}
        <div className="hidden md:block w-1/2 h-full relative overflow-visible">
          <div className="sticky top-0 h-screen">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Glow behind astronaut */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-transparent blur-3xl" />
              <img
                src="/astronaut_side.png"
                alt="Astronaut"
                className="absolute top-1/2 -translate-y-1/2 -left-[30%] h-[95vh] w-auto max-w-none object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Right Side - Scrollable Services */}
        <div className="w-full md:w-1/2 h-screen relative">
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-10" />
          
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none z-10" />
          
          <div 
            ref={containerRef}
            className="h-full overflow-y-auto scrollbar-hide"
          >
          <div className="px-6 md:px-12 lg:px-16 py-20">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
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

            {/* Services List - Normal scrolling, active highlighted */}
            <div className="space-y-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeCard === index;
                
                return (
                  <motion.div
                    key={service.id}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                  >
                    {/* Glow effect when active */}
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${brandGradient} blur-xl rounded-2xl transition-opacity duration-500 ${
                        isActive ? 'opacity-10' : 'opacity-0'
                      }`} 
                    />
                    
                    <div className="relative flex gap-5">
                      {/* Icon */}
                      <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${brandGradient} p-[1px]`}>
                        <div className="w-full h-full rounded-xl bg-[#0a0a1a] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${brandGradient} mb-2`}>
                          {service.subtitle}
                        </p>
                        <p className="text-white/50 text-base leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom spacer */}
            <div className="h-[40vh]" />
          </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030014] via-[#030014] to-transparent pointer-events-none z-20" />
    </section>
  );
}
