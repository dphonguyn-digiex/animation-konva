import { useState } from "react";
import { ANIMATION_ID } from "../constants";

const animationController = (elementRef, animationId, playing) => {
  const [isAnimating, setIsAnimating] = useState(false);

  switch (animationId) {
    case ANIMATION_ID.BASELINE:
      break;
    case ANIMATION_ID.DISCO:
      break;
    case ANIMATION_ID.FADE:
      return fadeConfig(elementRef, playing);
    case ANIMATION_ID.NEON:
      break;
    case ANIMATION_ID.NONE:
      break;
    case ANIMATION_ID.POP:
      break;
    case ANIMATION_ID.RISE:
      break;
    case ANIMATION_ID.WIPE:
      break;
    case ANIMATION_ID.ZOOM:
      break;
    default:
      return;
  }
};

export default animationController;
