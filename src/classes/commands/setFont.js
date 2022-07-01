import Command from '../constructors/drawingCommand';

export default class SetFontCommand extends Command {
  static params = {
    font: new String(),
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
      this.state.setFont(this.options.font);
      resolve();
    });
  }
}
