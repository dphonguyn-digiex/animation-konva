import { useCallback, useEffect, useState } from "react";
import { useSpring, useSpringRef } from "@react-spring/konva";
import {
  deliveryAnimation,
  getAnimationInProperties,
  getDefaultProps,
} from "../utils/animation";
import { ANIMATION_ID, METHODS_APPROACH } from "../constants";

const useAnimation = (elementRef, animationId, playing) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [methodApproach, setMethodApproach] = useState(METHODS_APPROACH.RAW);

  const defaultProps = useCallback(
    () => getDefaultProps(elementRef),
    [elementRef]
  );

  useEffect(() => {
    initialAnimation(animationId);
  }, [animationId]);

  const initialAnimation = (animationId) => {
    switch (animationId) {
      case ANIMATION_ID.DISCO:
        setMethodApproach(METHODS_APPROACH.INTERPOLATION);
        break;
      case ANIMATION_ID.NEON:
        setMethodApproach(METHODS_APPROACH.INTERPOLATION);
        break;

      case ANIMATION_ID.WIPE:
        setMethodApproach(METHODS_APPROACH.FLEXIBLE);
        break;
      case ANIMATION_ID.ZOOM:
        setMethodApproach(METHODS_APPROACH.FLEXIBLE);
        break;
      case ANIMATION_ID.BASELINE:
        setMethodApproach(METHODS_APPROACH.FLEXIBLE);
        break;

      case ANIMATION_ID.FADE:
        setMethodApproach(METHODS_APPROACH.RAW);
        break;
      case ANIMATION_ID.POP:
        setMethodApproach(METHODS_APPROACH.RAW);
        break;
      case ANIMATION_ID.RISE:
        setMethodApproach(METHODS_APPROACH.RAW);
        break;
      case ANIMATION_ID.NONE:
        setMethodApproach(METHODS_APPROACH.RAW);
        break;
      default:
        return METHODS_APPROACH.RAW;
    }
  };

  const springRef = useSpringRef(null);

  const [animationProps, api] = useSpring(() => ({
    ref: springRef,
    from: defaultProps(),
    to: defaultProps(),
    reset: true,
  }));

  useEffect(() => {
    if (playing) {
      setIsAnimating(true);
    }
    playAnimationIn(animationId, playing);
    return () => {
      resetAnimation();
    };
  }, [playing, animationId]);

  const playAnimationIn = (animationId, playing) => {
    return new Promise((resolve) => {
      api.start({
        ...(methodApproach === METHODS_APPROACH.FLEXIBLE &&
          animationInFlexibleConfig(animationId)),
        ...(methodApproach === METHODS_APPROACH.RAW &&
          getAnimationInProperties(animationId, defaultProps())),
        onRest: () => {
          setIsAnimating(false);
          resolve();
        },
      });
    });
  };

  const animationInFlexibleConfig = (animationId) => {
    console.log("animationId", animationId);
    return {
      from: {
        cropWidth: isAnimating
          ? elementRef.imageWidth * 0.6
          : elementRef.imageWidth,
        cropHeight: isAnimating
          ? elementRef.imageHeight * 0.6
          : elementRef.imageHeight,
        cropX: isAnimating ? elementRef.imageWidth * 0.2 : 0,
        cropY: isAnimating ? elementRef.imageHeight * 0.2 : 0,
      },
      to: {
        cropWidth: elementRef.imageWidth,
        cropHeight: elementRef.imageHeight,
        cropX: 0,
        cropY: 0,
      },
      config: {
        duration: 2000,
      },
    };
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

export default useAnimation;
