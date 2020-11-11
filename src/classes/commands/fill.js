import Command from "../constructors/drawingCommand";

export default class FillCommand extends Command {
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

  async execute(progress) {
    return new Promise((resolve) => {
      this.ctx.fill();
      resolve();
    });
  }
}
