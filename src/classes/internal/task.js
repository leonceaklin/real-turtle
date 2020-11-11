import commandNames from "../../definitions/commandNames";

const commands = [];
for (var i = 0; i < commandNames.length; i++) {
  commands[commandNames[i]] = require("../commands/" + commandNames[i]).default;
}

export default class Task {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.setDrawingCommand();
  }

  estimate(main) {
    this.estimationCallback = this.drawingCommand.estimateSuper(main);
    return this.estimationCallback;
  }

  prepare(main) {
    this.preparationCallback = this.drawingCommand.prepareSuper(main);
    main.logger.add("Executing task with command: " + this.name, this.options);
    return this.preparationCallback;
  }

  async execute(progress) {
    return new Promise(async (resolve) => {
      await this.drawingCommand.execute(progress);
      resolve();
    });
  }

  setDrawingCommand() {
    this.drawingCommand = new commands[this.name](this.options);
  }
}
