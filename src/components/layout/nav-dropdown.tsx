"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const colors = {
    deepForest: "#1a1d18",
    midnight: "#2a2e26",
    oak: "#6b5545",
    sand: "#c8b4a0",
    parchment: "#f8f7f5",
};

interface NavDropdownProps {
    trigger: React.ReactNode;
    items: { label: string; href: string }[];
    footerLink?: { label: string; href: string };
}

/**
 * Solutions dropdown - a spatial overlay with construction line reveal.
 */
export function NavDropdown({ trigger, items, footerLink }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        // Clear any pending close
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        setIsHovering(true);
        // 150ms delay before opening
        timeoutRef.current = setTimeout(() => {
            setIsOpen(true);
        }, 150);
    };

    const handleMouseLeave = () => {
        // Clear any pending open
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setIsHovering(false);
        // 200ms delay before closing
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger */}
            <button
                className="relative flex items-center gap-1 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                onClick={() => setIsOpen(!isOpen)}
            >
                {trigger}

                {/* Dropdown indicator */}
                <motion.svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="ml-1"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path
                        d="M1 1L5 5L9 1"
                        stroke={isHovering || isOpen ? colors.parchment : colors.sand}
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>

                {/* Construction line underline */}
                <motion.span
                    className="absolute -bottom-1 left-0 h-px"
                    style={{ backgroundColor: colors.oak }}
                    initial={{ width: 0 }}
                    animate={{ width: isOpen ? "100%" : 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Vertical construction line */}
                        <motion.div
                            className="absolute left-0 top-full w-px"
                            style={{ backgroundColor: colors.oak, opacity: 0.4 }}
                            initial={{ height: 0 }}
                            animate={{ height: 24 }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        {/* Panel */}
                        <motion.div
                            className="absolute left-0 top-full mt-6 z-50"
                            style={{
                                width: "clamp(220px, 18vw, 280px)",
                                backgroundColor: `${colors.deepForest}f2`, // 95% opacity
                                borderRadius: 2,
                                border: `1px solid ${colors.oak}33`, // 20% opacity
                                backdropFilter: "blur(8px)",
                            }}
                            initial={{ opacity: 0, scale: 0.98, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -4 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            role="menu"
                        >
                            {/* Header */}
                            <div className="px-5 pt-5 pb-3">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-1 h-1 rounded-full"
                                        style={{ backgroundColor: colors.oak }}
                                    />
                                    <span
                                        className="text-[11px] font-mono font-light uppercase"
                                        style={{ color: colors.oak, letterSpacing: "0.2em" }}
                                    >
                                        Solutions
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div
                                className="h-px mx-4"
                                style={{ backgroundColor: `${colors.oak}26` }} // 15% opacity
                            />

                            {/* Items */}
                            <div className="py-3">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.05 * (index + 1), duration: 0.2 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block px-5 py-2 transition-colors duration-200"
                                            style={{ color: colors.sand }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = colors.parchment;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = colors.sand;
                                            }}
                                            role="menuitem"
                                        >
                                            <span
                                                className="text-sm font-light"
                                                style={{ letterSpacing: "0.05em" }}
                                            >
                                                {item.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer link */}
                            {footerLink && (
                                <>
                                    <div
                                        className="h-px mx-4"
                                        style={{ backgroundColor: `${colors.oak}26` }}
                                    />
                                    <div className="px-5 py-4">
                                        <Link
                                            href={footerLink.href}
                                            className="flex items-center gap-2 text-xs font-mono transition-colors duration-200"
                                            style={{ color: colors.sand, letterSpacing: "0.1em" }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = colors.parchment;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = colors.sand;
                                            }}
                                        >
                                            <span>→</span>
                                            <span>{footerLink.label}</span>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NavDropdown;
