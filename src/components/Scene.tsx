import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { use, useEffect, useRef, type FC } from "react";
// import Water from "@/components/water/Water";
import Curtain from "./curtain/Curtain";
import { CLEAR_COLOUR } from "@/resources/colours";
import { FOG_FAR, FOG_NEAR } from "@/resources/scene";
import { SphereGeometry } from "three";

import Water2 from "./water2/Water2";

const Scene: FC = () => {
  return (
    <>
      <div className="size-full fixed inset-0">
        <Canvas
          shadows
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(CLEAR_COLOUR);
          }}
        >
          {/* This is the fog on built in materials. The custom shaders should be set up to fade out to transparency. Near and far values are used in custom shaders */}
          <fog attach="fog" args={[CLEAR_COLOUR, FOG_NEAR, FOG_FAR]} />{" "}
          <axesHelper />
          <OrbitControls />
          <ambientLight intensity={2.2} />
          <directionalLight position={[5, 1, 5]} intensity={5.75} castShadow />
          <Plane
            position={[0, -0.25, -3]}
            args={[64, 64, 1, 1]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="beige" side={2} />
          </Plane>
          <Water2 />
          <Curtain />
          <mesh position={[0, 1, 0]} castShadow>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
          <PerspectiveCamera makeDefault position={[0, 3, 16]} />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
