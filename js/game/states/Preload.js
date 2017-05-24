runner.Preload = function(){

  this.ready = false;

};

runner.Preload.prototype = {
  preload: function(){
    //adds a sprite
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    //anchors to halfway down and across image
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //loading assets

    this.load.image('ground','assets/images/ground.png');
    this.load.image('background','assets/images/background.png');
    this.load.image('foreground','assets/images/foreground.png');

    //Sprite sheet "moves" therefore different than images above

    //with width,height,number of frames in picture
  //  this.load.spritesheet('coins', 'assets/images/coins-ps.png', 51, 51, 7);
    this.load.spritesheet('coins', 'assets/images/atom.png', 256, 256, 7);
  //  this.load.spritesheet('player', 'assets/images/angelBoy (2).png', 229, 296, 4); //jetpack-ps.png
    this.load.spritesheet('player', 'assets/images/blackDragon.png', 95, 96, 4);
    this.load.spritesheet('skeleton', 'assets/images/skeleton2.png', 64, 63, 7);
    this.load.spritesheet('missile', 'assets/images/missiles-ps.png', 361, 218, 7);

    //Loading audio

    this.load.audio('gameMusic',['assets/audio/Pamgaea.mp3','assets/audio/Pamgaea.ogg']);
    this.load.audio('rocket','assets/audio/rocket.wav');
    this.load.audio('bounce','assets/audio/bounce.wav');
    this.load.audio('coin','assets/audio/coin.wav');
    this.load.audio('death','assets/audio/death.wav');

    //event when preload is completed

    this.load.onLoadComplete.add(this.onLoadComplete,this);

  },

  create: function() {
    //Make sure preloadbar stays waiting for the preload function
    this.preloadBar.cropEnabled = false;

  },
  update : function(){   //runs constantly
    //determining if audio has been decoded from mp3 or ogg and ready is true
    if(this.cache.isSoundDecoded('gameMusic') && this.ready ===true){
      //starts Main Menu
      this.state.start('MainMenu');

    }
  },
  onLoadComplete: function(){
    this.ready = true;
  }

};
