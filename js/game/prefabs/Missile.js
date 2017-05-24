
var Missile = function(game, x , y, key, frame){
  //asset key
  key = 'missile';
  Phaser.Sprite.call(this, game, x , y , key , frame);
  this.scale.setTo(0.1);    //1.6
  this.anchor.setTo(0.5);

  //automatically loops the sprite sheet
  this.animations.add('fly',[0,1,2,3,2,1]);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  //Checks if in world
  this.checkWorldBounds = true;
  //If out of world, kill it
  this.onOutOfBoundsKill = true;

  //All sprites have events property
  //Methods created belows
  this.events.onRevived.add(this.onRevived, this);

};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.onRevived = function(){
  //moves up and down
  this.game.add.tween(this).to({y:this.y-16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
  //same as floor speed
  this.body.velocity.x = -400;
  //at 10 frames per second
  this.animations.play('fly', 10, true);
}
