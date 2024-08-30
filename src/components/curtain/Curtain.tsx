import { extend } from "@react-three/fiber";
import { Plane, shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type FC, useRef } from "react";
import { Color, Vector2 } from "three";

// @ts-expect-error
import vertexShader from "./curtain.vert"; // @ts-expect-error
import fragmentShader from "./curtain.frag";

export const CurtainMaterial = shaderMaterial(
  {
    time: 0,
    scrollY: 0,
    scrollerHeight: 0,
    pointer: new Vector2(),
    colour: new Color("blue"),
    image: null,
  },
  vertexShader,
  fragmentShader
);

extend({ CurtainMaterial });

const Curtain: FC = () => {
  const shader = useRef<any>(null);

  useFrame(({ clock, gl, pointer, scene, camera }) => {
    if (!shader.current) return;
    shader.current.time = clock.getElapsedTime();
    shader.current.pointer = pointer;
    shader.current.scrollY = window.scrollY;
    shader.current.scrollerHeight = document.body.offsetHeight;
  });

  return (
    <Plane
      position={[0, 0.8, 0]}
      args={[1, 1, 512, 512]}
      rotation={[-Math.PI / 1, -Math.PI / 1, -Math.PI / 1]}
      castShadow
      receiveShadow
    >
      {/* @ts-ignore */}
      <curtainMaterial
        ref={shader}
        // wireframe
        side={2}
        shadowSide={2} // Enable shadows on both sides of the mesh
      />
    </Plane>
  );
};

export default Curtain;
