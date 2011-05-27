var Game;
Game = (function() {
  function Game(atts) {
    if (atts == null) {
      atts = {};
    }
    this.createPlayers(atts['numPlayers']);
  }
  Game.prototype.createPlayers = function(num) {
    var i, _results;
    this.players = [];
    _results = [];
    for (i = 1; 1 <= num ? i <= num : i >= num; 1 <= num ? i++ : i--) {
      _results.push(this.players.push(new Player(this)));
    }
    return _results;
  };
  return Game;
})();