import Command from '../constructors/drawingCommand';

export default class EvalCommand extends Command {
  static params = { func: new Function() };
  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: 0,
    };
  }

  prepare(main) {
    this.executed = false;
  }

  async execute(progress, ctx) {
    return new Promise(async (resolve) => {
      if (!this.executed) {
        await this.options.func();
      }
      this.executed = true;
      resolve();
    });
  }
}
