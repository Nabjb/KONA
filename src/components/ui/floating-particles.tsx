"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
}

export function FloatingParticles({ 
  className,
  particleCount = 20,
  colors = ["bg-blue-400", "bg-indigo-400", "bg-purple-400", "bg-sky-400"]
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on mount
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2, // 2-6px
        duration: Math.random() * 20 + 15, // 15-35s
        delay: Math.random() * -20, // stagger start
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
      });
    }
    setParticles(newParticles);
  }, [particleCount]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
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
            animation: `float-particle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-5px, -40px) scale(0.9);
          }
          75% {
            transform: translate(15px, -20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

