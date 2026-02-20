import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { SolutionHero } from "@/components/ui/solution-hero";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Ready to scale your digital presence? Get a free consultation from Kona-verse. We build high-performance websites, web apps, and digital marketing strategies for brands across Europe.",
  path: "/contact",
  keywords: [
    "contact Kona-verse",
    "free consultation",
    "web design quote",
    "digital marketing consultation",
    "get in touch",
    "hire web developer Europe",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <div className="flex flex-col w-full">
        <SolutionHero
          title="Get in Touch"
          subtitle="Contact"
          description="Ready to scale your digital presence? We're here to turn your vision into a high-performance reality."
        />
      </div>
    </>
  );
}
