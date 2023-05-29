import { ANIMATION_ID } from "../constants";
import { config, easings } from "@react-spring/konva";
// import { easings } from "@react-spring/konva";

const DEFAULT_DURATION = 400;
const DEFAULT_DISTANCE = 200;

export const getConfigAnimation = (options) => {
  const { speed } = options;

  return {
    duration: speed ? speed : DEFAULT_DURATION,
    ...config.default,
  };
};

export const getDefaultProps = (ref) => {
  return {
    x: ref?.x,
    y: ref?.y,
    width: ref?.width,
    height: ref?.height,
    opacity: ref?.opacity || 1,
    scaleX: ref?.scaleX || 1,
    scaleY: ref?.scaleY || 1,
  };
};

export const getAnimationInProperties = (
  animationId,
  defaultProps,
  options
) => {
  if (animationId === ANIMATION_ID.WIPE) {
    return {
      from: {
        ...defaultProps,
        x: defaultProps.x - DEFAULT_DISTANCE,
        opacity: 0,
      },
      to: defaultProps,
      config: getConfigAnimation(options),
      delay: options?.delay ? options?.delay : 0,
    };
  } else if (animationId === ANIMATION_ID.FADE) {
    return {
      from: { ...defaultProps, opacity: 0 },
      to: defaultProps,
      config: {
        ...config.slow,
        duration: 1000,
        precision: 0.016,
        easing: easings.linear,
      },
      delay: options?.delay ? options?.delay : 0,
    };
  } else if (animationId === ANIMATION_ID.RISE) {
    return {
      from: {
        ...defaultProps,
        y: defaultProps.y + DEFAULT_DISTANCE,
        opacity: 0.2,
      },
      to: defaultProps,
      config: {
        ...getConfigAnimation(options),
        mass: 1.3,
        friction: 12,
      },
      delay: options?.delay ? options?.delay : 0,
    };
  } else if (animationId === ANIMATION_ID.POP) {
    return {
      from: {
        ...defaultProps,
        opacity: 0.2,
        scaleX: 0,
        scaleY: 0,
      },
      to: defaultProps,
      config: {
        tension: 180,
        friction: 12,
        bounce: 0.4,
        mass: 0.9,
      },
      delay: options?.delay ? options?.delay : 0,
    };
  } else if (animationId === ANIMATION_ID.ZOOM) {
    return {
      from: {
        ...defaultProps,
        y: defaultProps.y - 100,
        scaleX: 1.2,
        scaleY: 1.2,
        opacity: 0,
      },
      to: defaultProps,
      config: getConfigAnimation(options),
      delay: options?.delay ? options?.delay : 0,
    };
  } else if (animationId === ANIMATION_ID.NEON) {
    return {
      from: async (next) => {
        await next({ ...defaultProps, opacity: 0 });
        await next({ ...defaultProps, opacity: 0.2 });
        await next({ ...defaultProps, opacity: 0.3 });
        await next({ ...defaultProps, opacity: 0.4 });
        await next({ ...defaultProps, opacity: 0.5 });
        await next({ ...defaultProps, opacity: 1 });
      },
      to: async (next) => {
        await next({ ...defaultProps, opacity: 0 });
        await next({ ...defaultProps, opacity: 0.1 });
        await next({ ...defaultProps, opacity: 0.0 });
        await next({ ...defaultProps, opacity: 1 });
        await next({ ...defaultProps, opacity: 0.3 });
        await next({ ...defaultProps, opacity: 1 });
      },
      easing: easings.easeInBounce(6),
      config: { duration: 100 },
      delay: options?.delay ? options?.delay : 0,
    };
  } else
    return {
      from: defaultProps,
      to: defaultProps,
      config: getConfigAnimation(options),
      delay: 0,
    };
};

export const deliveryAnimation = (animationId, animationProps) => {
  if (animationId === ANIMATION_ID.WIPE) {
    return {
      mask: animationProps,
      element: {},
    };
  } else if (animationId === ANIMATION_ID.FADE) {
    return {
      mask: animationProps,
      element: animationProps,
    };
  } else if (animationId === ANIMATION_ID.RISE) {
    return {
      mask: animationProps,
      element: animationProps,
    };
  } else if (animationId === ANIMATION_ID.POP) {
    return {
      mask: animationProps,
      element: animationProps,
    };
  } else if (animationId === ANIMATION_ID.ZOOM) {
    return {
      mask: animationProps,
      element: animationProps,
    };
  } else
    return {
      mask: animationProps,
      element: animationProps,
    };
};
