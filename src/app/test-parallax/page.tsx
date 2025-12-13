"use client";

import { ParallaxComponent } from "@/components/ui/parallax-scrolling";

export default function TestParallaxPage() {
  return (
    <main className="min-h-screen">
      <ParallaxComponent />
      <div className="bg-[#030014] py-20 px-8 text-center">
        <p className="text-white/60 text-sm">
          Resource by <a 
            href="https://www.osmo.supply/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Osmo
          </a>
        </p>
      </div>
    </main>
  );
}


