"use client";

import ServicesSection from "@/components/sections/services-section";
import SiteNavbar from "@/components/layout/site-navbar";
import ParallaxHeroWrapper from "@/components/sections/parallax-hero-wrapper";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import ProjectsShowcase from "@/components/sections/projects-showcase";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  return (
    <LoadingScreen minimumLoadTime={2500}>
      <main>
        <SiteNavbar />
        <ParallaxHeroWrapper />
        <ProjectsShowcase />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </LoadingScreen>
  );
}
