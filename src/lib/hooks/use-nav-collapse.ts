"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface UseNavCollapseOptions {
    navContainerRef: RefObject<HTMLElement | null>;
    logoWidth?: number;
    ctaWidth?: number;
    minItemSpacing?: number;
    bufferWidth?: number;
}

/**
 * Content-aware collapse hook for the navigation.
 * Calculates whether the desktop navigation can render with proper spacing,
 * and triggers collapse mode when spacing would degrade below the minimum.
 */
export function useNavCollapse({
    navContainerRef,
    logoWidth = 80,
    ctaWidth = 120,
    minItemSpacing = 16, // 1rem minimum between items
    bufferWidth = 64, // Edge padding buffer
}: UseNavCollapseOptions) {
    const [shouldCollapse, setShouldCollapse] = useState(false);
    const [isCalculating, setIsCalculating] = useState(true);

    const calculateCollapse = useCallback(() => {
        if (!navContainerRef.current) {
            // Default to mobile if we can't measure
            setShouldCollapse(window.innerWidth < 1024);
            setIsCalculating(false);
            return;
        }

        const container = navContainerRef.current;
        const navItems = container.querySelectorAll('[data-nav-item="true"]');

        if (navItems.length === 0) {
            setShouldCollapse(window.innerWidth < 1024);
            setIsCalculating(false);
            return;
        }

        // Calculate total width of nav items
        let totalNavItemsWidth = 0;
        navItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            totalNavItemsWidth += rect.width;
        });

        // Calculate required spacing
        const requiredSpacing = (navItems.length - 1) * minItemSpacing;

        // Total required width
        const totalRequiredWidth =
            logoWidth +
            totalNavItemsWidth +
            requiredSpacing +
            ctaWidth +
            bufferWidth * 2; // Left and right buffers

        // Get available width
        const availableWidth = window.innerWidth;

        // Collapse if we don't have enough room
        setShouldCollapse(availableWidth < totalRequiredWidth);
        setIsCalculating(false);
    }, [navContainerRef, logoWidth, ctaWidth, minItemSpacing, bufferWidth]);

    useEffect(() => {
        // Initial calculation after mount
        const timer = setTimeout(calculateCollapse, 100);

        // Debounced resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(calculateCollapse, 150);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
        };
    }, [calculateCollapse]);

    return { shouldCollapse, isCalculating };
}
