"use client";

import { useRef, useEffect, useCallback } from "react";

interface SimpleFluidProps {
  color?: string;
  enabled?: boolean;
}

export default function SimpleFluid({ 
  color = "#a89080", 
  enabled = true 
}: SimpleFluidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, dx: 0, dy: 0 });
  const splattersRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    life: number;
    maxLife: number;
    color: string;
  }>>([]);

  const hexToRgba = useCallback((hex: string, alpha: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(255, 255, 255, ${alpha})`;
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - pointerRef.current.x;
      const dy = e.clientY - pointerRef.current.y;
      
      pointerRef.current = {
        x: e.clientX,
        y: e.clientY,
        dx,
        dy,
      };

      // Add splatter based on movement speed
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 2) {
        const numSplatters = Math.min(Math.floor(speed / 8), 3);
        for (let i = 0; i < numSplatters; i++) {
          splattersRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 15,
            y: e.clientY + (Math.random() - 0.5) * 15,
            vx: dx * 0.15 + (Math.random() - 0.5) * 3,
            vy: dy * 0.15 + (Math.random() - 0.5) * 3,
            radius: Math.random() * 25 + 8,
            life: 0.7,  // Start with less life
            maxLife: 0.7,
            color,
          });
        }
      }
    };

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 16, 2);
      lastTime = time;

      // Clear with faster fade effect (higher alpha = faster fade)
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw splatters
      ctx.globalCompositeOperation = "lighter";
      
      splattersRef.current = splattersRef.current.filter((splatter) => {
        splatter.x += splatter.vx * delta;
        splatter.y += splatter.vy * delta;
        splatter.vx *= 0.95;  // Faster velocity decay
        splatter.vy *= 0.95;
        splatter.life -= 0.04 * delta;  // Much faster life decay
        splatter.radius *= 1.02;  // Slightly faster expansion

        if (splatter.life <= 0) return false;

        const alpha = splatter.life * 0.5;  // More subtle
        const gradient = ctx.createRadialGradient(
          splatter.x,
          splatter.y,
          0,
          splatter.x,
          splatter.y,
          splatter.radius
        );
        gradient.addColorStop(0, hexToRgba(splatter.color, alpha));
        gradient.addColorStop(0.4, hexToRgba(splatter.color, alpha * 0.5));
        gradient.addColorStop(1, hexToRgba(splatter.color, 0));

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(splatter.x, splatter.y, splatter.radius, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      ctx.globalCompositeOperation = "source-over";
      
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, color, hexToRgba]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    />
  );
}
