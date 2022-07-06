import Command from "../constructors/drawingCommand";

export default class StrokeCommand extends Command {
  static params = {};

  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: (1 - this.main.state.speed) * 500,
    };
  }

  prepare(main) {}

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      if (progress == 1) {
        ctx.globalAlpha = 1;
        ctx.stroke();
        resolve();
      } else {
        ctx.clearRect(
          0,
          0,
          this.main.taskHandler.canvas.width,
          this.main.taskHandler.canvas.height
        );
        ctx.globalAlpha = 1 - progress;
        ctx.drawImage(this.main.taskHandler.previousCanvas, 0, 0);
        ctx.globalAlpha = progress;
        ctx.drawImage(this.main.taskHandler.cacheCanvas, 0, 0);
        ctx.globalAlpha = 1;
        resolve();
      }
    });
  }
}
