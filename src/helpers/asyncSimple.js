let RealTurtle = window.RealTurtle.default;

let options = {
  verbose: false,
  async: true,
  state: {
    speed: 0.5,
  },
};

var element = document.getElementById("real-turtle");

if (element == undefined) {
  element = document.createElement("canvas");
  element.id = "real-turtle";
  document.body.append(element);
  console.warn(
    "Turtle helper could not find an existing canvas element. Created a custom one",
    element
  );
}

if (
  element.getAttribute("width") == undefined ||
  element.getAttribute("height") == undefined
) {
  element.width = window.innerWidth;
  element.height = window.innerHeight;
}

window.turtle = new RealTurtle(element, options);

var styleTag = document.createElement("style");
styleTag.type = "text/css";
styleTag.innerHTML = `
  html, body{
    margin: 0;
    padding: 0;
  }

  #real-turtle, #real-turtle canvas{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

document.body.append(styleTag);
