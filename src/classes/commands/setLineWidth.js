import Command from "../constructors/drawingCommand";

export default class SetLineWidthCommand extends Command {
  static params = {
    width: new Number(),
  };

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
      this.state.setLineWidth(this.options.width);
      resolve();
    });
  }
}
