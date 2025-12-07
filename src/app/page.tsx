import ServicesSection from "@/components/sections/services-section";
import SiteNavbar from "@/components/layout/site-navbar";
import ParallaxHeroWrapper from "@/components/sections/parallax-hero-wrapper";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <SiteNavbar />
      <ParallaxHeroWrapper />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
