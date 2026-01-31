"use client";

import React, { useEffect, useRef } from "react";

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

interface SolutionHeroProps {
    title: string;
    subtitle?: string;
    description?: string;
}

export function SolutionHero({ title, subtitle, description }: SolutionHeroProps) {
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Mouse gradient
        const gradient = gradientRef.current;
        function onMouseMove(e: MouseEvent) {
            if (gradient) {
                gradient.style.left = e.clientX - 192 + "px";
                gradient.style.top = e.clientY - 192 + "px";
                gradient.style.opacity = "1";
            }
        }
        function onMouseLeave() {
            if (gradient) gradient.style.opacity = "0";
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <div className="h-[70vh] min-h-[500px] bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] text-[#e6e1d7] overflow-hidden relative w-full flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-solution" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path
                            d="M 60 0 L 0 0 0 60"
                            fill="none"
                            stroke="rgba(200,180,160,0.08)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-solution)" />
                <line x1="0" y1="20%" x2="100%" y2="20%" style={{ stroke: "rgba(200,180,160,0.05)", strokeWidth: 0.5 }} />
                <line x1="0" y1="80%" x2="100%" y2="80%" style={{ stroke: "rgba(200,180,160,0.05)", strokeWidth: 0.5 }} />
                <line x1="20%" y1="0" x2="20%" y2="100%" style={{ stroke: "rgba(200,180,160,0.05)", strokeWidth: 0.5 }} />
                <line x1="80%" y1="0" x2="80%" y2="100%" style={{ stroke: "rgba(200,180,160,0.05)", strokeWidth: 0.5 }} />
            </svg>

            <div className="relative z-10 text-center px-6 max-w-4xl">
                {subtitle && (
                    <h2 className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.3em] mb-4" style={{ color: colors[200] }}>
                        {subtitle}
                    </h2>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-6" style={{ color: colors[50] }}>
                    {title}
                </h1>
                {description && (
                    <p className="text-sm md:text-base font-light leading-relaxed opacity-60 max-w-2xl mx-auto" style={{ color: colors[100] }}>
                        {description}
                    </p>
                )}
            </div>

            <div
                id="mouse-gradient-solution"
                ref={gradientRef}
                className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
                style={{
                    background: `radial-gradient(circle, ${colors[500]}0D 0%, transparent 100%)`,
                }}
            ></div>
        </div>
    );
}

export default SolutionHero;
