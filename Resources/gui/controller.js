var controller, game;
game = null;
controller = {};
controller.newGame = function(settings) {
  var player, _i, _len, _ref, _results;
  if (settings == null) {
    settings = {};
  }
  game = new Game({
    numPlayers: Game.COLORS.length,
    settings: settings
  });
  _ref = game.players;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    _results.push(player.color = Game.COLORS[game.players.indexOf(player)]);
  }
  return _results;
};