import Command from '../constructors/drawingCommand';

import SetStrokeStyleCommand from './setStrokeStyle';

export default class SetStrokeColorRGBCommand extends Command {
  static params = { r: new Number(), g: new Number(), b: new Number() };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    this.setStrokeStyleCommand = new SetStrokeStyleCommand({
      style: `rgb(${this.options.r}, ${this.options.g}, ${this.options.b})`,
    });

    return this.setStrokeStyleCommand.estimateSuper(main);
  }

  prepare(main) {
    return this.setStrokeStyleCommand.prepareSuper(main);
  }

  async execute(progress, ctx) {
    return new Promise(async (resolve) => {
      await this.setStrokeStyleCommand.execute(progress, ctx);
      resolve();
    });
  }
}
