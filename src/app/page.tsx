import { buildMetadata } from "@/lib/metadata";
import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";
import HomePage from "./home-page";

export const metadata = buildMetadata({
  title: "Kona-verse | Web Design & Digital Marketing Agency in Europe",
  description:
    "We craft digital experiences that convert. Premium web design, web applications, social media management & digital advertising for ambitious brands across Europe.",
  path: "/",
  keywords: [
    "web design agency Europe",
    "digital marketing agency",
    "web development",
    "social media management",
    "digital advertising",
    "conversion-focused web design",
    "premium web design",
    "web applications",
    "UI/UX design",
    "SEO services Europe",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HomePage />
    </>
  );
}
