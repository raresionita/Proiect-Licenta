var canvas:any;

const setCanvas = (newCanvas:any) => {
  canvas = newCanvas;
  canvas.selection = false;
  canvas.perPixelTargetFind = true;
}


const clearCanvas = () => {
  if (confirm('Are you sure?')) {
    canvas.clear();
    window.location.reload();
  }
}

export {canvas,setCanvas, clearCanvas}
