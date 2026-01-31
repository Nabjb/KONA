import { PortfolioGallery } from "@/components/ui/portfolio-gallery";

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-[#1a1d18] pt-20">
            <PortfolioGallery
                title="Our Technical Portfolio"
                archiveButton={{
                    text: "Explore Full Case Studies",
                    href: "/#case-studies"
                }}
            />
        </main>
    );
}
