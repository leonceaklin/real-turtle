import Command from "../constructors/drawingCommand";

export default class ArcCommand extends Command {
  static params = {
    radius: new Number(),
    steps: new Number(),
    counterclockwise: false,
  };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime:
        (1 - this.main.state.speed) * Math.abs(this.options.steps) * 5,
    };
  }

  prepare(main) {
    if (this.options.counterclockwise == undefined) {
      this.options.counterclockwise = false;
    }

    this.arcCenter = 0;
  }

  async execute(progress) {
    return new Promise((resolve) => {
      var xNow = this.initialState.position.x + this.moveX * progress;
      var yNow = this.initialState.position.y + this.moveY * progress;

      if (this.state.strokeActive) {
        if (!this.state.pathActive) {
          this.ctx.beginPath();
        }

        this.ctx.moveTo(
          this.initialState.position.x,
          this.initialState.position.y
        );
        this.ctx.lineCap = this.state.lineCap;
        this.ctx.lineTo(xNow, yNow);
        this.ctx.strokeStyle = this.state.strokeStyle;
        this.ctx.lineWidth = this.state.lineWidth;
        this.ctx.stroke();
      }

      this.state.setPosition(xNow, yNow);
      resolve();
    });
  }
}
