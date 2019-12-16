import * as $ from 'jquery';
var canvas:any;

const setCanvas = (newCanvas:any) => {
  canvas = newCanvas;
  canvas.selection = false;

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
}

const resizeCanvas = () => {
  var card = $('.card')[0];
  canvas.setHeight(card.offsetHeight);
  canvas.setWidth(card.offsetWidth);
  canvas.renderAll();
}


export {canvas,setCanvas}
