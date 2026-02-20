---
name: konaverse-frontend-design
description: >
  Create distinctive, production-grade frontend interfaces that embody the Konaverse brand identity.
  Use this skill whenever building any component, page, or application for any Konaverse property.
  Enforces the full Konaverse design system: palette, typography, motion philosophy, layout principles,
  tone of voice, and the brand's defining visual signature. Overrides the generic frontend-design skill
  for all Konaverse work.
---

# Konaverse Frontend Design Skill

This skill governs every frontend decision made across all Konaverse properties. It extends the core
`frontend-design` skill with Konaverse-specific brand rules that are **non-negotiable**. Where this
skill conflicts with general frontend conventions, this skill wins.

---

## 1. Pre-Build Design Thinking

Before writing a single line of code, answer these questions:

**Purpose** — What does this interface do? Who encounters it, and in what emotional state?

**Tone** — Konaverse operates at exactly one emotional register: *calm authority*. Not loud. Not cute.
Not corporate. The tone is a luxury studio that does not need to shout. Every interface must feel like
it was built by people who made careful choices, not people who filled a template.

**Differentiation** — What is the single most memorable thing about this screen? Name it before you
build it. It should be tied to the brand's visual signature (see Section 5).

**Constraints** — Identify the target breakpoints, performance budget, and framework before touching
layout.

**CRITICAL RULE**: Konaverse interfaces are *refined minimalist*, not maximalist. Restraint is the
design language. Every element must justify its presence. If removing it would cost nothing, remove it.

---

## 2. The Konaverse Design System

### 2.1 Color Palette

These are the only five colors permitted in any Konaverse interface. No exceptions.

```css
:root {
  /* Primary Background — the stage for everything */
  --kona-obsidian:   #111111;

  /* Accent / Gradient — always a gradient partner, never flat fill at scale */
  --kona-sage:       #6b7f62;

  /* Tertiary / Depth — subheadings, secondary labels, warmth without competing */
  --kona-sand:       #b6a492;

  /* Primary Text — main readable text on dark backgrounds, never pure white */
  --kona-soft-white: #faf7f2;

  /* Supporting Text — taglines, captions, micro-labels */
  --kona-pale-warm:  #c8b4a0;
}
```

**Usage rules:**
- `--kona-obsidian` is always the base background. Never substitute `#000000`.
- `--kona-sage` is exclusively a gradient partner or accent (CTAs, icons, highlights, dividers). Never
  used as a large flat fill.
- `--kona-soft-white` is the primary reading color. Never use pure `#ffffff` — it breaks the warmth.
- Do not introduce any color outside this system, including brand-adjacent approximations.

### 2.2 Gradient Library

```css
:root {
  /* Primary — hero sections, full-bleed covers, section backgrounds */
  --grad-primary:  linear-gradient(135deg, #111111, #6b7f62);

  /* Subtle Fade — card backgrounds, depth behind text blocks */
  --grad-subtle:   linear-gradient(180deg, #111111, #1a2018);

  /* Warm Overlay — over imagery, text protection overlays */
  --grad-warm:     linear-gradient(135deg, #111111, #1e1a16);

  /* Sage Glow — button hover states, icon backgrounds, spotlight effects */
  --grad-sage-glow: radial-gradient(circle, #6b7f62, #4a5c42);

  /* Sand Shimmer — premium accents, thin rule lines, dividers */
  --grad-shimmer:  linear-gradient(90deg, #b6a492, #faf7f2);
}
```

**Gradient rules:**
- Always apply gradients at 40–70% opacity when layered over images or text.
- A gradient is supporting architecture, not a focal point.
- Direction logic: dark grounding at the bottom, light entering from the upper-right or upper-left.
- Never use multi-stop rainbow gradients or gradients outside these defined combinations.

### 2.3 Typography System

**Fonts:** `Geist Sans` (display, body) + `Geist Mono` (labels, CTAs, metadata, code).

