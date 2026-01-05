"use client";

import HeroSection from "@/components/ui/hero-section";
import WhoWeAre from "@/components/sections/who-we-are";
import ScrollWordHero from "@/components/ui/scroll-word-hero";
import ServicesSection from "@/components/sections/services-section";

export default function Home() {
  return (
    <main className="relative bg-[#0a0b09]">
      {/* === Hero (Sticky - scrolls away after container) === */}
      <div className="relative h-[200vh]">
        <div className="sticky top-0 h-screen">
          <HeroSection />
        </div>
      </div>
      
      {/* === Who We Are (Overlaps Hero, then scrolls normally) === */}
      <div className="relative z-10">
        <WhoWeAre />
      </div>
      
      {/* === Sticky Word Cycle (Transition to Services) === */}
      <div className="relative z-10">
        <ScrollWordHero 
          items={['create.', 'design.', 'develop.', 'optimize.', 'deliver.']}
          hue={30}
          startVh={50}
          spaceVh={60}
        />
      </div>
      
      {/* === Services (Overlaps the sticky words) === */}
      <div className="relative z-20 services-overlap">
        <ServicesSection />
        </div>
      </main>
  );
}
