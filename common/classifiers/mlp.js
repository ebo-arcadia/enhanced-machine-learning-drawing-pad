const NeuralNetwork = require("../network.js");

if (typeof NeuralNetwork === "undefined") {
  utils = require("../network.js");
}

class MLP {
  constructor(neuronCounts, classes) {
    this.neuronCounts = neuronCounts;
    this.classes = classes;
    this.network = new NeuralNetwork(neuronCounts);
  }
  predict(point) {
    const output = NeuralNetwork.feedForward(point, this.network);
    const max = Math.max(...output);
    const index = output.indexOf(max);
    const label = this.classes[index];
    return { label };
  }
}

if (typeof module !== "undefined") {
  module.exports = MLP;
}
