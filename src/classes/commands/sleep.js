import Command from "../constructors/drawingCommand";

export default class SleepCommand extends Command {
  static params = { milliseconds: new Number() };
  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: this.options.milliseconds,
    };
  }

  prepare(main) {}

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
