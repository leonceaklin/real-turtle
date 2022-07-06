import RealTurtle from "../src/index";

import commandNames from "../src/definitions/commandNames";
import standardOptions from "../src/definitions/standardOptions";

describe("Definitions are formatted correctly, which means", () => {
  test("commandNames.js exports an array", () => {
    expect(Array.isArray(commandNames)).toBe(true);
  });

  test("standardOptions.js exports an object which has a state object", () => {
    expect(typeof standardOptions === "object").toBe(true);
    expect(typeof standardOptions.state === "object").toBe(true);
  });
});

//Basic tests
describe("A turtle instance can be created", () => {
  test("in normal mode", () => {
    var turtle = new RealTurtle();
    expect(turtle).toBeInstanceOf(RealTurtle);
  });

  test("in async mode", () => {
    var turtle = new RealTurtle(undefined, { async: true });
    expect(turtle).toBeInstanceOf(RealTurtle);
  });
});

const initialState = {
  position: { x: 500, y: 500 },
  rotation: 0,
  size: 10,
  speed: 1,
};

function createCanvas() {
  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  document.body.appendChild(canvas);
}

function createNormalTurtle() {
  var turtle = new RealTurtle(createCanvas(), {
    async: false,
    image: false,
    state: initialState,
  });
  return turtle;
}

function createSlowNormalTurtle() {
  var turtle = new RealTurtle(createCanvas(), {
    async: false,
    image: false,
    verbose: true,
    state: { ...initialState, speed: 0.9 },
  });
  return turtle;
}

function createAsyncTurtle() {
  var turtle = new RealTurtle(createCanvas(), {
    autoStart: false,
    async: true,
    image: false,
    state: initialState,
  });
  return turtle;
}

