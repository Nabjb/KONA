"use client";

import React from "react";

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

const serviceColors = {
  "01": { accent: "#4a6670", gradient: "from-[#1a1d18] via-[#0a1015] to-[#1a2025]" },
  "02": { accent: "#4a6a5a", gradient: "from-[#1a1d18] via-[#0a120f] to-[#1a2520]" },
  "03": { accent: "#7a5a4a", gradient: "from-[#1a1d18] via-[#15100a] to-[#25201a]" },
  "04": { accent: "#5a4a6a", gradient: "from-[#1a1d18] via-[#120a15] to-[#201a25]" },
};

function WebDevPattern() {
  return (
    <svg className="absolute top-0 right-0 w-[60%] h-full opacity-[0.04] pointer-events-none" viewBox="0 0 400 400" fill="none">
      <circle cx="100" cy="80" r="4" fill={colors[200]} />
      <circle cx="200" cy="120" r="6" fill={colors[200]} />
      <circle cx="300" cy="60" r="3" fill={colors[200]} />
      <circle cx="150" cy="200" r="5" fill={colors[200]} />
      <circle cx="280" cy="180" r="4" fill={colors[200]} />
      <circle cx="80" cy="280" r="3" fill={colors[200]} />
      <circle cx="220" cy="300" r="5" fill={colors[200]} />
      <circle cx="340" cy="260" r="4" fill={colors[200]} />
      <line x1="100" y1="80" x2="200" y2="120" stroke={colors[200]} strokeWidth="1" />
      <line x1="200" y1="120" x2="300" y2="60" stroke={colors[200]} strokeWidth="1" />
      <line x1="200" y1="120" x2="150" y2="200" stroke={colors[200]} strokeWidth="1" />
      <line x1="150" y1="200" x2="280" y2="180" stroke={colors[200]} strokeWidth="1" />
      <line x1="150" y1="200" x2="80" y2="280" stroke={colors[200]} strokeWidth="1" />
      <line x1="280" y1="180" x2="340" y2="260" stroke={colors[200]} strokeWidth="1" />
      <path d="M50 150 L30 180 L50 210" stroke={colors[200]} strokeWidth="2" fill="none" />
      <path d="M370 150 L390 180 L370 210" stroke={colors[200]} strokeWidth="2" fill="none" />
    </svg>
  );
}

function WebAppsPattern() {
  return (
    <svg className="absolute top-0 right-0 w-[60%] h-full opacity-[0.04] pointer-events-none" viewBox="0 0 400 400" fill="none">
      <rect x="180" y="40" width="120" height="80" rx="4" stroke={colors[200]} strokeWidth="1.5" fill="none" />
      <rect x="200" y="60" width="120" height="80" rx="4" stroke={colors[200]} strokeWidth="1.5" fill="none" />
      <rect x="220" y="80" width="120" height="80" rx="4" stroke={colors[200]} strokeWidth="1.5" fill={colors[200]} fillOpacity="0.1" />
      <line x1="240" y1="100" x2="320" y2="100" stroke={colors[200]} strokeWidth="2" />
      <line x1="240" y1="115" x2="300" y2="115" stroke={colors[200]} strokeWidth="2" />
      <rect x="60" y="180" width="80" height="60" rx="4" stroke={colors[200]} strokeWidth="1" fill="none" />
      <rect x="280" y="220" width="100" height="70" rx="4" stroke={colors[200]} strokeWidth="1" fill="none" />
      <rect x="70" y="210" width="10" height="20" fill={colors[200]} fillOpacity="0.3" />
      <rect x="85" y="200" width="10" height="30" fill={colors[200]} fillOpacity="0.3" />
      <rect x="100" y="195" width="10" height="35" fill={colors[200]} fillOpacity="0.3" />
    </svg>
  );
}

function SocialMediaPattern() {
  return (
    <svg className="absolute top-0 right-0 w-[60%] h-full opacity-[0.04] pointer-events-none" viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="150" r="60" stroke={colors[200]} strokeWidth="1.5" fill="none" />
      <circle cx="250" cy="180" r="50" stroke={colors[200]} strokeWidth="1.5" fill="none" />
      <circle cx="170" cy="200" r="45" stroke={colors[200]} strokeWidth="1.5" fill="none" />
      <circle cx="220" cy="220" r="55" stroke={colors[200]} strokeWidth="1.5" fill={colors[200]} fillOpacity="0.05" />
      <circle cx="80" cy="100" r="20" stroke={colors[200]} strokeWidth="1" fill="none" />
      <circle cx="340" cy="120" r="25" stroke={colors[200]} strokeWidth="1" fill="none" />
      <rect x="90" y="300" width="50" height="50" rx="2" stroke={colors[200]} strokeWidth="1" fill="none" />
      <circle cx="150" cy="140" r="3" fill={colors[200]} />
      <circle cx="260" cy="160" r="3" fill={colors[200]} />
    </svg>
  );
}

