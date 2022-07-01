import Command from '../constructors/drawingCommand';

export default class SetTextBaselineCommand extends Command {
  static params = {
    baseline: new String(),
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
      this.state.setTextBaseline(this.options.baseline);
      resolve();
    });
  }
}
