let Turtle = window.Turtle.default;

let options = {
  verbose: true,
  autoStart: true,
  state: {
    speed: 0.5
  }
};

let element = document.getElementById("canvas");

let turtle = new Turtle(element, options);