function AdvertisingPattern() {
  return (
    <svg className="absolute top-0 right-0 w-[60%] h-full opacity-[0.04] pointer-events-none" viewBox="0 0 400 400" fill="none">
      <rect x="80" y="280" width="30" height="60" fill={colors[200]} fillOpacity="0.2" />
      <rect x="120" y="240" width="30" height="100" fill={colors[200]} fillOpacity="0.25" />
      <rect x="160" y="200" width="30" height="140" fill={colors[200]} fillOpacity="0.3" />
      <rect x="200" y="150" width="30" height="190" fill={colors[200]} fillOpacity="0.35" />
      <rect x="240" y="100" width="30" height="240" fill={colors[200]} fillOpacity="0.4" />
      <path d="M80 280 Q150 220 200 180 T320 80" stroke={colors[200]} strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <path d="M320 80 L310 100 M320 80 L330 100" stroke={colors[200]} strokeWidth="2" />
      <circle cx="80" cy="120" r="30" stroke={colors[200]} strokeWidth="1" fill="none" />
      <circle cx="80" cy="120" r="20" stroke={colors[200]} strokeWidth="1" fill="none" />
      <circle cx="80" cy="120" r="10" stroke={colors[200]} strokeWidth="1" fill="none" />
      <circle cx="80" cy="120" r="3" fill={colors[200]} />
    </svg>
  );
}

const patternComponents = {
  "01": WebDevPattern,
  "02": WebAppsPattern,
  "03": SocialMediaPattern,
  "04": AdvertisingPattern,
};

interface ServiceCardProps {
  number: "01" | "02" | "03" | "04";
  title: string;
  description: string;
  features: string[];
  zIndex: number;
}

function ServiceCard({ number, title, description, features, zIndex }: ServiceCardProps) {
  const PatternComponent = patternComponents[number];
  const colorScheme = serviceColors[number];
  
  return (
    <div 
      className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-hidden py-16 md:py-0"
      style={{ zIndex }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient}`} />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${colorScheme.accent}30 0%, transparent 60%)` }}
      />
      
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-service-${number}`} width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(200,180,160,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-service-${number})`} />
      </svg>

      <div className="hidden md:block">
        <PatternComponent />
      </div>

      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] font-extralight leading-none pointer-events-none select-none"
        style={{ color: colors[200], opacity: 0.02 }}
      >
        {number}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-16">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div 
              className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4"
              style={{ color: colorScheme.accent }}
            >
              Service {number}
            </div>
            <h2 
              className="text-2xl md:text-4xl lg:text-5xl font-extralight leading-tight"
              style={{ color: colors[50] }}
            >
              {title}
            </h2>
            <div 
              className="w-8 md:w-12 h-px mt-4 md:mt-6 mb-4 md:mb-0"
              style={{ background: `linear-gradient(to right, ${colorScheme.accent}, transparent)` }}
            />
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7">
            <p 
              className="text-base md:text-xl font-light leading-relaxed mb-5 md:mb-8"
              style={{ color: colors[100] }}
            >
              {description}
            </p>
            
            <div className="space-y-2.5 md:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4">
                  <div 
                    className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full mt-2 md:mt-2.5 flex-shrink-0"
                    style={{ background: colorScheme.accent }}
                  />
                  <p className="text-sm md:text-lg font-light" style={{ color: colors[200] }}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-6 md:w-8 h-px" style={{ background: `linear-gradient(to right, ${colorScheme.accent}60, transparent)` }} />
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-px h-6 md:h-8" style={{ background: `linear-gradient(to bottom, ${colorScheme.accent}60, transparent)` }} />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 md:w-8 h-px" style={{ background: `linear-gradient(to left, ${colorScheme.accent}60, transparent)` }} />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-px h-6 md:h-8" style={{ background: `linear-gradient(to top, ${colorScheme.accent}60, transparent)` }} />

      {number === "01" && (
        <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <div className="text-xs font-mono uppercase tracking-widest" style={{ color: colors[400] }}>Scroll</div>
          <div className="w-px h-8 scroll-indicator" style={{ background: `linear-gradient(to bottom, ${colors[400]}, transparent)` }} />
        </div>
      )}
    </div>
  );
}

const services: { number: "01" | "02" | "03" | "04"; title: string; description: string; features: string[] }[] = [
  {
    number: "01",
    title: "Web Development",
    description: "We build fast, scalable, and beautifully crafted websites that perform.",
    features: [
      "Search Engine Optimization (SEO)",
      "Custom web design tailored to your brand",
      "Responsive across all devices",
      "Performance-first architecture",
    ],
  },
  {
    number: "02",
    title: "Web Applications",
    description: "Full-stack applications that solve real problems and scale with your business.",
    features: [
      "Custom dashboards and admin panels",
      "SaaS product development",
      "API integrations and automation",
      "Real-time features and databases",
    ],
  },
  {
    number: "03",
    title: "Social Media",
    description: "Content that captures attention and builds community around your brand.",
    features: [
      "Instagram and Facebook visuals",
      "Curated post strategies",
      "Professional drone videography",
      "Cohesive brand storytelling",
    ],
  },
  {
    number: "04",
    title: "Digital Advertising",
    description: "Strategic campaigns that reach the right people at the right time.",
    features: [
      "Paid social media campaigns",
      "Google Ads management",
      "Conversion tracking and analytics",
      "A/B testing and optimization",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="relative">
      {services.map((service, index) => (
        <ServiceCard
          key={service.number}
          number={service.number}
          title={service.title}
          description={service.description}
          features={service.features}
          zIndex={index + 1}
        />
      ))}
    </section>
  );
}

export default ServicesSection;
