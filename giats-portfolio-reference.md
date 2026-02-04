# Giats Portfolio Reference

This file contains the original code from [giats-portfolio](https://github.com/Giats2498/giats-portfolio) that inspired your projects section.

## Projects Component

**Location:** `src/pages/components/projects/Index.jsx`

```jsx
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { gsap } from 'gsap';
import projects from '@src/constants/projects';
import styles from '@src/pages/components/projects/styles/projects.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';

function Projects() {
  const isMobile = useIsMobile();
  const windowSize = useWindowSize();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  const rootRef = useRef();
  const projectRefs = useRef([]);

  const newProjects = [projects[0], projects[1], projects[4]];

  const setupProjectAnimations = () => {
    const ctx = gsap.context(() => {
      if (!isLoading) {
        projectRefs.current.slice(0, -1).forEach((projectRef, index) => {
          gsap.set(projectRef, { yPercent: 0 });
          gsap
            .timeline({
              scrollTrigger: {
                id: `projectRef-${index}`,
                trigger: rootRef.current,
                start: `top+=${windowSize.height * index}`,
                end: () => `+=${(projectRefs.current.length - 1) * windowSize.height}`,
                scrub: true,
                scroller: document?.querySelector('main'),
                invalidateOnRefresh: true,
              },
            })
            .to(projectRef, {
              yPercent: 100,
              stagger: 1,
            });
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupProjectAnimations();
    return () => ctx.kill();
  }, [isLoading, windowSize.height]);

  return (
    <>
      <section className={clsx(styles.titleContainer, 'layout-grid-inner')}>
        <h1 className={clsx(styles.title, 'h1')}>
          <AppearByWords>Selected Projects</AppearByWords>
        </h1>
      </section>
      <section ref={rootRef} className={clsx(styles.root, 'layout-block-inner')}>
        <div className={styles.innerContainer}>
          {newProjects.map((project, index) => (
            <Link aria-label={`Go ${project.title}`} id={project.id} key={project.id} scroll={false} href={project.link} className={clsx(styles.card)}>
              <div
                style={
                  !isMobile
                    ? {
                        height: index === newProjects.length - 1 ? '200svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-100svh',
                      }
                    : {
                        height: index === newProjects.length - 1 ? '100svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-50svh',
                      }
                }
                className={styles.projectsWrap}
              >
                <div className={clsx(styles.container, 'layout-grid-inner')}>
                  <div className={styles.projectsDetails}>
                    <h6 className="h6">{project.date}</h6>
                    <h3 className="h3">{project.title}</h3>
                  </div>
                  <div className={styles.imageContainer}>
                    <Image src={project.img} fill sizes="100%" alt={project.title} />
                  </div>
                </div>
              </div>
              <div ref={(el) => (projectRefs.current[index] = el)} className={styles.canvas}>
                <Image priority className={index === 0 ? styles.firstCard : index === newProjects.length - 1 ? styles.lastCard : undefined} src={project.img} fill sizes="100%" alt={project.title} />
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <ButtonLink href="/projects" label="ALL PROJECTS" />
        </div>
      </section>
    </>
  );
}

export default Projects;
```

## Key Animation Logic

The core animation pattern:
1. **Sticky wrapper** (`projectsWrap`) - Contains the visible content that stays fixed
2. **Animated canvas** (`canvas`) - Background image that scrolls down using `yPercent: 100`
3. **Height calculation** - Each project wrap has increasing height: `${200 + 100 * index}svh`
4. **Top positioning** - Projects are offset: `-100svh` (desktop) or `-50svh` (mobile)
5. **Last project** - Special handling with `200svh` height and different positioning

## SCSS Styles

**Location:** `src/pages/components/projects/styles/projects.module.scss`

Key styling patterns:
- `contain: paint` on cards for clipping
- `z-index: 1` on projectsWrap (content layer)
- `z-index: auto` on canvas (background layer)
- Sticky positioning with `top: 0px`
- Border radius only on first and last cards
- Box shadow creates the "window" effect

## TextOpacity Component - Text Appearing from Everywhere

**Location:** `src/components/animationComponents/textOpacity/Index.jsx`

This is the component that creates the effect where text appears on screen from random positions when scrolling.

```jsx
import SplitType from 'split-type';
import gsap from 'gsap';
import styles from '@src/components/animationComponents/textOpacity/textOpacity.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function TextOpacity({ children, trigger }) {
  const containerRef = useRef();

  const createTextOpacityAnimation = (element, scrollTrigger) => {
    const splitted = new SplitType(element, { types: 'words' });
    splitted.words.forEach((word) => gsap.set(word, { opacity: 0 }));

    gsap.fromTo(
      splitted.words,
      {
        'will-change': 'opacity, transform',
        z: () => gsap.utils.random(500, 950),  // Random Z depth (3D)
        opacity: 0,
        xPercent: () => gsap.utils.random(-100, 100),  // Random X position
        yPercent: () => gsap.utils.random(-10, 10),    // Random Y position
        rotationX: () => gsap.utils.random(-90, 90),   // Random X rotation
      },
      {
        ease: 'expo',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,  // Animate to center
        yPercent: 0,  // Animate to center
        z: 0,         // Animate to front
        scrollTrigger: {
          trigger: scrollTrigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,  // Smooth scroll-linked animation
          scroller: document?.querySelector('main'),
          invalidateOnRefresh: true,
        },
        stagger: {
          each: 0.006,
          from: 'random',  // Words animate in random order!
        },
      },
    );
  };

  useIsomorphicLayoutEffect(() => {
    const element = containerRef.current;
    const ctx = gsap.context(() => {
      createTextOpacityAnimation(element, trigger);
    }, element);

    return () => {
      ctx.revert();
    };
  }, [trigger]);

  return (
    <div ref={containerRef} className={styles.title}>
      {children}
    </div>
  );
}

export default TextOpacity;
```

### How It Works:

1. **SplitType** splits text into individual words
2. **Initial state**: Each word starts with:
   - Random X position (`-100%` to `100%`)
   - Random Y position (`-10%` to `10%`)
   - Random Z depth (`500px` to `950px` - creates 3D effect)
   - Random X rotation (`-90°` to `90°`)
   - `opacity: 0`
3. **Animation**: Words animate to their final position (`0, 0, 0`) with `opacity: 1`
4. **ScrollTrigger**: Animation is linked to scroll position with `scrub: true`
5. **Stagger**: Words animate in random order with `from: 'random'`

### Usage Example:

```jsx
import TextOpacity from '@src/components/animationComponents/textOpacity/Index';

function Quote() {
  const rootRef = useRef();
  
  return (
    <section ref={rootRef}>
      <h3>
        <TextOpacity trigger={rootRef.current}>
          When starting a new project, it's crucial to choose the appropriate tools...
        </TextOpacity>
      </h3>
    </section>
  );
}
```

### Dependencies:

- `split-type` - Splits text into words/chars
- `gsap` - Animation library
- `gsap/ScrollTrigger` - Scroll-linked animations

## Repository

Full repository: https://github.com/Giats2498/giats-portfolio
