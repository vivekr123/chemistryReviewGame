var Scoreboard = function(game){
  Phaser.Group.call(this, game);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score){
  var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, starText;

  //medium to draw on
  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';
  bmd.ctx.fillRect(0,0, this.game.width, this.game.height);

  //sprite created from bit map data
  background = this.game.add.sprite(0,0,bmd);
  background.alpha = 0.5;

  this.add(background);

  var isNewHighScore = false;
  //Getting highscore from local storage
  var highscore = localStorage.getItem('highscore');
  if(!highscore || highscore<score){
    isNewHighScore = true;
    highscore = score;
    localStorage.setItem('highscore',highscore);
  }

  this.y = this.game.height;

  console.log(score);

  gameoverText = game.add.text(game.world.centerX, 100, "Game Over",{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //gameoverText.x = this.game.width/2 - (gameoverText.textWidth/2);
  this.add(gameoverText);

  scoreText = game.add.text(game.world.centerX, 200, "Your Score: "+score,{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //scoreText.x = this.game.width/2 - (scoreText.textWidth/2);
  this.add(scoreText);

  highScoreText = game.add.text(game.world.centerX, 250, "High Score: "+highscore,{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //highScoreText.x = this.game.width/2 - (highScoreText.textWidth/2);
  this.add(highScoreText);

  startText = game.add.text(game.world.centerX, 300, "Tap To Play Again",{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'white'});
  //startText.x = this.game.width/2 - (startText.textWidth/2);
  this.add(startText);

  if(isNewHighScore){
    newHighScoreText= game.add.text(250, 100, "New High Score!",{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'#4ebef7'});
    //newHighScoreText.x = gameoverText.x + gameoverText.textWidth + 40;
    newHighScoreText.angle = 45;
    this.add(newHighScoreText);
  }

  this.game.add.tween(this).to({y:0}, 1000, Phaser.Easing.Bounce.Out, true);

  //addOnce deals with spam clicks
  this.game.input.onDown.addOnce(this.restart, this);

};

Scoreboard.prototype.restart = function() {
  //restarts the game
  this.game.state.start('Game', true, false);
}
