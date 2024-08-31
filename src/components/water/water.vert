#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform samplerCube environmentMap;

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

varying vec3 vReflect;
varying float vFogDepth;
varying float vZ;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // --- DISPLACEMENT START

    // Main wave displacement using a combination of sine waves and noise
    float mainWaveFrequency = 0.09; 
    float mainWaveSpeed = 0.015;
    float mainWaveHeight = 0.0012 ;

    float baseWave = sin(modelPosition.x * mainWaveFrequency + time * mainWaveSpeed);
    baseWave += cos(modelPosition.z * mainWaveFrequency + time * mainWaveSpeed);

    float noiseFrequencyX = 0.01; // Frequency for X direction (stretch horizontally)
    float noiseFrequencyZ = 0.1; // Frequency for Z direction (regular)
    float noiseAmplitude = 0.001  ; // Amplitude of the noise effect

    // Adjust noise frequencies
    float noiseValue = noise(vec3(modelPosition.x * noiseFrequencyX, modelPosition.z * noiseFrequencyZ, time * 0.2));
    float waveValue = baseWave * mainWaveHeight + noiseValue * noiseAmplitude;

    // Surface details with stretched noise pattern
    float detailFrequencyX = 3.75; // Stretched frequency for detail noise in X direction
    float detailFrequencyZ = 10.5;  // Regular frequency for detail noise in Z direction
    float detailSpeed = 1.0;       // Speed of the surface detail noise
    float detailHeight = 0.005;     // Height of the surface details

    float detailNoiseValue = noise(vec3(modelPosition.x * detailFrequencyX, modelPosition.z * detailFrequencyZ, time * detailSpeed));

    // Apply a smoother function to round the peaks
    float edge0 = -0.85;
    float edge1 = 0.85 ;
    float smoothValue = smoothstep(edge0, edge1, detailNoiseValue);

    // Combine main wave and surface detail displacements
    float combinedDisplacement = waveValue + smoothValue * detailHeight;

    // Apply displacement to the y-coordinate
    modelPosition.y += combinedDisplacement;

    vZ = modelPosition.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    // Compute reflection direction
    vec3 worldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vec3 viewDir = normalize(cameraPosition - modelPosition.xyz);
    vReflect = reflect(viewDir, worldNormal);

    // Pass depth for fog calculations
    vFogDepth = -viewPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
