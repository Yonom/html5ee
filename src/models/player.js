define(['game/physics'], function (Physics) {
   function Player() {
       this.queue = new Array(Physics.QueueLength);
       this.multiplier = Physics.VariableMultiplier;
       this.currentThrust = Physics.MaxThrust;
       this.lastJump = 0;

       this.x = 16;
       this.y = 16;
       this.horizontal = 0;
       this.vertical = 0;
       this.isDead = false;

       this.speedX = 0;
       this.speedY = 0;
       this.modifierX = 0;
       this.modifierY = 0;

       this.hasLevitation = false;
       this.zombie = false;
       this.jump_boost = false;

       this.isGod = false;
       this.isMod = false;
       this.isGuardian = false;

       this.gravityMultiplier = 1;
       this.isMe = false;

       this.smiley = 0;
   }

    Player.prototype = {
        getSpeedMultiplier: function() {
            return 1; // TODO
        },
        getIsFlying: function(){
            return this.isGod || this.isMod || this.isGuardian;
        },
        setSpeedX: function(value) {
            this.speedX = value / this.multiplier;
        },
        setSpeedY: function(value) {
            this.speedY = value / this.multiplier;
        },
        getSpeedX: function() {
            return this.speedX * this.multiplier;
        },
        getSpeedY: function() {
            return this.speedY * this.multiplier;
        },
        setModifierX: function(value) {
            this.modifierX = value / this.multiplier;
        },
        setModifierY: function(value) {
            this.modifierY = value / this.multiplier;
        },
        getModifierX: function() {
            return this.modifierX * this.multiplier;
        },
        getModifierY: function() {
            return this.modifierY * this.multiplier;
        },
        getJumpMultiplier: function ()
        {
            var jm = 1;
            if(this.jump_boost) jm *= 1.2;
            if(this.zombie) jm *= .75;
            return jm;
        }
    };

    return Player;
});