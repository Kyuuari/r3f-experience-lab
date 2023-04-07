import { Suspense, useState } from "react";
import "./App.css";
import Experience from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import Overlay, { OverlayDark, OverlayLight } from "./components/Overlay";
import { useControls } from "leva";
import SampleScene from "./scenes/SampleScene";
import Exploration from "./scenes/Exploration";
import ScrollExploration from "./scenes/scroll-exporation/ScrollExploration";
import ScrollExplorationNike from "./scenes/scroll-shoe/ScrollExploration";

function App() {
  const [scene, setScene] = useState("Shoe");

  const controls = useControls({
    component: {
      value: scene,
      options: ["ScrollExploration", "Shoe"],
      onChange: (value) => {
        setScene(value);
      },
    },
  });

  return (
    <>
      <Overlay />
      <Suspense fallback={null}>
        <Canvas>
          {/* <Stage1 visible={stage === 1} /> */}
          {/* <SampleScene visible={}/> */}
          {/* {scene === "Example" ? <SampleScene /> : null}
          {scene === "Exploration" ? <Exploration /> : null} */}
          {scene === "ScrollExploration" ? <ScrollExploration /> : null}
          {scene === "Shoe" ? <ScrollExplorationNike /> : null}
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
