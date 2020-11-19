import Command from "../constructors/drawingCommand";

export default class SetLineJoinCommand extends Command {
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
      this.state.setLineJoin(this.options.style);
      resolve();
    });
  }
}
