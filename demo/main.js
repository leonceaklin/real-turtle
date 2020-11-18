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


var styleTag = document.createElement("style");
styleTag.type = "text/css"
styleTag.innerHTML = `
  html, body{
    margin: 0;
    padding: 0;
  }

  canvas{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

document.body.append(styleTag)
