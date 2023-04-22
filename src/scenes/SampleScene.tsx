import { useControls } from "leva";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

type Props = {};

const SampleScene = (props: Props) => {
  const controls = useControls({
    backgroundColor: "#000000",
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <color attach="background" args={[controls.backgroundColor]} />
      <OrbitControls />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};

export default SampleScene;
