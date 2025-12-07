"use client";

import { cn } from "@/lib/utils";

interface IMacMockupProps {
  src?: string;
  className?: string;
  screenClassName?: string;
}

export function IMacMockup({ src, className, screenClassName }: IMacMockupProps) {
  return (
    <div className={cn("relative", className)}>
      {/* iMac frame image */}
      <img
        src="/kona websites screenshots/imac.png"
        alt="iMac"
        className="w-full h-auto"
      />
      
      {/* Screen content overlay - positioned to match the screen area */}
      {src && (
        <div 
          className={cn(
            "absolute overflow-hidden",
            screenClassName
          )}
          style={{
            // These values position the screenshot on the iMac screen
            // Adjust these percentages based on your imac.png dimensions
            top: "4.5%",
            left: "4.8%",
            width: "90.4%",
            height: "67.5%",
          }}
        >
          <img
            src={src}
            alt="Website screenshot"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}

