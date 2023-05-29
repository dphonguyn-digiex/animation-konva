import React, { useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/konva";
import useAnimation from "../hooks/animation";
import useImage from "use-image";

const ImageBox = (props) => {
  const { playing, typeAnimation, ...restProps } = props;
  const [position, setPosition] = useState({
    x: restProps.position.x,
    y: restProps.position.y,
  });
  const [imageSrc, setImageSrc] = useState("");
  const elementRef = useRef(null);

  const [srcLoaded] = useImage(imageSrc, "anonymous");

  useEffect(() => {
    setImageSrc(restProps.src);
  }, []);

  const imageWidth = srcLoaded?.width;
  const imageHeight = srcLoaded?.height;

  const elementAnimationRef = useMemo(
    () => ({
      width: restProps.width,
      height: restProps.height,
      opacity: restProps.opacity,
      x: position.x,
      y: position.y,
      imageWidth,
      imageHeight,
    }),
    [position, restProps, srcLoaded]
  );

  const { animationProps, isAnimating } = useAnimation(
    elementAnimationRef,
    typeAnimation,
    playing
  );

  return (
    <>
      <animated.Image
        draggable={!isAnimating}
        image={srcLoaded}
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

export default ImageBox;
