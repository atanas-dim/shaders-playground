#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

varying float vZ;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);


  float noiseValue = noise(vec3(modelPosition.x * 10.8, modelPosition.z * 7.8, time * 0.5));

  modelPosition.z += noiseValue * 0.04;

  // modelPosition.z += sin(modelPosition.x * 50.0 + time * 0.7) * 0.05;
  // modelPosition.z += sin(modelPosition.y * 1.6 + time * 0.7) * 0.055;

  modelPosition.z += sin(modelPosition.y * 2.6 + time * 0.9) * 0.05;
 
  vZ = modelPosition.z;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition; 
}