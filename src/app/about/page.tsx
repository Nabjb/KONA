import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { SolutionHero } from "@/components/ui/solution-hero";
import { FoundersSection } from "@/components/sections/founders-section";
import { AboutTimeline } from "@/components/sections/about-timeline";
import { AboutClose } from "@/components/sections/about-close";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Meet the team behind Kona-verse — a collective of digital architects and strategic thinkers dedicated to building conversion-focused websites and digital experiences across Europe.",
  path: "/about",
  keywords: [
    "about Kona-verse",
    "digital agency team",
    "web design founders",
    "creative digital practice",
    "who we are",
    "digital architects Europe",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />
      <div className="flex flex-col w-full bg-[#1a1d18]">
        <SolutionHero
          title="Who We Are"
          subtitle="The Agency"
          description="A collective of digital architects and strategic thinkers dedicated to pushing the boundaries of what's possible online."
          videoSrc="/Comp 1.mp4"
        />
        <FoundersSection />
        <AboutTimeline />
        <AboutClose />
      </div>
    </>
  );
}
