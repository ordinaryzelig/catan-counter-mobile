beforeAll(function() {
  return this.addMatchers({
    toBePlaying: function(expectedSong) {
      this.player = this.actual;
      return this.player.currentlyPlayingSong === expectedSong && this.player.isPlaying;
    }
  });
});
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