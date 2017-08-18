runner.Game = function(){

  //Player can rotate 20 degrees
  this.playerMinAngle = -20;
  this.playerMaxAngle = 20;

  this.coinRate = 1000;
  this.coinTimer = 0;

  //800

  this.missileRate = 1800;
  this.missileTimer = 0;

  this.enemyRate = 2000;
  this.enemyTimer = 0;

  this.score = 0;

  this.i=0;

  this.j=0;

  iCounter = 0;

  this.jsonText =

  {

    "Potassium":["(Guess the element)" +"\n"+ "Large energy jump between the first and second IE","Has a Zeff value lower than 3", "Highly soluble and Highly reactive in water","Noble gas in electron configuration: Argon","Forms a strong base"],
    "Strontium":["Has 4d^10 in electron configuration","Mostly soluble, not with sulfate","Jump between the second and third IE","Larger radius than arsenic","Pretty Reactive with water"],
    "Bromine":["Reacts with alkanes to turn colorless","Has 4s2 in electron configuration","Zeff of 7","Brown color","Smaller radius than Iodine"],
    "Krypton":["Has an extremely high IE","Noble gas","4 energy levels","Typical isotope has atomic mass of 85","Similar to Superman’s Weakness"],
    "Silver":["Oxidation number of +1","Soluble as a Nitrate","Does not have a complete d subshell","It is diamagnetic","It is a metal"],
    "Boron":["Jump between the third and fourth IE","Has an incomplete p orbital","Has only 3 bonding sites in lewis structure","Nonmetal within the first 25 elements","Zeff value of 3"],
    "Nitrogen":["Can form H-bonds with Hydrogen","Triple bonded when gas","Diatomic","One large jump in IE (excluding the break for transition metals on periodic table)","Smaller element, but larger than Fluorine"],
    "Gallium":["Stopped being used as computer chips due to poor performance in higher heats especially since they were needed on rockets","Similar IE jumps as element of e- configuration of [Ne] 3s2 3p1","Has an incomplete p suborbital","It is a metal","It is diamagnetic"],
    "Boron Trifluoride":["(Compounds from now on) Trigonal planar molecular geometry","Central atom has a maximum of three bonding sites","Central atom bonded to three extremely electronegative atoms","There are no lone pairs on the central atom","Compound has molar mass of 68 g/mol"],
    "Acetic Acid":["There is one double bond in the structure","It is not a strong acid","Made of elements with atomic number 12 or less","Comprised of a polyatomic ion and a hydrogen ion","Atomic mass is 60 g/mol"],
    "Phosphorous Pentafluoride":["The central atom has a zeff value of 5","It is an expanded octet","The terminal atoms are extremely electronegative","The central atom is not a metal, not astatine, and doesn’t form a diatomic molecule ","It is not a resonance structure"],
    "Carbonate":["It has an oxidation number of 2-","Forms precipitates when mixed with other group one or two elements","The three terminal atoms are group 6 elements and are commonly found in air","The bond lengths are not the length of a single, nor double bond","Central atom is found in all organic compounds"],
    "Potassium Nitrate":["Single element has a zeff of 1 and the polyatomic ion with oxidation number of -1","Polyatomic ion is a resonance structure","The central atom in the polyatomic ion is bonded to three terminal atoms","Extremely soluble in water","The compound contains Nitrogen"],
    "Copper Sulfate":["The single element is a transition metal with a common isotopic mass of 63 g/mol","Blue color when hydrated","The central atom in the polyatomic ion is bonded to four terminal atoms","A single element is bonded to a polyatomic ion","Atomic mass of 159.6 g/mol"],
    "Done" : ["Congratulations! You finished the hardest chemistry game in existence :)"]

};

};


