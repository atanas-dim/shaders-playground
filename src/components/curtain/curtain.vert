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


  float noiseValue = noise(vec3(modelPosition.x * 2.8, modelPosition.z * 3.8, time * 0.5));

  modelPosition.z += noiseValue * 0.14;

  modelPosition.z += sin(modelPosition.y * 0.9 + time * 0.9) * 0.2;
 
  vZ = modelPosition.z;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  vFogDepth = -viewPosition.z; // Calculate the depth for fog


  gl_Position = projectedPosition; 
}