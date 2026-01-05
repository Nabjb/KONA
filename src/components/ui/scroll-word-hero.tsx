'use client';

import { useEffect } from 'react';

const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

export type ScrollWordHeroProps = {
  /** Words that cycle */
  items?: string[];
  /** Accent hue (0–359) */
  hue?: number;
  /** Where the highlight band starts (vh) */
  startVh?: number;
  /** Space (vh) below the sticky header block */
  spaceVh?: number;
  /** Enable view-timeline animations if supported */
  animate?: boolean;
};

export function ScrollWordHero({
  items = ['create.', 'design.', 'develop.', 'optimize.', 'deliver.'],
  hue = 30, // Earthy warm tone
  startVh = 50,
  spaceVh = 50,
  animate = true,
}: ScrollWordHeroProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.animate = String(animate);
    root.style.setProperty('--word-hue', String(hue));
    root.style.setProperty('--word-start', `${startVh}vh`);
    root.style.setProperty('--word-space', `${spaceVh}vh`);
  }, [animate, hue, startVh, spaceVh]);

  return (
    <div
      className="scroll-word-container"
      style={{
        ['--word-count' as string]: items.length,
      } as React.CSSProperties}
    >
      <header className="scroll-word-header">
        <section className="scroll-word-section">
          <h2 className="scroll-word-prefix">
            <span aria-hidden="true">we&nbsp;</span>
            <span className="sr-only">we create things.</span>
          </h2>
          {/* Visible cycling words */}
          <ul className="scroll-word-list" aria-hidden="true">
            {items.map((word, i) => (
              <li 
                key={i} 
                className="scroll-word-item"
                style={{ ['--i' as string]: i } as React.CSSProperties}
              >
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>
    </div>
  );
}

export default ScrollWordHero;

