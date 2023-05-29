import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/konva";
import useImage from "use-image";

const ImageBoxTest = (props) => {
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

  const animationProps = useSpring({
    from: {
      cropWidth: playing ? imageWidth * 0.6 : imageWidth,
      cropHeight: playing ? imageHeight * 0.6 : imageHeight,
      cropX: playing ? imageWidth * 0.2 : 0,
      cropY: playing ? imageHeight * 0.2 : 0,
    },
    to: {
      cropWidth: imageWidth,
      cropHeight: imageHeight,
      cropX: 0,
      cropY: 0,
    },
    config: { duration: 2000 },
  });

  return (
    <>
      <animated.Image
        draggable
        ref={elementRef}
        width={restProps?.width}
        height={restProps?.height}
        image={srcLoaded}
        offsetY={restProps?.height / 2}
        offsetX={restProps?.width / 2}
        x={position.x}
        y={position.y}
        onDragMove={(e) => {
          setPosition({ x: e.target.x(), y: e.target.y() });
        }}
        onDragEnd={(e) => {
          setPosition({ x: e.target.x(), y: e.target.y() });
        }}
        {...restProps}
        {...animationProps}
      />
    </>
  );
};

export default ImageBoxTest;
