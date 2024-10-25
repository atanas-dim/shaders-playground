import { FC, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { MathUtils, TextureLoader } from "three";

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
    const textutes = [
      colorTexture,
      dispTexture,
      glossTexture,
      normalTexture,
      reflTexture,
    ];

    textutes.forEach((texture) => {
      texture.wrapS = texture.wrapT = 1000; // THREE.RepeatWrapping
      texture.wrapT = texture.wrapS = 1000; // THREE.RepeatWrapping

      texture.repeat.set(
        Math.ceil(BOX_WIDTH / TILE_SIZE),
        Math.ceil(BOX_HEIGHT / TILE_SIZE)
      );
    });
  }, [colorTexture, dispTexture, glossTexture, normalTexture, reflTexture]);

  useEffect(() => {
    if (!boxRef.current) return;
    const geometry = boxRef.current.geometry;

    // pick new random sizes
    const sx = 2.54,
      sy = 1.25,
      sz = 1;

    // scale the object
    boxRef.current.scale.set(sx, sy, sz);

    // now regenerate the UVs from the positions
    // this code is adjusted for cubes only
    // for a more general approach see here:
    // https://codepen.io/boytchev/full/rNZxLLK
    const pos = geometry.getAttribute("position"),
      uv = geometry.getAttribute("uv");

    for (let i = 0; i < pos.count; i++) {
      const x = sx * (pos.getX(i) + 0.5),
        y = sy * (pos.getY(i) + 0.5),
        z = sz * (pos.getZ(i) + 0.5);

      if (i < 8) uv.setXY(i, z, y);
      else if (i < 16) uv.setXY(i, x, z);
      else uv.setXY(i, y, x);
    }
    uv.needsUpdate = true;
  }, []);

  return (
    <mesh
      ref={boxRef}
      position={[-2, 3, 0]}
      castShadow
      scale={[1, 1, 1]} // Set the scale for X, Y, and Z
    >
      <boxGeometry args={[BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH]} />
      <meshStandardMaterial
        map={colorTexture}
        // displacementMap={dispTexture}
        // displacementScale={0.1}
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
