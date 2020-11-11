import Command from "../constructors/drawingCommand";

export default class SetStrokeStyleCommand extends Command {
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

  async execute(progress) {
    return new Promise((resolve) => {
      this.state.setStrokeStyle(this.options.style);
      resolve();
    });
  }
}
