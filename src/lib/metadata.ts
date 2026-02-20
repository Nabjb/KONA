import type { Metadata } from "next";

const SITE_URL = "https://www.kona-verse.com";
const SITE_NAME = "Kona-verse";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

export const siteConfig = {
  url: SITE_URL,
  name: SITE_NAME,
  description:
    "We craft digital experiences that convert. Premium web design, web applications, social media management & digital advertising for brands across Europe.",
  ogImage: DEFAULT_OG_IMAGE,
  locale: "en_US",
  creator: "Kona-verse",
} as const;

export function buildMetadata(page: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const url = page.path ? `${SITE_URL}${page.path}` : SITE_URL;
  const ogImage = page.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}
