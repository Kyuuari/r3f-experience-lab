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
import VideoExploration from "./scenes/video-exploration/VideoExploration";
import AIWorldExploration from "./scenes/ai-worlds/AIWorldExploration";

function App() {
  const [scene, setScene] = useState("Television Exploration");

  const controls = useControls({
    Explorations: {
      value: scene,
      options: [
        "Nike Exploration",
        "Television Exploration",
        "AI World Exploration",
      ],
      onChange: (value) => {
        setScene(value);
      },
    },
  });

  return (
    <>
      <Overlay />
      {/* <Suspense fallback={<div>Loading ...</div>}> */}
      {/* <Stage1 visible={stage === 1} /> */}
      {/* <SampleScene visible={}/> */}
      {/* {scene === "Example" ? <SampleScene /> : null}
          {scene === "Exploration" ? <Exploration /> : null} */}
      {/* {scene === "ScrollExploration" ? <ScrollExploration /> : null} */}
      {scene === "Nike Exploration" ? <ScrollExplorationNike /> : null}
      {scene === "Television Exploration" ? <VideoExploration /> : null}
      {scene === "AI World Exploration" ? <AIWorldExploration /> : null}
      {/* </Suspense> */}
    </>
  );
}

export default App;
