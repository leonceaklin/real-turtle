export default class InternalClass {
  constructor(main) {
    this.main = main;
    this.logger = main.logger;
    this.taskHandler = main.taskHandler;
    this.turtleState = main.turtleState;
  }
}
