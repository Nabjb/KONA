import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, serviceJsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { SolutionHero } from "@/components/ui/solution-hero";

export const metadata: Metadata = buildMetadata({
  title: "Social Media Management",
  description:
    "Strategic social media management that grows communities and captures attention. Content planning, professional videography, and brand narrative across Instagram, TikTok, Facebook & YouTube.",
  path: "/solutions/social-media",
  keywords: [
    "social media management",
    "social media agency",
    "Instagram management",
    "TikTok content creation",
    "social media strategy",
    "content planning",
    "brand narrative",
    "professional videography",
    "social media marketing Europe",
    "community management",
  ],
});

export default function SocialMediaPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Social Media Management",
          description:
            "Strategic social media management that grows communities and captures attention. Content planning, professional videography, and cohesive brand narrative.",
          url: "https://www.kona-verse.com/solutions/social-media",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: "Social Media", href: "/solutions/social-media" },
        ])}
      />
      <div className="flex flex-col w-full">
        <SolutionHero
          title="Social Media"
          subtitle="Solution 03"
          description="Cultivating digital communities and capturing market attention through cohesive brand narrative."
        />
      </div>
    </>
  );
}
