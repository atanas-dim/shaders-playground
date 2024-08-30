#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

varying float vZ;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);


  // modelPosition.y += sin(modelPosition.x * 4.0 + scrollY * 0.05) * 0.01;
  // modelPosition.y += sin(modelPosition.y * 5.0 + scrollY * 0.05) * 0.02;
  // modelPosition.y += sin(modelPosition.z * 2.0 + scrollY * 0.025) * 0.03;

  // Generate noise based on position and scrollY
  float denseNoiseValue = noise(vec3(modelPosition.x * 18.8, modelPosition.z * 7.8, time * 0.9));
  float sparseNoiseValue = noise(vec3(modelPosition.x * 0.55, modelPosition.z * 0.95, time * 0.5));

  // Apply noise to the y-coordinate to create a wave effect
  modelPosition.y += denseNoiseValue * 0.01; // Adjust the multiplier for wave intensity
  modelPosition.y += sparseNoiseValue * 0.02; // Adjust the multiplier for wave intensity

  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition; 
}