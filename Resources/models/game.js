var Game;
Game = (function() {
  function Game() {}
  Game.prototype.setup = function(options) {
    if (options == null) {
      options = {};
    }
    this.createPlayers(options['numPlayers']);
    this.createSoldiers();
    this.createLargestArmy();
    return this.createLongestRoad();
  };
  Game.prototype.victoryPointsRequiredToWin = 10;
  Game.prototype.createPlayers = function(num) {
    var i, player, _results;
    this.players = [];
    _results = [];
    for (i = 1; 1 <= num ? i <= num : i >= num; 1 <= num ? i++ : i--) {
      player = new Player({
        game: this
      });
      player.setup();
      _results.push(this.players.push(player));
    }
    return _results;
  };
  Game.prototype.createSoldiers = function() {
    var i, _results;
    this.soldiers = new PlayableSet();
    _results = [];
    for (i = 1; i <= 14; i++) {
      _results.push(this.soldiers.push(new Soldier({
        game: this
      })));
    }
    return _results;
  };
  Game.prototype.createLongestRoad = function() {
    return this.longestRoad = new LongestRoad({
      game: this
    });
  };
  Game.prototype.createLargestArmy = function() {
    return this.largestArmy = new LargestArmy({
      game: this
    });
  };
  Game.prototype.awardLargestArmyTo = function(player) {
    return this.largestArmy.player = player;
  };
  Game.prototype.awardLongestRoadTo = function(player) {
    return this.longestRoad.player = player;
  };
  Game.prototype.playerByColor = function(color) {
    var player, _i, _len, _ref;
    if (this.playersByColor != null) {
      return this.playersByColor[color];
    }
    this.playersByColor = {};
    _ref = this.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      this.playersByColor[player.color] = player;
    }
    return this.playersByColor[color];
  };
  return Game;
})();
Game.COLORS = ['red', 'blue', 'orange', 'white', 'green', 'brown'];