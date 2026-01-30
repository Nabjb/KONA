"use client";

import { usePathname } from "next/navigation";
import { GlobalNav } from "./global-nav";

/**
 * Conditional navbar wrapper that excludes the /journey route.
 */
export function ConditionalNav() {
    const pathname = usePathname();

    // Don't render navbar on /journey - it's a standalone experience
    if (pathname === "/journey") {
        return null;
    }

    return <GlobalNav />;
}

export default ConditionalNav;
