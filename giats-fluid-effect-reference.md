# Giats Portfolio - Fluid Cursor Effect Reference

This document explains the **fluid animation layer** that follows the cursor all over the page with a "crazy effect" - a real-time fluid simulation overlay.

## Overview

The fluid effect is a **WebGL-based fluid simulation** that:
- Tracks mouse/pointer movement across the entire page
- Creates a fluid-like brush effect that follows the cursor
- Uses `mix-blend-mode: difference` to create an artistic overlay
- Runs at 60fps using GPU-accelerated shaders

## Architecture

### Main Components

1. **Fluid.jsx** - Main fluid simulation component
2. **FluidEffect.jsx** - Post-processing effect for rendering
3. **usePointerEvents.jsx** - Captures mouse/pointer movement
4. **GLSL Shaders** - GPU shaders for fluid physics

### Integration

**Location:** `src/pages/_app.page.jsx` (lines 129-147)

```jsx
<Canvas
  id="fluidCanvas"
  flat
  gl={{
    antialias: false,
    stencil: false,
    depth: false,
    pixelRatio: 0.1,  // Low pixel ratio for performance
  }}
  style={{ 
    mixBlendMode: 'difference',  // KEY: Creates the artistic effect!
    background: 'black' 
  }}
  linear
  className={styles.canvasContainer}
  eventSource={mainRef.current}  // Listens to mouse events on main content
  dpr={[0.1, 0.5]}
>
  <EffectComposer>
    <Fluid fluidColor={fluidColor} mainRef={mainRef} />
  </EffectComposer>
</Canvas>
```

**Key Points:**
- `mixBlendMode: 'difference'` - Creates the inverted color effect
- `eventSource={mainRef.current}` - Listens to mouse events on the main content area
- Low `pixelRatio` (0.1) for performance
- Uses `@react-three/postprocessing` for effects

## How It Works

### 1. Pointer Tracking (`usePointerEvents.jsx`)

```jsx
const usePointerEvents = (mainRef, size, force) => {
  const splatStack = useRef([]);
  const lastMouse = useRef(new Vector2());
  
  useEffect(() => {
    const element = mainRef.current;
    
    const handlePointerMove = (event) => {
      const clientX = event.clientX || event.touches?.[0]?.clientX;
      const clientY = event.clientY || event.touches?.[0]?.clientY;
      
      const deltaX = clientX - lastMouse.current.x;
      const deltaY = clientY - lastMouse.current.y;
      
      // Push mouse position and velocity to stack
      splatStack.current.push({
        mouseX: clientX / size.width,      // Normalized 0-1
        mouseY: 1.0 - clientY / size.height, // Flipped Y (WebGL coords)
        velocityX: deltaX * force,          // Velocity affects fluid
        velocityY: -deltaY * force,
      });
      
      lastMouse.current.set(clientX, clientY);
    };
    
    element.addEventListener('pointermove', handlePointerMove, { passive: true });
    
    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
    };
  }, [mainRef, size, force]);
  
  return splatStack;
};
```

**What it does:**
- Captures every mouse movement
- Calculates velocity (deltaX, deltaY)
- Normalizes coordinates to 0-1 range
- Stores in a stack for processing in the animation loop

### 2. Fluid Simulation (`Fluid.jsx`)

The main component runs a **fluid dynamics simulation** every frame:

```jsx
useFrame(() => {
  // Process mouse splats (adds fluid at cursor position)
  while (splatStack.current.length > 0) {
    const { mouseX, mouseY, velocityX, velocityY } = splatStack.current.pop();
    
    // Add "splat" of fluid at mouse position
    setShaderMaterial('splat');
    setUniforms('splat', 'uPointer', new Vector2(mouseX, mouseY));
    setUniforms('splat', 'uColor', new Vector3(velocityX, velocityY, 10.0));
    setUniforms('splat', 'uRadius', radius / 100.0);
    setRenderTarget('velocity');
    setRenderTarget('density');
  }
  
  // Run fluid physics steps:
  // 1. Calculate curl (rotation)
  // 2. Apply vorticity (swirl)
  // 3. Calculate divergence
  // 4. Solve pressure
  // 5. Apply advection (fluid movement)
  
  // Render final result
  gl.setRenderTarget(null);
}, 0);
```

