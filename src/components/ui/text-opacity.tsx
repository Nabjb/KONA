"use client";

import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/use-isomorphic-layout-effect';
import { useRef } from 'react';

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

  const createTextOpacityAnimation = (element: HTMLElement, scrollTrigger: HTMLElement | null) => {
    const splitted = new SplitType(element, { types: 'words' });
    
    // Set up each word with initial state and 3D properties
    splitted.words.forEach((word) => {
      gsap.set(word, { 
        opacity: 0,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      });
    });

    gsap.fromTo(
      splitted.words,
      {
        'will-change': 'opacity, transform',
        z: () => gsap.utils.random(500, 950),  // Start far back (into the screen)
        opacity: 0,
        xPercent: () => gsap.utils.random(-100, 100),
        yPercent: () => gsap.utils.random(-10, 10),
        rotationX: () => gsap.utils.random(-90, 90),
      },
      {
        ease: 'power1.out',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,  // Come forward to screen level
        scrollTrigger: {
          trigger: scrollTrigger || element,
          start: 'top 70%',
          end: 'top -10%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
        stagger: {
          each: 0.012,
          from: 'random',
        },
      },
    );
  };

  useIsomorphicLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Wait for trigger to be available if provided
    const actualTrigger = trigger || element;

    const ctx = gsap.context(() => {
      createTextOpacityAnimation(element, actualTrigger);
    }, element);

    return () => {
      ctx.revert();
    };
  }, [trigger]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
