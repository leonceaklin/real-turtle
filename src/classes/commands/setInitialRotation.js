import Command from '../constructors/drawingCommand';

export default class SetInitialRotationCommand extends Command {
  static params = { degrees: new Number() };

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
      this.state.setInitialRotation(this.options.degrees);
      resolve();
    });
  }
}
