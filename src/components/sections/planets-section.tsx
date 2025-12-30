"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Palette, Code2, Instagram, Globe, Sparkles } from "lucide-react";

const planets = [
  {
    id: "design",
    name: "CREATIVIA",
    subtitle: "The Creative Planet",
    service: "Web Design",
    description: "Where stunning visuals are born. Every pixel crafted to perfection.",
    icon: Palette,
    // Mars-like textures
    baseColor: "#c1440e",
    secondaryColor: "#8b4513",
    atmosphereColor: "#ff6b4a",
    position: [-5, 0, 0] as [number, number, number],
    size: 1,
    orbitRadius: 5,
    orbitSpeed: 0.0003,
    rotationSpeed: 0.004,
    type: "rocky",
  },
  {
    id: "dev",
    name: "TECHRON",
    subtitle: "The Tech Planet", 
    service: "Development",
    description: "Clean code, blazing performance, infinite scalability.",
    icon: Code2,
    // Saturn-like with rings
    baseColor: "#daa520",
    secondaryColor: "#cd853f",
    atmosphereColor: "#ffd700",
    position: [6, 0.5, -2] as [number, number, number],
    size: 1.4,
    orbitRadius: 7,
    orbitSpeed: 0.0002,
    rotationSpeed: 0.003,
    type: "gas",
    hasRing: true,
  },
  {
    id: "social",
    name: "CONNECTA",
    subtitle: "The Social Planet",
    service: "Social Media",
    description: "Where communities thrive and engagement soars.",
    icon: Instagram,
    // Neptune-like blue
    baseColor: "#4169e1",
    secondaryColor: "#1e3a8a",
    atmosphereColor: "#87ceeb",
    position: [-3, -0.5, -4] as [number, number, number],
    size: 1.1,
    orbitRadius: 6,
    orbitSpeed: 0.00025,
    rotationSpeed: 0.005,
    type: "ice",
  },
  {
    id: "seo",
    name: "DISCOVA",
    subtitle: "The Discovery Planet",
    service: "SEO & Performance",
    description: "Be found by the right explorers. Rank higher, load faster.",
    icon: Globe,
    // Earth-like
    baseColor: "#228b22",
    secondaryColor: "#1e90ff",
    atmosphereColor: "#87ceeb",
    position: [3, 1, 2] as [number, number, number],
    size: 0.9,
    orbitRadius: 4,
    orbitSpeed: 0.00035,
    rotationSpeed: 0.004,
    type: "earthlike",
  },
  {
    id: "branding",
    name: "IDENTIX",
    subtitle: "The Identity Planet",
    service: "Branding",
    description: "Memorable identities that stand out in any galaxy.",
    icon: Sparkles,
    // Jupiter-like
    baseColor: "#d2691e",
    secondaryColor: "#8b4513",
    atmosphereColor: "#deb887",
    position: [0, -1, -6] as [number, number, number],
    size: 1.3,
    orbitRadius: 8,
    orbitSpeed: 0.00015,
    rotationSpeed: 0.006,
    type: "gas",
  },
];

// Procedural planet texture generator
function createPlanetTexture(type: string, baseColor: string, secondaryColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Base gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, baseColor);
  gradient.addColorStop(0.5, secondaryColor);
  gradient.addColorStop(1, baseColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add texture based on type
  if (type === 'rocky' || type === 'earthlike') {
    // Craters and terrain
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 20 + 5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
      ctx.fill();
    }
  }

  if (type === 'gas') {
    // Gas bands
    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * canvas.height;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'}, ${Math.random() * 0.15})`;
      ctx.fillRect(0, y, canvas.width, Math.random() * 20 + 5);
    }
  }

  if (type === 'ice') {
    // Ice clouds
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 30 + 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
      ctx.fill();
    }
  }

  if (type === 'earthlike') {
    // Continents
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 40 + 20, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? baseColor : secondaryColor;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Add noise for realism
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    imageData.data[i] += noise;
    imageData.data[i + 1] += noise;
    imageData.data[i + 2] += noise;
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Realistic 3D Planet
function Planet3D({ 
  planet, 
  isSelected, 
  onSelect 
}: { 
  planet: typeof planets[0];
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Create procedural texture
  const texture = useMemo(() => {
    return createPlanetTexture(planet.type, planet.baseColor, planet.secondaryColor);
  }, [planet.type, planet.baseColor, planet.secondaryColor]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotation
    meshRef.current.rotation.y += planet.rotationSpeed;
    
    // Clouds rotation (slightly faster)
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += planet.rotationSpeed * 1.2;
    }
    
    // Atmosphere pulse
    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      atmosphereRef.current.scale.setScalar(pulse);
    }
    
    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001;
    }

    // Hover scale effect
    const targetScale = isSelected ? 1.2 : hovered ? 1.1 : 1;
    meshRef.current.parent!.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 
      0.1
    );
  });

  return (
    <group position={planet.position}>
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[planet.size * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={planet.atmosphereColor}
          transparent
          opacity={isSelected ? 0.25 : hovered ? 0.18 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet body */}
      <mesh 
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(isSelected ? null : planet.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={planet.type === 'gas' ? 0.8 : 0.6}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Cloud layer for Earth-like planets */}
      {planet.type === 'earthlike' && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[planet.size * 1.02, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            roughness={1}
          />
        </mesh>
      )}

      {/* Ring for gas giants */}
      {planet.hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0.2, 0]}>
          <ringGeometry args={[planet.size * 1.4, planet.size * 2.2, 64]} />
          <meshBasicMaterial
            color={planet.baseColor}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label on hover */}
      {(hovered || isSelected) && (
        <Html position={[0, planet.size + 0.8, 0]} center distanceFactor={8}>
          <div className="text-center whitespace-nowrap pointer-events-none px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20">
            <p className="text-white font-bold text-sm tracking-wider">{planet.name}</p>
            <p className="text-white/60 text-xs">{planet.service}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Central Sun
function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      coronaRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Corona glow */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffa500"
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Sun body */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#fff4e6" />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#ffcc00"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Light source */}
      <pointLight color="#fff4e6" intensity={3} distance={50} decay={2} />
    </group>
  );
}

