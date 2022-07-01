import Command from '../constructors/drawingCommand';

export default class SetInitialPositionCommand extends Command {
  static params = { x: new Number(), y: new Number() };
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
      this.state.setInitialPosition(this.options.x, this.options.y);
      resolve();
    });
  }
}