runner.Game.prototype = {
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
    //this.player.animations.add('fly', [0,1,2,3,2,1]);
    this.player.animations.add('fly', [0,1,2,3]);
    //8 - frames/sec
    this.player.animations.play('fly', 7, true);

    //Using the arcade physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 490; //400

    //enables physics for the ground
    this.game.physics.arcade.enableBody(this.ground);
    //body - reference to physics on the sprite
    this.ground.body.allowGravity = false;
    //not affected by other sprites
    this.ground.body.immovable = true;

    this.game.physics.arcade.enableBody(this.player);
    //Player collides with the edges of the world
    this.player.body.collideWorldBounds = true;
    //Bounces back if collides with 1/4 force back
    this.player.body.bounce.set(0.25);

    //coins
    //Coins added to groups (containers)
    this.coins = this.game.add.group();

    this.missiles = this.game.add.group();

    //Enemy group
    this.enemies = this.game.add.group();


      this.scoreText = game.add.text(8, 10, "Score: 0",{font:'Copperplate Gothic',align:'center', fontSize:30,  fill:'white'});

//AUDIO


    this.jetSound = this.game.add.audio('rocket');
    this.coinSound = this.game.add.audio('coin');
    this.gameMusic = this.game.add.audio('gameMusic');
    this.deathSound = this.game.add.audio('death');

    //this.gameMusic.play('',0,true);

  },
  update: function(){
    //When mouse held down, increase velocity




    if(this.game.input.activePointer.isDown){
      this.player.body.velocity.y -= 25;
      //Plays sound when user clicks down
      if(!this.jetSound.isPlaying){
        //True loops the sound and 0.5 is volume
        //this.jetSound.play('',0,true,0.5);
      } else{
      //  this.jetSound.volume = 0;
      //  this.jetSound.stop();
      //  this.jetSound.loop=false;
      }
    }
    //Dealing with leaning
    if(this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown){
      if(this.player.angle > 0 ) {
        this.player.angle = 0;
      }
      if(this.player.angle > this.playerMinAngle){
        this.player.angle -=0.5;
      }
    } else if(this.player.body.velocity.y >=0 && !this.game.input.activePointer.isDown){
      if(this.player.angle < this.playerMaxAngle){
        this.player.angle +=0.5;
      }
    }
    //Dealing with coin timer for creating coins
    if(this.coinTimer < this.game.time.now) {
      this.createCoin();
      this.coinTimer = this.game.time.now + this.coinRate;
    }

    //For missiles
    if(this.missileTimer < this.game.time.now){
      this.createMissile();
      this.missileTimer = this.game.time.now + this.missileRate;
    }

    if(this.enemyTimer < this.game.time.now) {
      this.createEnemy();
      this.enemyTimer = this.game.time.now + this.enemyRate;
    }

    //checks for collision events between the two - callback, process function, context of callback
    this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);
    //Player overalps coin - collisions imply physics
    this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.missiles, this.missileHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);

  },
  shutdown: function() {
    //Cleans the assets for Phaser. If not for this, Phaser tries to revive removed assets
    this.coins.destroy();
    this.missiles.destroy();
    this.enemies.destroy();
    this.score = 0;
    this.coinTimer = 0;
    this.missileTimer = 0;
    this.enemyTimer = 0;

  },
  createCoin : function(){
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(50, this.game.world.height-190);

    //checking coins group and finds first coin that has exists parameter false
    var coin = this.coins.getFirstExists(false);
    if(!coin){
      coin = new Coin(this.game, 0, 0);
      this.coins.add(coin);
    }

    coin.reset(x , y);
    coin.revive();

  },
  createMissile : function(){
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(50, this.game.world.height-192);

    //checking missiles group and finds first coin that has exists parameter false
    var missile = this.missiles.getFirstExists(false);
    if(!missile){
      missile = new Missile(this.game, 0, 0);
      this.missiles.add(missile);
    }

    missile.reset(x , y);
    missile.revive();

  },
  createEnemy : function(){
    var x = this.game.width;
    var y = this.game.world.height-114;


    //checking missiles group and finds first coin that has exists parameter false
    var enemy = this.enemies.getFirstExists(false);
    if(!enemy){
      enemy = new Enemy(this.game, 0, 0);
      //enemy.body.velocity.x = -300;
      this.enemies.add(enemy);
    }

    enemy.reset(x , y);
    enemy.revive();

  },
  //method for when player and ground contact
  groundHit : function(player, ground){
    player.body.velocity.y = -150;
  },
  coinHit : function(player,coin){
    this.score ++;
    coin.kill();
    this.scoreText.text = 'Score: '+ this.score;
    //this.coinSound.play(this.game,'',0.5,false);
    //this.coinSound.play();
    this.coinSound.volume=0.3;

    if(this.score % 50 == 0){

      var iTest = 0;

      answerFunction(this.jsonText,this.j,this.i, this.scoreText, this.score);

      this.score += 5 - iCounter;

      iCounter = 0;

      this.j++;

    }

  },


  missileHit : function(player,missile){

    player.kill();
    missile.kill();

    this.deathSound.play();
    this.deathSound.volume = 0.075;

    //Stops all scene moving
    this.ground.stopScroll();
    this.background.stopScroll();
    this.foreground.stopScroll();

    this.gameMusic.stop();

    //Stops the missiles
    this.missiles.setAll('body.velocity.x', 0);
    //Stops the coins
    this.coins.setAll('body.velocity.x', 0);

    this.enemies.setAll('body.velocity.x',0);

    //Stops the generation of more
    this.missileTimer = Number.MAX_VALUE;
    this.coinTimer = Number.MAX_VALUE;
    this.enemyTimer = Number.MAX_VALUE;

    var scoreboard = new Scoreboard(this.game);
    scoreboard.show(this.score);

  },
  enemyHit : function(player,enemy){

    player.kill();
    enemy.kill();

    this.deathSound.play();
    this.deathSound.volume = 0.075;

    //Stops all scene moving
    this.ground.stopScroll();
    this.background.stopScroll();
    this.foreground.stopScroll();

    this.gameMusic.stop();

    //Stops the missiles
    this.missiles.setAll('body.velocity.x', 0);
    //Stops the coins
    this.coins.setAll('body.velocity.x', 0);

    this.enemies.setAll('body.velocity.x', 0);

    //Stops the generation of more
    this.missileTimer = Number.MAX_VALUE;
    this.coinTimer = Number.MAX_VALUE;
    this.enemyTimer = Number.MAX_VALUE;

    var scoreboard = new Scoreboard(this.game);
    scoreboard.show(this.score);

  }


};

 var answerFunction = function(jsonText,j,i,scoText,score){

   //var question = new Question(this.game);
   //question.show(this.score);

   //this.game.paused = true;


   var keys = Object.keys(jsonText);

   var currElement = ""+keys[j];

   var promptText = "";

   var hints = jsonText[currElement];

   for(k=0; k<=i;k++){

     promptText += hints[k] + "\n";

   }

   var answer = currElement;

   var ansInput = "";

   ansInput = prompt(promptText);

   if(ansInput == answer){

     j++;
     scoText.text = 'Score: '+ score;

   }

   else if(ansInput!=answer && i<4){

   //promptText += questions[i] +"\n" ;
   iCounter++;
   ++i;

   answerFunction(jsonText,j,i,scoText,score);



 }

 }
