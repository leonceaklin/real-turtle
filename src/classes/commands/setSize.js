import Command from "../constructors/drawingCommand";

export default class SetSizeCommand extends Command {
  static params = { size: new Number() };
  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: (1 - this.state.speed) * 500,
    };
  }

  prepare(main) {
    this.sizeDifference = this.options.size - this.initialState.size;
  }

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      this.state.setSize(
        this.initialState.size + this.sizeDifference * progress
      );
      resolve();
    });
  }
}
