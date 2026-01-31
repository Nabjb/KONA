import { SolutionHero } from "@/components/ui/solution-hero";

export default function SolutionsPage() {
    return (
        <div className="flex flex-col w-full">
            <SolutionHero
                title="Our Solutions"
                subtitle="Architecture"
                description="A comprehensive ecosystem of digital tools and strategies designed to scale your business."
            />
            {/* List of solutions could go here */}
        </div>
    );
}
