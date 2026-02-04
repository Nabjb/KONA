"use client";

import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/use-isomorphic-layout-effect';
import { useRef, useState, useEffect } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextOpacityProps {
  children: React.ReactNode;
  trigger?: HTMLElement | null;
  className?: string;
}

export function TextOpacity({ children, trigger, className = '' }: TextOpacityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitInstanceRef = useRef<SplitType | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const createTextOpacityAnimation = (element: HTMLElement, scrollTrigger: HTMLElement | null, mobile: boolean) => {
    // Clean up previous SplitType instance if it exists
    if (splitInstanceRef.current) {
      try {
        splitInstanceRef.current.revert();
      } catch (e) {
        // Ignore errors if already reverted
      }
      splitInstanceRef.current = null;
    }

    // Kill previous animation if it exists
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Create new SplitType instance
    const splitted = new SplitType(element, { types: 'words' });
    splitInstanceRef.current = splitted;
    
    if (!splitted.words || splitted.words.length === 0) return;
    
    // Pre-calculate random values for each word to ensure consistency
    const wordAnimations = splitted.words.map((word) => {
      const zRange = mobile ? { min: 300, max: 600 } : { min: 500, max: 950 };
      const xRange = mobile ? { min: -50, max: 50 } : { min: -100, max: 100 };
      const yRange = mobile ? { min: -5, max: 5 } : { min: -10, max: 10 };
      const rotationRange = mobile ? { min: -45, max: 45 } : { min: -90, max: 90 };

      return {
        word,
        z: gsap.utils.random(zRange.min, zRange.max),
        xPercent: gsap.utils.random(xRange.min, xRange.max),
        yPercent: gsap.utils.random(yRange.min, yRange.max),
        rotationX: gsap.utils.random(rotationRange.min, rotationRange.max),
      };
    });
    
    // Set up each word with initial state and 3D properties
    wordAnimations.forEach(({ word, z, xPercent, yPercent, rotationX }) => {
      gsap.set(word, { 
        opacity: 0,
        z,
        xPercent,
        yPercent,
        rotationX,
        transformPerspective: mobile ? 500 : 1000,
        transformStyle: 'preserve-3d',
        'will-change': 'opacity, transform',
      });
    });

    // Create animation with pre-calculated values
    const animation = gsap.to(
      splitted.words,
      {
        ease: 'power1.out',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
        scrollTrigger: {
          trigger: scrollTrigger || element,
          start: mobile ? 'top 80%' : 'top 70%',
          end: mobile ? 'top 20%' : 'top -10%',
          scrub: mobile ? 0.5 : 1,
          invalidateOnRefresh: true,
          // scrub automatically handles reverse scrolling
        },
        stagger: {
          each: mobile ? 0.008 : 0.012,
          from: 'random',
        },
      },
    );

    animationRef.current = animation;
  };

  useIsomorphicLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Wait for trigger to be available if provided
    const actualTrigger = trigger || element;

    const ctx = gsap.context(() => {
      createTextOpacityAnimation(element, actualTrigger, isMobile);
    }, element);

    return () => {
      // Clean up animation
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      
      // Clean up SplitType
      if (splitInstanceRef.current) {
        try {
          splitInstanceRef.current.revert();
        } catch (e) {
          // Ignore errors if already reverted
        }
        splitInstanceRef.current = null;
      }
      
      // Revert GSAP context (cleans up ScrollTriggers)
      ctx.revert();
    };
  }, [trigger, isMobile]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        perspective: isMobile ? '500px' : '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
