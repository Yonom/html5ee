define(function (require) {
    var Camera = require('game/camera'),
        CanvasWorld = require('ui/canvasworld'),
        World = require('models/world'),
        PlayerContainer = require('models/playercontainer'),
        Draw = require('utils/draw'),
        Ticker = require('utils/ticker');

    return function PlayState(canvas) {
        var ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        var world = new World(10, 10);
        world.drawBorder();
        var cw = new CanvasWorld(world);

        var playerContainer = new PlayerContainer(world);
        var myPlayer = playerContainer.addplayer();
        myPlayer.isMe = true;

        var camera = new Camera(myPlayer);
        Ticker.tick = function render(delta) {
            canvas.width = canvas.width; // Clears the canvas

            camera.tick(canvas);
            playerContainer.tick(delta);

            camera.enterCamera(ctx);
            ctx.drawImage(cw.canvas, 0, 0);
            playerContainer.players.forEach(function (p){
                Draw.smiley(ctx, p);
            });
            camera.exitCamera(ctx);
        }
    }
});