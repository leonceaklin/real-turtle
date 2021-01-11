import InternalClass from "../constructors/internalClass";

import Task from "./task.js";

export default class TaskHandler extends InternalClass {
  constructor(main) {
    super(main);
    this.tasks = [];
    this.ctx = this.main.ctx;

    this.isExecuting = false;
  }

  addTask(name, options) {
    this.tasks.push(new Task(name, options));
  }

  drawTurtle() {
    if (this.main.state.size == 0) {
      return;
    }

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
    if (this.isExecuting) {
      return false;
    }

    this.isExecuting = true;
    this.drawTurtle();

    if (this.tasks.length == 0) {
      return false;
    }

    this.taskEstimationCallbacks = [];
    for (var i = 0; i < this.tasks.length; i++) {
      this.taskEstimationCallbacks.push(this.tasks[i].estimate(this.main));
    }

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
    // Calculate progress
    if (this.main.state.speed < 1) {
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
    }

    // Cache Canvas
    if (this.canvasCache !== null) {
      this.ctx.drawImage(this.canvasCache, 0, 0);
    } else {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillRect(0, 0, this.main.canvas.width, this.main.canvas.height);
    }

    this.ctx.restore();

    // Execute command

    // Await with speed lower than 1 (process)
    if (this.main.state.speed < 1) {
      await this.activeTask.execute(this.activeTaskProgress);
    }

    // No waiting with speed 1
    else {
      this.activeTask.execute(1);
    }

    this.ctx.save();

    // If task is finished now
    if (this.activeTaskProgress == 1) {
      await this.cacheCanvas();

      if (this.activeTaskKey + 1 == this.tasks.length) {
        this.executionFinished = true;
        this.isExecuting = false;
        this.canvasCache = null;
      } else {
        this.activeTaskKey++;
        this.activeTask = this.tasks[this.activeTaskKey];
        this.activeTaskEstimationCallback = this.activeTask.estimate(this.main);
        this.activeTask.prepare(this.main);

        /* old version
        this.activeTaskEstimationCallback = this.taskEstimationCallbacks[
          this.activeTaskKey
        ];
        */
        this.taskStartTime = new Date().getTime();
      }
    }

    this.drawTurtle();

    if (!this.executionFinished) {
      if (this.main.state.speed < 1) {
        window.requestAnimationFrame(() => {
          this.executeDrawingStep();
        });
      } else {
        this.executeDrawingStep();
      }
    }
  }

  async cacheCanvas() {
    return new Promise((resolve) => {
      if (this.canvasCache == undefined) {
        this.canvasCache = document.createElement("canvas");
      }
      this.canvasCache.width = this.main.canvas.width;
      this.canvasCache.height = this.main.canvas.height;
      this.canvasCache.getContext("2d").drawImage(this.main.canvas, 0, 0);
      resolve();
    });
  }
}
