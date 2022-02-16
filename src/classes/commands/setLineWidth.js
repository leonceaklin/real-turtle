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

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      ctx.lineWidth = this.options.width;
      this.state.setLineWidth(this.options.width);
      resolve();
    });
  }
}
