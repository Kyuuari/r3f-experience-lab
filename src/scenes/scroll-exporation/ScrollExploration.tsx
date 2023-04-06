import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useRef, useState } from "react";
import Experience from "../../components/Experience";
import { useControls } from "leva";
import {
  OrbitControls,
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

const ScrollExploration = (props: Props) => {
  const controls = useControls({
    backgroundColor: "#ffffff",
  });

  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
      {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} /> */}
      {/* <OrbitControls enableZoom={false} /> */}
      <color attach="background" args={[controls.backgroundColor]} />
      {/* <OrbitControls /> */}
      <ScrollControls pages={3} damping={0.25}>
        <Content />
        <Scroll>
          <Box position={[0, 0, 0]} />
          <mesh position={[0, -h, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial />
          </mesh>
          <mesh position={[0, -h * 2, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial />
          </mesh>
        </Scroll>
      </ScrollControls>
    </>
  );
};

export default ScrollExploration;

function Box({ position }: BoxProps) {
  const meshRef = useRef<Group>(null!);
  const tl = useRef<GSAPTimeline>(null!); // ref to access the GSAP timeline
  const scroll = useScroll(); // get the current scroll offset

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  const { width: w, height: h } = useThree((state) => state.viewport);

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(
      meshRef.current.rotation,
      { duration: 1, x: 0, y: Math.PI / 2, z: 0 },
      0
    );
    tl.current.to(
      meshRef.current.rotation,
      { duration: 1, x: 0, y: -Math.PI / 2, z: 0 },
      1
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
