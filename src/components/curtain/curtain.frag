#pragma glslify: noise = require('glsl-noise/simplex/3d')

vec3 colorA = vec3(0.812,0.291,0.452)*1.5 ;  
vec3 colorB = vec3(1.0,1.0,1.0);

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

varying float vZ;



void main() {
  vec3 color = mix(colorA, colorB, vZ * 3.5); 
  gl_FragColor = vec4(color, 1.0);
}
