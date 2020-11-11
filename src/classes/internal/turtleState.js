import InternalClass from "../constructors/internalClass";

export default class TurtleState extends InternalClass {
  constructor(main) {
    super(main);

    this.position = {
      x: this.main.canvas.width/2,
      y: this.main.canvas.height/2
    }

    this.rotation = 0
    this.strokeWidth = 1
    this.strokeColor = "black"
  }

  setPosition(x, y){
    this.position = {x,y}
  }
}
