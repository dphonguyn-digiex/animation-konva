import { useCallback, useEffect, useState } from "react";
import { useSpring, useSpringRef } from "@react-spring/konva";
import { getAnimationInProperties, getDefaultProps } from "../utils/animation";

const useFade = (elementRef, playing) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const defaultProps = useCallback(
    () => getDefaultProps(elementRef),
    [elementRef]
  );

  const springRef = useSpringRef(null);
  const [animationProps, api] = useSpring(() => ({
    ref: springRef,
    from: defaultProps(),
    to: defaultProps(),
    reset: true,
  }));

  useEffect(() => {
    if (playing) {
      playAnimationIn(typeAnimation);
    } else {
      resetAnimation();
    }
    return () => {
      resetAnimation();
    };
  }, [playing]);

  const playAnimationIn = (type) => {
    return new Promise((resolve) => {
      api.start({
        ...getAnimationInProperties(type, defaultProps(), {}),
        onRest: () => {
          setIsAnimating(false);
          resolve();
        },
      });
    });
  };

  const pauseAnimation = () => {
    setIsPaused(true);
    api.pause();
  };

  const resumeAnimation = () => {
    setIsPaused(false);
    api.resume();
  };

  const resetAnimation = (props) => {
    api.start({
      ...defaultProps(),
      ...props,
      immediate: true,
    });
  };

  return {
    isAnimating,
    animationProps,
    pauseAnimation,
    resumeAnimation,
    resetAnimation,
  };
};

export default useFade;
