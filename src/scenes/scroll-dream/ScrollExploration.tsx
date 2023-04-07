import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useRef, useState } from "react";
import Experience from "../../components/Experience";
import { useControls } from "leva";
import {
  Center,
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

type BoxProps = {
  position: Vector3;
  children?: React.ReactNode;
};

type Props = {};

const ScrollExplorationDream = (props: Props) => {
  const controls = useControls({
    backgroundColor: "#ffffff",
  });

  // const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
      <OrthographicCamera position={[0, 0, -5]} />
      {/* <OrbitControls enableZoom={false} enableRotate={false} /> */}
      <color attach="background" args={[controls.backgroundColor]} />
      <ScrollControls pages={3} damping={0.1} maxSpeed={0.5}>
        <Box position={[0, 0, 0]} />
        <Content />
      </ScrollControls>
    </>
  );
};

export default ScrollExplorationDream;

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
      { duration: 1, x: 0, y: Math.PI / 2, z: 0 },
      0
    );

    //Normalize the viewport by dividing by 2
    // tl.current.to(
    //   meshRef.current.position,
    //   { duration: 1, x: width / 2, y: -height / 2, z: 0 },
    //   0.5
    // );

    tl.current.to(
      meshRef.current.scale,
      { duration: 1, x: 0.5, y: 0.5, z: 0.5 },
      0.5
    );

    const boxWidth = 1; // replace with the actual width of your box
    const boxHeight = 1; // replace with the actual height of your box
    const xOffset = (width / 2 - boxWidth / 2) * meshRef.current.scale.x; // calculate the x offset
    const yOffset = (-height / 2 + boxHeight / 2) * meshRef.current.scale.y; // calculate the y offset
    tl.current.to(
      meshRef.current.position,
      {
        duration: 1,
        x: xOffset - boxWidth / 2,
        y: yOffset + boxHeight / 2,
        z: 0,
      },
      0.5
    );
  }, []);

  return (
    <>
      <group dispose={null} ref={meshRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </>
  );
}
