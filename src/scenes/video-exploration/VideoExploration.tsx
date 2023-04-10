import {
  Center,
  ContactShadows,
  Environment,
  Loader,
  MeshReflectorMaterial,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Scroll,
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
import { AiOutlineArrowDown } from "react-icons/ai";
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
          <Content />
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

const Content = () => {
  return (
    <Scroll html>
      <section className="flex h-[100dvh] items-end w-[100dvw] justify-center">
        <div className="items-end justify-center text-center m-10">
          <p>Scroll</p>
          <AiOutlineArrowDown
            size={25}
            className={`m-5 animate-bounce fill-white hover:text-opacity-40`}
          />
        </div>
      </section>
      <Section right>
        <p>
          The first live television broadcast in the United States occurred on
          April 30, 1939, when NBC broadcast a performance of the opera "Carmen"
          from the Metropolitan Opera House in New York City. The broadcast was
          viewed by approximately 1,000 people who had television sets in the
          New York City area. Over the next few years, the number of television
          sets in homes across the country grew rapidly, and by the early 1950s,
          television had become a staple of American culture.
        </p>
      </Section>
      <Section right>
        <p>
          The Super Bowl is the most watched television event in the United
          States, with more than 100 million viewers tuning in each year. The
          first Super Bowl was played on January 15, 1967, between the Green Bay
          Packers and the Kansas City Chiefs. At that time, the Super Bowl was
          not the cultural phenomenon that it is today, and many of the seats at
          the Los Angeles Memorial Coliseum were empty. However, over the years,
          the Super Bowl has grown in popularity, and it is now one of the most
          anticipated events of the year. In addition to the game itself, the
          Super Bowl is known for its elaborate halftime shows and its
          commercials, which are some of the most expensive and creative on
          television.
        </p>
      </Section>
    </Scroll>
  );
};

interface SectionProps {
  right?: boolean;
  opacity?: number;
  children?: React.ReactNode;
}

const Section = (props: SectionProps) => {
  return (
    <section
      className={`h-[100dvh] flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      } `}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full text-white">{props.children}</div>
      </div>
    </section>
  );
};
