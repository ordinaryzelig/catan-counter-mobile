var Game;
var __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
Game = (function() {
  function Game(options) {
    if (options == null) {
      options = {};
    }
    this.createPlayers(options['numPlayers']);
    this.createSoldiers();
    this.createLargestArmy();
    this.createLongestRoad();
    this.createDevelopmentCardVictoryPoints();
    this.settings = options['settings'];
  }
  Game.prototype.victoryPointsRequiredToWin = 10;
  Game.prototype.createPlayers = function(num) {
    var i, player, _results;
    this.players = [];
    _results = [];
    for (i = 1; 1 <= num ? i <= num : i >= num; 1 <= num ? i++ : i--) {
      player = new Player({
        game: this
      });
      _results.push(this.players.push(player));
    }
    return _results;
  };
  Game.prototype.createSoldiers = function() {
    var i, _results;
    this.soldiers = new PlayableSet();
    this.previousPlayersWithLargestArmy = [];
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
  Game.prototype.createDevelopmentCardVictoryPoints = function() {
    var idx, _results;
    this.developmentCardVictoryPoints = new PlayableSet();
    _results = [];
    for (idx = 1; idx <= 5; idx++) {
      _results.push(this.developmentCardVictoryPoints.push(new DevelopmentCardVictoryPoint({
        game: this
      })));
    }
    return _results;
  };
  Game.prototype.awardLargestArmyTo = function(player) {
    this.previousPlayersWithLargestArmy.push(this.largestArmy.player);
    return this.largestArmy.player = player;
  };
  Game.prototype.previousPlayerWithLargestArmy = function() {
    return this.previousPlayersWithLargestArmy[this.previousPlayersWithLargestArmy.length - 1];
  };
  Game.prototype.reassignPreviousPlayerWithLargestArmy = function() {
    var reassignTo;
    reassignTo = this.previousPlayersWithLargestArmy.pop();
    return this.largestArmy.player = reassignTo;
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
  Game.prototype.usesExpansion = function(expansion) {
    return __indexOf.call(this.settings.expansions, expansion) >= 0;
  };
  return Game;
})();
Game.COLORS = ['red', 'blue', 'orange', 'white', 'green', 'brown'];
Game.EXPANSIONS = [CitiesAndKnights];