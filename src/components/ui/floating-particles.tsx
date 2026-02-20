"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  layer: number; // 1 = slow/back, 2 = medium, 3 = fast/front
}

interface FloatingParticlesProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  enableParallax?: boolean;
}

export function FloatingParticles({ 
  className,
  particleCount = 40,
  colors = ["bg-blue-400", "bg-indigo-400", "bg-purple-400", "bg-sky-400", "bg-cyan-400"],
  enableParallax = true
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  
  // Different parallax speeds for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Back layer - slow
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]); // Middle layer - medium
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -500]); // Front layer - fast

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const layer = (i % 3) + 1; // Distribute across 3 layers
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 120 - 10, // -10% to 110% for overflow
        size: layer === 1 ? Math.random() * 3 + 1 : layer === 2 ? Math.random() * 4 + 2 : Math.random() * 5 + 3,
        duration: Math.random() * 15 + 20, // 20-35s
        delay: Math.random() * -15,
        opacity: layer === 1 ? Math.random() * 0.2 + 0.05 : layer === 2 ? Math.random() * 0.3 + 0.1 : Math.random() * 0.4 + 0.15,
        layer,
      });
    }
    queueMicrotask(() => setParticles(newParticles));
  }, [particleCount]);

  // Group particles by layer
  const layer1 = particles.filter(p => p.layer === 1);
  const layer2 = particles.filter(p => p.layer === 2);
  const layer3 = particles.filter(p => p.layer === 3);

  const renderParticles = (layerParticles: Particle[], layerY: MotionValue<number>) => (
    <motion.div 
      className="absolute inset-0"
      style={{ y: enableParallax ? layerY : 0 }}
    >
      {layerParticles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-full",
            colors[particle.id % colors.length]
          )}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float-particle-${particle.layer} ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: particle.layer === 3 ? `0 0 ${particle.size * 2}px currentColor` : undefined,
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Back layer - slowest parallax, smallest particles */}
      {renderParticles(layer1, y1)}
      
      {/* Middle layer */}
      {renderParticles(layer2, y2)}
      
      {/* Front layer - fastest parallax, largest particles with glow */}
      {renderParticles(layer3, y3)}
      
      <style jsx>{`
        @keyframes float-particle-1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(5px, -15px);
          }
          66% {
            transform: translate(-3px, -8px);
          }
        }
        @keyframes float-particle-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(8px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-5px, -35px) scale(0.95);
          }
          75% {
            transform: translate(10px, -18px) scale(1.02);
          }
        }
        @keyframes float-particle-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(12px, -25px) scale(1.1);
          }
          40% {
            transform: translate(-8px, -50px) scale(0.9);
          }
          60% {
            transform: translate(15px, -40px) scale(1.05);
          }
          80% {
            transform: translate(-5px, -20px) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
