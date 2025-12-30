"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

// Starfield that moves with camera
function Stars({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread stars in a cylinder around the camera path
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 100; // Spread along z-axis
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.5 + 0.1;
    }
    return s;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating asteroids/rocks
function Asteroids({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const asteroids = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        -15 - i * 8 - Math.random() * 10,
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.4,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += asteroids[i].rotationSpeed;
      child.rotation.y += asteroids[i].rotationSpeed * 0.7;
    });
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position} scale={asteroid.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#1a1a2e"
            roughness={0.8}
            metalness={0.2}
            emissive="#312e81"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Nebula clouds
function Nebula({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.02;
    const material = ref.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, -30]}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial
        color="#4c1d95"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Portal ring at transition point
function Portal({ position, scrollProgress }: { position: [number, number, number]; scrollProgress: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Calculate visibility based on scroll progress
  const portalZ = position[2];
  const cameraZ = scrollProgress * -50;
  const distance = Math.abs(cameraZ - portalZ);
  const isNear = distance < 15;
  
  useFrame((state) => {
    if (!ringRef.current || !glowRef.current) return;
    
    const t = state.clock.elapsedTime;
    ringRef.current.rotation.z = t * 0.5;
    glowRef.current.rotation.z = -t * 0.3;
    
    // Pulse when near
    if (isNear) {
      const pulse = 1 + Math.sin(t * 3) * 0.1;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  const opacity = isNear ? 0.8 : 0.3;

  return (
    <group position={position}>
      {/* Main ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[4, 0.08, 16, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Inner glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[3.5, 0.05, 16, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={opacity * 0.7}
        />
      </mesh>
      
      {/* Center glow */}
      {isNear && (
        <mesh>
          <circleGeometry args={[3, 32]} />
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}

// Floating energy particles
function EnergyParticles({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = -20 + (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const t = state.clock.elapsedTime + i * 0.1;
      positions[i3] += Math.sin(t * 2) * 0.01;
      positions[i3 + 1] += Math.cos(t * 2) * 0.01;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#a855f7"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Camera controller that moves based on scroll
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const targetZ = useRef(0);
  const targetY = useRef(0);
  
  useFrame(() => {
    // Camera travels from z=10 to z=-40 as you scroll
    targetZ.current = 10 - scrollProgress * 50;
    
    // Slight vertical movement for dynamic feel
    targetY.current = Math.sin(scrollProgress * Math.PI) * 2;
    
    // Smooth interpolation
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, 0.05);
    
    // Slight rotation for immersion
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -scrollProgress * 0.1, 0.05);
  });

  return null;
}

// Main scene
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-10, -10, -20]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, 5, -30]} intensity={0.5} color="#3b82f6" />

      {/* Background elements */}
      <Stars count={400} />
      <Nebula scrollProgress={scrollProgress} />
      
      {/* Journey elements */}
      <Asteroids scrollProgress={scrollProgress} />
      <EnergyParticles scrollProgress={scrollProgress} />
      
      {/* Portal at transition point */}
      <Portal position={[0, 0, -20]} scrollProgress={scrollProgress} />
      
      {/* Camera */}
      <CameraController scrollProgress={scrollProgress} />
    </>
  );
}

// Main component
interface SpaceJourneyProps {
  className?: string;
}

export default function SpaceJourney({ className = "" }: SpaceJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrollProgress(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

