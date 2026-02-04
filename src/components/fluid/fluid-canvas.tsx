"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { FluidSimulation } from "./fluid-simulation";
import { FluidConfig } from "./utils";

interface FluidCanvasProps {
  /** The element to track mouse events on (usually main content) */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Fluid effect color - defaults to off-white */
  fluidColor?: string;
  /** Background color for empty areas */
  backgroundColor?: string;
  /** Custom configuration overrides */
  config?: Partial<FluidConfig>;
  /** Whether to enable the effect */
  enabled?: boolean;
  /** Additional class names */
  className?: string;
}

export function FluidCanvas({
  containerRef,
  fluidColor = "#f0f4f1",
  backgroundColor = "#070410",
  config,
  enabled = true,
  className = "",
}: FluidCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !enabled) return null;

  return (
    <Canvas
      flat
      linear
      gl={{
        antialias: false,
        stencil: false,
        depth: false,
        powerPreference: "high-performance",
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        background: "transparent",
      }}
      dpr={[0.1, 0.5]}
      className={className}
    >
      <EffectComposer>
        <FluidSimulation
          mainRef={containerRef}
          fluidColor={fluidColor}
          backgroundColor={backgroundColor}
          config={config}
        />
      </EffectComposer>
    </Canvas>
  );
}

// Provider component for easier integration
interface FluidProviderProps {
  children: React.ReactNode;
  fluidColor?: string;
  backgroundColor?: string;
  config?: Partial<FluidConfig>;
  enabled?: boolean;
}

export function FluidProvider({
  children,
  fluidColor = "#f0f4f1",
  backgroundColor = "#070410",
  config,
  enabled = true,
}: FluidProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
      <FluidCanvas
        containerRef={containerRef}
        fluidColor={fluidColor}
        backgroundColor={backgroundColor}
        config={config}
        enabled={enabled}
      />
    </div>
  );
}
