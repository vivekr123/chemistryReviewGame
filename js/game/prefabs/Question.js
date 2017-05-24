var Question = function(game){
  Phaser.Group.call(this, game);
};

Question.prototype = Object.create(Phaser.Group.prototype);
Question.prototype.constructor = Question;

Question.prototype.show = function(score){
  var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, starText;

  //medium to draw on
  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';
  bmd.ctx.fillRect(0,0, this.game.width, this.game.height);

  //sprite created from bit map data
  background = this.game.add.sprite(0,0,bmd);
  background.alpha = 0.5;

  this.add(background);

  this.y = this.game.height;

  console.log(score);

  questionText = game.add.text(game.world.centerX-300, 100, "What is the electronegativity of Na",{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //gameoverText.x = this.game.width/2 - (gameoverText.textWidth/2);
  this.add(questionText);

  scoreText = game.add.text(game.world.centerX, 200, "Your Score: "+score,{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //scoreText.x = this.game.width/2 - (scoreText.textWidth/2);
  this.add(scoreText);

  startText = game.add.text(game.world.centerX, 300, "Tap To Play Again",{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //startText.x = this.game.width/2 - (startText.textWidth/2);
  this.add(startText);


  this.game.add.tween(this).to({y:0}, 1000, Phaser.Easing.Bounce.Out, true);

  //addOnce deals with spam clicks
  this.game.input.onDown.addOnce(this.restart, this);

};

Question.prototype.restart = function() {
  //restarts the game
  this.game.state.start('Game', true, false);
}
