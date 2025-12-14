'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

// Generate stars for the background (fixed seed for consistent positions)
function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic values based on index for consistent rendering
    const seed = i * 13.37;
    stars.push({
      id: i,
      left: `${(seed * 7.91) % 100}%`,
      top: `${(seed * 3.14) % 100}%`,
      size: (seed % 2) + 1,
      delay: (seed % 3),
      duration: (seed % 2) + 2,
    });
  }
  return stars;
}

// Generate stars once - same for mobile and desktop
const STARS = generateStars(50);

export function AstronautZoomPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // DESKTOP: Zoom IN (1 → 12) as you scroll down
  const scaleDesktop = useTransform(scrollYProgress, [0, 1], [1, 12]);
  const opacityDesktop = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const contentOpacityDesktop = useTransform(scrollYProgress, [0.30, 0.50], [0, 1]);
  const overlayOpacityDesktop = useTransform(scrollYProgress, [0.5, 0.9], [0, 0.7]);
  
  // MOBILE: Zoom OUT (4 → 1) as you scroll down - smaller scale for better performance
  const scaleMobile = useTransform(scrollYProgress, [0, 1], [4, 1]); // Reduced from 12x to 4x
  const contentOpacityMobile = useTransform(scrollYProgress, [0, 0.3], [1, 0]); // Text fades OUT
  const overlayOpacityMobile = useTransform(scrollYProgress, [0, 0.4], [0.8, 0]); // Overlay fades OUT

  return (
    <div ref={containerRef} className="relative h-[300vh] md:h-[500vh] bg-[#030014]">
      {/* Sticky container for the zoom effect */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Starry background - hidden on mobile for performance */}
        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
          {STARS.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
        {/* Mobile astronaut image - ZOOMS OUT (reversed), stays visible */}
        <motion.div
          style={{ scale: scaleMobile, transformOrigin: '50% 35%' }}
          className="md:hidden absolute inset-0 flex items-center justify-center"
        >
          <img
            src="/astonaut_figure_mobile.png"
            alt="Astronaut"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        
        {/* Mobile bottom fade - OUTSIDE scaled div so it stays fixed */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none z-20" />
        
        {/* Desktop astronaut image - ZOOMS IN (normal) */}
        <motion.div
          style={{ scale: scaleDesktop, opacity: opacityDesktop, transformOrigin: '50% 35%' }}
          className="hidden md:flex absolute inset-0 items-center justify-center"
        >
          <img
            src="/astronaut_figure1.png"
            alt="Astronaut"
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        {/* Dark overlay - Desktop: builds up, Mobile: fades out */}
        <motion.div 
          className="hidden md:block absolute inset-0 bg-[#030014] pointer-events-none"
          style={{ opacity: overlayOpacityDesktop }}
        />
        <motion.div 
          className="md:hidden absolute inset-0 bg-[#030014] pointer-events-none"
          style={{ opacity: overlayOpacityMobile }}
        />
        
        {/* Text - Desktop: fades IN, Mobile: fades OUT */}
        <motion.div
          style={{ opacity: contentOpacityDesktop }}
          className="hidden md:flex absolute inset-0 items-center justify-center px-4"
        >
          <div className="text-center">
            <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4">Entering the</p>
            <h2 
              className="text-7xl font-bold uppercase tracking-[0.35em]"
              style={{
                background: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Konaverse
            </h2>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: contentOpacityMobile }}
          className="md:hidden absolute inset-0 flex items-center justify-center px-4"
        >
          <div className="text-center">
            <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4">Entering the</p>
            <h2 
              className="text-3xl md:text-7xl font-bold uppercase tracking-[0.15em] md:tracking-[0.35em]"
              style={{
                background: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Konaverse
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

