export const ANIMATION_ID = {
  NONE: "none",
  FADE: "fade",
  WIPE: "wipe",
  BASELINE: "baseline",
  RISE: "rise",
  POP: "pop",
  ZOOM: "zoom",
  DISCO: "disco",
  NEON: "neon",
};

export const ELEMENT_ID = {
  CIRCLE: "circle",
  RECT: "rect",
  IMAGE: "image",
  TEXT: "text",
  TESTING: "testing",
};

export const listElements = [
  { id: "text1", type: ELEMENT_ID.TEXT, position: { x: 50, y: 20 } },
  {
    id: "image1",
    type: ELEMENT_ID.IMAGE,
    src: "https://uploads.codesandbox.io/uploads/user/d50da8f7-f381-40cb-bf70-d315d1b42e4c/JJou-girl.webp",
    position: { x: 100, y: 300 },
    width: 230,
    height: 300,
  },
  {
    id: "image2",
    type: ELEMENT_ID.TESTING,
    src: "https://uploads.codesandbox.io/uploads/user/d50da8f7-f381-40cb-bf70-d315d1b42e4c/JJou-girl.webp",

    position: { x: 250, y: 200 },
    width: 200,
    height: 300,
  },
  {
    id: "circle1",
    type: ELEMENT_ID.CIRCLE,
    position: { x: 282, y: 120 },
    fill: "red",
    width: 100,
    height: 100,
  },
  {
    id: "rect1",
    type: ELEMENT_ID.RECT,
    position: { x: 200, y: 100 },
    fill: "red",
    width: 100,
    height: 150,
  },
];

export const BACKGROUND_APP = "#092DC5";

export const METHODS_APPROACH = {
  RAW: "raw",
  INTERPOLATION: "interpolation",
  FLEXIBLE: "flexible",
};
