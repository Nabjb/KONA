import { SolutionHero } from "@/components/ui/solution-hero";
import { FoundersSection } from "@/components/sections/founders-section";
import { AboutTimeline } from "@/components/sections/about-timeline";
import { AboutClose } from "@/components/sections/about-close";

export default function AboutPage() {
    return (
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
    );
}
