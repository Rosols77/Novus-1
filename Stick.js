const stick_origin = new Vector2(2000, 22);
const stick_shot_origin = new Vector2(2000, 22);
const MAX_POWER = 3800;

function Stick(position, onShoot){
    this.position = position;
    this.rotation = 0;
    this.origin = stick_origin.copy();
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
}

Stick.prototype.update = function() {
    if (!GameWorld.positioningBall) {
        if (Mouse.left.down) {
            this.increasePower();
        } else if (this.power > 0) {
            this.shoot();
        }

        this.updateRotation();
    }
};

Stick.prototype.draw = function(){
    Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
}

Stick.prototype.updateRotation = function() {
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;
    
    this.rotation = Math.atan2(opposite, adjacent);
};

Stick.prototype.increasePower = function(){

    if(this.power > MAX_POWER){
        return;
    }

    this.power += 30;
    this.origin.x += 2;
}

Stick.prototype.shoot = function(){

    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = stick_shot_origin.copy();
    this.shot = true;

}

Stick.prototype.reposition = function(position){

    this.position = position.copy();
    this.origin = stick_origin.copy();
    this.shot = false;
}