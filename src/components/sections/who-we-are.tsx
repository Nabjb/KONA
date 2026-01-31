"use client";

import React, { useEffect, useRef, useState } from "react";

const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function RevealBlock({ children, className = "", delay = 0 }: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3, rootMargin: "-50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        filter: isVisible ? "blur(0)" : "blur(8px)",
      }}
    >
      {children}
    </div>
  );
}

export function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress as section enters viewport
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-[200vh]"
      style={{
        background: `linear-gradient(to bottom, 
          ${colors[900]} 0%, 
          #0a0b09 30%,
          #0a0b09 70%,
          ${colors[900]} 100%
        )`,
      }}
    >

      {/* Large background text - the manifesto whisper */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        style={{ opacity: 0.03 }}
      >
        <div 
          className="absolute top-[15%] -left-[5%] text-[20vw] font-extralight tracking-tighter leading-none"
          style={{ 
            color: colors[200],
            transform: `translateX(${scrollProgress * 30}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          CREATE
        </div>
        <div 
          className="absolute top-[40%] -right-[10%] text-[18vw] font-thin tracking-tight leading-none"
          style={{ 
            color: colors[200],
            transform: `translateX(${-scrollProgress * 40}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          EVOLVE
        </div>
        <div 
          className="absolute top-[65%] left-[10%] text-[15vw] font-extralight tracking-wider leading-none"
          style={{ 
            color: colors[200],
            transform: `translateX(${scrollProgress * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          DELIVER
        </div>
      </div>

      {/* Subtle grid continuation */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-who" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(200,180,160,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-who)" />
      </svg>

      {/* Content container - asymmetric grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-48">
        
        {/* Opening statement - off-center */}
        <div className="grid grid-cols-12 gap-4 mb-32 md:mb-48">
          <div className="col-span-12 md:col-start-2 md:col-span-8 lg:col-start-3 lg:col-span-6">
            <RevealBlock delay={0}>
              <div 
                className="text-xs font-mono uppercase tracking-[0.3em] mb-6"
                style={{ color: colors[400] }}
              >
                Who We Are
              </div>
            </RevealBlock>
            <RevealBlock delay={100}>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-tight"
                style={{ color: colors[50] }}
              >
                Not an agency.
              </h2>
            </RevealBlock>
            <RevealBlock delay={200}>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-tight mt-2"
                style={{ color: colors[200] }}
              >
                A creative partner.
              </h2>
            </RevealBlock>
          </div>
        </div>

        {/* Fragmented narrative blocks */}
        <div className="space-y-24 md:space-y-32">
          
          {/* Block 1 - Left aligned */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <RevealBlock delay={0}>
                <div 
                  className="w-8 h-px mb-6"
                  style={{ background: colors[400] }}
                />
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
                  style={{ color: colors[100] }}
                >
                  We believe in the quiet power of intention.
                </p>
                <p 
                  className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-60"
                  style={{ color: colors[200] }}
                >
                  Every pixel placed with purpose. Every interaction designed to resonate.
                </p>
              </RevealBlock>
            </div>
          </div>

          {/* Block 2 - Right aligned, offset */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-start-6 md:col-span-6 lg:col-start-7 lg:col-span-5">
              <RevealBlock delay={100}>
                <div 
                  className="w-8 h-px mb-6 ml-auto"
                  style={{ background: colors[400] }}
                />
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-right"
                  style={{ color: colors[100] }}
                >
                  We don&apos;t follow trends.
                </p>
                <p 
                  className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-60 text-right"
                  style={{ color: colors[200] }}
                >
                  We study them. Understand them. Then create something that outlasts them.
                </p>
              </RevealBlock>
            </div>
          </div>

          {/* Block 3 - Center, larger */}
          <div className="grid grid-cols-12 gap-4 py-16 md:py-24">
            <div className="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 text-center">
              <RevealBlock delay={0}>
                <p 
                  className="text-2xl md:text-4xl lg:text-5xl font-extralight leading-relaxed"
                  style={{ color: colors[50] }}
                >
                  &ldquo;The best design feels inevitable.&rdquo;
                </p>
                <div 
                  className="w-12 h-px mx-auto mt-8"
                  style={{ background: `linear-gradient(to right, transparent, ${colors[300]}, transparent)` }}
                />
              </RevealBlock>
            </div>
          </div>

          {/* Block 4 - Left, different offset */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-start-2 md:col-span-5 lg:col-start-2 lg:col-span-4">
              <RevealBlock delay={0}>
                <div 
                  className="w-8 h-px mb-6"
                  style={{ background: colors[400] }}
                />
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
                  style={{ color: colors[100] }}
                >
                  Small team. Big thinking.
                </p>
                <p 
                  className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-60"
                  style={{ color: colors[200] }}
                >
                  No bureaucracy. No handoffs. Just direct collaboration with people who care.
                </p>
              </RevealBlock>
            </div>
          </div>

          {/* Block 5 - Far right */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-start-8 md:col-span-5 lg:col-start-9 lg:col-span-4">
              <RevealBlock delay={150}>
                <div 
                  className="w-8 h-px mb-6 ml-auto"
                  style={{ background: colors[400] }}
                />
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-right"
                  style={{ color: colors[100] }}
                >
                  Results speak. We listen.
                </p>
                <p 
                  className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-60 text-right"
                  style={{ color: colors[200] }}
                >
                  Every project is a conversation between ambition and execution.
                </p>
              </RevealBlock>
            </div>
          </div>

        </div>

        {/* Closing - the quiet confidence */}
        <div className="grid grid-cols-12 gap-4 mt-32 md:mt-48">
          <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8">
            <RevealBlock delay={0}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div 
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${colors[500]}40)` }}
                />
                <div 
                  className="w-2 h-2 rotate-45"
                  style={{ background: colors[400], opacity: 0.5 }}
                />
                <div 
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(to left, transparent, ${colors[500]}40)` }}
                />
              </div>
            </RevealBlock>
            <RevealBlock delay={100}>
              <p 
                className="text-center text-base md:text-lg font-light tracking-wide"
                style={{ color: colors[300] }}
              >
                We&apos;re Konaverse. We build what matters.
              </p>
            </RevealBlock>
          </div>
        </div>

      </div>

      {/* Floating accent elements */}
      <div 
        className="absolute top-1/4 left-[5%] w-1 h-1 rounded-full"
        style={{ 
          background: colors[400], 
          opacity: 0.4,
          boxShadow: `0 0 20px ${colors[400]}40`
        }}
      />
      <div 
        className="absolute top-1/2 right-[8%] w-1.5 h-1.5 rounded-full"
        style={{ 
          background: colors[300], 
          opacity: 0.3,
          boxShadow: `0 0 30px ${colors[300]}30`
        }}
      />
      <div 
        className="absolute top-3/4 left-[12%] w-1 h-1 rounded-full"
        style={{ 
          background: colors[400], 
          opacity: 0.5,
          boxShadow: `0 0 15px ${colors[400]}50`
        }}
      />
    </section>
  );
}

export default WhoWeAre;


