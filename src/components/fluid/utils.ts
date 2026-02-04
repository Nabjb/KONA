import { Vector3 } from "three";

export function hexToRgb(hex: string): Vector3 {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return new Vector3(1, 1, 1);
  
  return new Vector3(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  );
}

export interface FluidConfig {
  intensity: number;
  force: number;
  curl: number;
  radius: number;
  swirl: number;
  pressure: number;
  densityDissipation: number;
  velocityDissipation: number;
  fluidColor: string;
  backgroundColor: string;
  dyeRes: number;
  simRes: number;
}

export const defaultConfig: FluidConfig = {
  intensity: 5,
  force: 1,
  curl: 1,
  radius: 0.14,
  swirl: 3,
  pressure: 0.0,
  densityDissipation: 0.965,
  velocityDissipation: 0.93,
  fluidColor: "#f0f4f1",
  backgroundColor: "#070410",
  dyeRes: 256,
  simRes: 50,
};

export const mobileConfig: FluidConfig = {
  ...defaultConfig,
  radius: 0.11,
  densityDissipation: 0.96,
  dyeRes: 64,
  simRes: 16,
};
