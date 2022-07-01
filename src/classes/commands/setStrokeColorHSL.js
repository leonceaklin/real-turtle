import Command from '../constructors/drawingCommand';

import SetStrokeStyleCommand from './setStrokeStyle';

export default class SetStrokeColorHSLCommand extends Command {
  static params = { h: new Number(), s: 1, l: 0.5 };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    this.setStrokeStyleCommand = new SetStrokeStyleCommand({
      style: `hsl(${this.options.h}deg, ${this.options.s * 100}%, ${
        this.options.l * 100
      }%)`,
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
