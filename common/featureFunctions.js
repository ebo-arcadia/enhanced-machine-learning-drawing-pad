if (typeof geometry === "undefined") {
  geometry = require("./geometry.js");
}
if (typeof draw === "undefined") {
  draw = require("./draw.js");
}

const featureFunctions = {};

featureFunctions.getPathCount = (paths) => {
  return paths.length;
};

featureFunctions.getPointCount = (paths) => {
  const points = paths.flat();
  return points.length;
};

featureFunctions.getWidth = (paths) => {
  const points = paths.flat();
  const x = points.map((p) => p[0]);
  const min = Math.min(...x);
  const max = Math.max(...x);
  return max - min;
};

featureFunctions.getHeight = (paths) => {
  const points = paths.flat();
  const y = points.map((p) => p[1]);
  const min = Math.min(...y);
  const max = Math.max(...y);
  return max - min;
};

featureFunctions.getElongation = (paths) => {
  const points = paths.flat();
  const { width, height } = geometry.minimumBoundingBox({ points });
  return (Math.max(width, height) + 1) / (Math.min(width, height) + 1);
};

featureFunctions.getRoundness = (paths) => {
  const points = paths.flat();
  const { hull } = geometry.minimumBoundingBox({ points });
  return geometry.roundness(hull);
};

featureFunctions.getPixels = (paths, size = 400) => {
  let canvas = null;
  try {
    // for web
    canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
  } catch (error) {
    // for node
    const { createCanvas } = require("../node/node_modules/canvas");
    canvas = createCanvas(size, size);
  }

  const ctx = canvas.getContext("2d");

  draw.paths(ctx, paths);

  const imgData = ctx.getImageData(0, 0, size, size);
  return imgData.data.filter((val, index) => index % 4 == 3);
};

featureFunctions.inUse = [
  //{name:"Path Count",function:featureFunctions.getPathCount},
  //{name:"Point Count",function:featureFunctions.getPointCount},
  { name: "Width", function: featureFunctions.getWidth },
  { name: "Height", function: featureFunctions.getHeight },
  { name: "Elongation", function: featureFunctions.getElongation },
  { name: "Roundness", function: featureFunctions.getRoundness },
];

if (typeof module !== "undefined") {
  module.exports = featureFunctions;
}
