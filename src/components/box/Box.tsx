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
const BOX_WIDTH = 2.54; // Width of the box
const BOX_HEIGHT = 1.25; // Height of the box
const BOX_DEPTH = 1; // Depth of the box
const TILE_SIZE = 1.2; // Tile size in world units

const VERTICES_X = 3;
const INITIAL_VERTICES_Y = 3;
const VERTICES_Z = 3;

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

    // Set the box scale
    boxRef.current.scale.set(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH);

    // Adjust UV mapping
    const pos = geometry.getAttribute("position");
    const uv = geometry.getAttribute("uv");

    const width = BOX_WIDTH;
    const height = BOX_HEIGHT;
    const depth = BOX_DEPTH;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      console.log({ x, y, z });

      if (Math.abs(z) === 0.5 * depth) {
        // Front and back faces
        uv.setXY(
          i,
          (x + 0.5 * width) / width / TEXTURE_MAP_ASPECT,
          (y + 0.5 * height) / height
        );
      } else if (Math.abs(x) === 0.5 * width) {
        // Left and right faces
        uv.setXY(
          i,
          (z + 0.5 * depth) / depth / TEXTURE_MAP_ASPECT,
          (y + 0.5 * height) / height
        );
      } else if (Math.abs(y) === 0.5 * height) {
        // Top and bottom faces
        uv.setXY(
          i,
          (x + 0.5 * width) / width / TEXTURE_MAP_ASPECT,
          (z + 0.5 * depth) / depth
        );
      }
    }

    uv.needsUpdate = true;
  };

  useEffect(() => {
    resize();

    // Update texture repeat to match the box dimensions and aspect
    textures.forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(
        BOX_WIDTH / TILE_SIZE / TEXTURE_MAP_ASPECT,
        BOX_HEIGHT / TILE_SIZE
      );
    });
  }, [textures]);

  return (
    <mesh ref={boxRef} position={[-2, 3, 0]} castShadow>
      <boxGeometry
        args={[
          INITIAL_BOX_WIDTH,
          INITIAL_BOX_HEIGHT,
          INITIAL_BOX_DEPTH,
          VERTICES_X,
          INITIAL_VERTICES_Y,
          VERTICES_Z,
        ]}
      />
      <meshStandardMaterial
        map={testMap}
        displacementMap={testMap}
        displacementScale={0.015}
        // map={colorTexture}
        // roughnessMap={glossTexture}
        // roughness={0.5}
        // envMap={reflTexture}
        // metalness={0.15}
        // displacementMap={dispMap}
        // displacementScale={0.015}
      />
    </mesh>
  );
};

export default Box;
