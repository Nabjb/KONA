"use client";

import DotPattern from "@/components/ui/dot-pattern";

const colors = {
  900: "#1a1d18", // Deep Forest
  800: "#2a2e26", // Midnight
  500: "#6b5545", // Oak
  200: "#c8b4a0", // Sand
  50: "#f8f7f5",  // Parchment
};

export function QuoteSection() {
  return (
    <section className="relative w-full py-20 md:py-32" style={{ backgroundColor: colors[900] }}>
      <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
        <div className="relative flex flex-col items-center border" style={{ borderColor: colors[500] }}>
          <DotPattern width={5} height={5} className="fill-slate-500/30 md:fill-slate-500/40" />

          {/* Corner markers - using brand colors */}
          <div className="absolute -left-1.5 -top-1.5 h-3 w-3" style={{ backgroundColor: colors[500] }} />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3" style={{ backgroundColor: colors[500] }} />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3" style={{ backgroundColor: colors[500] }} />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3" style={{ backgroundColor: colors[500] }} />

          <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
            <p className="md:text-md text-xs lg:text-lg xl:text-2xl" style={{ color: colors[500] }}>
              I believe
            </p>
            <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl" style={{ color: colors[50] }}>
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <h1 className="font-semibold">&quot;Design should be</h1>
                <p className="font-thin">easy to</p>
              </div>
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <p className="font-thin">understand</p>
                <h1 className="font-semibold">because</h1>
                <p className="font-thin">simple</p>
              </div>
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <p className="font-thin">ideas</p>
                <h1 className="font-semibold">are quicker to</h1>
              </div>
              <h1 className="font-semibold">grasp...&quot;</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuoteSection;
