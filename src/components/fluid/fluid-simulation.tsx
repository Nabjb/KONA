"use client";

import { useRef, useCallback, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Scene,
  Camera,
  Vector2,
  Vector3,
  ShaderMaterial,
  LinearFilter,
  RGBAFormat,
  HalfFloatType,
  WebGLRenderTarget,
  Texture,
  Mesh,
  PlaneGeometry,
} from "three";
import { usePointerEvents, SplatData } from "./use-pointer-events";
import { FluidEffect, FluidEffectRef } from "./fluid-effect";
import {
  baseVertexShader,
  splatShader,
  curlShader,
  vorticityShader,
  divergenceShader,
  pressureShader,
  gradientSubtractShader,
  advectionShader,
  clearShader,
} from "./shaders";
import { FluidConfig, defaultConfig, mobileConfig } from "./utils";

interface DoubleFBO {
  read: WebGLRenderTarget;
  write: WebGLRenderTarget;
  swap: () => void;
}

function createDoubleFBO(width: number, height: number): DoubleFBO {
  const params = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    type: HalfFloatType,
  };

  const fbo1 = new WebGLRenderTarget(width, height, params);
  const fbo2 = new WebGLRenderTarget(width, height, params);

  return {
    read: fbo1,
    write: fbo2,
    swap() {
      const temp = this.read;
      this.read = this.write;
      this.write = temp;
    },
  };
}

function createFBO(width: number, height: number): WebGLRenderTarget {
  return new WebGLRenderTarget(width, height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    type: HalfFloatType,
  });
}

interface FluidSimulationProps {
  mainRef: React.RefObject<HTMLElement | null>;
  fluidColor?: string;
  backgroundColor?: string;
  config?: Partial<FluidConfig>;
}

