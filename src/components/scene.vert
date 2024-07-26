#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform float time;

varying vec2 vUv;

varying vec3 vNormal;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x * 4.0 + time * 2.0) * 0.2;
  

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

 
}