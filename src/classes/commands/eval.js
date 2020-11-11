import Command from "../constructors/drawingCommand";

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

  prepare(main) {}

  async execute(progress) {
    return new Promise(async (resolve) => {
      await this.options.func();
      resolve();
    });
  }
}