**Fluid Physics Steps:**
1. **Splat** - Add fluid at cursor position
2. **Curl** - Calculate rotation
3. **Vorticity** - Add swirl effect
4. **Divergence** - Calculate pressure gradients
5. **Pressure** - Solve pressure (multiple iterations)
6. **Advection** - Move fluid based on velocity
7. **Dissipation** - Gradually fade fluid

### 3. Splat Shader (`splat.frag`)

Adds fluid at the cursor position:

```glsl
uniform vec2 uPointer;      // Mouse position (0-1)
uniform float uRadius;      // Splat radius
uniform vec3 uColor;        // Velocity vector

void main() {
    vec2 p = vUv - uPointer.xy;  // Distance from mouse
    p.x *= aspectRatio;
    
    // Gaussian falloff (creates smooth blob)
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
}
```

### 4. Post-Processing (`post.frag`)

Renders the final effect with blend mode:

```glsl
uniform sampler2D tFluid;        // Fluid simulation texture
uniform vec3 uColor;             // Fluid color
uniform float uIntensity;         // Effect intensity

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 fluidColor = texture2D(tFluid, uv).rgb;
    vec4 texture = texture2D(inputBuffer, uv);
    
    float intensity = length(fluidColor) * uIntensity;
    vec3 selectedColor = uColor * length(fluidColor);
    
    // Mix fluid with background based on alpha
    if(texture.a < 0.1) {
        finalColor = mix(backgroundColor, fluidColor, intensity);
    } else {
        finalColor = mix(texture, backgroundColor, 1.0 - texture.a);
    }
    
    outputColor = finalColor;
}
```

## Configuration (`useOpts.jsx`)

```jsx
const OPTS = {
  intensity: 5,              // Effect intensity
  force: 1,                  // Mouse force multiplier
  curl: 1,                   // Swirl amount
  radius: 0.14,             // Splat radius (desktop: 0.14, mobile: 0.11)
  swirl: 3,                 // Pressure iterations
  
  densityDissipation: 0.965,  // How fast fluid fades
  velocityDissipation: 0.93,   // How fast velocity fades
  
  fluidColor: '#f0f4f1',      // Fluid color
  backgroundColor: '#070410',  // Background color
  
  dyeRes: 256,                // Fluid resolution (desktop)
  simRes: 50,                 // Simulation resolution
};
```

## Dependencies

Required packages:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/postprocessing` - Post-processing effects
- `three` - 3D library
- `postprocessing` - Post-processing framework

## Key Techniques

1. **FBOs (Framebuffer Objects)** - Multiple render targets for fluid simulation
2. **Shader-based Physics** - GPU-accelerated fluid dynamics
3. **Mix Blend Mode** - CSS `mix-blend-mode: difference` for artistic effect
4. **Low Pixel Ratio** - Performance optimization (0.1 pixel ratio)
5. **Pointer Events** - Captures mouse/touch movement

## Performance Optimizations

- Low pixel ratio (`0.1`) for fluid canvas
- Mobile-specific lower resolutions
- Efficient FBO swapping
- Passive event listeners
- GPU-accelerated shaders

## How to Implement

1. **Install dependencies:**
```bash
npm install @react-three/fiber @react-three/postprocessing three postprocessing
```

2. **Create Fluid component** (see Fluid.jsx)

3. **Add to your app:**
```jsx
<Canvas
  style={{ mixBlendMode: 'difference' }}
  eventSource={mainRef}
>
  <EffectComposer>
    <Fluid mainRef={mainRef} fluidColor="#f0f4f1" />
  </EffectComposer>
</Canvas>
```

4. **Ensure main content has a ref:**
```jsx
<main ref={mainRef}>
  {/* Your content */}
</main>
```

## Files Reference

- `src/components/canvas/fluid/Fluid.jsx` - Main component
- `src/components/canvas/fluid/effect/FluidEffect.jsx` - Post-processing
- `src/components/canvas/fluid/hooks/usePointerEvents.jsx` - Mouse tracking
- `src/components/canvas/fluid/glsl/*.frag` - Shader files
- `src/pages/_app.page.jsx` - Integration

## Repository

Full code: https://github.com/Giats2498/giats-portfolio
