import { SolutionHero } from "@/components/ui/solution-hero";

export default function WebDevelopmentPage() {
    return (
        <div className="flex flex-col w-full">
            <SolutionHero
                title="Web Development"
                subtitle="Solution 01"
                description="We build fast, scalable, and beautifully crafted websites that perform across all dimensions of the modern web."
            />
            {/* Additional sections will be added here */}
        </div>
    );
}
