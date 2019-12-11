import * as $ from 'jquery';
var canvas:any;

const setCanvas = (newCanvas:any) => {
  canvas = newCanvas;
  canvas.selection = false;
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {

    var card = $('.card')[0]
    console.log(card)
    canvas.setHeight(card.offsetHeight);
    canvas.setWidth(card.offsetWidth);
    canvas.renderAll();
  }

  // resize on init
  resizeCanvas();
}


export {canvas,setCanvas}