export function FluidSimulation({
  mainRef,
  fluidColor = "#f0f4f1",
  backgroundColor = "#070410",
  config: userConfig,
}: FluidSimulationProps) {
  const { size, gl } = useThree();
  const [isReady, setIsReady] = useState(false);
  
  // Detect mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 812;
  const config = useMemo(() => ({
    ...(isMobile ? mobileConfig : defaultConfig),
    ...userConfig,
    fluidColor,
    backgroundColor,
  }), [isMobile, userConfig, fluidColor, backgroundColor]);

  const bufferScene = useRef<Scene | null>(null);
  const bufferCamera = useRef<Camera | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const effectRef = useRef<FluidEffectRef>(null);
  
  const splatStack = usePointerEvents(mainRef, size, config.force);

  // Create FBOs
  const FBOs = useMemo(() => {
    const simRes = config.simRes;
    const dyeRes = config.dyeRes;
    
    return {
      velocity: createDoubleFBO(simRes, simRes),
      density: createDoubleFBO(dyeRes, dyeRes),
      pressure: createDoubleFBO(simRes, simRes),
      curl: createFBO(simRes, simRes),
      divergence: createFBO(simRes, simRes),
    };
  }, [config.simRes, config.dyeRes]);

  // Create materials
  const materials = useMemo(() => {
    const aspectRatio = size.width / size.height || 1;
    const texelSize = 1.0 / config.simRes;

    const createMaterial = (fragmentShader: string, uniforms: Record<string, unknown> = {}) => {
      return new ShaderMaterial({
        vertexShader: baseVertexShader,
        fragmentShader,
        uniforms: {
          aspectRatio: { value: aspectRatio },
          texelSize: { value: texelSize },
          ...Object.fromEntries(
            Object.entries(uniforms).map(([key, value]) => [key, { value }])
          ),
        },
      });
    };

    return {
      splat: createMaterial(splatShader, {
        uTarget: null,
        uPointer: new Vector2(),
        uColor: new Vector3(),
        uRadius: config.radius / 100.0,
      }),
      curl: createMaterial(curlShader, { uVelocity: null }),
      vorticity: createMaterial(vorticityShader, {
        uVelocity: null,
        uCurl: null,
        uCurlValue: config.curl,
      }),
      divergence: createMaterial(divergenceShader, { uVelocity: null }),
      pressure: createMaterial(pressureShader, {
        uPressure: null,
        uDivergence: null,
      }),
      gradientSubtract: createMaterial(gradientSubtractShader, {
        uPressure: null,
        uVelocity: null,
      }),
      advection: createMaterial(advectionShader, {
        uVelocity: null,
        uSource: null,
        uDissipation: config.velocityDissipation,
      }),
      clear: createMaterial(clearShader, {
        uTexture: null,
        uClearValue: config.pressure,
      }),
    };
  }, [size.width, size.height, config]);

  // Initialize scene, camera, and mesh
  useEffect(() => {
    bufferScene.current = new Scene();
    bufferCamera.current = new Camera();
    
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, materials.splat);
    meshRef.current = mesh;
    bufferScene.current.add(mesh);
    
    setIsReady(true);
    
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof ShaderMaterial) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [materials]);

  const setShaderMaterial = useCallback(
    (name: keyof typeof materials) => {
      if (!meshRef.current) return;
      meshRef.current.material = materials[name];
      meshRef.current.material.needsUpdate = true;
    },
    [materials]
  );

  const setRenderTarget = useCallback(
    (name: keyof typeof FBOs) => {
      if (!bufferScene.current || !bufferCamera.current) return;
      
      const target = FBOs[name];
      if ("write" in target) {
        gl.setRenderTarget(target.write);
        gl.clear();
        gl.render(bufferScene.current, bufferCamera.current);
        target.swap();
      } else {
        gl.setRenderTarget(target);
        gl.clear();
        gl.render(bufferScene.current, bufferCamera.current);
      }
    },
    [FBOs, gl]
  );

  const setUniforms = useCallback(
    (material: keyof typeof materials, uniform: string, value: unknown) => {
      const mat = materials[material];
      if (mat && mat.uniforms[uniform]) {
        // Three.js shader uniforms require direct mutation for render loop
        // eslint-disable-next-line react-hooks/immutability -- WebGL uniform update pattern
        mat.uniforms[uniform].value = value;
      }
    },
    [materials]
  );

  // Animation loop
  useFrame(() => {
    if (!meshRef.current || !isReady || !bufferScene.current || !bufferCamera.current) return;

    // Process splats from mouse movement
    while (splatStack.current.length > 0) {
      const splat = splatStack.current.pop() as SplatData;

      setShaderMaterial("splat");
      setUniforms("splat", "uTarget", FBOs.velocity.read.texture);
      setUniforms("splat", "uPointer", new Vector2(splat.mouseX, splat.mouseY));
      setUniforms(
        "splat",
        "uColor",
        new Vector3(splat.velocityX, splat.velocityY, 10.0)
      );
      setUniforms("splat", "uRadius", config.radius / 100.0);
      setRenderTarget("velocity");
      
      setUniforms("splat", "uTarget", FBOs.density.read.texture);
      setRenderTarget("density");
    }

    // Curl
    setShaderMaterial("curl");
    setUniforms("curl", "uVelocity", FBOs.velocity.read.texture);
    setRenderTarget("curl");

    // Vorticity
    setShaderMaterial("vorticity");
    setUniforms("vorticity", "uVelocity", FBOs.velocity.read.texture);
    setUniforms("vorticity", "uCurl", FBOs.curl.texture);
    setUniforms("vorticity", "uCurlValue", config.curl);
    setRenderTarget("velocity");

    // Divergence
    setShaderMaterial("divergence");
    setUniforms("divergence", "uVelocity", FBOs.velocity.read.texture);
    setRenderTarget("divergence");

    // Clear pressure
    setShaderMaterial("clear");
    setUniforms("clear", "uTexture", FBOs.pressure.read.texture);
    setUniforms("clear", "uClearValue", config.pressure);
    setRenderTarget("pressure");

    // Pressure solve (multiple iterations)
    setShaderMaterial("pressure");
    setUniforms("pressure", "uDivergence", FBOs.divergence.texture);
    for (let i = 0; i < config.swirl; i++) {
      setUniforms("pressure", "uPressure", FBOs.pressure.read.texture);
      setRenderTarget("pressure");
    }

    // Gradient subtract
    setShaderMaterial("gradientSubtract");
    setUniforms("gradientSubtract", "uPressure", FBOs.pressure.read.texture);
    setUniforms("gradientSubtract", "uVelocity", FBOs.velocity.read.texture);
    setRenderTarget("velocity");

    // Advection velocity
    setShaderMaterial("advection");
    setUniforms("advection", "uVelocity", FBOs.velocity.read.texture);
    setUniforms("advection", "uSource", FBOs.velocity.read.texture);
    setUniforms("advection", "uDissipation", config.velocityDissipation);
    setRenderTarget("velocity");

    // Advection density
    setUniforms("advection", "uSource", FBOs.density.read.texture);
    setUniforms("advection", "uDissipation", config.densityDissipation);
    setRenderTarget("density");

    gl.setRenderTarget(null);
  }, 0);

  const fluidTexture = FBOs.density.read.texture || new Texture();

  if (!isReady) return null;

  return (
    <FluidEffect
      ref={effectRef}
      tFluid={fluidTexture}
      intensity={config.intensity * 0.0001}
      fluidColor={config.fluidColor}
      backgroundColor={config.backgroundColor}
    />
  );
}
