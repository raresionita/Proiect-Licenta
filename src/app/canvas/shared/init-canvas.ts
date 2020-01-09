var canvas:any;
var canvasBack:any;

const setCanvas = (newCanvas:any) => {
  canvas = newCanvas;
  canvas.selection = false;
}

const setCanvasBack = (newCanvas:any) => {
  canvasBack = newCanvas;
  canvasBack.selection = false;
}

export {canvas,canvasBack,setCanvas,setCanvasBack}
