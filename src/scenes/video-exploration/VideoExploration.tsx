import {
  Center,
  ContactShadows,
  Environment,
  Loader,
  MeshReflectorMaterial,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Television } from "./Television";
import {
  Bloom,
  EffectComposer,
  Outline,
  Scanline,
  Selection,
} from "@react-three/postprocessing";

type Props = {};

const VideoExploration = (props: Props) => {
  return (
    <>
      <Canvas dpr={[1, 2]} shadows>
        <OrbitControls makeDefault position={[0, 0, -2]} />
        <fog attach="fog" args={["#101010", 0, 10]} />
        <ambientLight intensity={0.8} />
        {/* <Environment preset="city" /> */}
        {/* <ambientLight /> */}
        <color attach="background" args={["#000000"]} />
        <Center>
          {/* <Macbook /> */}
          <Television />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              opacity={100}
              depthScale={1.1}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.25}
              roughness={5}
              mirror={1}
            />
          </mesh>
          <mesh
            receiveShadow
            rotation-x={-Math.PI / 2}
            position={[0, 0.001, 0]}
          >
            <planeGeometry args={[10, 10]} />
            <shadowMaterial transparent color="black" opacity={0.4} />
          </mesh>
          {/* <ContactShadows /> */}
        </Center>

        <EffectComposer>
          <Scanline />
          <Bloom intensity={1} />
        </EffectComposer>
      </Canvas>
      <Loader />
    </>
  );
};

export default VideoExploration;
