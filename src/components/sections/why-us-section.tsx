"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Conversion Focused",
    description: "Every pixel designed to drive action",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description: "Data-backed design decisions",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Growth Driven",
    description: "Websites that scale with you",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Attention to every detail",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function WhyUsSection() {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full py-32 md:py-40 overflow-hidden -mt-px -mb-px">
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Gradient orbs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute left-[-10%] top-[20%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute right-[-10%] bottom-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Top section - Label and main headline */}
        <div className="text-center mb-20">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-white/60 tracking-wider uppercase font-medium">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 max-w-5xl mx-auto"
          >
            <span className="text-white">We turn websites into </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              revenue machines
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto"
          >
            Messaging, UX, visuals, and structure — rebuilt to impress visitors and convert them into paying customers.
          </motion.p>
        </div>

        {/* Feature cards */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] md:hover:border-white/10 md:hover:bg-white/[0.04] md:hover:-translate-y-1 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} p-[1px] mb-5`}>
                <div className="w-full h-full rounded-xl bg-[#0a0a1a] flex items-center justify-center">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              
              {/* Text */}
              <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat highlight */}
        <motion.div
          variants={itemVariants}
          className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              3x
            </div>
            <div className="text-left">
              <p className="text-white/60 text-sm">Average</p>
              <p className="text-white font-medium">ROI Increase</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-white/10" />
          
          <div className="flex items-center gap-4">
            <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              98%
            </div>
            <div className="text-left">
              <p className="text-white/60 text-sm">Client</p>
              <p className="text-white font-medium">Satisfaction</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-white/10" />
          
          <div className="flex items-center gap-4">
            <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
              50+
            </div>
            <div className="text-left">
              <p className="text-white/60 text-sm">Projects</p>
              <p className="text-white font-medium">Delivered</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none z-10" />
    </section>
  );
}
