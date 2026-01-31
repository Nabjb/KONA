import { SolutionHero } from "@/components/ui/solution-hero";

export default function CaseStudiesPage() {
    return (
        <div className="flex flex-col w-full">
            <SolutionHero
                title="Impact & Results"
                subtitle="Case Studies"
                description="A deep dive into the strategic transformations and digital success stories we've architected for our partners."
            />
            {/* Case studies grid or list will be added here */}
        </div>
    );
}
