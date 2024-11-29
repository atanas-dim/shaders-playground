import { FC, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

const TEXTURE_MAP_ASPECT = 2048 / 2048; // Assuming square texture

// Define texture paths
const COLOR_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_COL_2K.jpg";
const GLOSS_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_GLOSS_2K.jpg";
const REFT_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_REFL_2K.jpg";
const DISP_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_DISP_2K.jpg";
const TEST_MAP = "/textures/pool-tiles/3x3squares.jpg";

const INITIAL_BOX_WIDTH = 1;
const INITIAL_BOX_HEIGHT = 1;
const INITIAL_BOX_DEPTH = 1;
const BOX_WIDTH = 2.5; // Width of the box
const BOX_HEIGHT = 1.5; // Height of the box
const BOX_DEPTH = 1; // Depth of the box
const TILE_SIZE = 3; // 3 vertices per tile

const VERTICE_DENSITY = 3; // Number of vertices per tile

const VERTICES_X = Math.floor(VERTICE_DENSITY * BOX_WIDTH);
const VERTICES_Y = Math.floor(VERTICE_DENSITY * BOX_HEIGHT);
const VERTICES_Z = Math.floor(VERTICE_DENSITY * BOX_DEPTH);

const Box: FC = () => {
  const textures = useLoader(TextureLoader, [
    COLOR_MAP,
    GLOSS_MAP,
    REFT_MAP,
    DISP_MAP,
    TEST_MAP,
  ]);

  const [colorTexture, glossTexture, reflTexture, dispMap, testMap] = textures;
  const boxRef = useRef<any>();

  const resize = () => {
    if (!boxRef.current) return;

    const geometry = boxRef.current.geometry;
    const uv = geometry.getAttribute("uv");
    const pos = geometry.getAttribute("position");

    boxRef.current.scale.set(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH);

    const width = BOX_WIDTH;
    const height = BOX_HEIGHT;
    const depth = BOX_DEPTH;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      console.log({ x, y, z });

      const leftRightFace = x === 0 || x === width;
      const topBottomFace = y === 0 || y === height;
      const frontBackFace = z === 0 || z === depth;

      if (frontBackFace) {
        uv.setX(x);
        uv.setY(y);
      } else if (topBottomFace) {
        uv.setX(i, x / width);
        uv.setZ(i, 1);
      } else if (leftRightFace) {
        uv.setX(i, 0);
        uv.setY(i, 0);
      }
    }

    uv.needsUpdate = true;
  };

  useEffect(() => {
    if (!boxRef.current) return;

    textures.forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;

      const repeatX = VERTICES_X / TILE_SIZE;
      const repeatY = VERTICES_Y / TILE_SIZE;

      console.log(repeatX, repeatY);

      texture.repeat.set(repeatX, repeatY);
    });

    // Resize and update UVs
    resize();
  }, [textures]);

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
      <meshStandardMaterial map={testMap} />
    </mesh>
  );
};

export default Box;
