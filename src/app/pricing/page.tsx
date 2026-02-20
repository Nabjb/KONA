import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { SolutionHero } from "@/components/ui/solution-hero";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Transparent, performance-driven pricing for web design, web applications, social media management, and digital advertising. Packages designed to scale alongside your business growth.",
  path: "/pricing",
  keywords: [
    "web design pricing",
    "web development cost",
    "digital marketing pricing",
    "social media management pricing",
    "website cost Europe",
    "affordable web design",
    "digital agency pricing",
  ],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ])}
      />
      <div className="flex flex-col w-full">
        <SolutionHero
          title="Investment Strategy"
          subtitle="Pricing"
          description="Transparent, performance-driven pricing models designed to scale alongside your business growth."
        />
      </div>
    </>
  );
}
