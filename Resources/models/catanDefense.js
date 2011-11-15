var CatanDefense;
CatanDefense = (function() {
  function CatanDefense(options) {
    this.game = options['game'];
  }
  CatanDefense.prototype.strength = function() {
    var knightStrengths, player, _i, _len, _ref;
    knightStrengths = 0;
    _ref = this.game.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      knightStrengths = knightStrengths + player.knightStrength();
    }
    return knightStrengths;
  };
  return CatanDefense;
})();