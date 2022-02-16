import Command from "../constructors/drawingCommand";

export default class ClosePathCommand extends Command {
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
      ctx.closePath();
      this.state.setPathActive(false);
      resolve();
    });
  }
}
