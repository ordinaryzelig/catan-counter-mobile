describe('Game', function() {
  it('creates players and soldiers', function() {
    var game, numPlayers;
    numPlayers = 4;
    game = new Game();
    game.setup({
      numPlayers: numPlayers
    });
    expect(game.players.length).toEqual(numPlayers);
    return expect(game.soldiers.length).toEqual(14);
  });
  return it('access players by color', function() {
    var color, colors, game, idx, numPlayers, _i, _len, _ref, _results;
    colors = ['red', 'white', 'blue'];
    numPlayers = colors.length;
    game = new Game();
    game.setup({
      numPlayers: numPlayers
    });
    for (idx = 0, _ref = numPlayers - 1; 0 <= _ref ? idx <= _ref : idx >= _ref; 0 <= _ref ? idx++ : idx--) {
      game.players[idx].color = colors[idx];
    }
    _results = [];
    for (_i = 0, _len = colors.length; _i < _len; _i++) {
      color = colors[_i];
      _results.push(expect(game.playerByColor(color).color).toEqual(color));
    }
    return _results;
  });
});