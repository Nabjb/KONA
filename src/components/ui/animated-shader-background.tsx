"use client";

import React, { useEffect, useRef } from 'react';

interface ShaderBackgroundProps {
  className?: string;
}

const AnimatedShaderBackground = ({ className }: ShaderBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Star properties
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }

    // Generate stars
    const stars: Star[] = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        // Star glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        );
        gradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(150, 180, 255, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      resize();
      // Redistribute stars on resize
      stars.forEach((star) => {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
      });
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${className || ''}`} style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#030014]" />
      
      {/* Aurora/nebula effect with CSS */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            animationDuration: '8s'
          }} 
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
            animationDuration: '10s',
            animationDelay: '2s'
          }} 
        />
        <div 
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full blur-[80px] animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            animationDuration: '12s',
            animationDelay: '4s'
          }} 
        />
      </div>

      {/* Stars canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default AnimatedShaderBackground;
