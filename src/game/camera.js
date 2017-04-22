define(function(){
    var CameraLag = 1/16;

    function Camera(target) {
        this.target = target;
        this.x = 0;
        this.y = 0;
    }

    Camera.prototype = {
        enterCamera: function(ctx) {
            ctx.save();
            ctx.translate(Math.round(this.x), Math.round(this.y));
        },
        exitCamera: function(ctx) {
            ctx.restore();
        },
        tick: function(canvas) {
            this.x -= (this.x - ((-this.target.x) + canvas.width/2)) * CameraLag;
            this.y -= (this.y - ((-this.target.y) + canvas.height/2)) * CameraLag;
        }

    };

    return Camera;
});