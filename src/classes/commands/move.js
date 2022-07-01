import Command from '../constructors/drawingCommand';

export default class MoveCommand extends Command {
  static params = { steps: new Number() };
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
    this.moveX =
      Math.cos(((this.state.rotation - 90) * Math.PI) / 180) *
      this.options.steps;
    this.moveY =
      Math.sin(((this.state.rotation - 90) * Math.PI) / 180) *
      this.options.steps;
  }

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      var xNow = this.initialState.position.x + this.moveX * progress;
      var yNow = this.initialState.position.y + this.moveY * progress;

      if (!this.state.pathActive) {
        ctx.beginPath();
        ctx.moveTo(this.initialState.position.x, this.initialState.position.y);
      }

      ctx.lineTo(xNow, yNow);

      if (this.state.strokeActive) {
        ctx.stroke();
      }

      if (!this.state.pathActive) {
        ctx.closePath();
      }

      this.state.setPosition(xNow, yNow);
      resolve();
    });
  }
}
