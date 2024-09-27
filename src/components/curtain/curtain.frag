#pragma glslify: noise = require('glsl-noise/simplex/3d')

vec3 colorA = vec3(0.812,0.291,0.452)*1.5 ;  
vec3 colorB = vec3(1.0,1.0,1.0);

uniform float time;
uniform vec2 pointer;
uniform float scrollY;
uniform float scrollerHeight;

uniform float fogNear;  // Existing fog uniform for near distance
uniform float fogFar;   // Existing fog uniform for far distance

varying float vFogDepth; // Get the depth from the vertex shader

varying float vZ;

void main() {
  vec3 color = mix(colorA, colorB, vZ * 1.5); 

  // Calculate fog factor based on depth
  float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);

  float defaultTransparency = 0.8;
  // Instead of mixing with fogColor, use the fog factor to adjust alpha
  float alpha = defaultTransparency - fogFactor; // 1.0 means no fog (fully opaque), 0.0 means full fog (fully transparent)
  
  gl_FragColor = vec4(color, alpha);
}
