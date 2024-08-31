#pragma glslify: noise = require('glsl-noise/simplex/3d')

// Add these lines at the beginning of your vertex shader
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying float vFogDepth; // To pass the depth to the fragment shader

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

varying float vZ;
 

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // --- DISPLACEMENT START
  // Generate noise based on position and scrollY
  float denseNoiseValue = noise(vec3(modelPosition.x *  4.0, modelPosition.z * 14.0, time * 0.7));
  float sparseNoiseValue = noise(vec3(modelPosition.x * 0.5 , modelPosition.z * 1.0, time * 0.5));

  // Apply noise to the y-coordinate to create a wave effect
  modelPosition.y += denseNoiseValue * 0.015; // Adjust the multiplier for wave intensity
  modelPosition.y += sparseNoiseValue * 0.02; // Adjust the multiplier for wave intensity

  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  // --- DISPLACEMENT END


  // --- FOG START
  vFogDepth = -viewPosition.z; // Calculate the depth for fog
  // --- FOG END
 
  gl_Position = projectedPosition; 
}