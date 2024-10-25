import { FC, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

// Define texture paths
const COLOR_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_COL_2K.jpg";
const GLOSS_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_GLOSS_2K.jpg";
const NORMAL_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_NRM_2K.jpg";
const REFT_MAP = "/textures/pool-tiles/TilesSquarePoolMixed001_REFL_2K.jpg";

const INITIAL_BOX_WIDTH = 1;
const INITIAL_BOX_HEIGHT = 1;
const INITIAL_BOX_DEPTH = 1;
// Box dimensions
const BOX_WIDTH = 2.54; // Width of the box
const BOX_HEIGHT = 1.25; // Height of the box
const BOX_DEPTH = 1; // Depth of the box
const TILE_SIZE = 0.5; // Size of each texture tile (0.5x0.5)

// Main Box Component
const Box: FC = () => {
  // Load textures
  const [colorTexture, glossTexture, normalTexture, reflTexture] = useLoader(
    TextureLoader,
    [COLOR_MAP, GLOSS_MAP, NORMAL_MAP, REFT_MAP]
  );

  // Prepare the box reference
  const boxRef = useRef<any>();

  const resize = () => {
    if (!boxRef.current) return;
    const geometry = boxRef.current.geometry;

    // Pick new random sizes
    const sx = BOX_WIDTH,
      sy = BOX_HEIGHT,
      sz = BOX_DEPTH;

    // Scale the object
    boxRef.current.scale.set(sx, sy, sz);

    // Regenerate the UVs from the positions
    const pos = geometry.getAttribute("position");
    const uv = geometry.getAttribute("uv");

    // Adjust UVs based on the new sizes
    for (let i = 0; i < pos.count; i++) {
      const x = (pos.getX(i) + 0.5) * sx; // Adjusted for scaling
      const y = (pos.getY(i) + 0.5) * sy; // Adjusted for scaling
      const z = (pos.getZ(i) + 0.5) * sz; // Adjusted for scaling

      if (i < 8) {
        uv.setXY(i, z, y); // Side faces
      } else if (i < 16) {
        uv.setXY(i, x, z); // Front and back faces
      } else {
        uv.setXY(i, y, x); // Top and bottom faces
      }
    }

    uv.needsUpdate = true;
  };

  useEffect(() => {
    // TODO Find fix for the reflection of the texture. Currently lost when calling resize. Resize updates the texture scaling on each side to be the same.
    resize();
    const textures = [colorTexture, glossTexture, normalTexture, reflTexture];

    textures.forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(
        Math.ceil(INITIAL_BOX_WIDTH / TILE_SIZE),
        Math.ceil(INITIAL_BOX_HEIGHT / TILE_SIZE)
      );
    });
  }, [colorTexture, glossTexture, normalTexture, reflTexture]);

  return (
    <mesh ref={boxRef} position={[-2, 3, 0]} castShadow scale={[1, 1, 1]}>
      <boxGeometry
        args={[INITIAL_BOX_WIDTH, INITIAL_BOX_HEIGHT, INITIAL_BOX_DEPTH]}
      />
      <meshStandardMaterial
        map={colorTexture}
        roughnessMap={glossTexture}
        normalMap={normalTexture}
        envMap={reflTexture}
        metalness={0.8}
        roughness={0.5}
      />
    </mesh>
  );
};

export default Box;
