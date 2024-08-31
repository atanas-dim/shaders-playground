import { extend } from "@react-three/fiber";
import { Plane, shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type FC, useRef } from "react";
import { Color, Fog, Vector2 } from "three";

// @ts-expect-error
import vertexShader from "./curtain.vert"; // @ts-expect-error
import fragmentShader from "./curtain.frag";
import { FOG_FAR, FOG_NEAR } from "@/resources/scene";

export const CurtainMaterial = shaderMaterial(
  {
    time: 0,
    scrollY: 0,
    scrollerHeight: 0,
    pointer: new Vector2(),
    colour: new Color(),
    image: null,
    fogColor: new Color(),
    fogNear: FOG_NEAR,
    fogFar: FOG_FAR,
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

    shader.current.fogNear = (scene.fog as Fog)?.near;
    shader.current.fogFar = (scene.fog as Fog)?.far;
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
        transparent={true}
      />
    </Plane>
  );
};

export default Curtain;
