"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

// Define the type for a single gallery item
interface GalleryItem {
  id: number;
  title: string;
  description: string;
  src: string;
  link?: string;
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 500, autoRotateSpeed = 0.15, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const lastMouseX = useRef(0);
    const lastTouchX = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTime = useRef(0);

    // Check if mobile
    useEffect(() => {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect for auto-rotation when not hovering or dragging
    useEffect(() => {
      const targetFPS = isMobile ? 30 : 60;
      const frameInterval = 1000 / targetFPS;
      
      const autoRotate = (timestamp: number) => {
        // Throttle on mobile
        if (timestamp - lastFrameTime.current >= frameInterval) {
          if (!isHovering && !isDragging) {
            setRotation(prev => prev + (isMobile ? autoRotateSpeed * 0.5 : autoRotateSpeed));
          }
          lastFrameTime.current = timestamp;
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isHovering, isDragging, autoRotateSpeed, isMobile]);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      lastMouseX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
        const delta = e.clientX - lastMouseX.current;
        setRotation(prev => prev + delta * 0.3);
        lastMouseX.current = e.clientX;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      setIsHovering(false);
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true);
      lastTouchX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (isDragging) {
        const delta = e.touches[0].clientX - lastTouchX.current;
        setRotation(prev => prev + delta * 0.3);
        lastTouchX.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    const anglePerItem = 360 / items.length;
    const effectiveRadius = isMobile ? Math.min(radius, 280) : radius;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="3D Project Gallery"
        className={cn(
          "relative w-full h-[500px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none",
          className
        )}
        style={{ perspective: isMobile ? '800px' : '1200px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovering(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        <div
          className="relative w-full h-full transition-transform duration-100 ease-out"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.2, 1 - (normalizedAngle / 180));
            const isFront = normalizedAngle < 45;

            return (
              <div
                key={item.id}
                role="group"
                aria-label={item.title}
                className="absolute w-[180px] h-[240px] sm:w-[200px] sm:h-[270px] md:w-[260px] md:h-[340px] lg:w-[280px] lg:h-[360px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-90px',
                  marginTop: '-120px',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear',
                  pointerEvents: isFront ? 'auto' : 'none',
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/10 bg-[#0a0a0a]">
                  {/* Project Screenshot */}
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/60 mb-3">{item.description}</p>
                    
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery, type GalleryItem };

