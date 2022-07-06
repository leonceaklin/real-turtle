import Command from "../constructors/drawingCommand";

export default class ResetPositionCommand extends Command {
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
      this.state.resetPosition();
      resolve();
    });
  }
}
