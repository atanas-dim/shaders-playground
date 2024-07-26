#pragma glslify: noise = require('glsl-noise/simplex/3d')

varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);
uniform vec2 pointer;

uniform float scrollY;
uniform float scrollerHeight;


void main() {
  
float calc =  scrollY / scrollerHeight * pointer.x;

float clamped = abs(clamp(calc, 0.0 , 1.0));

 

  vec3 color = mix(colorA, colorB, clamped);


  gl_FragColor = vec4(color , 1.0);
 

}
