import Command from '../constructors/drawingCommand';

export default class SetSpeedCommand extends Command {
  static params = {
    speed: new Number(),
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
      this.state.setSpeed(this.options.speed);
      resolve();
    });
  }
}
