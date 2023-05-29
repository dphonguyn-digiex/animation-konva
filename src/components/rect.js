import React, { useMemo, useRef, useState } from "react";
import { animated } from "@react-spring/konva";
import useAnimation from "../hooks/animation";

const RectBox = (props) => {
  const { playing, typeAnimation, ...restProps } = props;
  const [position, setPosition] = useState({
    x: restProps.position.x,
    y: restProps.position.y
  });
  const elementRef = useRef(null);

  const elementAnimationRef = useMemo(
    () => ({
      width: restProps.width,
      height: restProps.height,
      opacity: restProps.opacity,
      x: position.x,
      y: position.y
    }),
    [position, restProps]
  );

  const { animationProps, isAnimating } = useAnimation(
    elementAnimationRef,
    typeAnimation,
    playing
  );

  return (
    <>
      <animated.Rect
        draggable={!isAnimating}
        ref={elementRef}
        onDragMove={(e) => {
          setPosition({ x: e.target.x(), y: e.target.y() });
        }}
        onDragEnd={(e) => {
          setPosition({ x: e.target.x(), y: e.target.y() });
        }}
        offsetX={restProps?.width / 2}
        offsetY={restProps?.height / 2}
        x={position.x}
        y={position.y}
        {...restProps}
        {...animationProps}
      />
    </>
  );
};

export default RectBox;
