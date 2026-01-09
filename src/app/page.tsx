"use client";

import HeroSection from "@/components/ui/hero-section";
import ServicesSection from "@/components/sections/services-section";
import WhoWeAre from "@/components/sections/who-we-are";
import GiatsProjectsSection from "@/components/sections/giats-projects-section";

export default function Home() {
  return (
    <main className="relative bg-[#1a1d18]">
      {/* Fixed Hero - stays in place */}
      <div className="fixed inset-0 z-0">
        <HeroSection />
      </div>
      
      {/* Spacer - creates scroll room before content appears */}
      <div className="h-screen" />
      
      {/* Services - scrolls over the hero, internal stacking */}
      <div className="relative z-10">
        <ServicesSection />
      </div>
      
      {/* Who We Are - scrolls over services */}
      <div className="relative z-20">
        <WhoWeAre />
      </div>

      {/* Projects - giats.me inspired horizontal scroll */}
      <div className="relative z-30">
        <GiatsProjectsSection />
      </div>
    </main>
  );
}
