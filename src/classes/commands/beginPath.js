import Command from "../constructors/drawingCommand";

export default class BeginPathCommand extends Command {
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
      this.ctx.beginPath();
      this.state.setPathActive(true);
      resolve();
    });
  }
}
