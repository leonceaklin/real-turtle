import Command from '../constructors/drawingCommand';

export default class SetPositionCommand extends Command {
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
      var xNow = this.options.x + this.initialState.position.x * (1 - progress);
      var yNow = this.options.y + this.initialState.position.y * (1 - progress);

      this.state.setPosition(xNow, yNow);
      resolve();
    });
  }
}
