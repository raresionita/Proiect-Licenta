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

const clearCanvas = () => {
  if (confirm('Are you sure?')) {
    canvas.clear();
    canvasBack.clear();
  }
}

export {canvas,canvasBack,setCanvas,setCanvasBack, clearCanvas}
