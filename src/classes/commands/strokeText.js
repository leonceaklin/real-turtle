import Command from "../constructors/drawingCommand";

export default class StrokeTextCommand extends Command {
  static params = { text: new String() };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: (1 - this.main.state.speed) * this.options.text.length * 80,
    };
  }

  prepare(main) {}

  async execute(progress) {
    return new Promise((resolve) => {
      this.ctx.save();

      this.ctx.strokeStyle = this.state.strokeStyle;
      this.ctx.lineWidth = this.state.lineWidth;
      this.ctx.lineCap = this.state.lineCap;

      this.ctx.textAlign = this.state.textAlign;
      this.ctx.textBaseline = this.state.textBaseline;
      this.ctx.font = this.state.font;

      var chars = Math.ceil(this.options.text.length * progress);
      var text = this.options.text.substring(0, chars);

      this.ctx.translate(this.state.position.x, this.state.position.y);
      this.ctx.rotate((this.state.rotation - 90) * (Math.PI / 180));

      this.ctx.strokeText(text, 0, 0);
      this.ctx.restore();
      resolve();
    });
  }
}
