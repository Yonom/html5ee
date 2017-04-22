define(function() {
    return new function Ticker() {
        var Ticker = this;
        this.tick = function (delta){};

        this.frameTime = 0;
        var filterStrength = 10;

        var lastTick = new Date();
        var onTick = function() {

            var thisTick = new Date();
            var delta = thisTick - lastTick;
            lastTick = thisTick;
            Ticker.frameTime += (delta - Ticker.frameTime) / filterStrength;

            Ticker.tick(delta);
            requestAnimationFrame(onTick);
        };
        requestAnimationFrame(onTick);
    };
});
