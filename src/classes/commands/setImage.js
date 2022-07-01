import Command from '../constructors/drawingCommand';

export default class SetImageCommand extends Command {
  static params = {
    url: new String(),
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
    return new Promise(async (resolve) => {
      await this.state.setImage(this.options.url);
      resolve();
    });
  }
}
