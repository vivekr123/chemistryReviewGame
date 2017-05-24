
var runner = function(){};

runner.Boot = function(){};

//for when the game is booted

runner.Boot.prototype = {
  preload: function(){
    this.load.image('preloadbar','assets/images/preloader-bar.png');
  },

  create: function(){
    this.game.stage.backgroundColor = '#fff';
    //Doesn't support multi-touch
    this.input.maxPointers = 1;

    //if computer

    if(this.game.device.desktop){
      this.scale.pageAlignHorizontally = true;
    }
    //if phone/smaller device
    else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 568;
      this.scale.minHeight = 600;
      this.scale.maxWidth = 2048;
      this.scale.maxHeight = 1536;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    }

    //Game settings are set
    //Actual preloarder started

    this.state.start('Preloader');

  }


};
