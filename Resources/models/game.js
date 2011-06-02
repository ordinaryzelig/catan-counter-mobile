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
  return Game;
})();