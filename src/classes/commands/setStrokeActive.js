import Command from "../constructors/drawingCommand";

export default class SetStrokeActiveCommand extends Command {
  static params = {
    boolean: new Boolean(),
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

  async execute(progress) {
    return new Promise((resolve) => {
      this.state.setStrokeActive(this.options.boolean);
      resolve();
    });
  }
}
