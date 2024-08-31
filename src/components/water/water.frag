#pragma glslify: noise = require('glsl-noise/simplex/3d')

vec3 colorA = vec3(0.912, 0.191, 0.652); 
vec3 colorB = vec3(1.0, 1.0, 1.0);

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

uniform float fogNear;  // Existing fog uniform for near distance
uniform float fogFar;   // Existing fog uniform for far distance

varying float vFogDepth; // Get the depth from the vertex shader

varying float vZ;

void main() {
    vec3 color = mix(colorA, colorB, vZ * 9.5);

    // Calculate fog factor based on depth
    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);

    // Instead of mixing with fogColor, use the fog factor to adjust alpha
    float alpha = 1.0 - fogFactor; // 1.0 means no fog (fully opaque), 0.0 means full fog (fully transparent)
    
    gl_FragColor = vec4(color, alpha);
}