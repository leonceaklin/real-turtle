import Logger from "./classes/internal/logger";
import TaskHandler from "./classes/internal/taskHandler";
import TurtleState from "./classes/internal/turtleState";

class Turtle {
  constructor(canvas, options) {
    //Generate canvas if given element is not one
    if (canvas.type != "canvas") {
      var canvasElement = document.createElement("canvas");
      canvas.appendChild(canvasElement);
      canvas = canvasElement;
    }

    this.options = options;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.logger = new Logger(this);
    this.state = new TurtleState(this);
    this.taskHandler = new TaskHandler(this);

    setTimeout(() => {
      this.taskHandler.executeTasks();
    }, 200);
  }

  turn(degrees) {
    this.taskHandler.addTask("turn", { degrees });
  }
}

export default Turtle;
