import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import { type FC } from "react";
import Water from "@/components/water/Water";
import Curtain from "./curtain/Curtain";

const Scene: FC = () => {
  return (
    <>
      <div className="size-full fixed inset-0">
        <Canvas
          camera={{
            position: [1.2, 0.7, 2],
            near: 0.1,
            far: 10,
          }}
          shadows
          style={{ background: "#71064d" }}
        >
          <axesHelper />
          <OrbitControls />
          {/* <ambientLight intensity={2.2} /> */}
          <directionalLight position={[-5, 1, 5]} intensity={5.75} castShadow />
          <Plane
            position={[0, -1, 0]}
            args={[5, 5, 16, 16]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="purple" side={2} />
          </Plane>
          <Water />
          <Curtain />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
