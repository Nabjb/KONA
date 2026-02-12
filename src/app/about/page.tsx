import { SolutionHero } from "@/components/ui/solution-hero";

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full">
            <SolutionHero
                title="Who We Are"
                subtitle="The Agency"
                description="A collective of digital architects and strategic thinkers dedicated to pushing the boundaries of what's possible online."
                videoSrc="/Comp 1.mp4"
            />
            {/* About content sections will be added here */}
        </div>
    );
}