Import via Google Fonts or Vercel's font CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400&family=Geist+Mono:wght@300;400&display=swap" rel="stylesheet">
```

Or in Next.js:
```ts
import { GeistSans, GeistMono } from 'geist/font'
```

| Element          | Font        | Size (mobile → desktop) | Weight       | Style                        | Color              |
|------------------|-------------|-------------------------|--------------|------------------------------|--------------------|
| Tagline / Label  | Geist Mono  | `text-xs` → `text-sm`   | 300 Light    | UPPERCASE, `0.2em` spacing   | `--kona-pale-warm` |
| Hero Headline    | Geist Sans  | `text-3xl` → `text-6xl` | 200 Extralight | `tracking-tight`           | `#f8f7f5`          |
| Subtitle         | Geist Sans  | `text-2xl` → `text-4xl` | 100 Thin     | `leading-relaxed`            | `--kona-pale-warm` |
| Section Heading  | Geist Sans  | `text-xl` → `text-3xl`  | 200 Extralight | `tracking-tight`           | `--kona-soft-white`|
| Subheading       | Geist Sans  | `text-lg` → `text-2xl`  | 300 Light    | Normal tracking              | `--kona-sand`      |
| Body Copy        | Geist Sans  | `text-base` → `text-lg` | 300 Light    | `leading-7`                  | `--kona-soft-white`|
| Caption / Meta   | Geist Mono  | `text-xs`               | 300 Light    | UPPERCASE, `0.15em` spacing  | `--kona-sand`      |
| CTA / Button     | Geist Mono  | `text-sm`               | 400 Regular  | UPPERCASE, `0.2em` spacing   | `--kona-soft-white`|
| Code / Tag       | Geist Mono  | `text-xs` → `text-sm`   | 400 Regular  | Normal                       | `--kona-sage`      |

**Typography enforcement rules:**
- **Never** use font weights above 400. No `font-bold`, no `font-semibold` in brand contexts.
- Geist Mono is **exclusively** for: taglines, labels, metadata, captions, CTA buttons, code. Never
  for body copy or large-scale headlines.
- Letter-spacing is strict: Monospace always `tracking-[0.15em]` to `tracking-[0.2em]`. Headlines
  always `tracking-tight`. Body always `tracking-normal`.
- Hierarchy is created through **weight contrast**, not size alone.

---

## 3. Motion & Animation

Konaverse moves like a luxury car: smooth, inevitable, controlled. Never in a hurry.

### 3.1 Core Timing

```css
:root {
  --dur-micro:      300ms;   /* hover states, toggles */
  --dur-default:    700ms;   /* most transitions and reveals */
  --dur-cinematic:  1100ms;  /* hero entrances, full-section reveals */

  --ease-brand:     cubic-bezier(0.16, 1, 0.3, 1);    /* primary brand ease */
  --ease-reveal:    cubic-bezier(0.4, 0, 0.2, 1);     /* smooth reveal */
  --ease-dramatic:  cubic-bezier(0.76, 0, 0.24, 1);   /* hero entrances */
}
```

### 3.2 Primary Animation Pattern: Fade and Rise

Every element entrance follows this pattern — fade from `opacity: 0` to `opacity: 1` while
translating upward 20–40px. The brand "surfaces" from darkness, never bounces into existence.

```css
@keyframes kona-surface {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.kona-enter {
  animation: kona-surface var(--dur-default) var(--ease-brand) both;
}

/* Stagger children */
.kona-enter:nth-child(1) { animation-delay: 0ms; }
.kona-enter:nth-child(2) { animation-delay: 100ms; }
.kona-enter:nth-child(3) { animation-delay: 200ms; }
/* Continue at 80–120ms intervals */
```

### 3.3 Scroll-Driven Reveals

Use `IntersectionObserver` to trigger `.kona-enter` animations as elements enter the viewport.
Stagger sibling elements 80–120ms apart to create sequential narrative flow.

```ts
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('kona-visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
```

### 3.4 Hover Micro-Interactions

- Duration: 300–500ms, always `ease-out`.
- Never use `scale > 1.05` on hover — it reads as playful, not premium.
- Preferred hover patterns: subtle `opacity` lift (0.7 → 1.0), sage underline reveal, border
  color transition from transparent to `--kona-sage`.
- CTA buttons: border appears, text spacing opens slightly. Never fill with a flat color.

### 3.5 What Not To Do

- No bounces, springs, or `cubic-bezier` curves that overshoot.
- No instant transitions (`duration-0` or `duration-75`).
- No `scale()` entrances.
- No parallax that moves faster than scroll speed.
- No looping animations on static UI (spinners, pulsing blobs) unless indicating loading state.

---

## 4. Layout & Spatial Principles

**The Dark Stage:** `--kona-obsidian` is not a background choice — it is the identity. Every element
exists against this darkness. The dark ground makes every lit element precious.

**Breathing Room:** Whitespace is the most premium design element. Minimum section padding:
`py-24` (96px) on desktop, `py-16` (64px) on mobile.

**Asymmetric Balance:** Avoid rigid centered symmetry. Intentional asymmetry creates visual tension
and signals human craft. Grid-breaking elements (text overlapping imagery, numbers floating in
negative space) are encouraged.

**Vertical Rhythm:** Elements should align to a consistent baseline grid. Nothing floats randomly.

**Full Bleed:** Prefer edge-to-edge backgrounds and imagery over boxed containers with visible
padding. The brand lives at full width.

