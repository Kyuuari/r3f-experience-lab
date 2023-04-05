import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import Experience from "../components/Experience";
import { useControls } from "leva";
import {
  OrbitControls,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { MathUtils, Mesh } from "three";
import { Content } from "./Content";

type FooProps = {
  position: Vector3;
  children: React.ReactNode;
};

type Props = {};

const ScrollExploration = (props: Props) => {
  const controls = useControls({
    backgroundColor: "#ffffff",
  });

  const { width: w, height: h } = useThree((state) => state.viewport);

  const meshRef = useRef<Mesh>(null!); // ref to access the mesh
  // const { delta } = useScroll();

  useFrame((state, delta) => {
    // const { delta } = useScroll(); // get the current scroll delta
    // const newRotation = rotation + delta * 0.01; // calculate the new rotation based on the delta
    // setRotation(newRotation); // update the state with the new rotation
    // meshRef.current.rotation.y += Math.cos(delta); // apply the rotation to the mesh
  });
  // console.log(h);

  // const viewport = {
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // };
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      {/* <OrbitControls enableZoom={false} /> */}
      <color attach="background" args={[controls.backgroundColor]} />
      {/* <OrbitControls /> */}
      <ScrollControls pages={3} damping={0.1}>
        {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
        <Scroll>
          {/* Canvas contents in here will scroll along */}
          {/* <Foo position={[0, 0, 0]} />
          <Foo position={[0, viewport.height, 0]} />
          <Foo position={[0, viewport.height * 1, 0]} /> */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial />
          </mesh>
          <mesh position={[0, -h, 0]} ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial />
          </mesh>
          <mesh position={[0, -h * 2, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial />
          </mesh>
        </Scroll>
        <Content />
        {/* <Scroll html> */}
        {/* DOM contents in here will scroll along */}
        {/* <section>
            <h1>html in here (optional)</h1>
            <h1 style={{ position: "absolute", top: "100vh" }}>second page</h1>
            <h1 style={{ position: "absolute", top: "200vh" }}>third page</h1>
          </section>
        </Scroll> */}
      </ScrollControls>
    </>
  );
};

export default ScrollExploration;

function Foo(props: FooProps) {
  const meshRef = useRef<Mesh>(null!);
  const data = useScroll();
  const [rotation, setRotation] = useState(0); // state to keep track of the current rotation
  useFrame((state, delta) => {
    meshRef.current.rotation.y = Math.cos(data.offset * 0.01); // apply the rotation to the mesh
  });
  return <mesh ref={meshRef} {...props} />;
}
