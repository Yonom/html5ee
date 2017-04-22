define(['game/inputhandler'], function(InputHandler) {
    var MsPerTick = 10;
    var Gravity = 2;
    var BaseDrag = Math.pow(0.9981, MsPerTick) * 1.00016093;
    var NoModifierDrag = Math.pow(0.99, MsPerTick) * 1.00016093;
    var WaterDrag = Math.pow(0.995, MsPerTick) * 1.00016093;
    var MudDrag = Math.pow(0.975, MsPerTick) * 1.00016093;
    var LavaDrag = Math.pow(0.98, MsPerTick) * 1.00016093;
    var WaterBuoyancy = -0.5;
    var MudBuoyancy = 0.4;
    var LavaBuoyancy = 0.2;
    var variableMultiplier = 7.752;
    var JumpHeight = 26;

    var MaxThrust = 0.2;
    var ThrustBurnOff = 0.01;
    var Boost = 16;


    function isClimbable(id) {
        switch (id) { // TODO
            default:
                return false;
        }
    }

    function applyThrust(p) {
        p.currentThrust = MaxThrust;
    }

    return {
        VariableMultiplier: variableMultiplier,
        MsPerTick: MsPerTick,
        QueueLength: 2,
        MaxThrust: MaxThrust,
        doPhysics: function (w, p) {
            var cx = (p.x + 8) >> 4;
            var cy = (p.y + 8) >> 4;

            var current = w.blocks[cx][cy].fg;

            var delayed = p.queue.shift();
            p.queue.push(current);

            if (current == 4 || current == 414 || isClimbable(current)) {
                delayed = p.queue.shift();
                p.queue.push(current);
            }

            // TODO Purple switch queue

            if(p.isMe){

                var leftdown		 	= InputHandler.left;
                var rightdown 			= InputHandler.right;
                var updown 				= InputHandler.up;
                var downdown 			= InputHandler.down;
                var spacedown 			= InputHandler.space;


                p.horizontal = rightdown - leftdown;
                p.vertical = downdown - updown;
            }

            // TODO fire death

            if (p.isDead) {
                p.horizontal = 0;
                p.vertical = 0;
                spacedown = false;
            }

            var isGodMode = p.getIsFlying();
            if (isGodMode) {
                p.morX = 0;
                p.morY = 0;
                p.moX = 0;
                p.moY = 0;
            } else {
                switch (current) {
                    // TODO: handle other types of physics
                    case 414:
                        p.morX = 0;
                        p.morY = 0;
                        break;
                    default:
                        p.morX = 0;
                        p.morY = Gravity;
                        break;
                }

                switch (delayed) {
                    // TODO: handle other types of physics
                    case 414:
                        p.moX = 0;
                        p.moY = 0;
                        break;
                    default:
                        p.moX = 0;
                        p.moY = Gravity;
                        break;
                }
            }

            if (p.moY == WaterBuoyancy || p.moY == MudBuoyancy || this.moY == LavaBuoyancy) {
                p.mX = p.horizontal;
                p.mX = p.vertical;
            }
            else if (p.moY != 0) {
                p.mX = p.horizontal;
                p.mY = 0;
            }
            else if (p.moX != 0) {
                p.mX = 0;
                p.mY = p.vertical;
            }
            else {
                p.mX = p.horizontal;
                p.mY = p.vertical;
            }

            p.mX *= p.getSpeedMultiplier();
            p.mY *= p.getSpeedMultiplier();
            p.moX *= p.gravityMultiplier;
            p.moY *= p.gravityMultiplier;

            p.setModifierX(p.moX + p.mX);
            p.setModifierY(p.moY + p.mY);


            if (p.speedX || p.modifierX != 0) {
                p.speedX += p.modifierX;
                p.speedX *= BaseDrag;
                if ((p.mX == 0 && p.moY != 0) ||
                    (p.speedX < 0 && p.mX > 0) ||
                    (p.speedX > 0 && p.mX < 0) ||
                    (isClimbable(current) && !isGodMode)) {
                    p.speedX *= NoModifierDrag;
                }
                else if (false) //current == Liquids.Water && !isGodMode)
                {
                    p.speedX *= WaterDrag;
                }
                else if (false) //current == Liquids.Mud && !isGodMode)
                {
                    p.speedX *= MudDrag;
                }
                else if(false) //current == ItemId.LAVA  && !isgodmod){
                {
                    p.speedX *= LavaDrag;
                }

                if (p.speedX > 16) {
                    p.speedX = 16;
                }
                else if (p.speedX < -16) {
                    p.speedX = -16;
                }
                else if (p.speedX < 0.0001 && p.speedX > -0.0001) {
                    p.speedX = 0;
                }
            }
            if (p.speedY || p.modifierY != 0) {
                p.speedY += p.modifierY;
                p.speedY *= BaseDrag;
                if ((p.mY == 0 && p.moX != 0) ||
                    (p.speedY < 0 && p.mY > 0) ||
                    (p.speedY > 0 && p.mY < 0) ||
                    (isClimbable(current) && !isGodMode)) {
                    p.speedY *= NoModifierDrag;
                }
                else if (false) //current == Liquids.Water && !isGodMode)
                {
                    p.speedY *= WaterDrag;
                }
                else if (false) //current == Liquids.Mud && !isGodMode)
                {
                    p.speedY *= MudDrag;
                }
                else if(false) //current == ItemId.LAVA  && !isgodmod){
                {
                    p.speedY *= LavaDrag;
                }

                if (p.speedY > 16) {
                    p.speedY = 16;
                }
                else if (p.speedY < -16) {
                    p.speedY = -16;
                }
                else if (p.speedY < 0.0001 && p.speedY > -0.0001) {
                    p.speedY = 0;
                }
            }
//            if (!isGodMode)
//            {
//                switch (current)
//                {
//                    case BlockIDs.Action.Boost.Left:
//                        p.speedX = -Boost;
//                        break;
//                    case BlockIDs.Action.Boost.Right:
//                        p.speedX = Boost;
//                        break;
//                    case BlockIDs.Action.Boost.Up:
//                        p.speedY = -Boost;
//                        break;
//                    case BlockIDs.Action.Boost.Down:
//                        p.speedY = Boost;
//                        break;
//                }
//            }

            var reminderX = p.x % 1;
            var currentSX = p.speedX;

            var reminderY = p.y % 1;
            var currentSY = p.speedY;

            p.doneX = false;
            p.doneY = false;

            var osX;
            var osY;
            var oX;
            var oY;

            function stepX() {
                if (currentSX > 0) {
                    if (currentSX + reminderX >= 1) {
                        p.x += (1 - reminderX);
                        p.x = Math.floor(p.x);
                        currentSX -= (1 - (reminderX));
                        reminderX = 0;
                    } else {
                        p.x += currentSX;
                        currentSX = 0;
                    }
                }
                else if (currentSX < 0) {
                    if (reminderX != 0 && reminderX + currentSX < 0) {
                        currentSX += reminderX;
                        p.x -= reminderX;
                        p.x = Math.floor(p.x);
                        reminderX = 1;
                    } else {
                        p.x += currentSX;
                        currentSX = 0;
                    }
                }
                if (overlaps(w, p)) {
                    p.x = oX;
                    p.speedX = 0;
                    currentSX = osX;
                    p.doneX = true;
                }
            }

            function stepY() {
                if (currentSY > 0) {
                    if (currentSY + reminderY >= 1) {
                        p.y += 1 - reminderY;
                        p.y = Math.floor(p.y);
                        currentSY -= (1 - reminderY);
                        reminderY = 0;
                    } else {
                        p.y += currentSY;
                        currentSY = 0;
                    }
                } else if (currentSY < 0) {
                    if (reminderY != 0 && reminderY + currentSY < 0) {
                        p.y -= reminderY;
                        p.y = Math.floor(p.y);
                        currentSY += reminderY;
                        reminderY = 1;
                    } else {
                        p.y += currentSY;
                        currentSY = 0;
                    }
                }
                if (overlaps(w, p)) {
                    p.y = oY;
                    p.speedY = 0;
                    currentSY = osY;
                    p.doneY = true;
                }
            }

            while ((currentSX != 0 && !p.doneX) || (currentSY != 0 && !p.doneY)) {
                // TODO portals
                //ProcessPortals(p, params);

                oX = p.x;
                oY = p.y;

                osX = currentSX;
                osY = currentSY;

                stepX();
                stepY();
            }

            // TODO isme
            if (p.isMe && !p.isDead) {
                if (spacedown)

                var mod = 1;
                var inJump = false;
//                if (false) {//spacejustdown){
//                    p.lastJump = -new Date();
//                    inJump = true;
//                    mod = -1
//                }
                if(spacedown) {
                    if (p.hasLevitation) { // TODO
                        if (!p.isThrusting) {
                            p.changed = true;
                        }
                        p.isThrusting = true;
                        applyThrust(p);
                    }
                    else {
                        if (p.lastJump < 0) {
                            if (new Date() + p.lastJump > 750) {
                                inJump = true;
                            }
                        } else {
                            if (new Date() - p.lastJump > 150) {
                                inJump = true;
                            }
                        }
                    }
                } else {
                    if (p.hasLevitation ) {
                        if (p.isThrusting ) {
                            p.changed = true;
                        }
                        p.isThrusting = false;
                    }
                }
                if(inJump && !p.hasLevitation ){
                    if(p.getSpeedX() == 0 && p.morX && p.moX && p.x%16==0){
                        p.setSpeedX(p.getSpeedX() - p.morX * JumpHeight * p.getJumpMultiplier());
                        p.changed = true;
                        p.lastJump = new Date() * mod
                    }
                    if(p.speedY == 0 && p.morY && p.moY && p.y%16==0) {
                        p.setSpeedY(p.getSpeedY() - p.morY*JumpHeight* p.getJumpMultiplier());
                        p.changed = true;
                        p.lastJump = new Date() * mod
                    }
                }

                p.changed = false;
            }
            // TODO jetpack

            //Auto align to grid. (do not autocorrect in water or mud)
            var imx = p.speedX << 8;
            var imy = p.speedY << 8;

            p.moving = false;

            if (imx != 0) { //|| ((current == ItemId.WATER || current == ItemId.MUD || current == ItemId.LAVA) && !isgodmod)) {
                p.moving = true;
            } else if (p.modifierX < 0.1 && p.modifierX > -0.1) {
                var tx = p.x % 16;
                if (tx < 2) {
                    if (tx < .2) {
                        p.x >>= 0;
                    } else p.x -= tx / 15
                } else if (tx > 14) {
                    if (tx > 15.8) {
                        p.x >>= 0;
                        p.x++
                    } else p.x += (tx - 14) / 15;
                }

            }

            if (imy != 0) { //|| ((current == ItemId.WATER || current == ItemId.MUD || current == ItemId.LAVA) && !isgodmod)) {
                p.moving = true;
            } else if (p.modifierY < 0.1 && p.modifierY > -0.1) {
                var ty = p.y % 16;

                if (ty < 2) {
                    if (ty < .2) {
                        p.y >>= 0;
                    } else p.y -= ty / 15
                } else if (ty > 14) {

                    if (ty > 15.8) {
                        p.y >>= 0;
                        p.y++
                    } else p.y += (ty - 14) / 15;
                }
            }
        }
    };

    function overlaps(world, pl) {
        if (pl.x < 0 || pl.y < 0 ||
            pl.x > world.width * 16 - 16 ||
            pl.y > world.height * 16 - 16) return 1;

        if (pl.getIsFlying()) return 0;

        var firstX = pl.x >> 4;
        var firstY = pl.y >> 4;

        var lastX = (pl.x + 16) / 16;
        var lastY = (pl.y + 16) / 16;

        for (var x = firstX; x < lastX; x++) {
            var map = world.blocks[x];
            for (var y = firstY; y < lastY; y++) {
                if (map != null) {
                    var val = map[y].fg;
                    if (val != 0) {
                        return val;
                    }
                }
            }
        }

        return 0;
    }
});



