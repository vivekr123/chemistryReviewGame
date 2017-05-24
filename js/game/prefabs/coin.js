
var Coin = function(game, x , y, key, frame){
  //asset key
  key = 'coins';
  Phaser.Sprite.call(this, game, x , y , key , frame);
  // prev-0.5
  this.scale.setTo(0.3);
  this.anchor.setTo(0.5);

  //automatically loops the sprite sheet
  this.animations.add('spin',[0]);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  //Checks if in world
  this.checkWorldBounds = true;
  //If out of world, kill it
  this.onOutOfBoundsKill = true;

  //All sprites have events property
  //Methods created belows
  this.events.onKilled.add(this.onKilled, this);
  this.events.onRevived.add(this.onRevived, this);

};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.onRevived = function(){
  //same as floor speed
  this.body.velocity.x = -400;
  //at 10 frames per second
  this.animations.play('spin', 10, true);
}

Coin.prototype.onKilled = function(){
  //Faces camera when revived
  this.animations.frame = 0;
}
