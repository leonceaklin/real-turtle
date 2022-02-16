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

  async execute(progress, ctx) {
    return new Promise((resolve) => {
      ctx.save();

      ctx.fillStyle = this.state.fillStyle;
      ctx.textAlign = this.state.textAlign;
      ctx.textBaseline = this.state.textBaseline;
      ctx.font = this.state.font;

      var chars = Math.ceil(this.options.text.length * progress);
      var text = this.options.text.substring(0, chars);

      ctx.translate(this.state.position.x, this.state.position.y);
      ctx.rotate((this.state.rotation - 90) * (Math.PI / 180));

      ctx.fillText(text, 0, 0);
      ctx.restore();
      resolve();
    });
  }
}
