"use client";

import SiteNavbar from "@/components/layout/site-navbar";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import ProjectsVideoSection from "@/components/sections/projects-video-section";
import MissionSection from "@/components/sections/mission-section";
import PlanetsSection from "@/components/sections/planets-section";
import dynamic from "next/dynamic";

// Dynamically import Genesis Hero (client-side only for Three.js)
const GenesisHero = dynamic(() => import("@/components/ui/genesis-hero"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-white/50 text-sm tracking-wider">Initializing universe...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="bg-black">
      {/* Navbar - fixed on top */}
      <SiteNavbar />
      
      {/* CHAPTER 1: Genesis - The Big Bang */}
      <GenesisHero />
      
      {/* CHAPTER 2: The Mission Briefing */}
      <MissionSection />
      
      {/* CHAPTER 3: Discover the Planets (Services) */}
      <PlanetsSection />
      
      {/* CHAPTER 4: Space Station (Projects) */}
      <section className="relative bg-[#030014]">
        <ProjectsVideoSection />
      </section>
      
      {/* CHAPTER 5: About - Meet the Crew */}
      <AboutSection />
      
      {/* CHAPTER 6: Contact - Transmit Signal */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
