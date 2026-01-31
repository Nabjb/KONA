"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";

/**
 * Konaverse Standard Button - "The Authorization Style"
 * 
 * Features:
 * - 1px border framing
 * - Geometric mono typography
 * - Bottom-up background fill on hover
 * - Optional architectural corner frame
 */

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    showCorners?: boolean;
    type?: "button" | "submit" | "reset";
}

const colors = {
    oak: "#6b5545",
    sand: "#c8b4a0",
    parchment: "#f8f7f5",
    void: "#0d0f0c",
};

export const Button = ({
    children,
    href,
    onClick,
    className = "",
    variant = "primary",
    size = "lg",
    showCorners = false,
    type = "button"
}: ButtonProps) => {
    const content = (
        <>
            <span className={`relative z-10 font-mono uppercase ${size === "sm" ? "text-[10px] tracking-[0.2em]" : size === "md" ? "text-xs tracking-[0.3em]" : "text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]"
                }`}>
                {children}
            </span>

            {/* Subtle Background Fill on Hover */}
            <div className="absolute inset-0 bg-white/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </>
    );

    const padding = size === "sm" ? "px-3 py-1" : size === "md" ? "px-6 py-3" : "px-8 sm:px-12 py-4 sm:py-6";
    const sharedClasses = `relative group overflow-hidden border transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-oak ${padding} ${className}`;
    const borderStyle = variant === "primary" ? "border-white/20" : "border-white/10";
    const textColor = colors.parchment;

    const buttonStyle = {
        color: textColor,
    };

    const corners = showCorners && (
        <div className="absolute -top-12 -left-12 w-24 h-24 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: colors.sand }} />
            <div className="absolute top-0 left-0 w-px h-full" style={{ backgroundColor: colors.sand }} />
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="relative inline-block font-mono">
                {corners}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`${sharedClasses} ${borderStyle}`}
                    style={buttonStyle}
                >
                    {content}
                </motion.div>
            </Link>
        );
    }

    return (
        <div className="relative inline-block font-mono">
            {corners}
            <motion.button
                type={type}
                onClick={onClick}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`${sharedClasses} ${borderStyle}`}
                style={buttonStyle}
            >
                {content}
            </motion.button>
        </div>
    );
};
