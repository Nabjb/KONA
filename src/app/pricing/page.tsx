import { SolutionHero } from "@/components/ui/solution-hero";

export default function PricingPage() {
    return (
        <div className="flex flex-col w-full">
            <SolutionHero
                title="Investment Strategy"
                subtitle="Pricing"
                description="Transparent, performance-driven pricing models designed to scale alongside your business growth."
            />
            {/* Pricing tables and tiers will be added here */}
        </div>
    );
}
