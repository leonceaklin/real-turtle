import Command from "../constructors/drawingCommand";

export default class FillTextCommand extends Command {
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

      this.ctx.fillStyle = this.state.fillStyle;
      this.ctx.textAlign = this.state.textAlign;
      this.ctx.textBaseline = this.state.textBaseline;
      this.ctx.font = this.state.font;

      var chars = Math.ceil(this.options.text.length * progress);
      var text = this.options.text.substring(0, chars);

      this.ctx.translate(this.state.position.x, this.state.position.y);
      this.ctx.rotate((this.state.rotation - 90) * (Math.PI / 180));

      this.ctx.fillText(text, 0, 0);
      this.ctx.restore();
      resolve();
    });
  }
}
