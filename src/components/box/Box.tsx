import { FC, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, MeshStandardMaterial } from "three";

// Define texture paths
const COLOR_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_COL_2K.jpg";
const DISP_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_DISP_2K.jpg";
const GLOSS_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_GLOSS_2K.jpg";
const NORMAL_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_NRM_2K.jpg";
const REFT_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_REFL_2K.jpg";

// Box dimensions
const BOX_WIDTH = 3; // Width of the box
const BOX_HEIGHT = 2; // Height of the box
const BOX_DEPTH = 4; // Depth of the box
const TILE_SIZE = 0.5; // Size of each texture tile (0.5x0.5)

const Box: React.FC = () => {
  // Load textures for each face of the cube
  const textures = [
    useLoader(TextureLoader, COLOR_MAP),
    useLoader(TextureLoader, COLOR_MAP),
    useLoader(TextureLoader, COLOR_MAP),
    useLoader(TextureLoader, COLOR_MAP),
    useLoader(TextureLoader, COLOR_MAP),
    useLoader(TextureLoader, COLOR_MAP),
  ];

  // Set texture repeat and wrap for each texture
  textures.forEach((texture, index) => {
    switch (index) {
      case 0: // Front face
        texture.repeat.set(1, 1);
        break;
      case 1: // Back face
        texture.repeat.set(1, 1);
        break;
      case 2: // Top face
        texture.repeat.set(BOX_WIDTH / TILE_SIZE, BOX_DEPTH / TILE_SIZE);
        break;
      case 3: // Bottom face
        texture.repeat.set(BOX_WIDTH / TILE_SIZE, BOX_DEPTH / TILE_SIZE);
        break;
      case 4: // Left face
        texture.repeat.set(1, 1);
        break;
      case 5: // Right face
        texture.repeat.set(1, 1);
        break;
      default:
        break;
    }
    // texture.wrapS = RepeatWrapping;
    // texture.wrapT = RepeatWrapping;
  });

  return (
    <mesh position={[-2, 2, 0]}>
      <boxGeometry args={[BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH]} />
      <meshStandardMaterial attachArray="material" map={textures[0]} />
      <meshStandardMaterial attachArray="material" map={textures[1]} />
      <meshStandardMaterial attachArray="material" map={textures[2]} />
      <meshStandardMaterial attachArray="material" map={textures[3]} />
      <meshStandardMaterial attachArray="material" map={textures[4]} />
      <meshStandardMaterial attachArray="material" map={textures[5]} />
    </mesh>
  );
};

export default Box;
