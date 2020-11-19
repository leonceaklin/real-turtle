# Real Turtle
A simple yet powerful turtle graphics linrary for JavaScript.

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

#### Without helper
If you want full control
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

##### Working Example using a helper
```html
<script type="text/javascript" src="https://unpkg.com/real-turtle"></script>
<canvas id="canvas"></canvas>
<script type="text/javascript" src="https://unpkg.com/real-turtle/dist/helpers/simple.js"></script>

<script type="text/javascript">
turtle.forward(100)
</script>
```
