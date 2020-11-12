import Command from "../constructors/drawingCommand";

import TurnCommand from "./turn";

export default class LeftCommand extends Command {
  static aliases = ["rt"];

  static params = { degrees: new Number() };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    this.turnCommand = new TurnCommand({ degrees: this.options.degrees });

    return this.turnCommand.estimateSuper(main);
  }

  prepare(main) {
    return this.turnCommand.prepareSuper(main);
  }

  async execute(progress) {
    return new Promise(async (resolve) => {
      await this.turnCommand.execute(progress);
      resolve();
    });
  }
}
