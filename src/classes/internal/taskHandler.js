import InternalClass from "../constructors/internalClass";

import Task from "./task.js";

export default class TaskHandler extends InternalClass {
  constructor(main) {
    super(main);
    this.tasks = [];
    this.ctx = this.main.ctx;
  }

  addTask(name, options) {
    this.tasks.push(new Task(name, options));
  }

  drawTurtle() {
    this.ctx.restore();
    var angleInRadians = this.main.state.rotation * (Math.PI / 180);

    var x = this.main.state.position.x;
    var y = this.main.state.position.y;
    var width = this.main.state.size;
    var height = this.main.state.size;
    var image = this.main.state.image.object;

    this.ctx.translate(x, y);
    this.ctx.rotate(angleInRadians);
    this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
    this.ctx.rotate(-angleInRadians);
    this.ctx.translate(-x, -y);
  }

  executeTasks() {
    this.drawTurtle();

    if (this.tasks.length == 0) {
      return false;
    }

    this.taskEstimationCallbacks = [];
    for (var i = 0; i < this.tasks.length; i++) {
      this.taskEstimationCallbacks.push(this.tasks[i].estimate(this.main));
    }

    console.log(this.taskEstimationCallbacks);

    this.executionFinished = false;

    this.executionStartTime = new Date().getTime();
    this.taskStartTime = this.executionStartTime;

    this.activeTaskKey = 0;
    this.activeTask = this.tasks[0];
    this.activeTaskEstimationCallback = this.taskEstimationCallbacks[0];
    this.activeTaskProgress = 0;

    this.canvasCache = null;

    this.activeTask.prepare(this.main);
    window.requestAnimationFrame(() => {
      this.executeDrawingStep();
    });
  }

  async executeDrawingStep() {
    var timeNow = new Date().getTime();

    if (this.activeTaskEstimationCallback.requiredTime == 0) {
      this.activeTaskProgress = 1;
    } else {
      this.activeTaskProgress =
        (timeNow - this.taskStartTime) /
        this.activeTaskEstimationCallback.requiredTime;
    }
    if (this.activeTaskProgress >= 1) {
      this.activeTaskProgress = 1;
    }

    if (this.canvasCache !== null) {
      this.ctx.drawImage(this.canvasCache, 0, 0);
    } else {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillRect(0, 0, this.main.canvas.width, this.main.canvas.height);
    }

    // Execute Task with progress
    await this.activeTask.execute(this.activeTaskProgress);

    // If task is finished now
    if (this.activeTaskProgress == 1) {
      this.cacheCanvas();

      if (this.activeTaskKey + 1 == this.tasks.length) {
        this.executionFinished = true;
        this.canvasCache = null;
      } else {
        this.activeTaskKey++;
        this.activeTask = this.tasks[this.activeTaskKey];
        this.activeTask.prepare(this.main);
        this.activeTaskEstimationCallback = this.taskEstimationCallbacks[
          this.activeTaskKey
        ];
        this.taskStartTime = new Date().getTime();
      }
    }

    this.drawTurtle();

    if (!this.executionFinished) {
      window.requestAnimationFrame(() => {
        this.executeDrawingStep();
      });
    }
  }

  cacheCanvas() {
    if (this.canvasCache == undefined) {
      this.canvasCache = document.createElement("canvas");
    }
    this.canvasCache.width = this.main.canvas.width;
    this.canvasCache.height = this.main.canvas.height;
    this.canvasCache.getContext("2d").drawImage(this.main.canvas, 0, 0);
  }
}
