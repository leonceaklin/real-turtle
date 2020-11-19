import Command from "../constructors/drawingCommand";

export default class TurnCommand extends Command {
  static params = { degrees: new Number() };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime:
        (1 - this.main.state.speed) * Math.abs(this.options.degrees) * 6,
    };
  }

  prepare(main) {}

  async execute(progress) {
    return new Promise((resolve) => {
      this.state.setRotation(
        this.initialState.rotation + this.options.degrees * progress
      );
      resolve();
    });
  }
}
