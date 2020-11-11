let Turtle = window.Turtle.default;

let options = {
  verbose: true,
  autoStart: true
};

let element = document.getElementById("canvas");

let turtle = new Turtle(element, options);
