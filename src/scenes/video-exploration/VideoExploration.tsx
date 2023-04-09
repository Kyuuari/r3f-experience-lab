import {
  Center,
  ContactShadows,
  Environment,
  Loader,
  MeshReflectorMaterial,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import React, { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Television } from "./Television";
import {
  Bloom,
  EffectComposer,
  Outline,
  Scanline,
  Selection,
} from "@react-three/postprocessing";
import { gsap } from "gsap";

type Props = {};

const VideoExploration = (props: Props) => {
  return (
    <>
      <Canvas dpr={[1, 2]} shadows>
        <fog attach="fog" args={["#101010", 0, 10]} />
        <ambientLight intensity={0.8} />
        <color attach="background" args={["#000000"]} />
        <ScrollControls pages={3} damping={0.3}>
          <Items />
        </ScrollControls>

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

function Items() {
  const { camera } = useThree();
  const tl = useRef<GSAPTimeline>(null!); // ref to access the GSAP timeline
  const scroll = useScroll(); // get the current scroll offset

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    //Zoom onto Television
    tl.current.to(
      camera.position,
      {
        duration: 1,
        z: 1,
        y: 0.5,
      },
      0
    );

    //Zoom onto Television
    tl.current.to(
      camera.rotation,
      {
        duration: 1,
        y: -0.5,
      },
      0.5
    );
  }, []);
  return (
    <>
      <Center>
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
        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0.001, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent color="black" opacity={0.4} />
        </mesh>
      </Center>
      <Suspense fallback={null}>
        <Television />
      </Suspense>
    </>
  );
}
