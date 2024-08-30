#pragma glslify: noise = require('glsl-noise/simplex/3d')

vec3 colorA = vec3(0.912,0.191,0.652); 
vec3 colorB = vec3(1.0,1.0,1.0);

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

varying float vZ;


void main() {

  vec3 color = mix(colorA, colorB, vZ * 2.5); 
  gl_FragColor = vec4(color, 1.0);
}
