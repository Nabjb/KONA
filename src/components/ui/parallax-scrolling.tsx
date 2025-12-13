'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ParallaxComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const layersContainer = container.querySelector('[data-parallax-layers]');
    if (!layersContainer) return;

    // Create a single timeline for all parallax layers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: layersContainer,
        start: "top top",
        end: "bottom top",
        scrub: true, // Smooth scrub tied directly to scroll
      }
    });

    // Parallax layers with different speeds
    // Higher yPercent = moves more = appears further back
    const layers = [
      { layer: "1", yPercent: 50 },  // hero2 - background (moves most)
      { layer: "2", yPercent: 35 },  // hero1 - middle
      { layer: "3", yPercent: 25 },  // text
      { layer: "4", yPercent: 10 },  // hero4 - foreground (moves least)
    ];

    layers.forEach((layerConfig, index) => {
      const elements = layersContainer.querySelectorAll(
        `[data-parallax-layer="${layerConfig.layer}"]`
      );
      
      if (elements.length > 0) {
        tl.to(
          elements,
          {
            yPercent: layerConfig.yPercent,
            ease: "none",
          },
          index === 0 ? undefined : "<" // All animations start at the same time
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="parallax-wrapper">
      {/* Parallax Section */}
      <section className="parallax-section">
        <div data-parallax-layers className="parallax-layers">
          {/* Layer 1: Background - hero2 */}
          <div className="parallax-layer parallax-layer--bg" data-parallax-layer="1">
            <img 
              src="/hero2.jpg" 
              alt="" 
              className="parallax-img"
            />
          </div>

          {/* Layer 2: Middle - hero1 */}
          <div className="parallax-layer parallax-layer--mid" data-parallax-layer="2">
            <img 
              src="/hero1.png" 
              alt="" 
              className="parallax-img"
            />
          </div>

          {/* Layer 3: Text - with entrance animation */}
          <div className="parallax-layer parallax-layer--text" data-parallax-layer="3">
            <div className="parallax-title-container">
              <h1 className="parallax-title parallax-title-animate">
                <span className="parallax-title-line">We Build Websites</span>
                <br />
                <span className="parallax-title-line parallax-title-line--gradient">That Print Money</span>
              </h1>
            </div>
          </div>

          {/* Layer 4: Foreground - hero4 (astronaut) */}
          <div className="parallax-layer parallax-layer--fg" data-parallax-layer="4">
            <img 
              src="/hero4.png" 
              alt="" 
              className="parallax-img parallax-img--figure"
            />
          </div>

          {/* Bottom fade gradient - INSIDE sticky container */}
          <div className="parallax-fade"></div>
        </div>
      </section>

    </div>
  );
}
