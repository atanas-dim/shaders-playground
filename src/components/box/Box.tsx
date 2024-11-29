import { FC, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

const TEST_MAP = "/textures/pool-tiles/1x1squares.jpg";

const INITIAL_BOX_WIDTH = 1;
const INITIAL_BOX_HEIGHT = 1;
const INITIAL_BOX_DEPTH = 1;

const BOX_WIDTH = 3; // Width of the box
const BOX_HEIGHT = 1; // Height of the box
const BOX_DEPTH = 2; // Depth of the box

const VERTICE_DENSITY = 1;

const VERTICES_X = Math.floor(VERTICE_DENSITY * BOX_WIDTH);
const VERTICES_Y = Math.floor(VERTICE_DENSITY * BOX_HEIGHT);
const VERTICES_Z = Math.floor(VERTICE_DENSITY * BOX_DEPTH);

console.log(VERTICES_X, VERTICES_Y, VERTICES_Z);

const Box: FC = () => {
  const [testMap] = useLoader(TextureLoader, [TEST_MAP]);
  const boxRef = useRef<any>();

  useEffect(() => {
    if (!boxRef.current) return;

    boxRef.current.scale.set(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH);

    if (testMap) {
      // Ensure the texture wraps properly
      testMap.wrapS = RepeatWrapping;
      testMap.wrapT = RepeatWrapping;

      testMap.repeat.set(VERTICES_X, VERTICES_Y);
    }
  }, [testMap]);

  return (
    <mesh ref={boxRef} position={[-2, 3, 0]} castShadow>
      <boxGeometry
        args={[
          INITIAL_BOX_WIDTH,
          INITIAL_BOX_HEIGHT,
          INITIAL_BOX_DEPTH,
          VERTICES_X,
          VERTICES_Y,
          VERTICES_Z,
        ]}
      />
      <meshStandardMaterial
        map={testMap}
        // color="red"
        // wireframe
        // vertexColors={true}
      />
    </mesh>
  );
};

export default Box;
