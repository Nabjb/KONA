"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// Project data interface
interface Project {
  id: string;
  name: string;
  location: string;
  country: string;
  industry: string;
  description: string;
  results: string;
  lat: number;
  lng: number;
  image?: string;
}

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Marker component
function Marker({ 
  project, 
  onClick, 
  isActive 
}: { 
  project: Project; 
  onClick: () => void;
  isActive: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const position = latLngToVector3(project.lat, project.lng, 2.02);
  
  useFrame((state) => {
    if (ref.current) {
      const scale = isActive ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position} onClick={onClick}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial 
        color={isActive ? "#ff00ff" : "#00ffff"} 
        transparent 
        opacity={0.9}
        toneMapped={false}
      />
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial 
          color={isActive ? "#ff00ff" : "#00ffff"} 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </mesh>
  );
}

// Earth component
function Earth({ onMarkerClick, activeProject }: { 
  onMarkerClick: (project: Project) => void;
  activeProject: Project | null;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Sample projects (replace with your real data)
  const projects: Project[] = useMemo(() => [
    {
      id: "1",
      name: "TechCorp Redesign",
      location: "San Francisco",
      country: "USA",
      industry: "SaaS",
      description: "Complete brand and web redesign for B2B SaaS platform",
      results: "300% increase in conversions, 5x faster load times",
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      id: "2",
      name: "Fashion Forward",
      location: "Paris",
      country: "France",
      industry: "E-commerce",
      description: "Luxury fashion e-commerce platform with 3D product views",
      results: "150% revenue growth, 85% customer satisfaction",
      lat: 48.8566,
      lng: 2.3522,
    },
    {
      id: "3",
      name: "FinTech Pro",
      location: "London",
      country: "UK",
      industry: "Finance",
      description: "Modern banking dashboard with real-time analytics",
      results: "45% reduction in support tickets, 99.9% uptime",
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: "4",
      name: "HealthHub",
      location: "Singapore",
      country: "Singapore",
      industry: "Healthcare",
      description: "Patient portal and telemedicine platform",
      results: "10K+ active users, 4.8★ app rating",
      lat: 1.3521,
      lng: 103.8198,
    },
    {
      id: "5",
      name: "EcoMarket",
      location: "Sydney",
      country: "Australia",
      industry: "Sustainability",
      description: "Marketplace for sustainable products with carbon tracking",
      results: "500K+ products sold, 2M kg CO2 offset",
      lat: -33.8688,
      lng: 151.2093,
    },
  ], []);

  // Create procedural Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Ocean gradient
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#001a33');
    oceanGradient.addColorStop(0.5, '#003366');
    oceanGradient.addColorStop(1, '#001a33');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some land masses (simplified)
    ctx.fillStyle = '#0d4d1a';
    // North America
    ctx.fillRect(200, 200, 600, 400);
    // South America
    ctx.fillRect(400, 600, 400, 350);
    // Europe/Africa
    ctx.fillRect(900, 150, 500, 700);
    // Asia
    ctx.fillRect(1200, 100, 700, 600);
    // Australia
    ctx.fillRect(1600, 700, 300, 250);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.1}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.01}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          transparent
          opacity={0.2}
          color="#ffffff"
        />
      </mesh>

      {/* Project markers */}
      {projects.map((project) => (
        <Marker
          key={project.id}
          project={project}
          onClick={() => onMarkerClick(project)}
          isActive={activeProject?.id === project.id}
        />
      ))}

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4488ff" />
    </group>
  );
}

// Starfield background
function Stars() {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Main component
export default function EarthGlobe() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="relative w-full h-screen bg-[#030014]">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <Stars />
        <Earth onMarkerClick={setActiveProject} activeProject={activeProject} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={!activeProject}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Project Card Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 w-96 max-w-[90vw]"
          >
            <div className="relative p-6 rounded-2xl border border-cyan-500/30 bg-black/90 backdrop-blur-xl">
              {/* Close button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <div className="text-cyan-400 text-xs font-mono mb-1">
                    [{activeProject.location}, {activeProject.country}]
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {activeProject.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-mono">
                    {activeProject.industry}
                  </div>
                </div>

                <p className="text-white/70 text-sm leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                  <div className="text-cyan-400 text-xs font-mono mb-2">RESULTS</div>
                  <p className="text-white text-sm">{activeProject.results}</p>
                </div>

                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:scale-105 transition-transform">
                  View Case Study →
                </button>
              </div>

              {/* Holographic effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/40 text-sm font-mono z-40">
        <p>DRAG TO ROTATE • SCROLL TO ZOOM • CLICK MARKERS FOR DETAILS</p>
      </div>
    </div>
  );
}

