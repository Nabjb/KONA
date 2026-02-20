interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kona-verse",
    url: "https://www.kona-verse.com",
    logo: "https://www.kona-verse.com/KonaLogoNoBg.png",
    description:
      "A digital design and development practice that builds conversion-focused websites, web applications, and digital marketing strategies for brands across Europe.",
    sameAs: [
      "https://www.instagram.com/konaverse",
      "https://www.linkedin.com/company/konaverse",
      "https://twitter.com/konaverse",
    ],
    areaServed: {
      "@type": "Place",
      name: "Europe",
    },
    knowsAbout: [
      "Web Development",
      "Web Applications",
      "Social Media Management",
      "Digital Advertising",
      "UI/UX Design",
      "SEO",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kona-verse",
    url: "https://www.kona-verse.com",
    publisher: {
      "@type": "Organization",
      name: "Kona-verse",
    },
  };
}

export function serviceJsonLd(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: "Kona-verse",
      url: "https://www.kona-verse.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Europe",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://www.kona-verse.com${item.href}`,
    })),
  };
}
