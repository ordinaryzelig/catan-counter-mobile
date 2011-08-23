var controller, game;
game = new Game();
controller = {};
controller.resetGame = function(colors) {
  var player, _i, _len, _ref, _results;
  game.setup({
    numPlayers: colors.length
  });
  _ref = game.players;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    _results.push(player.color = colors[game.players.indexOf(player)]);
  }
  return _results;
};