var controller, game;
game = null;
controller = {};
controller.resetGame = function() {
  var player, _i, _len, _ref, _results;
  game = new Game();
  game.setup({
    numPlayers: Game.COLORS.length
  });
  _ref = game.players;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    _results.push(player.color = Game.COLORS[game.players.indexOf(player)]);
  }
  return _results;
};