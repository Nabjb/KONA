"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

const FOUNDER_IMAGES = {
  konstantinos: "/images/founders/konstantinos.jpg",
  nabil: "/images/founders/nabil.jpg",
  combined: "/images/founders/combined.jpg",
  konstantinos2: "/images/founders/konstantinos-2.jpg",
  nabil2: "/images/founders/nabil-2.jpg",
} as const;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const sage = "#8a9e7e";

const kSkills = ["Web Architecture", "Paid Media", "Security", "UX/UI", "Performance"];
const nSkills = ["Brand Strategy", "Video Editing", "Content Creation", "Social Media", "Creative Direction"];

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

// ── Mobile-only founder card ────────────────────────────────────────────────
function MobileFounderCard({
  label,
  name,
  bio,
  skills,
  quote,
  funFact,
  portrait,
  portrait2,
  onImageClick,
}: {
  label: string;
  name: string;
  bio: string;
  skills: string[];
  quote: string;
  funFact: string;
  portrait: string;
  portrait2: string;
  onImageClick: (src: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 pb-16">
      {/* Portrait */}
      <RevealBlock>
        <div
          className="relative overflow-hidden group cursor-pointer"
          style={{
            width: 200,
            height: 200,
            background: `linear-gradient(145deg, ${colors[800]}, ${colors[700]})`,
            border: `1px solid ${colors[600]}40`,
          }}
          onClick={() => onImageClick(portrait)}
        >
          <Image
            src={portrait}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="200px"
            priority
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: `${colors[900]}70` }}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>
              Inspect Me
            </span>
          </div>
        </div>
      </RevealBlock>

      {/* Name + label */}
      <RevealBlock delay={80} className="text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] block mb-1" style={{ color: colors[400] }}>
          {label}
        </span>
        <h3
          className="font-extralight tracking-tight"
          style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)", color: colors[50] }}
        >
          {name}
        </h3>
      </RevealBlock>

      {/* Bio */}
      <RevealBlock delay={140} className="text-center px-2 max-w-[300px]">
        <p className="text-sm font-light leading-relaxed" style={{ color: colors[300] }}>
          {bio}
        </p>
      </RevealBlock>

      {/* Skills */}
      <RevealBlock delay={200} className="flex flex-wrap gap-2 justify-center max-w-[300px]">
        {skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-1 border"
            style={{ borderColor: `${sage}50`, color: colors[400] }}
          >
            {skill}
          </span>
        ))}
      </RevealBlock>

      {/* Quote */}
      <RevealBlock delay={260} className="text-center max-w-[260px]">
        <div className="w-4 h-px mx-auto mb-2" style={{ backgroundColor: sage }} />
        <p className="text-xs font-light italic leading-relaxed" style={{ color: colors[200] }}>
          {quote}
        </p>
      </RevealBlock>

      {/* Fun fact */}
      <RevealBlock delay={320} className="text-center max-w-[280px]">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-1" style={{ color: colors[500] }}>
          Fun Fact
        </span>
        <p className="text-[11px] font-light" style={{ color: colors[300] }}>
          {funFact}
        </p>
      </RevealBlock>

      {/* Second portrait */}
      <RevealBlock delay={380}>
        <div
          className="relative overflow-hidden group cursor-pointer"
          style={{ width: 100, height: 100, border: `1px solid ${colors[600]}40` }}
          onClick={() => onImageClick(portrait2)}
        >
          <Image
            src={portrait2}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="100px"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: `${colors[900]}70` }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>
              View
            </span>
          </div>
        </div>
      </RevealBlock>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function FoundersSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftPortraitRef = useRef<HTMLDivElement>(null);
  const rightPortraitRef = useRef<HTMLDivElement>(null);
  const combinedRef = useRef<HTMLDivElement>(null);

  const leftPortraitSizerRef  = useRef<HTMLDivElement>(null);
  const rightPortraitSizerRef = useRef<HTMLDivElement>(null);

  const kBioRef         = useRef<HTMLDivElement>(null);
  const kSkillsRef      = useRef<HTMLDivElement>(null);
  const kSkillTagRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const kQuoteRef       = useRef<HTMLDivElement>(null);
  const kFunFactRef     = useRef<HTMLDivElement>(null);
  const kSecondImageRef = useRef<HTMLDivElement>(null);

  const nBioRef         = useRef<HTMLDivElement>(null);
  const nSkillsRef      = useRef<HTMLDivElement>(null);
  const nSkillTagRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const nQuoteRef       = useRef<HTMLDivElement>(null);
  const nFunFactRef     = useRef<HTMLDivElement>(null);
  const nSecondImageRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop-only GSAP animation
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const openOffset = 60;
        const retreatOffset = 90;

        gsap.set(leftPanelRef.current,  { x: -openOffset });
        gsap.set(rightPanelRef.current, { x: openOffset });
        gsap.set(combinedRef.current, { autoAlpha: 0 });

        gsap.set(leftPortraitSizerRef.current,  { width: 260, height: 260 });
        gsap.set(rightPortraitSizerRef.current, { width: 260, height: 260 });

        const allSpotlight = [
          kBioRef.current, kSkillsRef.current, kQuoteRef.current,
          kFunFactRef.current, kSecondImageRef.current,
          nBioRef.current, nSkillsRef.current, nQuoteRef.current,
          nFunFactRef.current, nSecondImageRef.current,
        ].filter(Boolean);
        gsap.set(allSpotlight, { autoAlpha: 0, y: 20 });
        gsap.set([...kSkillTagRefs.current, ...nSkillTagRefs.current].filter(Boolean), { autoAlpha: 0, y: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        tl
          // Phase 1 — gap closes
          .to(leftPanelRef.current,  { x: 0, duration: 5, ease: "none" }, 0)
          .to(rightPanelRef.current, { x: 0, duration: 5, ease: "none" }, 0)
          // Phase 2 — collision
          .to(combinedRef.current, { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" }, 5)
          .to([leftPortraitRef.current, rightPortraitRef.current], { autoAlpha: 0, duration: 1.5 }, 5)
          // Phase 3 — combined fades, portraits return
          .to(combinedRef.current, { autoAlpha: 0, duration: 1.5, ease: "power2.inOut" }, 7)
          .to([leftPortraitRef.current, rightPortraitRef.current], { autoAlpha: 1, duration: 1.5 }, 7)
          // Phase 4 — panels retreat and get stuck
          .to(leftPanelRef.current,  { x: -retreatOffset, duration: 2, ease: "none" }, 8)
          .to(rightPanelRef.current, { x: retreatOffset,  duration: 2, ease: "none" }, 8)
          // Phase 5 — K Spotlight begins: N dims, K portrait shrinks
          .to(rightPanelRef.current,        { opacity: 0.2, duration: 1.5, ease: "power2.inOut" }, 10)
          .to(leftPortraitSizerRef.current, { width: 120, height: 120, duration: 1.5, ease: "power2.inOut" }, 10)
          // Phase 6 — K content reveals
          .to(kBioRef.current,   { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 11)
          .to(kSkillTagRefs.current.filter(Boolean), { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" }, 12.5)
          .to(kQuoteRef.current,       { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 13.5)
          .to(kFunFactRef.current,     { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 14.5)
          .to(kSecondImageRef.current, { autoAlpha: 1, y: 0, duration: 2,   ease: "power2.out" }, 15.5)
          // Phase 7 — K dims, N brightens, N portrait shrinks
          .to(leftPanelRef.current,          { opacity: 0.2, duration: 1.5, ease: "power2.inOut" }, 16.5)
          .to(rightPanelRef.current,         { opacity: 1,   duration: 1.5, ease: "power2.inOut" }, 16.5)
          .to(rightPortraitSizerRef.current, { width: 120, height: 120, duration: 1.5, ease: "power2.inOut" }, 16.5)
          // Phase 8 — N content reveals
          .to(nBioRef.current,   { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 17.5)
          .to(nSkillTagRefs.current.filter(Boolean), { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" }, 19)
          .to(nQuoteRef.current,       { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 20)
          .to(nFunFactRef.current,     { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 21)
          .to(nSecondImageRef.current, { autoAlpha: 1, y: 0, duration: 2,   ease: "power2.out" }, 22);
      }, scrollerRef);

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <>
      {/* ── 01  Intro text section ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: colors[900] }}
      >
        <div
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none"
          style={{
            fontSize: "clamp(5rem, 18vw, 16rem)",
            fontWeight: 200,
            letterSpacing: "-0.05em",
            color: colors[200],
            opacity: 0.04,
          }}
        >
          STUDIO
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.03 }}>
          <defs>
            <pattern id="founders-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={colors[300]} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#founders-grid)" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-32">
          <div className="max-w-2xl">
            <RevealBlock delay={0}>
              <span className="text-xs font-mono uppercase tracking-[0.3em] block mb-8" style={{ color: colors[400] }}>
                01 — The Studio
              </span>
            </RevealBlock>
            <RevealBlock delay={120}>
              <p
                className="font-extralight leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", color: colors[50] }}
              >
                Konaverse is a boutique digital studio built on a quiet conviction.
              </p>
            </RevealBlock>
            <RevealBlock delay={260}>
              <p className="text-base md:text-lg font-light leading-relaxed mt-8" style={{ color: colors[300] }}>
                That design which is precise and purposeful outlasts everything louder. We work with founders
                and brands who understand that the space between elements is as powerful as the elements
                themselves. Every project begins with intention. Every project ends with something inevitable.
              </p>
            </RevealBlock>
            <RevealBlock delay={400}>
              <div className="w-8 h-px mt-10" style={{ backgroundColor: colors[500] }} />
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 02  Mobile: stacked cards ── */}
      {isMobile && (
        <section style={{ backgroundColor: colors[900] }} className="relative pt-16 pb-4 px-6">
          {/* Section label */}
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: colors[500] }}>
              02 — The Founders
            </span>
          </div>

          {/* Thin divider between cards */}
          <MobileFounderCard
            label="01 — Co-Founder"
            name="Konstantinos Kyprianou"
            bio="Architect of digital experiences. Deep command of web architecture, security, and paid media — he transforms brand vision into precise interfaces that perform and endure."
            skills={kSkills}
            quote='"The interface is the product. Build it like it matters."'
            funFact="Has been building websites since he was 15. His first client was a family business in Cyprus."
            portrait={FOUNDER_IMAGES.konstantinos}
            portrait2={FOUNDER_IMAGES.konstantinos2}
            onImageClick={setSelectedImage}
          />

          <div className="w-full h-px mb-16" style={{ backgroundColor: `${colors[700]}40` }} />

          <MobileFounderCard
            label="02 — Co-Founder"
            name="Nabil Al Jbawi"
            bio="Strategist and creative director. Editing video since 17, he bridges brand ambition and market reality — with a sharp eye for content that moves people and drives results."
            skills={nSkills}
            quote={`"Great content doesn't look like an ad. It looks like the truth."`}
            funFact={`Started editing videos at 17 for fun. Now it's his professional weapon.`}
            portrait={FOUNDER_IMAGES.nabil}
            portrait2={FOUNDER_IMAGES.nabil2}
            onImageClick={setSelectedImage}
          />
        </section>
      )}

      {/* ── 02  Desktop: GSAP aperture section ── */}
      {!isMobile && (
        <div
          ref={scrollerRef}
          className="relative"
          style={{ height: "644vh", backgroundColor: colors[900] }}
        >
          <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: colors[900] }}>
            {/* Section label */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: colors[500] }}>
                02 — The Founders
              </span>
            </div>

            {/* Center divider */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px z-20 pointer-events-none"
              style={{ background: `linear-gradient(to bottom, transparent, ${colors[700]}40, transparent)` }}
            />

            {/* ── Left Panel — Konstantinos ── */}
            <div
              ref={leftPanelRef}
              className="absolute overflow-hidden"
              style={{ top: 0, bottom: 0, left: 0, width: "50%" }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 55% 85% at 65% 85%, ${colors[400]}, transparent)` }} />
              </div>
              <div
                className="absolute bottom-[8%] left-0 w-full text-center select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 200, letterSpacing: "-0.03em", color: colors[200], opacity: 0.04 }}
              >
                VISION
              </div>

              <div className="relative h-full flex flex-col items-center justify-center gap-4 px-6 md:px-12">
                <div ref={leftPortraitRef}>
                  <div
                    ref={leftPortraitSizerRef}
                    className="relative overflow-hidden group cursor-pointer"
                    style={{ width: 260, height: 260, background: `linear-gradient(145deg, ${colors[800]}, ${colors[700]})`, border: `1px solid ${colors[600]}40` }}
                    onClick={() => setSelectedImage(FOUNDER_IMAGES.konstantinos)}
                  >
                    <Image src={FOUNDER_IMAGES.konstantinos} alt="Konstantinos Kyprianou — Co-Founder" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="260px" priority />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: `${colors[900]}70` }}>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>Inspect Me</span>
                    </div>
                  </div>
                </div>

                <div ref={kBioRef} className="text-center max-w-[280px]" style={{ opacity: 0, visibility: "hidden" }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] block mb-1" style={{ color: colors[400] }}>01 — Co-Founder</span>
                  <h3 className="font-extralight tracking-tight mb-2" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: colors[50] }}>Konstantinos Kyprianou</h3>
                  <p className="text-xs font-light leading-relaxed" style={{ color: colors[300] }}>
                    Architect of digital experiences. Deep command of web architecture, security, and paid media —
                    he transforms brand vision into precise interfaces that perform and endure.
                  </p>
                </div>

                <div ref={kSkillsRef} className="flex flex-wrap gap-2 justify-center max-w-[280px]" style={{ opacity: 0, visibility: "hidden" }}>
                  {kSkills.map((skill, i) => (
                    <span key={skill} ref={(el) => { kSkillTagRefs.current[i] = el; }} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-1 border" style={{ borderColor: `${sage}50`, color: colors[400], opacity: 0, visibility: "hidden" }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div ref={kQuoteRef} className="text-center max-w-[240px]" style={{ opacity: 0, visibility: "hidden" }}>
                  <div className="w-4 h-px mx-auto mb-2" style={{ backgroundColor: sage }} />
                  <p className="text-xs font-light italic leading-relaxed" style={{ color: colors[200] }}>&ldquo;The interface is the product. Build it like it matters.&rdquo;</p>
                </div>

                <div ref={kFunFactRef} className="text-center max-w-[260px]" style={{ opacity: 0, visibility: "hidden" }}>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-1" style={{ color: colors[500] }}>Fun Fact</span>
                  <p className="text-[11px] font-light" style={{ color: colors[300] }}>Has been building websites since he was 15. His first client was a family business in Cyprus.</p>
                </div>

                <div ref={kSecondImageRef} style={{ opacity: 0, visibility: "hidden" }}>
                  <div className="relative overflow-hidden group cursor-pointer" style={{ width: 120, height: 120, border: `1px solid ${colors[600]}40` }} onClick={() => setSelectedImage(FOUNDER_IMAGES.konstantinos2)}>
                    <Image src={FOUNDER_IMAGES.konstantinos2} alt="Konstantinos" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="120px" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: `${colors[900]}70` }}>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>Inspect Me</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Panel — Nabil ── */}
            <div
              ref={rightPanelRef}
              className="absolute overflow-hidden"
              style={{ top: 0, bottom: 0, right: 0, width: "50%" }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 55% 85% at 35% 85%, ${colors[300]}, transparent)` }} />
              </div>
              <div
                className="absolute bottom-[8%] left-0 w-full text-center select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 200, letterSpacing: "-0.03em", color: colors[200], opacity: 0.04 }}
              >
                CRAFT
              </div>

              <div className="relative h-full flex flex-col items-center justify-center gap-4 px-6 md:px-12">
                <div ref={rightPortraitRef}>
                  <div
                    ref={rightPortraitSizerRef}
                    className="relative overflow-hidden group cursor-pointer"
                    style={{ width: 260, height: 260, background: `linear-gradient(145deg, ${colors[800]}, ${colors[700]})`, border: `1px solid ${colors[600]}40` }}
                    onClick={() => setSelectedImage(FOUNDER_IMAGES.nabil)}
                  >
                    <Image src={FOUNDER_IMAGES.nabil} alt="Nabil Al Jbawi — Co-Founder" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="260px" priority />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: `${colors[900]}70` }}>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>Inspect Me</span>
                    </div>
                  </div>
                </div>

                <div ref={nBioRef} className="text-center max-w-[280px]" style={{ opacity: 0, visibility: "hidden" }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] block mb-1" style={{ color: colors[400] }}>02 — Co-Founder</span>
                  <h3 className="font-extralight tracking-tight mb-2" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: colors[50] }}>Nabil Al Jbawi</h3>
                  <p className="text-xs font-light leading-relaxed" style={{ color: colors[300] }}>
                    Strategist and creative director. Editing video since 17, he bridges brand ambition and market reality —
                    with a sharp eye for content that moves people and drives results.
                  </p>
                </div>

                <div ref={nSkillsRef} className="flex flex-wrap gap-2 justify-center max-w-[280px]" style={{ opacity: 0, visibility: "hidden" }}>
                  {nSkills.map((skill, i) => (
                    <span key={skill} ref={(el) => { nSkillTagRefs.current[i] = el; }} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-1 border" style={{ borderColor: `${sage}50`, color: colors[400], opacity: 0, visibility: "hidden" }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div ref={nQuoteRef} className="text-center max-w-[240px]" style={{ opacity: 0, visibility: "hidden" }}>
                  <div className="w-4 h-px mx-auto mb-2" style={{ backgroundColor: sage }} />
                  <p className="text-xs font-light italic leading-relaxed" style={{ color: colors[200] }}>&ldquo;Great content doesn&apos;t look like an ad. It looks like the truth.&rdquo;</p>
                </div>

                <div ref={nFunFactRef} className="text-center max-w-[260px]" style={{ opacity: 0, visibility: "hidden" }}>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-1" style={{ color: colors[500] }}>Fun Fact</span>
                  <p className="text-[11px] font-light" style={{ color: colors[300] }}>Started editing videos at 17 for fun. Now it&apos;s his professional weapon.</p>
                </div>

                <div ref={nSecondImageRef} style={{ opacity: 0, visibility: "hidden" }}>
                  <div className="relative overflow-hidden group cursor-pointer" style={{ width: 120, height: 120, border: `1px solid ${colors[600]}40` }} onClick={() => setSelectedImage(FOUNDER_IMAGES.nabil2)}>
                    <Image src={FOUNDER_IMAGES.nabil2} alt="Nabil" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="120px" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: `${colors[900]}70` }}>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>Inspect Me</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Combined portrait ── */}
            <div
              ref={combinedRef}
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{ width: "65vw", maxWidth: "760px", aspectRatio: "2 / 1", background: `linear-gradient(145deg, ${colors[800]}, ${colors[700]})`, border: `1px solid ${colors[600]}40` }}
                onClick={() => setSelectedImage(FOUNDER_IMAGES.combined)}
              >
                <Image src={FOUNDER_IMAGES.combined} alt="Konstantinos & Nabil — Konaverse Founders" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="65vw" priority />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: `${colors[900]}70` }}>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: colors[200] }}>Inspect Me</span>
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
              <span className="text-[8px] font-mono uppercase tracking-[0.3em]" style={{ color: colors[600] }}>Scroll</span>
              <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${colors[600]}, transparent)` }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {selectedImage && (
        <>
          <style>{`
            @keyframes kona-lb-bg {
              from { opacity: 0 }
              to   { opacity: 1 }
            }
            @keyframes kona-lb-img {
              from { opacity: 0; transform: scale(0.96) }
              to   { opacity: 1; transform: scale(1) }
            }
          `}</style>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(17,17,17,0.92)", backdropFilter: "blur(8px)", animation: "kona-lb-bg 300ms ease forwards" }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 border transition-colors duration-300"
              style={{ borderColor: `${colors[300]}50`, color: colors[300] }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = colors[300])}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = `${colors[300]}50`)}
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-4 h-4" />
            </button>
            <div
              style={{ animation: "kona-lb-img 400ms cubic-bezier(0.16, 1, 0.3, 1) 0.08s both", maxWidth: "90vw", maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt="Full view" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", display: "block", borderRadius: "6px" }} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FoundersSection;
