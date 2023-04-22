import { Loader, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

type Props = {};

const AIWorldExploration = (props: Props) => {
  return (
    <>
      <Canvas>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          makeDefault
          position={[0, 0, 0]}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <World />
      </Canvas>
      <Loader />
    </>
  );
};

export default AIWorldExploration;

const World = () => {
  const texture = useTexture(`assets/winter-mountain.png`);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

// interface SphereProps {
//   position?: number[] | undefined;
//   rotation?: THREE.Euler;
// }

// const Sphere = ({ position, rotation }: SphereProps) => {
//   const vectorPosition = new THREE.Vector3().fromArray(position || [0, 0, 0]);

//   return (
//     <PivotControls autoTransform>
//       {/* <mesh position={vectorPosition} rotation={rotation}> */}
//       {/* <sphereGeometry args={[0.2, 0.2, 0.2]}> */}
//       <Html position={vectorPosition} transform occlude>
//         <div className="bg-black text-white">
//           <h1 className="font-semibold font-serif text-2xl">Hello 👋</h1>
//           <p className="text-gray-500">Welcome to the site</p>
//           <p className="animate-bounce  mt-6">↓</p>
//         </div>
//       </Html>
//       {/* </mesh> */}
//     </PivotControls>
//   );
// };
