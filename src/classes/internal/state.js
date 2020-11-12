import InternalClass from "../constructors/internalClass";

export default class TurtleState extends InternalClass {
  constructor(main) {
    super(main);

    this.position = {
      x: this.main.canvas.width / 2,
      y: this.main.canvas.height / 2,
    };

    var initialState = main.options.state;

    this.rotation = 0;
    this.size = initialState.size;

    this.lineWidth = initialState.lineWidth;
    this.lineCap = initialState.lineCap;
    this.strokeStyle = initialState.strokeStyle;

    this.fillStyle = initialState.fillStyle;

    this.strokeActive = true;
    this.pathActive = false;

    this.speed = initialState.speed;
    this.image = { url: null, object: null };
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  setRotation(deg) {
    this.rotation = deg;
  }

  setSize(size) {
    this.size = size;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setStrokeActive(value) {
    this.strokeActive = value;
  }

  setPathActive(value) {
    this.pathActive = value;
  }

  setFillStyle(value) {
    this.fillStyle = value;
  }

  setStrokeStyle(value) {
    this.strokeStyle = value;
  }

  setLineWidth(value) {
    this.lineWidth = value;
  }

  setLineCap(value) {
    this.lineCap = value;
  }

  async setImage(url) {
    return new Promise((resolve) => {
      var image = new Image();

      image.onload = () => {
        this.image.object = image;
        resolve();
      };

      image.src = url;
      this.image.url = url;
    });
  }

  getCurrent() {
    return JSON.parse(
      JSON.stringify({
        position: this.position,
        rotation: this.rotation,
        size: this.size,
        lineWidth: this.lineWidth,
        strokeStyle: this.strokeStyle,
        fillStyle: this.fillStyle,
        strokeActive: this.strokeActive,
        pathActive: this.pathActive,
        image: this.image,
      })
    );
  }
}
