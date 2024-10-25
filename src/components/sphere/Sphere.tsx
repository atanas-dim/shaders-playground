import { FC } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Define texture paths
const colorMap = "/textures/pool-tiles/TilesSquarePoolMixed001_COL_2K.jpg";
const dispMap = "/textures/pool-tiles/TilesSquarePoolMixed001_DISP_2K.jpg";
const glossMap = "/textures/pool-tiles/TilesSquarePoolMixed001_GLOSS_2K.jpg";
const normalMap = "/textures/pool-tiles/TilesSquarePoolMixed001_NRM_2K.jpg";
const reflMap = "/textures/pool-tiles/TilesSquarePoolMixed001_REFL_2K.jpg";

const Sphere: FC = () => {
  // Load textures
  const [colorTexture, dispTexture, glossTexture, normalTexture, reflTexture] =
    useLoader(TextureLoader, [colorMap, dispMap, glossMap, normalMap, reflMap]);

  return (
    <mesh position={[0, 2, 0]} castShadow>
      <sphereGeometry args={[2, 128, 128]} />
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
  );
};

export default Sphere;
