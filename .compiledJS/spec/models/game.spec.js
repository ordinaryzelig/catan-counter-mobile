describe('Game', function() {
  return it('creates players', function() {
    var game, numPlayers;
    numPlayers = 4;
    game = new Game({
      numPlayers: numPlayers
    });
    return expect(game.players.length).toEqual(numPlayers);
  });
});