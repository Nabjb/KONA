"use client";

import { motion } from "framer-motion";

interface NavHamburgerProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

/**
 * Asymmetric hamburger icon.
 * Three staggered horizontal lines that transform into an × when open.
 */
export function NavHamburger({ isOpen, onClick, className = "" }: NavHamburgerProps) {
    const lineColor = "#c8b4a0"; // Sand

    return (
        <button
            onClick={onClick}
            className={`relative flex flex-col items-end justify-center w-10 h-10 focus:outline-none ${className}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            {/* Top line - 20px, right-aligned */}
            <motion.span
                className="block absolute right-0"
                style={{
                    width: 20,
                    height: 1.5,
                    backgroundColor: lineColor,
                    transformOrigin: "right center",
                }}
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : -6,
                    x: isOpen ? -2 : 0,
                    width: isOpen ? 22 : 20,
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Middle line - 16px, offset slightly left */}
            <motion.span
                className="block absolute"
                style={{
                    width: 16,
                    height: 1.5,
                    backgroundColor: lineColor,
                    right: 2,
                }}
                animate={{
                    opacity: isOpen ? 0 : 1,
                    scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Bottom line - 18px, offset right */}
            <motion.span
                className="block absolute right-0"
                style={{
                    width: 18,
                    height: 1.5,
                    backgroundColor: lineColor,
                    transformOrigin: "right center",
                }}
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : 6,
                    x: isOpen ? -2 : 0,
                    width: isOpen ? 22 : 18,
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            />
        </button>
    );
}

export default NavHamburger;
