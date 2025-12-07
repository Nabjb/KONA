"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import { 
  Globe, 
  Palette, 
  Code2, 
  Rocket, 
  Instagram, 
  BarChart3, 
  PenTool, 
  Users,
  CheckCircle2
} from "lucide-react";

export default function ServicesSection() {
  const data = [
    {
      title: "Web Design",
      content: (
        <div>
          <p className="text-white/60 text-sm md:text-base font-normal mb-8 max-w-2xl">
            We create stunning, conversion-focused websites that make your brand stand out. 
            Every pixel is crafted with purpose to turn visitors into customers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Palette className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Custom Design</h4>
                <p className="text-white/40 text-sm">Unique designs tailored to your brand identity</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <Code2 className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Clean Code</h4>
                <p className="text-white/40 text-sm">Modern tech stack for speed & scalability</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-sky-500/10">
                <Globe className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">SEO Optimized</h4>
                <p className="text-white/40 text-sm">Built to rank on Google from day one</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Rocket className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Fast Performance</h4>
                <p className="text-white/40 text-sm">Lightning fast load times guaranteed</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Responsive on all devices
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Conversion-optimized layouts
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Ongoing support & maintenance
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Web Development",
      content: (
        <div>
          <p className="text-white/60 text-sm md:text-base font-normal mb-8 max-w-2xl">
            From simple landing pages to complex web applications, we build robust, 
            scalable solutions using cutting-edge technologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Code2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">React & Next.js</h4>
                <p className="text-white/40 text-sm">Modern frameworks for modern websites</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Globe className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">E-Commerce</h4>
                <p className="text-white/40 text-sm">Online stores that drive sales</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Dashboards</h4>
                <p className="text-white/40 text-sm">Custom admin panels & analytics</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-pink-500/10">
                <Rocket className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Web Apps</h4>
                <p className="text-white/40 text-sm">Full-stack applications & SaaS</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              API integrations & automation
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Database design & management
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Hosting & deployment included
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Social Media",
      content: (
        <div>
          <p className="text-white/60 text-sm md:text-base font-normal mb-8 max-w-2xl">
            Grow your brand presence and engage your audience with strategic social media 
            management that drives real results.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-pink-500/10">
                <Instagram className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Content Creation</h4>
                <p className="text-white/40 text-sm">Eye-catching posts & stories</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Analytics</h4>
                <p className="text-white/40 text-sm">Data-driven growth strategies</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <PenTool className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Brand Strategy</h4>
                <p className="text-white/40 text-sm">Consistent voice & visual identity</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Community</h4>
                <p className="text-white/40 text-sm">Engage & grow your audience</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Monthly content calendars
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Hashtag & trend research
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Performance reports
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#030014]">
      {/* Top fade for smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030014] to-transparent z-10 pointer-events-none" />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
      
      {/* Section header with Orbiting Skills */}
      <div className="max-w-7xl mx-auto pt-20 md:pt-32 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-4xl mb-4">
              What We{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Do Best
              </span>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl">
              From concept to launch, we provide end-to-end digital solutions that help your business grow.
            </p>
          </div>
          
          {/* Orbiting Skills - Hidden on mobile for performance */}
          <div className="hidden lg:block">
            <OrbitingSkills />
          </div>
        </div>
      </div>

      <Timeline data={data} />
    </section>
  );
}

