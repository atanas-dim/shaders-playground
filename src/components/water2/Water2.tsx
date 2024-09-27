import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type FC } from "react";
import {
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
} from "three";
import { Water } from "three/addons/objects/Water2.js";

const Water2: FC = () => {
  const scene = useThree((state) => state.scene);
  const waterRef = useRef<Water>();

  useEffect(() => {
    const waterGeometry = new PlaneGeometry(64, 64);

    const textureLoader = new TextureLoader();

    //

    const normalMap0 = textureLoader.load("/Water_1_M_Normal.jpg");
    const normalMap1 = textureLoader.load("/Water_2_M_Normal.jpg");

    normalMap0.wrapS = normalMap0.wrapT = RepeatWrapping;
    normalMap1.wrapS = normalMap1.wrapT = RepeatWrapping;

    const water = new Water(waterGeometry, {
      color: "#87ccc3",
      scale: 3,
      flowDirection: new Vector2(1, 1),
      flowSpeed: 0.05,
      normalMap0: normalMap0,
      normalMap1: normalMap1,
    });

    water.position.y = 1;
    water.rotation.x = Math.PI * -0.5;
    scene.add(water);
  }, [scene]);

  useFrame(({ clock, gl, pointer, scene, camera }) => {});

  return <> </>;
};

export default Water2;
