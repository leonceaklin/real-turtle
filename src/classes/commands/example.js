import Command from "../constructors/drawingCommand";

export default class ExampleCommand extends Command {
  static params = { parameter: new String() };
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
      resolve();
    });
  }
}
