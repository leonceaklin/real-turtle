import Command from "../constructors/drawingCommand";

export default class ClearCommand extends Command {
  static params = {};

  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: 0,
    };
  }

  prepare(main) {}

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      resolve();
    });
  }
}
