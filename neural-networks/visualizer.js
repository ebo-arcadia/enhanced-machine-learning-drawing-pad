class Visualizer {
  static drawNetwork(ctx, network) {
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width - margin * 2;
    const height = ctx.canvas.height - margin * 2;

    Visualizer.drawLevel(ctx, network.levels[0], left, top, width, height);
  }

  static drawLevel(ctx, level, left, top, width, height) {
    const right = left + width;
    const bottom = top + height;

    const { inputs, outputs } = level;
    const nodeRadius = 18;
    for (let i = 0; i < inputs.length; i++) {
      const x = lerp(
        left,
        right,
        inputs.length == 1 ? 0.5 : i / (inputs.length - 1)
      );
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    for (let i = 0; i < outputs.length; i++) {
      const x = lerp(
        left,
        right,
        inputs.length == 1 ? 0.5 : i / (outputs.length - 1)
      );
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
}
