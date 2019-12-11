var canvas:any;

const setCanvas = (newCanvas:any) => {
  canvas = newCanvas;
  canvas.selection = false;
}


export {canvas,setCanvas}
