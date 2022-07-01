import Command from '../constructors/drawingCommand';

export default class SetTextAlignCommand extends Command {
  static params = {
    align: new String(),
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
      this.state.setTextAlign(this.options.align);
      resolve();
    });
  }
}
