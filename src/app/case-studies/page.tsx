import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import CaseStudiesContent from "./case-studies-content";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real results for real brands. See how we helped businesses across Europe increase conversions, build digital presence, and scale with data-driven web and marketing strategies.",
  path: "/case-studies",
  keywords: [
    "case studies",
    "web design results",
    "digital marketing case study",
    "conversion optimization results",
    "client success stories",
  ],
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ])}
      />
      <CaseStudiesContent />
    </>
  );
}
