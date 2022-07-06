import Command from "../constructors/drawingCommand";

import MoveCommand from "./move";

export default class BackCommand extends Command {
  static aliases = ["bk"];

  static params = { steps: new Number() };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    this.moveCommand = new MoveCommand({ steps: -this.options.steps });

    return this.moveCommand.estimateSuper(main);
  }

  prepare(main) {
    return this.moveCommand.prepareSuper(main);
  }

  async execute(progress, ctx) {
    return new Promise(async (resolve) => {
      await this.moveCommand.execute(progress, ctx);
      resolve();
    });
  }
}
