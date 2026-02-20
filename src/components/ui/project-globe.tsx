"use client";

import { useRef, useState, useMemo, Suspense, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  link: string;
  description: string;
  image: string;
}

// Project card with thumbnail
function ProjectCard3D({ 
  project, 
  angle,
  isActive,
  index,
}: { 
  project: Project; 
  angle: number;
  isActive: boolean;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const currentAngle = useRef(angle);
  const radius = 4;

  // Load project thumbnail texture
  const texture = useTexture(project.image);
  // eslint-disable-next-line react-hooks/immutability -- Three.js texture config required for correct color
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth angle transition
    currentAngle.current = THREE.MathUtils.lerp(currentAngle.current, angle, 0.08);
    
    // Position on circle
    const x = Math.sin(currentAngle.current) * radius;
    const z = Math.cos(currentAngle.current) * radius;
    
    groupRef.current.position.x = x;
    groupRef.current.position.z = z;
    
    // Gentle floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + index * 1.2) * 0.08;
    
    // Always face outward from center
    groupRef.current.lookAt(0, groupRef.current.position.y, 0);
    groupRef.current.rotateY(Math.PI);
  });

  // Calculate visibility based on position
  const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const isFront = normalizedAngle < Math.PI / 2 || normalizedAngle > Math.PI * 1.5;
  const opacity = isActive ? 1 : isFront ? 0.6 : 0.25;
  const scale = isActive ? 1 : isFront ? 0.85 : 0.65;

  return (
    <group ref={groupRef} position={[0, 0, radius]}>
      {/* Glow effect for active card */}
      {isActive && (
        <mesh position={[0, 0, -0.08]}>
          <planeGeometry args={[2.9, 2.1]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.35}
          />
        </mesh>
      )}

      {/* Card border */}
      <mesh position={[0, 0, -0.04]} scale={scale}>
        <planeGeometry args={[2.8, 2]} />
        <meshBasicMaterial
          color={isActive ? "#6366f1" : "#1e293b"}
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Card background */}
      <mesh scale={scale}>
        <planeGeometry args={[2.7, 1.9]} />
        <meshBasicMaterial
          color="#0a0a18"
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>

      {/* Project thumbnail image */}
      <mesh position={[0, 0.25, 0.01]} scale={scale}>
        <planeGeometry args={[2.5, 1.2]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Info panel at bottom */}
      <Html
        center
        position={[0, -0.65 * scale, 0.02]}
        distanceFactor={5}
        style={{
          width: "240px",
          opacity: opacity,
          transition: "opacity 0.3s ease",
          pointerEvents: isActive ? "auto" : "none",
        }}
        transform
      >
        <div className="text-center px-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[9px] font-medium">
              {project.category}
            </span>
          </div>
          <h3 className="text-white text-sm font-bold leading-tight">
            {project.title}
          </h3>
          {isActive && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-medium hover:scale-105 transition-transform"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </Html>
    </group>
  );
}

// Central animated sphere
function CentralSphere() {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.15;
      wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#030014"
          roughness={0.2}
          metalness={0.8}
          emissive="#312e81"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wireframe */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.2, 20, 20]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Outer ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
        <torusGeometry args={[1.8, 0.015, 16, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Simple particle stars
function Stars() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const r = 12 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Scene component with carousel logic
function Scene({ 
  projects, 
  rotationOffset 
}: { 
  projects: Project[]; 
  rotationOffset: number;
}) {
  // Calculate angles for each project
  const getAngle = useCallback((index: number) => {
    const baseAngle = (index / projects.length) * Math.PI * 2;
    return baseAngle + rotationOffset;
  }, [projects.length, rotationOffset]);

  // Determine active index based on rotation
  const activeIndex = useMemo(() => {
    const normalizedRotation = ((-rotationOffset % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return Math.round((normalizedRotation / (Math.PI * 2)) * projects.length) % projects.length;
  }, [rotationOffset, projects.length]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 0, 5]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, -5, -5]} intensity={0.2} color="#3b82f6" />

      {/* Stars background */}
      <Stars />

      {/* Central sphere */}
      <CentralSphere />

      {/* Project cards */}
      {projects.map((project, i) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          angle={getAngle(i)}
          isActive={i === activeIndex}
          index={i}
        />
      ))}
    </>
  );
}

