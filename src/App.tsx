import { useState } from "react";
import "./App.css";
import Overlay from "./components/Overlay";
import { useControls } from "leva";
import ScrollExplorationNike from "./scenes/scroll-shoe/ScrollExploration";
import VideoExploration from "./scenes/video-exploration/VideoExploration";
import AIWorldExploration from "./scenes/ai-worlds/AIWorldExploration";

function App() {
  const [scene, setScene] = useState("Nike Exploration");

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