// Orbit paths
function OrbitPaths() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {[4, 5, 6, 7, 8].map((radius, i) => (
        <mesh key={i}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// Scene
function Scene({ 
  selectedPlanet, 
  onSelectPlanet 
}: { 
  selectedPlanet: string | null; 
  onSelectPlanet: (id: string | null) => void;
}) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.15} />
      
      {/* Stars */}
      <Stars radius={150} depth={80} count={5000} factor={5} saturation={0.2} fade speed={0.5} />
      
      {/* Orbit paths */}
      <OrbitPaths />
      
      {/* Sun */}
      <Sun />
      
      {/* Planets */}
      {planets.map((planet) => (
        <Planet3D
          key={planet.id}
          planet={planet}
          isSelected={selectedPlanet === planet.id}
          onSelect={onSelectPlanet}
        />
      ))}
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

// Planet Detail Panel
function PlanetDetail({ 
  planet, 
  onClose 
}: { 
  planet: typeof planets[0] | null; 
  onClose: () => void;
}) {
  if (!planet) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute left-4 right-4 bottom-4 md:left-auto md:right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-80 p-5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 z-30"
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: planet.baseColor }}
        >
          <planet.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">{planet.name}</h3>
          <p className="text-white/50 text-sm">{planet.subtitle}</p>
        </div>
      </div>

      <div className="mb-4">
        <span 
          className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: planet.baseColor }}
        >
          {planet.service}
        </span>
      </div>

      <p className="text-white/60 text-sm leading-relaxed mb-5">
        {planet.description}
      </p>

      <a 
        href="#contact"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-medium transition-all hover:scale-[1.02]"
        style={{ backgroundColor: planet.baseColor }}
      >
        <span>Land on this planet</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </motion.div>
  );
}

// Loader
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <span className="text-white/50 text-sm">Loading solar system...</span>
      </div>
    </div>
  );
}

export default function PlanetsSection() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const selectedPlanetData = planets.find(p => p.id === selectedPlanet) || null;

  return (
    <section id="services" className="relative h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 text-center pt-20 md:pt-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
        >
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-purple-400 text-sm font-mono tracking-wider">OUR_SERVICES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        >
          Explore Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Solar System
          </span>
        </motion.h2>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<Loader />}>
        <Canvas 
          camera={{ position: [0, 8, 18], fov: 50 }}
          className="!absolute inset-0"
        >
          <Scene 
            selectedPlanet={selectedPlanet} 
            onSelectPlanet={setSelectedPlanet} 
          />
        </Canvas>
      </Suspense>

      {/* Planet Detail Panel */}
      <AnimatePresence>
        {selectedPlanetData && (
          <PlanetDetail 
            planet={selectedPlanetData} 
            onClose={() => setSelectedPlanet(null)} 
          />
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <p className="text-white/30 text-sm text-center">
          Drag to rotate • Click planets to explore
        </p>
      </div>

      {/* Planet legend */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:flex flex-col gap-2">
        {planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() => setSelectedPlanet(selectedPlanet === planet.id ? null : planet.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              selectedPlanet === planet.id 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: planet.baseColor }}
            />
            <span className="text-white/70 text-xs">{planet.service}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
