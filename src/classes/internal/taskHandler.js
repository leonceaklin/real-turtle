import InternalClass from "../constructors/internalClass";

import Task from "./task.js";

export default class TaskHandler extends InternalClass {
  constructor(main) {
    super(main);
    this.tasks = [];
  }

  addTask(name, options) {
    this.tasks.push(new Task(name, options));
    this.logger.add(`Added Task ${name}`, options);
  }

  executeTasks() {
    this.preparationCallbacks = [];
    for (var i = 0; i < this.tasks.length; i++) {
      preparationCallbacks.push(this.tasks[i].prepare(this.main));
    }
    this.executionStartTime = new Date().getTime();
    this.activeTaskKey = 0;
    window.requestAnimationFrame(this.executeDrawingStep());
  }

  executeDrawingStep() {
    window.requestAnimationFrame(this.executeDrawingStep());
  }
}
