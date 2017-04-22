define(function(require) {
    var blocks = require("image!img/blocks.png"),
        blocksBg = require("image!img/blocks_bg.png"),
        blocksFg = require("image!img/blocksforground.png"),
        smileys = require("image!img/Guy.png");

    return new function Draw() {
        var drawBlockInternal = function (c, image, x, y, id) {
            c.drawImage(image, id << 4, 0, 16, 16, x << 4, y << 4, 16, 16);
        };

        var drawSmileyInternal = function (c, image, x, y, id) {
            c.drawImage(image, id << 4, 0, 16, 26, x, y - 5, 16, 26);
        };

        this.block = function (c, x, y, block) {
            if (block.bg != 0) {
                drawBlockInternal(c, blocksBg, x, y, block.bg - 500);
            } else {
                drawBlockInternal(c, blocks, x, y, 0);
            }

            if (block.fg != 0) {
                drawBlockInternal(c, blocks, x, y, block.fg);
            }
        };

        this.smiley = function (c, p) {
            drawSmileyInternal(c, smileys, Math.round(p.x), Math.round(p.y), p.smiley);
        }
    };
});
