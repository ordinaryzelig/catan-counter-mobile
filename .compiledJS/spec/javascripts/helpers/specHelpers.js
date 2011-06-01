({
  newPlayer: function() {
    var game;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    return game.players[0];
  }
});