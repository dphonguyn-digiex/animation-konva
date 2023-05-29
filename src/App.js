import "./styles.css";
import { Layer, Stage } from "react-konva";
import { useState } from "react";

import {
  ANIMATION_ID,
  ELEMENT_ID,
  BACKGROUND_APP,
  listElements,
} from "./constants";
import RectBox from "./components/rect";
import ImageBox from "./components/image";
import ImageBoxTest from "./components/imageTestZoom";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [animationId, setAnimationId] = useState(ANIMATION_ID.NONE);

  const renderElementKonva = (element) => {
    switch (element.type) {
      case ELEMENT_ID.RECT:
        return (
          <RectBox
            key={element.id}
            {...element}
            playing={playing}
            typeAnimation={animationId}
          />
        );
      case ELEMENT_ID.IMAGE:
        return (
          <ImageBox
            key={element.id}
            {...element}
            playing={playing}
            typeAnimation={animationId}
          />
        );
      // case ELEMENT_ID.TESTING:
      //   return (
      //     <ImageBoxTest
      //       key={element.id}
      //       {...element}
      //       playing={playing}
      //       typeAnimation={animationId}
      //     />
      //   );
      default:
        break;
    }
  };

  return (
    <div className="App" style={{ background: BACKGROUND_APP }}>
      <button
        style={{ marginRight: "12px" }}
        onClick={() => setPlaying(!playing)}
      >
        PLAY
      </button>
      <select
        name="animation-selection"
        id="animation-ids"
        value={animationId}
        onChange={(e) => setAnimationId(e.target.value)}
      >
        {Object.keys(ANIMATION_ID).map((target) => (
          <option key={target} value={ANIMATION_ID[target]}>
            {ANIMATION_ID[target]}
          </option>
        ))}
      </select>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>{listElements.map((elm) => renderElementKonva(elm))}</Layer>
      </Stage>
    </div>
  );
}
