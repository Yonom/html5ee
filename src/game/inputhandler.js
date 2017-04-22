define([], function (){
    var keyMap = {
        'up': 38,   // up arrow key
        'down': 40, // down arrow key
        'left': 37,   // left arrow key
        'right': 39,  // right arrow key

        'altup': 87,   // w key
        'altdown': 83, // s key
        'altleft': 65,   // a key
        'altright': 68,   // d key

        'space': 32 // space key
    };

    function InputHandler() {
        this.pressedKeys = [];
        this.update();

        var handler = this;
        document.addEventListener("keydown", function (e) { handler.onKeyDown(e) }, true);
        document.addEventListener("keyup", function (e) { handler.onKeyUp(e) }, true);
    }

    InputHandler.prototype = {
        onKeyDown: function (e) {
            this.pressedKeys[e.keyCode] = true;

            this.update();
        },
        onKeyUp: function (e) {
            this.pressedKeys[e.keyCode] = false;

            this.update();
        },
        update: function () {
            this.left = this.pressedKeys[keyMap.left] || this.pressedKeys[keyMap.altleft] || false;
            this.right = this.pressedKeys[keyMap.right] || this.pressedKeys[keyMap.altright] || false;
            this.up = this.pressedKeys[keyMap.up] || this.pressedKeys[keyMap.altup] || false;
            this.down = this.pressedKeys[keyMap.down] || this.pressedKeys[keyMap.altdown] || false;
            this.space = this.pressedKeys[keyMap.space] || false;
        }
    };

    return new InputHandler;
});