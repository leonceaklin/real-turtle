import Command from "../constructors/drawingCommand";

export default class SetLineCapCommand extends Command {
  static params = {
    style: new String(),
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
      ctx.lineCap = this.options.style;
      this.state.setLineCap(this.options.style);
      resolve();
    });
  }
}
