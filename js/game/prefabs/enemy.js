
var Enemy = function(game, x , y, key, frame){
  //asset key
  key = 'skeleton';
  Phaser.Sprite.call(this, game, x , y , key , frame);
  this.scale.setTo(1.6);
  this.anchor.setTo(0.5);

  //automatically loops the sprite sheet
  this.animations.add('run',[0,1,2,3,4,5,6,7]);//18-24

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

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function(){
  //moves up and down
  //same as floor speed
  this.body.velocity.x = -400;
  //at 10 frames per second
  this.animations.play('run', 8, true);
}
