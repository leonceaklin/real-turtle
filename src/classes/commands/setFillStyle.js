import Command from '../constructors/drawingCommand';

export default class SetFillStyleCommand extends Command {
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
      this.state.setFillStyle(this.options.style);
      resolve();
    });
  }
}