**Text Layout Pattern (Hero):**
```
[MONOSPACE LABEL — small, wide-spaced, sage or pale-warm]

[HERO HEADLINE — extralight, 3xl–6xl, tight tracking]

[SUBTITLE — thin weight, relaxed, pale-warm]

[CTA — monospace, uppercase, bordered, no fill]
```

---

## 5. The Konaverse Visual Signature

Every Konaverse interface, across every property, must express **one non-negotiable signature**:

> **The Numbered Archive Label** — a small-caps Geist Mono prefix (`01`, `02`, `Archive_Ref: 01`,
> `Project_Status: Active`) that appears before section headings, service entries, or content blocks.
> These identifiers communicate precision, intentionality, and quiet technical authority.

**Implementation pattern:**
```html
<div class="kona-section">
  <span class="kona-label">01 — Service</span>
  <h2 class="kona-heading">Web Development</h2>
</div>
```

```css
.kona-label {
  font-family: 'Geist Mono', monospace;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--kona-pale-warm);
  display: block;
  margin-bottom: 0.75rem;
}
```

This label system is the connective tissue across all Konaverse properties. Even a single button
card in an isolated component should carry this labeling DNA when there is a list or sequence.

**Secondary signatures to maintain:**
- Thin-stroke dividers using `--grad-shimmer` (never solid `--kona-sage`)
- Section numbers rendered large and ghosted in the background (opacity 3–6%) as spatial anchors
- Quote blocks introduced with `Archive_Ref:` prefix in monospace, client attribution in small italic
  Geist Sans below

---

## 6. Component Patterns

### CTA Button
```html
<button class="kona-cta">Initialize Engagement</button>
```
```css
.kona-cta {
  font-family: 'Geist Mono', monospace;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--kona-soft-white);
  background: transparent;
  border: 1px solid rgba(107, 127, 98, 0.6);
  padding: 0.875rem 2rem;
  cursor: pointer;
  transition: border-color 500ms var(--ease-brand),
              letter-spacing 500ms var(--ease-brand);
}
.kona-cta:hover {
  border-color: var(--kona-sage);
  letter-spacing: 0.25em;
}
```

### Card / Service Entry
- Dark background, always `--kona-obsidian` or `--grad-subtle`.
- Numbered label top-left in Geist Mono.
- Thin top-border in `--kona-sage` at 40% opacity that transitions to 100% on hover.
- No drop shadows. Depth comes from the gradient, not elevation.

### Testimonial / Quote Block
- Introduce with `Archive_Ref: 0N` in monospace above the blockquote.
- Quote text in Geist Sans, 300 Light, `--kona-soft-white`, `text-lg`.
- Client attribution: Geist Mono, uppercase, small, `--kona-sand`.
- Left border: 1px `--kona-sage` at 50% opacity.

### Navigation
- Transparent background that transitions to `rgba(17,17,17,0.95)` on scroll (with `backdrop-filter: blur(12px)`).
- Logo left-aligned. Nav links right-aligned in Geist Mono, small, uppercase, wide-spaced.
- No hamburger menus with colored fills — use a minimal two-line icon or wordmark "MENU".
- Active state: single dot or short underline in `--kona-sage`, not a filled pill.

### Imagery Treatment
- All images must carry a `--grad-warm` overlay at 40–60% opacity to integrate with the dark palette.
- Avoid images with: bright color casts (blues, pinks, yellows), smiling subjects facing camera,
  busy/cluttered environments, or generic "tech" imagery.
- Preferred image style: cinematic, single ambient light source, significant negative space, close-up
  architectural or material details.
- Apply CSS: `filter: brightness(0.85) saturate(0.9)` as a starting point, refine by eye.

---

## 7. Mobile-First Architecture

### 7.1 Breakpoint System

```css
/* Mobile-first — build for 375px, scale up */
/* sm:  640px  — larger phones, small tablets */
/* md:  768px  — tablets */
/* lg:  1024px — laptops */
/* xl:  1280px — desktops */
/* 2xl: 1536px — large screens */
```

Build and test at 375px first. Every layout decision must work at mobile before scaling.

### 7.2 Touch Interaction Rules

- Minimum touch target: 44×44px. No exceptions (WCAG 2.1 AA).
- Hover micro-interactions must have a touch equivalent (tap → brief highlight).
- No hover-only functionality — every interactive state must be accessible without hover.
- Avoid `cursor: none` custom cursors on mobile — apply only on `pointer: fine` media query:
  ```css
  @media (pointer: fine) { .kona-custom-cursor { cursor: none; } }
  ```
- Swipe interactions: only where semantically appropriate (carousels, galleries). Never replace
  standard scroll behavior.

