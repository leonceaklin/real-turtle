let Turtle = window.Turtle.default;

let options = {
  speed: .1,
  verbose: true
};

let element = document.getElementById("canvas");

let turtle = new Turtle(element, options);
