describe('Game', function() {
  return it('creates players and soldiers', function() {
    var game, numPlayers;
    numPlayers = 4;
    game = new Game({
      numPlayers: numPlayers
    });
    game.setup({
      numPlayers: numPlayers
    });
    expect(game.players.length).toEqual(numPlayers);
    return expect(game.soldiers.length).toEqual(14);
  });
});