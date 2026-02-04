import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNav } from "@/components/layout/conditional-nav";
import Footer from "@/components/layout/footer";
import FluidWrapper from "@/components/fluid/fluid-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Konaverse SOCIALS | Premium Web Design & Social Media Agency",
  description: "We build websites that print money. Premium web design and social media management for brands that refuse to blend in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1a1d18] flex flex-col min-h-screen`}
      >
        <ConditionalNav />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* Fluid cursor effect - follows mouse with artistic fluid simulation */}
        <FluidWrapper 
          fluidColor="#a89080"
          enabled={true}
        />
      </body>
    </html>
  );
}

