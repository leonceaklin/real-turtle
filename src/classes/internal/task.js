import commandNames from "../../definitions/drawingCommandNames";

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

  prepare(main) {
    this.preparationCallback = this.drawingCommand.prepare();
    return this.preparationCallback;
  }

  setDrawingCommand() {
    this.drawingCommand = new commands[this.name]();
  }
}
