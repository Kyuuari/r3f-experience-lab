import { Canvas } from "@react-three/fiber";
import React from "react";
import Experience from "../components/Experience";
import { Color } from "three";
import { useControls } from "leva";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

type Props = {};

const Exploration = (props: Props) => {
  const controls = useControls({
    backgroundColor: "#ffffff",
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <color attach="background" args={[controls.backgroundColor]} />
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={"#F36344"} />
      </mesh>
    </>
  );
};

export default Exploration;
