"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic import for the Earth Globe (client-side only)
const EarthGlobe = dynamic(() => import("@/components/ui/earth-globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#030014] flex items-center justify-center">
      <div className="text-cyan-400 font-mono animate-pulse">
        INITIALIZING GLOBAL VIEW...
      </div>
    </div>
  ),
});

export default function GlobalProjectsSection() {
  return (
    <section id="projects-showcase" className="relative w-full overflow-hidden">
      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-16 pb-8 px-4 md:px-8 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400 font-mono">GLOBAL PRESENCE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Projects Around</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                The World
              </span>
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
              Explore our work across continents. Click any marker to see project details.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Earth Globe */}
      <EarthGlobe />

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-20 px-4 md:px-8 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Countries", value: "12+" },
              { label: "Projects", value: "50+" },
              { label: "Industries", value: "15+" },
              { label: "Success Rate", value: "98%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10"
              >
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

