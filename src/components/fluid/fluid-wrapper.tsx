"use client";

import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues
const SimpleFluid = dynamic(() => import("./simple-fluid"), { 
  ssr: false,
  loading: () => null,
});

interface FluidWrapperProps {
  /** Fluid effect color */
  fluidColor?: string;
  /** Whether to enable the effect */
  enabled?: boolean;
}

export function FluidWrapper({
  fluidColor = "#a89080",
  enabled = true,
}: FluidWrapperProps) {
  return <SimpleFluid color={fluidColor} enabled={enabled} />;
}

export default FluidWrapper;
