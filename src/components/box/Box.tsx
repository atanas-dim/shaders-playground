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
const BOX_WIDTH = 1; // Width of the box
const BOX_HEIGHT = 1; // Height of the box
const BOX_DEPTH = 1; // Depth of the box
const TILE_SIZE = 0.5; // Size of each texture tile (0.5x0.5)

// Resize function for scaling and updating UVs
const resize = (
  object: any,
  scaleX: number,
  scaleY: number,
  scaleZ: number,
  updateUV: boolean
) => {
  object.scale.set(5 * scaleX, 5 * scaleY, 5 * scaleZ);

  if (updateUV) {
    const pos = object.geometry.getAttribute("position");
    const uv = object.geometry.getAttribute("uv");

    for (let i = 0; i < pos.count; i++) {
      const x = scaleX * (-pos.getX(i) + 0.5);
      const y = scaleY * (-pos.getY(i) + 0.5);
      const z = scaleZ * (-pos.getZ(i) + 0.5);

      if (i < 8)
        uv.setXY(i, z, y); // Front and Back faces
      else if (i < 16)
        uv.setXY(i, x, z); // Left and Right faces
      else uv.setXY(i, y, x); // Top and Bottom faces
    }
    uv.needsUpdate = true; // Ensure the UVs are updated
  }
};

// Main Box Component
const Box: FC = () => {
  // Load textures
  const [colorTexture, dispTexture, glossTexture, normalTexture, reflTexture] =
    useLoader(TextureLoader, [
      COLOR_MAP,
      DISP_MAP,
      GLOSS_MAP,
      NORMAL_MAP,
      REFT_MAP,
    ]);

  // Prepare the box reference
  const boxRef = useRef<any>();

  useEffect(() => {
    // Set texture properties
    const textures = [
      colorTexture,
      dispTexture,
      glossTexture,
      normalTexture,
      reflTexture,
    ];
    textures.forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(BOX_WIDTH / TILE_SIZE, BOX_HEIGHT / TILE_SIZE); // Initial for colorTexture
      texture.needsUpdate = true;
    });

    // Define fixed scale values
    const scaleX = 0.6; // Fixed scale value
    const scaleY = 0.6; // Fixed scale value
    const scaleZ = 0.6; // Fixed scale value

    // Resize the box and update UVs initially
    resize(boxRef.current, scaleX, scaleY, scaleZ, true);
  }, [colorTexture, dispTexture, glossTexture, normalTexture, reflTexture]);

  return (
    <>
      <mesh ref={boxRef} position={[2, 0, 0]} castShadow>
        <boxGeometry args={[BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH]} />
        <meshStandardMaterial
          map={colorTexture}
          displacementMap={dispTexture}
          displacementScale={0.1}
          roughnessMap={glossTexture}
          normalMap={normalTexture}
          envMap={reflTexture}
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>
    </>
  );
};

export default Box;
