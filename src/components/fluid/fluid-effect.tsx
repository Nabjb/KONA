"use client";

import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Effect, BlendFunction } from "postprocessing";
import { Uniform, Texture, Vector3 } from "three";
import { hexToRgb } from "./utils";

// Fragment shader for the post-processing effect
const fragmentShader = `
uniform sampler2D tFluid;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uIntensity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 fluidColor = texture2D(tFluid, uv).rgb;
    vec4 texColor = texture2D(inputBuffer, uv);
    
    float intensity = length(fluidColor) * uIntensity;
    vec3 selectedColor = uColor * length(fluidColor);
    
    vec4 colorForFluidEffect = vec4(selectedColor, 1.0);
    vec4 computedBgColor = vec4(uBackgroundColor, 1.0);
    
    vec4 computedFluidColor = mix(texColor, colorForFluidEffect, 0.0);
    
    vec4 finalColor;
    
    if(texColor.a < 0.1) {
        finalColor = mix(computedBgColor, colorForFluidEffect, intensity);
    } else {
        finalColor = mix(computedFluidColor, computedBgColor, 1.0 - texColor.a);
    }
    
    outputColor = finalColor;
}
`;

// Custom Effect class for fluid rendering
class FluidEffectImpl extends Effect {
  private state: {
    tFluid: Texture;
    intensity: number;
    fluidColor: string;
    backgroundColor: string;
    cachedFluidColor: Vector3;
    cachedBackgroundColor: Vector3;
  };

  constructor({
    tFluid,
    intensity = 1.0,
    fluidColor = "#ffffff",
    backgroundColor = "#000000",
  }: {
    tFluid: Texture;
    intensity?: number;
    fluidColor?: string;
    backgroundColor?: string;
  }) {
    const uniforms = new Map<string, Uniform>([
      ["tFluid", new Uniform(tFluid)],
      ["uIntensity", new Uniform(intensity)],
      ["uColor", new Uniform(hexToRgb(fluidColor))],
      ["uBackgroundColor", new Uniform(hexToRgb(backgroundColor))],
    ]);

    super("FluidEffect", fragmentShader, {
      uniforms,
      blendFunction: BlendFunction.NORMAL,
    });

    this.state = {
      tFluid,
      intensity,
      fluidColor,
      backgroundColor,
      cachedFluidColor: hexToRgb(fluidColor),
      cachedBackgroundColor: hexToRgb(backgroundColor),
    };
  }

  updateUniform(key: string, value: unknown) {
    const uniform = this.uniforms.get(key);
    if (uniform && uniform.value !== value) {
      uniform.value = value;
    }
  }

  setFluidTexture(texture: Texture) {
    this.state.tFluid = texture;
    this.updateUniform("tFluid", texture);
  }

  setIntensity(intensity: number) {
    this.state.intensity = intensity;
    this.updateUniform("uIntensity", intensity);
  }

  setFluidColor(color: string) {
    if (this.state.fluidColor !== color) {
      this.state.fluidColor = color;
      this.state.cachedFluidColor = hexToRgb(color);
      this.updateUniform("uColor", this.state.cachedFluidColor);
    }
  }

  setBackgroundColor(color: string) {
    if (this.state.backgroundColor !== color) {
      this.state.backgroundColor = color;
      this.state.cachedBackgroundColor = hexToRgb(color);
      this.updateUniform("uBackgroundColor", this.state.cachedBackgroundColor);
    }
  }
}

// React component wrapper
interface FluidEffectProps {
  tFluid: Texture;
  intensity?: number;
  fluidColor?: string;
  backgroundColor?: string;
}

export interface FluidEffectRef {
  effect: FluidEffectImpl | null;
}

export const FluidEffect = forwardRef<FluidEffectRef, FluidEffectProps>(
  function FluidEffect(
    { tFluid, intensity = 0.0005, fluidColor = "#f0f4f1", backgroundColor = "#070410" },
    ref
  ) {
    const effect = useMemo(() => {
      return new FluidEffectImpl({
        tFluid,
        intensity,
        fluidColor,
        backgroundColor,
      });
    }, [tFluid, intensity, fluidColor, backgroundColor]);

    useImperativeHandle(ref, () => ({ effect }), [effect]);

    return <primitive object={effect} />;
  }
);
