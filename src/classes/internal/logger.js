import InternalClass from "../constructors/internalClass";

export default class Logger extends InternalClass {
  constructor(main) {
    super(main);

    this.log = [];
  }

  add(message, object) {
    this.log.push({ message: message, object: object });
    if (this.main.options.verbose) {
      if (object !== undefined) {
        console.log(message, object);
      } else {
        console.log(message);
      }
    }
  }
}
