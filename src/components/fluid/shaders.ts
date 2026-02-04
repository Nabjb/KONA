// GLSL Shaders for Fluid Simulation
// Adapted from giats.me portfolio (https://github.com/Giats2498/giats-portfolio)

export const baseVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const splatShader = `
varying vec2 vUv;

uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 uColor;
uniform vec2 uPointer;
uniform float uRadius;

void main() {
    vec2 p = vUv - uPointer.xy;
    p.x *= aspectRatio;
    
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    vec3 base = texture2D(uTarget, vUv).xyz;
    
    gl_FragColor = vec4(base + splat, 1.0);
}
`;

export const curlShader = `
varying vec2 vUv;

uniform sampler2D uVelocity;
uniform float texelSize;

void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize, 0.0)).y;
    float R = texture2D(uVelocity, vUv + vec2(texelSize, 0.0)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize)).x;
    
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
}
`;

export const vorticityShader = `
varying vec2 vUv;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlValue;
uniform float texelSize;

void main() {
    float L = texture2D(uCurl, vUv - vec2(texelSize, 0.0)).x;
    float R = texture2D(uCurl, vUv + vec2(texelSize, 0.0)).x;
    float T = texture2D(uCurl, vUv + vec2(0.0, texelSize)).x;
    float B = texture2D(uCurl, vUv - vec2(0.0, texelSize)).x;
    float C = texture2D(uCurl, vUv).x;
    
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= uCurlValue * C;
    force.y *= -1.0;
    
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force, 0.0, 1.0);
}
`;

export const divergenceShader = `
varying vec2 vUv;

uniform sampler2D uVelocity;
uniform float texelSize;

void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(texelSize, 0.0)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize)).y;
    
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;

export const pressureShader = `
varying vec2 vUv;

uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform float texelSize;

void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize)).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

export const gradientSubtractShader = `
varying vec2 vUv;

uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform float texelSize;

void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize)).x;
    
    vec2 vel = texture2D(uVelocity, vUv).xy;
    vel.xy -= vec2(R - L, T - B);
    
    gl_FragColor = vec4(vel, 0.0, 1.0);
}
`;

export const advectionShader = `
varying vec2 vUv;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform float texelSize;
uniform float uDissipation;

void main() {
    vec2 coord = vUv - texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = uDissipation * texture2D(uSource, coord);
}
`;

export const clearShader = `
varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uClearValue;

void main() {
    gl_FragColor = uClearValue * texture2D(uTexture, vUv);
}
`;

export const displayShader = `
varying vec2 vUv;

uniform sampler2D uTexture;

void main() {
    vec3 color = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(color, 1.0);
}
`;
