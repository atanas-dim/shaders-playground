import { FC } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const colorMap = "/textures/pool-tiles/TilesSquarePoolMixed001_COL_2K.jpg";
const dispMap = "/textures/pool-tiles/TilesSquarePoolMixed001_DISP_2K.jpg";
// const disp16Map  = "/textures/pool-tiles/TilesSquarePoolMixed001_DISP16_2K.tif";
const glossMap = "/textures/pool-tiles/TilesSquarePoolMixed001_GLOSS_2K.jpg";
const normalMap = "/textures/pool-tiles/TilesSquarePoolMixed001_NRM_2K.jpg";
const reflMap = "/textures/pool-tiles/TilesSquarePoolMixed001_REFL_2K.jpg";

interface SphereProps {
  colorMap: string;
  dispMap: string;
  disp16Map: string;
  glossMap: string;
  normalMap: string;
  normal16Map: string;
  reflMap: string;
}

const Sphere: FC = () => {
  const [
    colorTexture,
    dispTexture,
    // disp16Texture,
    glossTexture,
    normalTexture,
    // normal16Texture,
    reflTexture,
  ] = useLoader(TextureLoader, [
    colorMap,
    dispMap,
    // disp16Map,
    glossMap,
    normalMap,
    // normal16Map,
    reflMap,
  ]);

  return (
    <mesh position={[0, 2, 0]} castShadow>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        map={colorTexture}
        displacementMap={dispTexture} // or disp16Texture depending on preference
        displacementScale={0.1}
        roughnessMap={glossTexture}
        normalMap={normalTexture} // or normal16Texture depending on preference
        envMap={reflTexture}
        metalness={0.8}
        roughness={0.5}
      />
    </mesh>
  );
};

export default Sphere;
