//game varialbe that creates new Phaser game with full width, height, and allows Phaser to choose the game renderer.
//Last argument for id (other content to pass in)

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');


//Adds the boot state to the game object
game.state.add('Boot', runner.Boot);
game.state.add('Preloader',runner.Preload);
game.state.add('MainMenu',runner.MainMenu);
game.state.add('Game', runner.Game);
//starts with boot state
game.state.start('Boot');
