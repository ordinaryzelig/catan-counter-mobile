var Barbarians;
Barbarians = (function() {
  function Barbarians(options) {
    this.game = options['game'];
  }
  Barbarians.prototype.strength = function() {
    var cities, player, _i, _len, _ref;
    cities = 0;
    _ref = this.game.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      cities = cities + player.cities.inPlay().length;
    }
    return cities;
  };
  return Barbarians;
})();