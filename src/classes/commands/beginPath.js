import Command from '../constructors/drawingCommand';

export default class BeginPathCommand extends Command {
  static params = {};

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
      ctx.beginPath();
      ctx.moveTo(this.initialState.position.x, this.initialState.position.y);
      this.state.setPathActive(true);
      resolve();
    });
  }
}
