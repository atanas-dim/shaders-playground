import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Plane, shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type FC, useMemo, useRef } from "react";
import { Color, Vector2 } from "three";

// @ts-expect-error
import vertexShader from "./scene.vert"; // @ts-expect-error
import fragmentShader from "./scene.frag";

export const CustomMaterial = shaderMaterial(
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

extend({ CustomMaterial });

const Water: FC = () => {
  const shader = useRef<any>(null);

  useFrame(({ clock, gl, pointer, scene, camera }) => {
    if (!shader.current) return;
    shader.current.time = clock.getElapsedTime();
    shader.current.pointer = pointer;
    shader.current.scrollY = window.scrollY;
    shader.current.scrollerHeight = document.body.offsetHeight;
    console.log((window.scrollY / document.body.offsetHeight) * pointer.x);
  });

  return (
    <Plane
      position={[0, 0.3, 0]}
      args={[5, 5, 512, 512]}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      {/* @ts-ignore */}
      <customMaterial
        ref={shader}
        // wireframe
        side={2}
        shadowSide={2} // Enable shadows on both sides of the mesh
      />
    </Plane>
  );
};

const Scene: FC = () => {
  return (
    <>
      <div className="size-full fixed inset-0">
        <Canvas
          camera={{ position: [1, 1.5, 2] }}
          shadows
          // style={{ background: "#000000" }}
        >
          <axesHelper />
          {/* <OrbitControls /> */}
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[-10, 5, 10]}
            intensity={1.75}
            castShadow
          />
          <Plane
            position={[0, 0, 0]}
            args={[5, 5, 16, 16]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="purple" side={2} />
          </Plane>
          <Water />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
