import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNav } from "@/components/layout/conditional-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KONA SOCIALS | Premium Web Design & Social Media Agency",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1a1d18]`}
      >
        <ConditionalNav />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
