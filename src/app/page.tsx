import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import PortfolioSection from "@/components/sections/portfolio-section";
import ProjectsGallery from "@/components/sections/projects-gallery";
import ServicesSection from "@/components/sections/services-section";

export default function Home() {
  return (
    <main>
      <HeroGeometric 
        badge="KONA SOCIALS"
        title1="We Build Websites"
        title2="That Print Money"
        subtitle="Premium web design & social media management for brands that refuse to blend in."
        ctaText="Book a Free Strategy Call"
      />
      <PortfolioSection />
      <ProjectsGallery />
      <ServicesSection />
    </main>
  );
}