//Basic function tests
describe("The turtle can", () => {
  test("move forward", async () => {
    var turtle = createNormalTurtle();
    await turtle.forward(100).start();

    //Position check
    expect(turtle.state.position.x).toBe(500);
    expect(turtle.state.position.y).toBe(400);

    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("move back", async () => {
    var turtle = createNormalTurtle();
    await turtle.back(100).start();

    //Position check
    expect(turtle.state.position.x).toBe(500);
    expect(turtle.state.position.y).toBe(600);

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("turn left", async () => {
    var turtle = createNormalTurtle();
    await turtle.left(90).start();

    //Rotation check
    expect(turtle.state.rotation).toBe(-90);
  });

  test("turn right", async () => {
    var turtle = createNormalTurtle();
    await turtle.right(90).start();

    //Rotation check
    expect(turtle.state.rotation).toBe(90);
  });

  test("draw an arc clockwise", async () => {
    var turtle = createNormalTurtle();
    await turtle.arc(100, 180).start();

    //Position check
    expect(turtle.state.position.x).toBe(700);
    expect(turtle.state.position.y).toBe(500);
    expect(turtle.state.rotation).toBe(180);

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("draw an arc counterclockwise", async () => {
    var turtle = createNormalTurtle();
    await turtle.arc(100, 180, true).start();

    //Position check
    expect(turtle.state.position.x).toBe(300);
    expect(turtle.state.position.y).toBe(500);
    expect(turtle.state.rotation).toBe(-180);

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("write filled text", async () => {
    var turtle = createNormalTurtle();
    await turtle.fillText("Hello World").start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("write outlined text", async () => {
    var turtle = createNormalTurtle();
    await turtle.strokeText("Hello World").start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("fill the canvas", async () => {
    var turtle = createNormalTurtle();
    await turtle.fillCanvas().start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("clear the canvas", async () => {
    var turtle = createNormalTurtle();
    await turtle.clear().start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("set the pen up", async () => {
    var turtle = createNormalTurtle();
    await turtle.penUp().start();
    expect(turtle.state.strokeActive).toBe(false);
  });

  test("set the pen down", async () => {
    var turtle = createNormalTurtle();
    await turtle.penDown().start();
  });

  test("use eval", async () => {
    var turtle = createSlowNormalTurtle();
    var y = turtle.state.position.y;
    await turtle
      .forward(100)
      .eval(() => {
        y = turtle.state.position.y;
      })
      .start();

    expect(y).toBe(400);
  });

  test("set the stroke style", async () => {
    var turtle = createNormalTurtle();
    await turtle.setStrokeStyle("#FF0000").start();
  });

  test("set the stroke color by RGB", async () => {
    var turtle = createNormalTurtle();
    await turtle.setStrokeColorRGB(100, 200, 255).start();
    expect(turtle.state.strokeStyle).toBe("rgb(100, 200, 255)");
  });

  test("set the stroke color by HSL", async () => {
    var turtle = createNormalTurtle();
    await turtle.setStrokeColorHSL(90, 0.5, 1).start();
    expect(turtle.state.strokeStyle).toBe("hsl(90deg, 50%, 100%)");
  });

  test("set the fill style", async () => {
    var turtle = createNormalTurtle();
    await turtle.setFillStyle("#FF0000").start();
    expect(turtle.state.fillStyle).toBe("#FF0000");
  });

  test("set the line width", async () => {
    var turtle = createNormalTurtle();
    await turtle.setLineWidth(100).start();
    expect(turtle.state.lineWidth).toBe(100);
    expect(turtle.ctx.lineWidth).toBe(100);
  });

  test("set the style of line joins", async () => {
    var turtle = createNormalTurtle();
    await turtle.setLineJoin("round").start();
    expect(turtle.state.lineJoin).toBe("round");
    expect(turtle.ctx.lineJoin).toBe("round");
  });

  test("set the style of line caps", async () => {
    var turtle = createNormalTurtle();
    await turtle.setLineCap("round").start();
    expect(turtle.state.lineCap).toBe("round");
    expect(turtle.ctx.lineCap).toBe("round");
  });

  test("set the font used for filled and outlined text", async () => {
    var turtle = createNormalTurtle();
    await turtle.setFont("20px monospace").start();
    expect(turtle.state.font).toBe("20px monospace");
  });

  test("set the align for filled and outlined text", async () => {
    var turtle = createNormalTurtle();
    await turtle.setTextAlign("center").start();
    expect(turtle.state.textAlign).toBe("center");
  });

  test("set the baseline for filled and outlined text", async () => {
    var turtle = createNormalTurtle();
    await turtle.setTextBaseline("top").start();
    expect(turtle.state.textBaseline).toBe("top");
  });

  test("be moved to a certain position", async () => {
    var turtle = createNormalTurtle();
    await turtle.setPosition(100, 200).start();
    expect(turtle.state.position.x).toBe(100);
    expect(turtle.state.position.y).toBe(200);
  });

  test("be moved to its original position after moving forward", async () => {
    var turtle = createNormalTurtle();
    await turtle.forward(100).resetPosition().start();
    expect(turtle.state.position.x).toBe(500);
    expect(turtle.state.position.y).toBe(500);
  });

  test("begin a path", async () => {
    var turtle = createNormalTurtle();
    await turtle.beginPath().start();
    expect(turtle.state.pathActive).toBe(true);
  });

  test("close a path after having begun one", async () => {
    var turtle = createNormalTurtle();
    await turtle.beginPath().closePath().start();
    expect(turtle.state.pathActive).toBe(false);
  });

  test("execute the .fill command", async () => {
    var turtle = createNormalTurtle();
    await turtle.fill().start();
  });

  test("execute the .stroke command", async () => {
    var turtle = createNormalTurtle();
    await turtle.fill().start();
  });

  test("change its size", async () => {
    var turtle = createNormalTurtle();
    await turtle.setSize(100).start();
    expect(turtle.state.size).toBe(100);
  });

  test("change its speed", async () => {
    var turtle = createNormalTurtle();
    await turtle.setSpeed(0.2).start();
    expect(turtle.state.speed).toBe(0.2);
  });

  test("set its strokeActive state", async () => {
    var turtle = createNormalTurtle();
    await turtle.setStrokeActive(false).start();
    expect(turtle.state.strokeActive).toBe(false);
  });

  test("reset its initial position value", async () => {
    var turtle = createNormalTurtle();
    await turtle.setInitialPosition(200, 100).start();
    expect(turtle.state.initialPosition.x).toBe(200);
    expect(turtle.state.initialPosition.y).toBe(100);
  });

  test("reset its initial rotation value", async () => {
    var turtle = createNormalTurtle();
    await turtle.setInitialRotation(90).start();
    expect(turtle.state.initialRotation).toBe(90);
  });
});

//Advanced drawing tests
describe("The turtle passes advanced drawing tests like", () => {
  test("clearing the canvas correctly after drawing on it", async () => {
    var turtle = createNormalTurtle();
    await turtle.forward(100).clear().start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("drawing a line after moving away from the origin using .penUp and .penDown", async () => {
    var turtle = createNormalTurtle();
    await turtle.penUp().forward(100).penDown().forward(100).start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("drawing a diagonal line", async () => {
    var turtle = createNormalTurtle();
    await turtle.left(180).right(225).forward(100).start();

    //Position check
    expect(turtle.state.position.x).toBeCloseTo(500 + 70.71);
    expect(turtle.state.position.y).toBeCloseTo(500 - 70.71);

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("closing a path using .stroke", async () => {
    var turtle = createNormalTurtle();
    await turtle
      .beginPath()
      .forward(100)
      .right(90)
      .forward(100)
      .closePath()
      .stroke()
      .start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("closing a path using .stroke with a fade animation at slower speeds", async () => {
    var turtle = createSlowNormalTurtle();
    await turtle
      .beginPath()
      .forward(100)
      .right(90)
      .forward(100)
      .closePath()
      .stroke()
      .start();
    //No canvas check here, because the mock outputs a slightly different path on every execution
  });

  test("drawing a filled shape", async () => {
    var turtle = createNormalTurtle();
    await turtle
      .beginPath()
      .forward(100)
      .right(90)
      .forward(100)
      .left(90)
      .forward(100)
      .right(90)
      .forward(100)
      .right(90)
      .forward(200)
      .closePath()
      .stroke()
      .fill()
      .start();

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("drawing a filled shape with a fade animation at slower speeds", async () => {
    var turtle = createSlowNormalTurtle();
    await turtle
      .beginPath()
      .forward(100)
      .right(90)
      .forward(100)
      .left(90)
      .forward(100)
      .right(90)
      .forward(100)
      .right(90)
      .forward(200)
      .closePath()
      .stroke()
      .fill()
      .start();
    //No canvas check here, because the mock outputs a slightly different path on every execution
  });

  test("filling the canvas with a fade animation at slower speeds", async () => {
    var turtle = createSlowNormalTurtle();
    await turtle.fillCanvas().start();
  });
});

//Other functional tests
describe("The turtle passes other functional tests like", () => {
  test("working properly when .start is triggered more than once", async () => {
    var turtle = createNormalTurtle();
    await turtle.forward(100).start();

    //Position check
    expect(turtle.state.position.x).toBe(500);
    expect(turtle.state.position.y).toBe(400);

    await turtle.forward(100).start();

    //Position check
    expect(turtle.state.position.x).toBe(500);
    expect(turtle.state.position.y).toBe(300);

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("facing upwards when .turn is called without arguments", async () => {
    var turtle = createNormalTurtle();
    await turtle.turn(90).start();
    expect(turtle.state.rotation).toBe(90);
    await turtle.turn().start();
    expect(turtle.state.rotation).toBe(0);
  });

  test("solving multiple drawing tasks in async mode", async () => {
    var turtle = createAsyncTurtle();
    await turtle.forward(100);

    expect(turtle.state.position.x).toBe(500);
    expect(turtle.state.position.y).toBe(400);

    await turtle.left(90);
    expect(turtle.state.rotation).toBe(-90);

    await turtle.forward(100);

    expect(turtle.state.position.x).toBe(400);
    expect(turtle.state.position.y).toBe(400);

    //Canvas check
    var path = turtle.ctx.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("sleeping", async () => {
    var turtle = createAsyncTurtle();
    await turtle.setSpeed(0.5);
    var time1 = Date.now();
    await turtle.sleep(200);
    var time2 = Date.now();
    expect(time2 - time1).toBeGreaterThanOrEqual(200);
  });
});
