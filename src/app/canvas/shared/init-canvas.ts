var canvas:any;

const setCanvas = (newCanvas:any) => {
  canvas = newCanvas;
  canvas.selection = false;
}


const clearCanvas = () => {
  if (confirm('Are you sure?')) {
    canvas.clear();
  }
}

export {canvas,setCanvas, clearCanvas}
