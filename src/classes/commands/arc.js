import Command from "../constructors/drawingCommand";

export default class ArcCommand extends Command {
  static params = {
    radius: new Number(),
    angle: new Number(),
    counterclockwise: false,
  };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    var requiredTime =
      (((1 - this.main.state.speed) * Math.abs(this.options.angle)) / 360) *
      Math.PI *
      2 *
      this.options.radius *
      5;

    return {
      requiredTime: requiredTime,
    };
  }

  prepare(main) {
    if (this.options.counterclockwise == undefined) {
      this.options.counterclockwise = false;
    }

    var sideVariable = 90;
    if (this.options.counterclockwise) {
      sideVariable = -sideVariable;
    }

    this.arcCenterX =
      this.initialState.position.x +
      Math.sin((this.initialState.rotation + sideVariable) * (Math.PI / 180)) *
        this.options.radius;

    this.arcCenterY =
      this.initialState.position.y +
      Math.cos((this.initialState.rotation + sideVariable) * (Math.PI / 180)) *
        this.options.radius *
        -1 /* because the canvas coordinate system is different*/;

    this.arcStartAngle =
      (this.options.counterclockwise ? 0 : 180) + this.initialState.rotation;
  }

  async execute(progress) {
    return new Promise((resolve) => {
      var currentAngle =
        this.arcStartAngle +
        this.options.angle *
          progress *
          (this.options.counterclockwise ? -1 : 1);

      var xNow =
        this.arcCenterX +
        Math.cos(currentAngle * (Math.PI / 180)) * this.options.radius;
      var yNow =
        this.arcCenterY +
        Math.sin(currentAngle * (Math.PI / 180)) * this.options.radius;

      if (this.state.strokeActive) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.state.strokeStyle;
        this.ctx.lineWidth = this.state.lineWidth;
        this.ctx.lineCap = this.state.lineCap;

        this.ctx.arc(
          this.arcCenterX,
          this.arcCenterY,
          this.options.radius,
          this.arcStartAngle * (Math.PI / 180),
          currentAngle * (Math.PI / 180),
          this.options.counterclockwise
        );

        this.state.setPosition(xNow, yNow);
        this.state.setRotation(
          currentAngle - (this.options.counterclockwise ? 0 : 180)
        );

        this.ctx.stroke();
      }

      resolve();
    });
  }
}