### 7.3 Performance Budget

| Metric                  | Target       | Hard Limit   |
|-------------------------|--------------|--------------|
| Largest Contentful Paint| < 2.0s       | < 2.5s       |
| Total Blocking Time     | < 150ms      | < 300ms      |
| Cumulative Layout Shift | < 0.05       | < 0.1        |
| First Input Delay       | < 50ms       | < 100ms      |
| Total JS (gzipped)      | < 150KB      | < 200KB      |
| Total CSS (gzipped)     | < 30KB       | < 50KB       |
| WebFont load            | `display=swap` always | —   |

**Performance mandates:**
- Use `loading="lazy"` on all images below the fold.
- Provide explicit `width` and `height` on all `<img>` elements to prevent CLS.
- Animate with `transform` and `opacity` only — never `width`, `height`, `top`, `left`, or `margin`.
- Use `will-change: transform` only on actively animated elements, remove after animation completes.
- Reduce animation duration on `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

### 7.4 Responsive Typography Scaling

```css
/* Hero headline example */
.kona-hero-headline {
  font-size: clamp(1.875rem, 5vw + 1rem, 4rem); /* 30px → 64px */
  font-weight: 200;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
```

Use `clamp()` for fluid type that eliminates abrupt breakpoint jumps. Never hard-code `px` font
sizes in headlines.

---

## 8. Tone of Voice in UI Copy

Every string of text in a Konaverse interface — labels, CTAs, placeholders, error messages — must
pass the brand voice test.

**Write like this:**
- Short, declarative, confident.
- Lead with the feeling, then the function.
- Treat the reader as an intelligent adult.

**CTA copy formulas:**
- `Initialize Engagement` not `Get Started`
- `Begin the Transition` not `Sign Up`
- `View the Work` not `See Portfolio`
- `Authorize Project` not `Submit`

**Never use:** Innovative, Cutting-edge, World-class, Synergy, Leverage, Seamless, Robust,
Game-changing, Holistic, Best-in-class, exclamation points, or urgency language.

**Error states:** Calm and precise. `Authorization failed. Please verify your credentials.` — not
`Oops! Something went wrong!`

**Empty states:** Brand-consistent. Use a monospace label + short declarative line. No illustrations.

---

## 9. Absolute Prohibitions

These rules are absolute. No client request, creative brief, or edge case overrides them.

| Area           | Never Do This |
|----------------|---------------|
| Color          | Introduce any color outside the 5-token palette. Use pure `#000000` or `#ffffff`. |
| Typography     | Use fonts other than Geist Sans / Geist Mono. Use weights above 400. |
| Gradients      | Create rainbow or multi-stop gradients. Use gradients as focal points. |
| Animation      | Use bounces, springs, or `duration < 300ms` on non-micro interactions. Loop decorative animations. |
| Photography    | Use bright stock photos, smiling-at-camera subjects, or colorful imagery without overlay treatment. |
| Icons          | Use filled, colorful, or cartoon-style icons. Stroke weight must be 1–1.5px equivalent. |
| Buttons        | Use filled color buttons, pill shapes, or drop shadows on CTAs. |
| Logo           | Place on light backgrounds, stretch, recolor, or add effects. |
| Background     | Use any background other than `--kona-obsidian` as the base layer. |
| Spacing        | Crowd elements. Use less than `py-16` (64px) for section padding. |
| Copy           | Use exclamation points, buzzwords, urgency language, or passive corporate voice. |

---

## 10. Quality Checklist

Before delivering any Konaverse frontend work, verify:

- [ ] Background is `--kona-obsidian` (`#111111`) — not `#000000`, not any other dark
- [ ] All text colors are from the 5-token palette
- [ ] Fonts are Geist Sans + Geist Mono exclusively, weights 100–400 only
- [ ] At least one instance of the Numbered Archive Label signature is present
- [ ] All entrances use the Fade and Rise pattern (opacity + translateY)
- [ ] Animation durations are 300ms minimum, ease-out curves only
- [ ] CTA buttons are bordered, transparent fill, Geist Mono uppercase
- [ ] All images have a dark overlay applied
- [ ] Touch targets are minimum 44×44px
- [ ] `prefers-reduced-motion` is handled
- [ ] Explicit image dimensions prevent CLS
- [ ] No copy uses prohibited buzzwords or exclamation points
- [ ] Mobile layout tested at 375px viewport first

---

*Konaverse Frontend Design Skill — Version 1.0 — 2025*
*Single source of truth for all Claude Code frontend generation on Konaverse properties.*
*Cross-reference: Konaverse_Brand_Guidelines_v1.docx for full rationale behind each rule.*