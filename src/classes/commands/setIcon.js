import Command from "../constructors/drawingCommand";

export default class SetIconCommand extends Command {
  static params = {
    icon: new String(),
  };

  constructor(options) {
    super(options);
  }

  estimate(main) {
    return {
      requiredTime: 0,
    };
  }

  prepare(main) {}

  async execute(progress, ctx) {
    return new Promise(async (resolve) => {
      var icon = this.options.icon;

      var imageCanvas = document.createElement("canvas");
      var ctx = imageCanvas.getContext("2d");
      imageCanvas.width = imageCanvas.height = 500;
      ctx.textAlign = "center";
      ctx.font = imageCanvas.height * 0.9 + "px monospace";
      ctx.fillText(icon, imageCanvas.width / 2, imageCanvas.height * 0.9);

      var image = imageCanvas.toDataURL();

      await this.state.setImage(image);
      resolve();
    });
  }
}
