import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Experience from "../../components/Experience";
import { useControls } from "leva";
import {
  Center,
  ContactShadows,
  Float,
  Loader,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  PresentationControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Group, MathUtils, Mesh } from "three";
import { Content } from "./Content";
import gsap from "gsap";
import { Shoe } from "./Shoe";

type BoxProps = {
  position: Vector3;
  children?: React.ReactNode;
};

type Props = {};

const ScrollExplorationNike = (props: Props) => {
  return (
    <>
      <Canvas>
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          position={[0, 0, -2]}
        />
        <ambientLight />
        <color attach="background" args={["#ffffff"]} />
        <ScrollControls pages={3} damping={0.5} maxSpeed={0.3}>
          <Box position={[0, 0, 0]} />
          <Content />
        </ScrollControls>
      </Canvas>
      <Loader />
    </>
  );
};

export default ScrollExplorationNike;

function Box({ position }: BoxProps) {
  const meshRef = useRef<Group>(null!);
  const tl = useRef<GSAPTimeline>(null!); // ref to access the GSAP timeline
  const scroll = useScroll(); // get the current scroll offset

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  const { width, height } = useThree((state) => state.viewport);
  const { viewport, camera } = useThree();
  // getCurrentViewport is a helper that calculates the size of the viewport
  // const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(
      meshRef.current.rotation,
      { duration: 1, x: 0, y: -Math.PI * 0.5, z: 0 },
      0
    );

    tl.current.to(
      meshRef.current.scale,
      { duration: 1, x: 0.2, y: 0.2, z: 0.2 },
      0.9
    );

    const boxWidth = meshRef.current.scale.x; // replace with the actual width of your box
    const boxHeight = meshRef.current.scale.y; // replace with the actual height of your box
    const xOffset = (width / 2 - boxWidth / 2) * meshRef.current.scale.x; // calculate the x offset
    const yOffset = (-height / 2 + boxHeight / 2) * meshRef.current.scale.y; // calculate the y offset

    //Normalize the viewport by dividing by 2
    tl.current.to(
      meshRef.current.position,
      { duration: 0.4, x: (-xOffset - boxWidth / 4) / 2 },
      0.2
    );

    tl.current.to(
      meshRef.current.position,
      {
        duration: 1,
        x: xOffset - boxWidth / 2,
        y: yOffset + boxHeight / 2,
        z: 0,
      },
      0.9
    );
  }, []);

  return (
    <>
      <group dispose={null} ref={meshRef} rotation={[0.35, 2.25, 0]}>
        <Float
          rotationIntensity={1.25} // XYZ rotation intensity, defaults to 1
          floatIntensity={2}
        >
          <Shoe scale={3} castShadow receiveShadow />
        </Float>
      </group>
    </>
  );
}
