import Command from "../constructors/drawingCommand";

export default class PenDownCommand extends Command {
  static params = {};

  static aliases = ["down"];

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
      this.state.setStrokeActive(true);
      resolve();
    });
  }
}
