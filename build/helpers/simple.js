(()=>{let e=window.RealTurtle.default;var t=document.getElementById("real-turtle");null==t&&((t=document.createElement("canvas")).id="real-turtle",document.body.append(t),console.warn("Turtle helper could not find an existing canvas element. Created a custom one",t)),null!=t.getAttribute("width")&&null!=t.getAttribute("height")||(t.width=window.innerWidth,t.height=window.innerHeight),window.turtle=new e(t,{verbose:!0,autoStart:!0,state:{speed:.5}});var n=document.createElement("style");n.type="text/css",n.innerHTML="\n  html, body{\n    margin: 0;\n    padding: 0;\n  }\n\n  #real-turtle, #real-turtle canvas{\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n",document.body.append(n)})();