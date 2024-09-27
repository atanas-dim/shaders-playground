import { useFrame, useThree } from "@react-three/fiber";
import React, { FC, useEffect, useRef } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water } from "three/addons/objects/Water.js";

const Water2: FC = () => {
  const scene = useThree((state) => state.scene);
  const waterRef = useRef<Water>();

  useEffect(() => {
    console.log({ scene });

    const waterGeometry = new PlaneGeometry(64, 64);

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new TextureLoader().load(
        "/waternormals.jpg",
        function (texture) {
          texture.wrapS = texture.wrapT = RepeatWrapping;
        }
      ),
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
      alpha: 1.0,
      side: 2,
    });

    water.position.y = 1.0;
    water.rotation.x = -Math.PI / 2;
    water.castShadow = true;
    water.receiveShadow = true;
    water.material.transparent = true;
    water.material.opacity = 0.15;

    scene.add(water);

    waterRef.current = water;
  }, [scene]);

  useFrame(({ clock, gl, pointer, scene, camera }) => {
    if (!waterRef.current) return;

    waterRef.current.material.uniforms["time"].value =
      clock.getElapsedTime() * 0.2;
  });

  return <> </>;
};

export default Water2;
