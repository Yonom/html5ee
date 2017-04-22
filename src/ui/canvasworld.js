define(['utils/draw'], function(Draw) {
    function CanvasWorld(world) {
        this.world = world;

        this.canvas = document.createElement('canvas');
        this.canvas.width = world.width << 4;
        this.canvas.height = world.height << 4;
        this.context = this.canvas.getContext('2d');

        this.redraw();
    }

    CanvasWorld.prototype = {
        drawBorder: function () {
            this.world.drawBorder();
            this.redraw();
        },
        setBlock: function (x, y, block) {
            this.world.blocks[x][y] = block;
            Draw.block(this.context, x, y, block);
        },
        redraw: function () {
            for (var x = 0; x < this.world.width; x++) {
                for (var y = 0; y < this.world.height; y++) {
                    Draw.block(this.context, x, y, this.world.blocks[x][y]);
                }
            }
        }
    };

    return CanvasWorld;
});
