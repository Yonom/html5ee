define(['models/player', 'game/physics'], function(Player, Physics) {
    function PlayerContainer(world) {
        this.world = world;
        this.remainder = 0;
        this.players = [];
    }

    PlayerContainer.prototype = {
        addplayer: function (){
            this.players.push(new Player());
            return this.players[this.players.length - 1];
        },
        tick: function(delta){
            var container = this;
            var totalDelta = delta + this.remainder;
            this.remainder = totalDelta % Physics.MsPerTick;
            var ticks = (totalDelta - this.remainder) / Physics.MsPerTick;
            for (var i = 0; i < ticks; i++) {
                this.players.forEach(function (p) {
                    Physics.doPhysics(container.world, p);
                });
            }
        }
    };

    return PlayerContainer;
});