"use client";

import ServicesStickySection from "@/components/sections/services-sticky-section";
import SiteNavbar from "@/components/layout/site-navbar";
import HeroWhyUsWrapper from "@/components/sections/hero-why-us-wrapper";
import WhyUsSection from "@/components/sections/why-us-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import ProjectsVideoSection from "@/components/sections/projects-video-section";
import { AstronautZoomPortal } from "@/components/ui/astronaut-zoom-portal";

// Generate stars for shared background
function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    });
  }
  return stars;
}

const sharedStars = generateStars(300);

export default function Home() {
  return (
    <main>
      <SiteNavbar />
      <HeroWhyUsWrapper />
      {/* Connected starry background sections */}
      <div className="relative bg-[#030014]">
        {/* Shared stars background for all sections */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sharedStars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
        <WhyUsSection />
        <AstronautZoomPortal />
        <ProjectsVideoSection />
        <ServicesStickySection />
        <AboutSection />
        <ContactSection />
        <Footer />
        </div>
      </main>
  );
}
