import Command from '../constructors/drawingCommand';

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

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      ctx.lineJoin = this.options.style;
      this.state.setLineJoin(this.options.style);
      resolve();
    });
  }
}
