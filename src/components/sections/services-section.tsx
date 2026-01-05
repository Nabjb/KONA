"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2, rootMargin: "-100px" }
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
        transform: isVisible ? "translateY(0)" : "translateY(60px)",
        filter: isVisible ? "blur(0)" : "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}

// Floating image component with reveal animation
function FloatingImage({ 
  src, 
  alt, 
  className = "", 
  style = {},
  delay = 0 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`absolute transition-all duration-1000 ease-out ${className}`}
      style={{
        ...style,
        opacity: isVisible ? (style.opacity as number || 1) : 0,
        transform: isVisible 
          ? (style.transform as string || 'none')
          : `${style.transform || ''} translateY(40px) scale(0.95)`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'transparent',
      }}
    >
      {/* Subtle grid continuation - matching Who We Are */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-services" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(200,180,160,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-services)" />
      </svg>

      {/* Section intro */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pt-32 md:pt-48">
        <Reveal>
          <div 
            className="text-xs font-mono uppercase tracking-[0.4em] mb-4"
            style={{ color: colors[500] }}
          >
            What We Do
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight max-w-3xl"
            style={{ color: colors[50] }}
          >
            Five disciplines.
          </h2>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight mt-2"
            style={{ color: colors[300] }}
          >
            One philosophy.
          </h2>
        </Reveal>
      </div>

      {/* ==================== SERVICE 1: Web Development ==================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-32 md:py-48">
        {/* Floating Images - Development */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
          alt="Code on screen"
          className="hidden lg:block w-64 h-80 rounded-lg overflow-hidden"
          style={{ 
            right: '5%', 
            top: '10%', 
            transform: 'rotate(6deg)',
            opacity: 0.9,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
          delay={300}
        />
        <FloatingImage
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"
          alt="Programming workspace"
          className="hidden lg:block w-48 h-64 rounded-lg overflow-hidden"
          style={{ 
            right: '18%', 
            bottom: '5%', 
            transform: 'rotate(-4deg)',
            opacity: 0.7,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
          }}
          delay={500}
        />
        
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div 
                className="font-mono text-xs tracking-[0.2em] uppercase mb-8"
                style={{ color: colors[500] }}
              >
                01 / Development
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h3 
                className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-none tracking-tight"
                style={{ color: colors[50] }}
              >
                Web
              </h3>
              <h3 
                className="text-5xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight"
                style={{ color: colors[200] }}
              >
                Development
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <div 
                className="w-24 h-px mt-12 mb-8"
                style={{ background: `linear-gradient(to right, ${colors[400]}, transparent)` }}
              />
              <p 
                className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
                style={{ color: colors[100] }}
              >
                Code that performs. Systems that scale. Every line written with intent.
              </p>
              <p 
                className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-50 max-w-xl"
                style={{ color: colors[200] }}
              >
                React, Next.js, TypeScript — modern stacks for modern problems.
              </p>
            </Reveal>
          </div>
          {/* Vertical accent line */}
          <div className="hidden lg:flex col-span-1 justify-center">
            <div 
              className="w-px h-full opacity-20"
              style={{ background: `linear-gradient(to bottom, transparent, ${colors[400]}, transparent)` }}
            />
          </div>
        </div>
      </div>

      {/* ==================== SERVICE 2: Web Design ==================== */}
      <div className="relative z-10 py-32 md:py-48">
        {/* Floating Images - Design */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
          alt="Design tools"
          className="hidden lg:block w-72 h-96 rounded-lg overflow-hidden"
          style={{ 
            left: '3%', 
            top: '15%', 
            transform: 'rotate(-8deg)',
            opacity: 0.85,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
          delay={200}
        />
        <FloatingImage
          src="https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80"
          alt="UI Design mockup"
          className="hidden lg:block w-56 h-72 rounded-lg overflow-hidden"
          style={{ 
            left: '12%', 
            bottom: '10%', 
            transform: 'rotate(5deg)',
            opacity: 0.6,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
          }}
          delay={450}
        />
        
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-start-5 lg:col-span-8 text-right">
              <Reveal>
                <div 
                  className="font-mono text-xs tracking-[0.2em] uppercase mb-8"
                  style={{ color: colors[500] }}
                >
                  02 / Design
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h3 
                  className="text-5xl md:text-6xl lg:text-7xl font-thin leading-none tracking-tight italic"
                  style={{ color: colors[100] }}
                >
                  Web
                </h3>
                <h3 
                  className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-none tracking-tight"
                  style={{ color: colors[50] }}
                >
                  Design
                </h3>
              </Reveal>
              <Reveal delay={200}>
                <div 
                  className="w-24 h-px mt-12 mb-8 ml-auto"
                  style={{ background: `linear-gradient(to left, ${colors[400]}, transparent)` }}
                />
                <p 
                  className="text-lg md:text-xl font-light leading-relaxed max-w-xl ml-auto"
                  style={{ color: colors[100] }}
                >
                  Aesthetics with purpose. Interfaces that invite. Experiences that stay.
                </p>
                <p 
                  className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-50 max-w-xl ml-auto"
                  style={{ color: colors[200] }}
                >
                  Where form follows function, and both follow feeling.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SERVICE 3: Social Media Management ==================== */}
      <div className="relative z-10 py-40 md:py-56">
        {/* Floating Images - Social */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
          alt="Social media on phone"
          className="hidden lg:block w-52 h-72 rounded-lg overflow-hidden"
          style={{ 
            left: '8%', 
            top: '20%', 
            transform: 'rotate(-12deg)',
            opacity: 0.75,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
          delay={150}
        />
        <FloatingImage
          src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80"
          alt="Content creation"
          className="hidden lg:block w-48 h-64 rounded-lg overflow-hidden"
          style={{ 
            right: '10%', 
            top: '25%', 
            transform: 'rotate(8deg)',
            opacity: 0.7,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
          }}
          delay={350}
        />
        
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="text-center">
            <Reveal>
              <div 
                className="font-mono text-xs tracking-[0.2em] uppercase mb-12"
                style={{ color: colors[500] }}
              >
                03 / Social
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h3 
                className="text-4xl md:text-6xl lg:text-8xl font-extralight leading-none tracking-tight"
                style={{ color: colors[50] }}
              >
                Social Media
              </h3>
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-light leading-none tracking-wide mt-4"
                style={{ color: colors[300] }}
              >
                Management
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex justify-center mt-12 mb-8">
                <div 
                  className="w-2 h-2 rotate-45"
                  style={{ background: colors[400], opacity: 0.6 }}
                />
              </div>
              <p 
                className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
                style={{ color: colors[100] }}
              >
                Your voice, amplified. Your audience, engaged.
              </p>
              <p 
                className="text-base md:text-lg font-light leading-relaxed mt-6 opacity-50 max-w-xl mx-auto"
                style={{ color: colors[200] }}
              >
                Strategy meets storytelling. Content that converts followers into advocates.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ==================== SERVICE 4: SEO ==================== */}
      <div className="relative z-10 py-32 md:py-48">
        {/* Floating Images - SEO */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
          alt="Analytics dashboard"
          className="hidden lg:block w-80 h-56 rounded-lg overflow-hidden"
          style={{ 
            right: '5%', 
            top: '50%', 
            transform: 'translateY(-50%) rotate(3deg)',
            opacity: 0.8,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
          delay={250}
        />
        
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <Reveal>
                <div 
                  className="font-mono text-xs tracking-[0.2em] uppercase mb-6"
                  style={{ color: colors[500] }}
                >
                  04 / Search
                </div>
                <h3 
                  className="text-7xl md:text-8xl lg:text-9xl font-thin leading-none"
                  style={{ color: colors[50] }}
                >
                  SEO
                </h3>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-start-6 md:col-span-7 lg:col-start-5 lg:col-span-5 mt-12 md:mt-0">
              <Reveal delay={150}>
                <div 
                  className="w-full h-px mb-8"
                  style={{ background: `linear-gradient(to right, transparent, ${colors[400]}40, transparent)` }}
                />
                <p 
                  className="text-lg md:text-xl font-light leading-relaxed"
                  style={{ color: colors[100] }}
                >
                  Visibility earned, not bought. Rankings built on relevance.
                </p>
                <p 
                  className="text-base md:text-lg font-light leading-relaxed mt-4 opacity-50"
                  style={{ color: colors[200] }}
                >
                  Technical precision. Content strategy. Sustainable growth.
                </p>
                <div 
                  className="w-full h-px mt-8"
                  style={{ background: `linear-gradient(to right, transparent, ${colors[400]}40, transparent)` }}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SERVICE 5: Web Applications ==================== */}
      <div className="relative z-10 py-40 md:py-64">
        {/* Large background text */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ opacity: 0.02 }}
        >
          <span 
            className="text-[25vw] font-extralight tracking-tighter"
            style={{ color: colors[200] }}
          >
            APPS
          </span>
        </div>
        
        {/* Floating Images - Applications */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
          alt="Dashboard interface"
          className="hidden lg:block w-72 h-48 rounded-lg overflow-hidden"
          style={{ 
            left: '5%', 
            top: '30%', 
            transform: 'rotate(-5deg)',
            opacity: 0.75,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
          delay={200}
        />
        <FloatingImage
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80"
          alt="Mobile app"
          className="hidden lg:block w-56 h-80 rounded-lg overflow-hidden"
          style={{ 
            right: '8%', 
            top: '20%', 
            transform: 'rotate(7deg)',
            opacity: 0.7,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
          }}
          delay={400}
        />
        
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative">
          <Reveal>
            <div 
              className="font-mono text-xs tracking-[0.2em] uppercase mb-8 text-center"
              style={{ color: colors[500] }}
            >
              05 / Applications
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="text-center">
              <h3 
                className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight"
                style={{ color: colors[50] }}
              >
                Web Applications
              </h3>
              <h3 
                className="text-2xl md:text-3xl lg:text-4xl font-thin leading-tight mt-2"
                style={{ color: colors[300] }}
              >
                that work as hard as you do
              </h3>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="max-w-3xl mx-auto mt-16">
              <div className="flex items-center justify-center gap-8 mb-12">
                <div 
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${colors[400]}30)` }}
                />
                <div 
                  className="w-3 h-3 rotate-45 border"
                  style={{ borderColor: colors[400], opacity: 0.4 }}
                />
                <div 
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(to left, transparent, ${colors[400]}30)` }}
                />
              </div>
              <p 
                className="text-lg md:text-xl font-light leading-relaxed text-center"
                style={{ color: colors[100] }}
              >
                Complex problems deserve elegant solutions. We build tools that transform how you operate.
              </p>
              <p 
                className="text-base md:text-lg font-light leading-relaxed mt-6 opacity-50 text-center"
                style={{ color: colors[200] }}
              >
                Dashboards. Platforms. Internal tools. Custom software that fits your workflow.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Section closing */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-32 md:pb-48">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <div 
              className="flex-1 max-w-32 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${colors[500]}40)` }}
            />
            <p 
              className="text-sm font-mono tracking-wider uppercase"
              style={{ color: colors[500] }}
            >
              End of Capabilities
            </p>
            <div 
              className="flex-1 max-w-32 h-px"
              style={{ background: `linear-gradient(to left, transparent, ${colors[500]}40)` }}
            />
          </div>
        </Reveal>
      </div>

      {/* Floating accents */}
      <div 
        className="absolute top-[15%] right-[5%] w-1 h-1 rounded-full"
        style={{ 
          background: colors[400], 
          opacity: 0.3,
          boxShadow: `0 0 20px ${colors[400]}30`
        }}
      />
      <div 
        className="absolute top-[45%] left-[3%] w-1.5 h-1.5 rounded-full"
        style={{ 
          background: colors[300], 
          opacity: 0.2,
          boxShadow: `0 0 30px ${colors[300]}20`
        }}
      />
      <div 
        className="absolute top-[75%] right-[8%] w-1 h-1 rounded-full"
        style={{ 
          background: colors[400], 
          opacity: 0.4,
          boxShadow: `0 0 15px ${colors[400]}40`
        }}
      />
    </section>
  );
}

export default ServicesSection;
