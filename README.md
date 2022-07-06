![](https://raw.githubusercontent.com/leonceaklin/real-turtle/master/img/logo.gif)

# Real Turtle
[![Build](https://github.com/leonceaklin/real-turtle/actions/workflows/main.yml/badge.svg)](https://github.com/leonceaklin/real-turtle/actions/workflows/main.yml)

A simple yet powerful turtle graphics library for JavaScript. It aims to make turtle graphics in JavaScript as simple as possible while giving insights to HTML canvas by staying close to its spec

[Try it out🚀](https://repl.it/@leonceaklin/RealTurtleSimpleTemplate)

[Try it out (async mode)🚀](https://repl.it/@leonceaklin/RealTurtleAsyncTemplate)

## Getting started

### Via CLI

Install it via NPM

```sh
npm i real-turtle
```

Import the class in your JS file

```javascript
import RealTurtle from 'real-turtle'
```

Create a RealTurtle Instance

```javascript
const turtle = new RealTurtle(element, options)
```

### Via CDN (in the browser)

#### General

Include a the script tag above your command code

```html
<script type="text/javascript" src="https://unpkg.com/real-turtle"></script>
```

```javascript
var turtle = new RealTurtle.default(element, options)
```

#### With a helper

If you are a JavaScript beginner who wants to get started quickly, a helper is recommended. It creates a RealTurtle instance with predefined options and makes it acessible through a global turtle variable. All you need to provide is an HTML-Element with the ID `#real-turtle`

> Note: The helper is only recommended for simple use cases such as playgrounds.

Include the helper script tag below your RealTurtle HTML element.

```html
<script type="text/javascript" src="https://unpkg.com/real-turtle/dist/helpers/simple.js"></script>
```

##### Example using a helper

```html
<script type="text/javascript" src="https://unpkg.com/real-turtle"></script>
<canvas id="real-turtle"></canvas>
<script type="text/javascript" src="https://unpkg.com/real-turtle/build/helpers/simple.js"></script>

<script type="text/javascript">
//Your turtle commands go here
turtle.forward(100)
</script>
```

## Options

When creating a `new RealTurtle()` instance, you can pass an options object as the second parameter which may contain the following properties:

| Property    | Type    | Description                                                                                                                                | Default  |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `verbose`   | Boolean | Defines if the instance should log every step to the console.                                                                              | `false`  |
| `autoStart` | Boolean | Defines if the turtle should start drawing automatically. If enabled, the `.start()` command at the end of your commands becomes obsolete. | `false`  |
| `image`     | String  | Sets the URL of the sprite image of the turtle.                                                                                            | [String] |
| `state`     | Object  | Sets the initial state of the turtle. More shown below.                                                                                    | [Object] |
| `async`     | Boolean | Defines if you want to use the turtle in async mode                                                                                        | `false`  |

### Initial turtle state

In you options object, you can declare the initial State of your turtle via the `state` property. It may contain the folloing properties:

| Property      | Type                    | Description                                 | Default   |
| ------------- | ----------------------- | ------------------------------------------- | --------- |
| `size`        | Number                  | The size of the turtle in px                | `15`      |
| `strokeStyle` | String/Gradient/Pattern | The style of the stroke drawn by the turtle | `"black"` |

This list is not completed yet

### Normal mode vs. async mode

Normally real-turtle gathers your commands and lists them in a task list before executing them. The commands you give the turtle are therefore not executed until everything is stored in the task list. This makes animations possible. However, this is not how JavaScript works and it means that forever loops such as `while(true)` are not possible that way.

With async mode, which can be enabled by using the async option when creating the instance or the async helper, you can solve this. You write your code into an async function and wait for the tasks to be executed using `await` .

#### Async example

```javascript
async function run(){
     //Your turtle commands go here
     await turtle.move(200)
     console.log("Done")
}
run()
```

## Commands

### `.start()` the most important command at the end of your script if you don't use async mode

The `.start()`command tells the turtle to actually start the drawing process.

Unless you are using `autoStart` or a helper, your turtle will only move if you add the `turtle.start()` command at the very end of your commands!

### Move around

| Command                                 | Description                                     | Arguments                                                                                                                                                                                                                                                                                          | Aliases       |
| --------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `.forward(steps)`                       | Makes your turtle move forward                  | - `steps`: Number: The distance in px the turtle should move                                                                                                                                                                                                                                       | `.fd`,`.move` |
| `.back(steps)`                          | Makes your turtle move back                     | - `steps`: Number: The distance in px the turtle should move                                                                                                                                                                                                                                       | `.bk`         |
| `.left(degrees)`                        | Makes your turtle turn right (counterclockwise) | - `degrees`: Number: The angle the turtle should turn in degrees                                                                                                                                                                                                                                   | `.lt`         |
| `.right(degrees)`                       | Makes your turtle turn right (clockwise)        | - `degrees`: Number: The angle the turtle should turn in degrees                                                                                                                                                                                                                                   | `.rt`, `turn` |
| `.arc(radius, angle, counterclockwise)` | Makes your turtle move along an arcus           | - `radius`: Number: The radius of the arc which the turtle should move along<br/>- `angle`: Number: The angle of the arc in degrees. It defines how "long" the arc is<br/>- `counterclockwise`(optional): Boolean: Defines the direction of the arc (to the left or to the right) Default: `false` |               |

### Drawing

| Command             | Description                                                                                                                                                  | Arguments                                              | Aliases |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------- |
| `.penDown()`        | Activates the pen of your turtle so that it draws a line when moving around                                                                                  |                                                        |         |
| `.penUp()`          | Deactivates the pen of your turtle so that the canvas stays blank when moving around                                                                         |                                                        |         |
| `.beginPath()`      | Tells the turtle to begin a new path which can later be closed or filles. Be aware that a path can only have one stroke style, just like a HTML canvas path. |                                                        |         |
| `.closePath()`      | Tells the turtle to close the current path                                                                                                                   |                                                        |         |
| `.stroke()`         | Draws a stroke from the first to the last point of a path. Its basically the HTML canvas' `.stroke()`                                                        |                                                        |         |
| `.fill()`           | Tells the turtle to fill the current path with the current `fillStyle`                                                                                       |                                                        |         |
| `.fillText(text)`   | Lets the turtle write text onto the canvas, filled with the current `fillStyle`                                                                              | - `text`: String: The text which the turtle will write |         |
| `.strokeText(text)` | Lets the turtle write text onto the canvas with a border and no fill                                                                                         | - `text`: String: The text which the turtle will write |         |

### Setting visual parameters

| Command                       | Description                                                     | Arguments                                                                                                              | Aliases |
| ----------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| `.setStrokeStyle(style)`      | Sets the style of the stroke which the turtle will draw         | - `style`: String/Gradient/Pattern: The style of the stroke. HTML canvas 2D context gradients and patterns can be used |         |
| `.setStrokeColorRGB(r, g, b)` | Sets the style of the stroke to a color according to RGB values | - `r`: Number: Red value (0 - 255)<br/>- `g`: Number: Green value (0 - 255)<br/>- `b`: Number: Blue value (0 - 255)    |         |
| `.setStrokeColorHSL(r, g, b)` | Sets the style of the stroke to a color according to HSL values | - `h`: Number: Hue in degrees<br/>- `s`: Number: Saturation value (0 - 1)<br/>- `l`: Number: Light value (0 - 1)       |         |
| `.setFillStyle(style)`        | Sets the style of areas which the turtle will fill              | - `style`: String/Gradient/Pattern: The style of the stroke. HTML canvas 2D context gradients and patterns can be used |         |
| `.setLineWidth(width)`        | Sets the width of the stroke which the turtle will draw         | - `width`: Number: The width of the line in px                                                                         |         |
| `.setLineCap(style)`          | Sets the appearance of the ends of the lines                    | - `style`: String: Style of the ends. Possible options: `butt`, `round`, `square`                                      |         |
| `.setFont(font)`              | Sets the font which the turtle uses for text                    | - `font`: String: Font size and font family in HTML canvas format (`10px sans-serif` for example)                      |         |
| `.setTextAlign(align)`        | Sets the align of text written by the turtle                    | - `align`: String: The align of the text. Possible options: `left`, `right`,`center`                                   |         |
| `.setTextBaseline(baseline)`  | Sets the baseline of text written by the turtle                 | - `baseline`: String: The baseline of the text. Possible options: `bottom`, `middle`,`top`,`hanging`,`alphabetic`      |         |

### Changing appearance and behavior of the turtle

| Command              | Description                                    | Arguments                                                                   | Aliases |
| -------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- | ------- |
| `.setPosition(x, y)` | Sets the position of your turtle on the canvas | - `x`: X-coordinate of the position<br/> -`y`: Y-coordinate of the position |         |
| `.setSpeed(speed)`   | Defines how fast your turtle moves             | - `speed`: Number: From 0 (super slow) to 1 (blazing fast)                  |         |
| `.setSize(size)`     | Sets the size of the turtle                    | - `size`: Number: The size of the turtle in px                              |         |
| `.setImage(url)`     | Sets the skin of the turtle to an image        | - `url`: String: The URL of the image                                       |         |
| `.setIcon(url)`      | Sets the skin of the turtle to an icon         | - `icon`: String: The emoji icon                                            |         |

### Programmatic functions

| Command                | Description                                   | Arguments                                                        | Aliases |
| ---------------------- | --------------------------------------------- | ---------------------------------------------------------------- | ------- |
| `.sleep(milliseconds)` | Lets the turtle pause for the given time      | - `milliseconds`: Number: Time of the delay                      |         |
| `.eval(func)`          | Lets the turtle execute a JavaScript function | - `func`: Function: The function which the turtle should execute |         |

### Accessing Canvas and Context

To manipulate the canvas and the context of the RealTurtle() instance directly, you can use `.canvas` and `.ctx`.

> Note: To avoid an overwrite of your changes to the context, it is recommended to use async mode or to use these properties only inside an `.eval(func)` command.
