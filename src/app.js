require(['game/playstate', 'utils/ticker'], function (PlayState, Ticker) {
    var canvas = document.getElementById("canvas");
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight - 50;
    }

    window.onresize = resizeCanvas;
    resizeCanvas();

    var state = new PlayState(canvas);

    var fps =  document.getElementById("fps");
    setInterval(function(){
        fps.innerHTML = (1000/Ticker.frameTime).toFixed(1);
    },500);
});