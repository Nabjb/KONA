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
  const particleCount = 2000;
  const circleTexture = useCircleTexture("#ffffff", false);
  
  const { positions, starPositions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const stars = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const szs = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Start clustered at center
      pos[i3] = (Math.random() - 0.5) * 0.5;
      pos[i3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Final star positions spread across sky
      const r = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      stars[i3] = r * Math.sin(phi) * Math.cos(theta);
      stars[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      stars[i3 + 2] = r * Math.cos(phi) - 10;
      
      // Star colors: mostly white with some blue/purple/gold
      const c = Math.random();
      if (c < 0.5) { 
        cols[i3] = 1; cols[i3+1] = 1; cols[i3+2] = 1; // White
      } else if (c < 0.7) { 
        cols[i3] = 0.7; cols[i3+1] = 0.8; cols[i3+2] = 1; // Blue-white
      } else if (c < 0.85) { 
        cols[i3] = 0.9; cols[i3+1] = 0.7; cols[i3+2] = 1; // Purple-white
      } else { 
        cols[i3] = 1; cols[i3+1] = 0.9; cols[i3+2] = 0.7; // Warm white
      }
      
      // Varied sizes - most small, some larger
      szs[i] = Math.random() < 0.9 ? 0.02 + Math.random() * 0.04 : 0.06 + Math.random() * 0.08;
    }
    
    return { positions: pos, starPositions: stars, colors: cols, sizes: szs };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (progress < 0.15) {
        // Swirling at center before explosion
        const swirl = time * 2 + i * 0.01;
        const radius = 0.3 + progress * 3;
        posArray[i3] = Math.cos(swirl) * radius * 0.4 * (1 + Math.sin(i));
        posArray[i3 + 1] = Math.sin(swirl) * radius * 0.4 * (1 + Math.cos(i));
        posArray[i3 + 2] = Math.sin(time + i * 0.1) * 0.2;
      } else if (progress < 0.7) {
        // Explosion outward - SLOWER (longer duration)
        const t = (progress - 0.15) / 0.55; // Increased from 0.35 to 0.55
        const easeT = 1 - Math.pow(1 - t, 3); // Slower ease out (cubic instead of quadratic)
        posArray[i3] = starPositions[i3] * easeT * 0.8;
        posArray[i3 + 1] = starPositions[i3 + 1] * easeT * 0.8;
        posArray[i3 + 2] = starPositions[i3 + 2] * easeT * 0.8;
      } else {
        // Settle into final positions with subtle twinkle
        const t = Math.min(1, (progress - 0.7) / 0.2); // Adjusted start point
        const twinkle = 1 + Math.sin(time * 3 + i) * 0.02;
        posArray[i3] = starPositions[i3] * (0.8 + t * 0.2) * twinkle;
        posArray[i3 + 1] = starPositions[i3 + 1] * (0.8 + t * 0.2) * twinkle;
        posArray[i3 + 2] = starPositions[i3 + 2] * (0.8 + t * 0.2);
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Fade in
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = progress < 0.1 ? progress * 10 : 1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions.slice(), 3]} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          args={[colors, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        map={circleTexture}
        vertexColors 
        transparent 
        opacity={0} 
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

  // Astronaut zoom: Start ZOOMED OUT, zoom INTO visor as you scroll (SMOOTH & SLOW)
  // 0%: Full astronaut visible (scale 1)
  // 50%: Zoomed into visor (scale 12) - Extended range for smoother mobile experience
  // After 50%: Stay zoomed in, astronaut fades, explosion happens inside
  // Custom easing function for smoother zoom
  const astronautScale = useTransform(scrollYProgress, (latest) => {
    if (latest <= 0) return 1;
    if (latest >= 0.5) return 12;
    // Smooth easing: easeInOutCubic for smoother transition
    const t = latest / 0.5;
    const eased = t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
    return 1 + (eased * 11); // Scale from 1 to 12
  });
  
  const astronautOpacity = useTransform(scrollYProgress, [0, 0.45, 0.52, 0.6], [1, 1, 0.8, 0]);
  const astronautY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]); // Move up as we zoom into face
  
  // Vignette effect - subtle, gets stronger as we zoom in (extended range)
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.3, 0.42, 0.52], [0, 0.3, 0.5, 0]);
  
  // Darkness overlay to simulate entering the visor - smoother transition
  const visorDarknessOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.55], [0, 0.8, 0]);
  
  // Entrance animation opacity - fades in on mount
  const entranceOpacity = useMotionValue(0);
  
  useEffect(() => {
    animate(entranceOpacity, 1, { duration: 1.2, ease: [0.4, 0, 0.2, 1] });
  }, [entranceOpacity]);
  
  // Text overlays - combined with entrance animation (extended fade out)
  const introTextScrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const introTextOpacity = useTransform(
    [entranceOpacity, introTextScrollOpacity],
    ([entrance, scroll]: number[]) => entrance * scroll
  );
  const konaverseOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  
  // Astronaut opacity - combined with entrance animation (adjusted to match zoom timeline)
  const astronautScrollOpacity = useTransform(scrollYProgress, [0, 0.45, 0.52, 0.6], [1, 1, 0.8, 0]);
  const astronautCombinedOpacity = useTransform(
    [entranceOpacity, astronautScrollOpacity],
    ([entrance, scroll]: number[]) => entrance * scroll
  );
  
  // 3D scene visibility - only shows once we're "inside" the visor (adjusted timing)
  const sceneOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden">
        
        {/* 3D Canvas - The explosion happens INSIDE the visor */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ opacity: sceneOpacity }}
        >
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <Scene scrollProgress={Math.max(0, (scrollProgress - 0.42) / 0.58)} />
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
        {scrollProgress < 0.2 && (
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
        {scrollProgress > 0.75 && (
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
