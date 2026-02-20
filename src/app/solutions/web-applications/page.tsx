import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, serviceJsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { SolutionHero } from "@/components/ui/solution-hero";

export const metadata: Metadata = buildMetadata({
  title: "Web Application Development",
  description:
    "Complex, data-driven web applications engineered for reliability, security, and scale. SaaS platforms, admin dashboards, and workflow automation built for businesses across Europe.",
  path: "/solutions/web-applications",
  keywords: [
    "web application development",
    "SaaS development",
    "custom web apps",
    "admin dashboard development",
    "enterprise web applications",
    "scalable web platforms",
    "API development",
    "database management",
    "workflow automation",
    "web app agency Europe",
  ],
});

export default function WebApplicationsPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Web Application Development",
          description:
            "Complex, data-driven web applications engineered for reliability, security, and effortless user scaling. SaaS platforms, dashboards, and workflow automation.",
          url: "https://www.kona-verse.com/solutions/web-applications",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: "Web Applications", href: "/solutions/web-applications" },
        ])}
      />
      <div className="flex flex-col w-full">
        <SolutionHero
          title="Web Applications"
          subtitle="Solution 02"
          description="Complex, data-driven platforms engineered for reliability, security, and effortless user scaling."
        />
      </div>
    </>
  );
}
