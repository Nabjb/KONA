"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useTransform, motion, useMotionValueEvent, useMotionValue, animate } from "framer-motion";

// ============================================
// CIRCULAR PARTICLE TEXTURE - Makes particles round, not square!
// ============================================

function useCircleTexture(color: string = "#ffffff", glow: boolean = true) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    
    const centerX = 32;
    const centerY = 32;
    const radius = 28;
    
    // Create radial gradient for glow effect
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    if (glow) {
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.3, color);
      gradient.addColorStop(0.6, color + "88");
      gradient.addColorStop(1, "transparent");
    } else {
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.8, color);
      gradient.addColorStop(1, "transparent");
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [color, glow]);
}


// ============================================
// UNIVERSE STARS - The stars that form after explosion
// ============================================

function UniverseStars({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1500; // Reduced for better mobile performance
  const circleTexture = useCircleTexture("#ffffff", false);
  
  const { startPositions, finalPositions, colors } = useMemo(() => {
    const start = new Float32Array(particleCount * 3);
    const final = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Final star positions - spread across the sky dome
      const r = 15 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      final[i3] = r * Math.sin(phi) * Math.cos(theta);
      final[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      final[i3 + 2] = r * Math.cos(phi) - 5;
      
      // Start positions - closer to camera (creates "flying through space" effect)
      // Stars start along the same direction but closer to viewer
      const startDistance = 0.05 + Math.random() * 0.15; // Start closer to center
      start[i3] = final[i3] * startDistance;
      start[i3 + 1] = final[i3 + 1] * startDistance;
      start[i3 + 2] = final[i3 + 2] * startDistance + 10; // Start closer (within camera view)
      
      // Star colors: mostly white with some blue/purple tints
      const c = Math.random();
      if (c < 0.6) { 
        cols[i3] = 1; cols[i3+1] = 1; cols[i3+2] = 1; // White
      } else if (c < 0.8) { 
        cols[i3] = 0.8; cols[i3+1] = 0.85; cols[i3+2] = 1; // Blue-white
      } else { 
        cols[i3] = 0.95; cols[i3+1] = 0.8; cols[i3+2] = 1; // Purple-white
      }
    }
    
    return { startPositions: start, finalPositions: final, colors: cols };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    // Early return if progress is outside visible range - prevents unnecessary calculations
    if (progress < 0 || progress > 1.1) return;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Simple smooth interpolation - very GPU friendly!
    // Ease out cubic for smooth deceleration as stars reach final positions
    const t = Math.min(1, Math.max(0, progress)); // Clamp between 0 and 1
    const easeT = 1 - Math.pow(1 - t, 2); // Smooth ease-out
    
    // Cache final positions when animation is complete (progress >= 1)
    // This prevents recalculating when scrolling back up
    if (t >= 1) {
      // Stars are at final positions - only update if not already cached
      if (posArray[0] !== finalPositions[0]) {
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          posArray[i3] = finalPositions[i3];
          posArray[i3 + 1] = finalPositions[i3 + 1];
          posArray[i3 + 2] = finalPositions[i3 + 2];
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    } else {
      // Only update positions if still animating
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Linear interpolation from start to final position
        posArray[i3] = startPositions[i3] + (finalPositions[i3] - startPositions[i3]) * easeT;
        posArray[i3 + 1] = startPositions[i3 + 1] + (finalPositions[i3 + 1] - startPositions[i3 + 1]) * easeT;
        posArray[i3 + 2] = startPositions[i3 + 2] + (finalPositions[i3 + 2] - startPositions[i3 + 2]) * easeT;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Stars visible immediately when scene appears
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    // Ensure stars are always visible (minimum 0.7 opacity), brighter as they approach
    mat.opacity = Math.max(0.7, Math.min(1, 0.7 + t * 0.3));
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[startPositions.slice(), 3]} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          args={[colors, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        map={circleTexture}
        vertexColors 
        transparent 
        opacity={0.7} 
        blending={THREE.AdditiveBlending} 
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ============================================
// SCENE - Clean and simple, just stars
// ============================================

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <UniverseStars progress={scrollProgress} />
    </>
  );
}

// ============================================
// MAIN COMPONENT - Zoom INTO Astronaut Visor
// ============================================

export default function GenesisHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollProgress(v);
  });

  // Astronaut zoom: Start ZOOMED OUT, zoom INTO visor as you scroll (VERY SLOW)
  // 0%: Full astronaut visible (scale 1)
  // 30%: Zoomed into visor (scale 12)
  // After 30%: Stay zoomed in, astronaut fades, explosion happens inside
  const astronautScale = useTransform(scrollYProgress, [0, 0.3], [1, 12]);
  const astronautOpacity = useTransform(scrollYProgress, [0, 0.28, 0.32, 0.38], [1, 1, 0.8, 0]);
  const astronautY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]); // Move up as we zoom into face
  
  // Vignette effect - subtle, gets stronger as we zoom in
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.18, 0.26, 0.32], [0, 0.3, 0.5, 0]);
  
  // Darkness overlay to simulate entering the visor - quick flash
  const visorDarknessOpacity = useTransform(scrollYProgress, [0.26, 0.30, 0.35], [0, 0.8, 0]);
  
  // Entrance animation opacity - fades in on mount
  const entranceOpacity = useMotionValue(0);
  
  useEffect(() => {
    animate(entranceOpacity, 1, { duration: 1.2, ease: [0.4, 0, 0.2, 1] });
  }, [entranceOpacity]);
  
  // Text overlays - combined with entrance animation
  const introTextScrollOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const introTextOpacity = useTransform(
    [entranceOpacity, introTextScrollOpacity],
    ([entrance, scroll]: number[]) => entrance * scroll
  );
  const konaverseOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  
  // Astronaut opacity - combined with entrance animation
  // Extended range for smoother transitions when scrolling back
  const astronautScrollOpacity = useTransform(scrollYProgress, [0, 0.28, 0.32, 0.4], [1, 1, 0.8, 0]);
  const astronautCombinedOpacity = useTransform(
    [entranceOpacity, astronautScrollOpacity],
    ([entrance, scroll]: number[]) => {
      // Ensure smooth transitions - clamp values to prevent flickering
      return Math.max(0, Math.min(1, entrance * scroll));
    }
  );
  
  // 3D scene visibility - only shows once we're "inside" the visor
  const sceneOpacity = useTransform(scrollYProgress, [0.25, 0.32], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden">
        
        {/* 3D Canvas - The explosion happens INSIDE the visor */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ 
            opacity: sceneOpacity,
            willChange: scrollProgress > 0.25 && scrollProgress < 0.4 ? 'opacity' : 'auto',
            pointerEvents: 'none',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
        >
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <Scene scrollProgress={Math.max(0, Math.min(1, (scrollProgress - 0.3) / 0.7))} />
            </Canvas>
          </Suspense>
        </motion.div>

        {/* Astronaut layer - Starts full view, zooms INTO visor */}
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            scale: astronautScale,
            opacity: astronautCombinedOpacity,
            y: astronautY,
            transformOrigin: "50% 35%", // Focus on visor/face area
            willChange: scrollProgress < 0.4 ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
        >
          <img
            src="/astronaut_figure1.png"
            alt="Astronaut"
            className="w-full h-full object-cover"
            style={{
              filter: scrollProgress < 0.18 
                ? `drop-shadow(0 0 40px rgba(100, 50, 255, 0.4))` 
                : scrollProgress < 0.32
                  ? `drop-shadow(0 0 60px rgba(100, 80, 255, 0.6)) brightness(1.1)`
                  : `drop-shadow(0 0 30px rgba(100, 150, 255, 0.3))`,
            }}
          />
        </motion.div>

        {/* Vignette overlay - subtle focus effect */}
        <motion.div 
          className="absolute inset-0 z-[15] pointer-events-none"
          style={{ 
            opacity: vignetteOpacity,
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, transparent 30%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        
        {/* Visor darkness - brief moment as we enter the visor */}
        <motion.div 
          className="absolute inset-0 z-[16] pointer-events-none bg-black"
          style={{ opacity: visorDarknessOpacity }}
        />

        {/* Opening text - Inside the visor/glass */}
        <motion.div 
          className="absolute inset-0 z-30 flex flex-col items-center pointer-events-none px-6"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            opacity: introTextOpacity,
            top: "32%", // Position in the visor area
          }}
        >
          <motion.h1 
            className="text-white text-sm md:text-lg lg:text-xl font-light tracking-[0.2em] mb-2 text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            THE CREATOR AWAITS
          </motion.h1>
          <motion.p 
            className="text-white/60 text-xs md:text-sm tracking-widest drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            look through the visor
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        {scrollProgress < 0.12 && (
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-white"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll to Enter</span>
          </motion.div>
        )}

        {/* KONAVERSE reveal */}
        <motion.div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: konaverseOpacity }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            style={{ textShadow: "0 0 80px rgba(139, 92, 246, 0.6)" }}
          >
            KONAVERSE
          </h1>
          <p className="text-white/50 text-sm md:text-base tracking-[0.2em] mt-4 uppercase">
            A universe created from within
          </p>
        </motion.div>

        {/* CTA Button */}
        {scrollProgress > 0.65 && (
          <motion.div 
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
            >
              <span>Explore Your Universe</span>
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
