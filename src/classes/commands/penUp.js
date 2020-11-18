import Command from "../constructors/drawingCommand";

export default class PenUpCommand extends Command {
  static params = {};

  static aliases = ["up"];

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
      this.state.setStrokeActive(false);
      resolve();
    });
  }
}