// Loader
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <span className="text-white/50 text-sm">Loading 3D Experience...</span>
      </div>
    </div>
  );
}

// Main component
interface ProjectGlobeProps {
  projects: Project[];
  className?: string;
}

export default function ProjectGlobe({ projects, className = "" }: ProjectGlobeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  const anglePerProject = (Math.PI * 2) / projects.length;

  // Go to specific index
  const goToIndex = useCallback((index: number) => {
    const targetRotation = -index * anglePerProject;
    setRotationOffset(targetRotation);
    setActiveIndex(index);
    setVelocity(0);
  }, [anglePerProject]);

  const goNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % projects.length;
    goToIndex(nextIndex);
  }, [activeIndex, projects.length, goToIndex]);

  const goPrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    goToIndex(prevIndex);
  }, [activeIndex, projects.length, goToIndex]);

  // Momentum animation
  useEffect(() => {
    if (isDragging.current || Math.abs(velocity) < 0.001) return;

    const animate = () => {
      setVelocity((v) => {
        const newVelocity = v * 0.92; // Friction
        
        if (Math.abs(newVelocity) < 0.001) {
          // Snap to nearest project
          const currentRotation = rotationOffset + newVelocity;
          const nearestIndex = Math.round(-currentRotation / anglePerProject) % projects.length;
          const normalizedIndex = (nearestIndex + projects.length) % projects.length;
          
          // Snap animation
          setTimeout(() => {
            goToIndex(normalizedIndex);
          }, 50);
          
          return 0;
        }
        
        setRotationOffset((r) => r + newVelocity);
        return newVelocity;
      });
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [velocity, rotationOffset, anglePerProject, projects.length, goToIndex]);

  // Update active index based on rotation (defer setState to avoid sync update in effect)
  useEffect(() => {
    if (isDragging.current || Math.abs(velocity) > 0.001) return;
    
    const normalizedRotation = ((-rotationOffset % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const newIndex = Math.round((normalizedRotation / (Math.PI * 2)) * projects.length) % projects.length;
    queueMicrotask(() => setActiveIndex(newIndex));
  }, [rotationOffset, projects.length, velocity]);

  // Touch/Mouse handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotationOffset;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    setVelocity(0);
    
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  }, [rotationOffset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - dragStartX.current;
    const sensitivity = 0.005;
    const newRotation = dragStartRotation.current + deltaX * sensitivity;
    
    setRotationOffset(newRotation);
    
    // Track velocity
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const dx = e.clientX - lastX.current;
      setVelocity(dx * sensitivity * (16 / dt)); // Normalize to ~60fps
    }
    lastX.current = e.clientX;
    lastTime.current = now;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    
    // If velocity is very low, snap immediately
    if (Math.abs(velocity) < 0.01) {
      const normalizedRotation = ((-rotationOffset % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const nearestIndex = Math.round((normalizedRotation / (Math.PI * 2)) * projects.length) % projects.length;
      goToIndex(nearestIndex);
    }
  }, [velocity, rotationOffset, projects.length, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* 3D Canvas */}
      <div 
        ref={containerRef}
        className="relative h-[420px] md:h-[520px] cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <Suspense fallback={<Loader />}>
          <Canvas
            camera={{ position: [0, 0.5, 7], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent", touchAction: "none" }}
          >
            <Suspense fallback={null}>
              <Scene projects={projects} rotationOffset={rotationOffset} />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 px-4">
        {/* Previous button */}
        <button
          onClick={goPrev}
          className="p-2.5 md:p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all duration-300 active:scale-95"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex 
                  ? "w-6 md:w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500" 
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          className="p-2.5 md:p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all duration-300 active:scale-95"
          aria-label="Next project"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Swipe hint for mobile */}
      <p className="text-center text-white/30 text-xs mt-3 md:hidden">
        Swipe to explore
      </p>
    </div>
  );
}
