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
    float peakPoint = 0.8; // The height at which the color is brightest (80% of the height)
    float adjustedHeight = abs(normalizedHeight - peakPoint) * (1.0 / peakPoint);
    float brightness = 1.0 - adjustedHeight; // Brightest at peakPoint, darker otherwise

    // Mix colors to create a brighter version
    float mixFactor = 0.85; // Brightening factor
    vec3 brighterColor = mix(colorB, white, mixFactor); // Brighter version of colorB

    // Mix colors based on the adjusted height
    vec3 color = mix(colorA, brighterColor, brightness);

    // --- Calculate brightness (lightness) of the resulting color ---
    // Use the luminance formula: (0.2126 * R) + (0.7152 * G) + (0.0722 * B) for perceptual brightness
    float colorBrightness = dot(color, vec3(0.2126, 0.7152, 0.0722));

    // --- Transparency based on brightness ---
    float maxOpacity = 0.97;  // Maximum opacity for lightest (whitest) colors
    float minOpacity = 0.1;   // Minimum opacity for darkest colors

    // Map the brightness to opacity: higher brightness -> less transparent
    float alpha = mix(minOpacity, maxOpacity, colorBrightness);

    // Calculate fog factor based on depth
    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);

    // Adjust alpha based on fog factor
    alpha *= (1.0 - fogFactor);  // Reduce alpha as fog increases

    gl_FragColor = vec4(color, alpha);
}
