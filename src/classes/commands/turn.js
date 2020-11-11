import Command from "../constructors/drawingCommand";

export default class TurnCommand extends Command {
  constructor(options) {
    super(options);
  }

  prepare(main) {
    this.main = main;
    return { requiredTime: 1000 };
  }

  execute(progress) {}
}
