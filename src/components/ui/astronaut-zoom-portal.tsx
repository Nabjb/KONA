'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

// Generate stars for the background
function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    });
  }
  return stars;
}

export function AstronautZoomPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => generateStars(150), []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scale from 1 to 15 (zoom into the visor)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 15]);
  
  // Fade out the astronaut as we zoom in fully
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  
  // Fade in the next section content
  const contentOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#030014]">
      {/* Sticky container for the zoom effect */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Starry background matching previous section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {stars.map((star) => (
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
        {/* Mobile astronaut image that zooms */}
        <motion.div
          style={{ scale, opacity, transformOrigin: '50% 25%' }}
          className="md:hidden absolute inset-0 flex items-center justify-center"
        >
          <img
            src="/astonaut_figure_mobile.png"
            alt="Astronaut"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        
        {/* Desktop astronaut image that zooms */}
        <motion.div
          style={{ scale, opacity, transformOrigin: '50% 35%' }}
          className="hidden md:flex absolute inset-0 items-center justify-center"
        >
          <img
            src="/astronaut_figure1.png"
            alt="Astronaut"
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        {/* Dark overlay that builds up as we zoom */}
        <motion.div 
          className="absolute inset-0 bg-[#030014] pointer-events-none"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.5, 0.9], [0, 0.7])
          }}
        />
        
        {/* Teaser text that appears as we enter the portal */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 flex items-center justify-center px-4"
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

