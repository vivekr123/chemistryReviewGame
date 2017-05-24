
runner.MainMenu = function(){};

runner.MainMenu.prototype = {

  //Order in which things are created is the depth they will display
  create: function(){
    //tiling the background - starts at top left, width is game width and hieght is 512. Asset key is background
    this.background = this.game.add.tileSprite(0,0, this.game.width, 1024,'background');
    //Scrolls only in x-direction 100 pixels at a time
    this.background.autoScroll(-100, 0);

    this.foreground = this.game.add.tileSprite(0,470, this.game.width, this.game.height-460-73,'foreground');
    this.foreground.autoScroll(-100,0);

    this.ground = this.game.add.tileSprite(0, this.game.height-73, this.game.width, 73, 'ground');
    this.ground.autoScroll(-400,0);

    this.player = this.add.sprite(200, this.game.height/2,'player');
    this.player.anchor.setTo(0.5);
    //this.player.scale.setTo(0.3);
    this.player.scale.setTo(1);

    //animations - array tells sequence to play from spritesheet
  //  this.player.animations.add('fly', [0,1,2,3,2,1]);
    this.player.animations.add('fly', [0,1,2,3]);
    //8 - frames/sec
    this.player.animations.play('fly', 7, true);

    //modifies a game object - json object with properties to change - change y position, twice a second, naturally move up and down, autostart, no delay, repeat, whether to go up and down)
    this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    //this.startText = this.game.add.Text(this,this.game.width/2,this.game.height/2,'Click to Start');
    this.startText = game.add.text(game.world.centerX, game.world.centerY, "CLICK TO START",{font:'Copperplate Gothic',align:'center', fontSize:32, fontWeight:'bold', fill:'black', stroke:'white', strokeThickness:5});
    this.startText.anchor.set(0.5);


  },
  update: function(){
    //if user clicks or touches, switch to Game state
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }

  }

};
