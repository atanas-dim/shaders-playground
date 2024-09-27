#pragma glslify: noise = require('glsl-noise/simplex/3d')

vec3 colorA = vec3(0.212, 0.62, 0.72); // Deep color
vec3 colorB = vec3(0.15, 0.6101, 0.9172); // Lighter color
vec3 white = vec3(1.0, 1.0, 1.0); // White color for brightness

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

uniform float fogNear;  // Existing fog uniform for near distance
uniform float fogFar;   // Existing fog uniform for far distance

varying float vFogDepth; // Get the depth from the vertex shader
varying float vZ;

void main() {
    // Normalize vZ to a range between 0 and 1
    float minZ = -0.005; // Assumed minimum height value (displacement)
    float maxZ = 0.005;  // Assumed maximum height value (displacement)
    float normalizedHeight = (vZ - minZ) / (maxZ - minZ);

    // Calculate the color gradient using a bell curve shape
    // The brightness peaks at 80% and falls off towards 0% and 100%
    float peakPoint = 0.8; // The height at which the color is brightest (80% of the height)
    float adjustedHeight = abs(normalizedHeight - peakPoint) * (1.0 / peakPoint);
    float brightness = 1.0 - adjustedHeight; // Brightest at peakPoint, darker otherwise

    // Mix colors to create a brighter version
    float mixFactor = 0.85;      // Brightening factor
    vec3 brighterColor = mix(colorB, white, mixFactor); // Brighter version of colorB

    // Mix colors based on the adjusted height
    vec3 color = mix(colorA, brighterColor, brightness);

    // Calculate fog factor based on depth
    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);

    float maxOpacity = 0.75; // Maximum opacity value

    // Adjust alpha based on fog factor
    float alpha = maxOpacity - fogFactor; // 1.0 means no fog (fully opaque), 0.0 means full fog (fully transparent)
    
    gl_FragColor = vec4(color, alpha);
}
