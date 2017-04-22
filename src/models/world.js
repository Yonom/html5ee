define(['models/block', 'utils/draw'], function(Block) {
    function World(width, height) {
        this.width = width;
        this.height = height;
        this.blocks = new Array(2);

        for (var x = 0; x < width; x++) {
            this.blocks[x] = new Array(height);

            for (var y = 0; y < height; y++) {
                this.blocks[x][y] = new Block(0, 0);
            }
        }
    }

    World.prototype = {
        drawBorder:  function() {
            var borderBlock = new Block(9, 0);
            var maxX = this.width - 1;
            var maxY = this.height - 1;
            for (var y = 0; y <= maxY; y++) {
                this.blocks[0][y] = borderBlock;
                this.blocks[maxX][y] = borderBlock;
            }
            for (var x = 0; x <= maxX; x++) {
                this.blocks[x][0] = borderBlock;
                this.blocks[x][maxY] = borderBlock;
            }
        }
    };

    return World;
});
