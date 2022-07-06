import InternalClass from "../constructors/internalClass";

export default class TurtleState extends InternalClass {
  constructor(main) {
    super(main);

    var initialState = main.options.state;

    this.position = {
      x: initialState.position
        ? initialState.position.x
        : this.main.canvas.width / 2,
      y: initialState.position
        ? initialState.position.y
        : this.main.canvas.height / 2,
    };

    this.rotation = initialState.rotation ? initialState.rotation : 0;

    this.initialPosition = this.position;
    this.initialRotation = this.rotation;

    this.size = initialState.size;

    this.lineWidth = initialState.lineWidth;
    this.lineCap = initialState.lineCap;
    this.lineJoin = initialState.lineJoin;
    this.strokeStyle = initialState.strokeStyle;

    this.fillStyle = initialState.fillStyle;

    this.font = initialState.font;
    this.textBaseline = initialState.textBaseline;
    this.verticalAlign = initialState.verticalAlign;

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

  setInitialPosition(x, y) {
    this.initialPosition = { x, y };
  }

  setInitialRotation(deg) {
    this.initialRotation = deg;
  }

  resetPosition() {
    this.position = this.initialPosition;
    this.rotation = this.initialRotation;
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

  setLineJoin(value) {
    this.lineJoin = value;
  }

  setFont(value) {
    this.font = value;
  }

  setTextBaseline(value) {
    this.textBaseline = value;
  }

  setTextAlign(value) {
    this.textAlign = value;
  }

  async setImage(url) {
    return new Promise((resolve, reject) => {
      if (url == null || url == false || url == undefined) {
        resolve();
      } else {
        var image = new Image();
        image.onload = () => {
          this.image.object = image;
          this.imageSet = true;
          resolve();
        };

        image.onerror = (error) => {
          reject(error);
        };

        image.src = url;
        this.image.url = url;
      }
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
