export default class Command {
  constructor(options) {
    this.options = options;
    this.isPrepared = false;
  }

  prepareSuper(main) {
    this.defineObjects(main);
    this.initialState = main.state.getCurrent();
    this.isPrepared = true;
    return this.prepare(main);
  }

  estimateSuper(main) {
    this.defineObjects(main);
    return this.estimate(main);
  }

  defineObjects(main) {
    this.main = main;
    this.ctx = main.ctx;
    this.canvas = main.canvas;
    this.logger = main.logger;
    this.state = main.state;
  }
}
