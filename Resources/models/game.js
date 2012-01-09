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
    this.settings = options['settings'];
    if (this.settings == null) {
      this.settings = {};
    }
    this.createPlayers(options['numPlayers']);
    this.victoryPointsRequiredToWin = 10;
    this.createLongestRoad();
    if (this.usesExpansion(CitiesAndKnights)) {
      this.victoryPointsRequiredToWin = this.victoryPointsRequiredToWin + 3;
      this.createBarbarians();
      this.createCatanDefense();
      this.createDefenderOfCatanCards();
    } else {
      this.createSoldiers();
      this.createLargestArmy();
      this.createDevelopmentCardVictoryPoints();
    }
  }
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
    this.soldiers = [];
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
    this.developmentCardVictoryPoints = [];
    _results = [];
    for (idx = 1; idx <= 5; idx++) {
      _results.push(this.developmentCardVictoryPoints.push(new DevelopmentCardVictoryPoint({
        game: this
      })));
    }
    return _results;
  };
  Game.prototype.createBarbarians = function() {
    return this.barbarians = new Barbarians({
      game: this
    });
  };
  Game.prototype.createCatanDefense = function() {
    return this.catanDefense = new CatanDefense({
      game: this
    });
  };
  Game.prototype.createDefenderOfCatanCards = function() {
    var idx, _results;
    this.defenderOfCatanCards = [];
    _results = [];
    for (idx = 1; idx <= 8; idx++) {
      _results.push(this.defenderOfCatanCards.push(new DefenderOfCatanCard()));
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
  Game.prototype.playersByKnightStrength = function() {
    var players;
    players = this.players.slice(0);
    return players.sort(function(a, b) {
      return b.knightStrength() - a.knightStrength();
    });
  };
  Game.prototype.playersWhoContributeMostKnights = function() {
    var defenders, maxKnightStrength, player, playersByKnightStrength, _i, _len;
    defenders = [];
    playersByKnightStrength = this.playersByKnightStrength();
    maxKnightStrength = playersByKnightStrength[0].knightStrength();
    for (_i = 0, _len = playersByKnightStrength.length; _i < _len; _i++) {
      player = playersByKnightStrength[_i];
      if (player.knightStrength() === maxKnightStrength) {
        defenders.push(player);
      }
    }
    return defenders;
  };
  Game.prototype.playersNotImmuneWhoContributeLeastKnights = function() {
    var minKnightStrength, player, players, playersNotImmune, _i, _j, _len, _len2, _ref;
    playersNotImmune = [];
    _ref = this.playersByKnightStrength();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      if (!player.immune()) {
        playersNotImmune.push(player);
      }
    }
    if (playersNotImmune.length === 0) {
      return [];
    }
    minKnightStrength = playersNotImmune[playersNotImmune.length - 1].knightStrength();
    players = [];
    for (_j = 0, _len2 = playersNotImmune.length; _j < _len2; _j++) {
      player = playersNotImmune[_j];
      if (player.knightStrength() === minKnightStrength) {
        players.push(player);
      }
    }
    return players;
  };
  Game.prototype.usesExpansion = function(expansion) {
    return __indexOf.call(this.settings.expansions, expansion) >= 0;
  };
  Game.prototype.barbariansStrength = function() {
    var player, strength, _i, _len, _ref;
    strength = 0;
    _ref = this.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      strength = strength + player.cities.inPlay().length;
    }
    return strength;
  };
  Game.prototype.awardDefenderOfCatanCardTo = function(player) {
    var card;
    card = this.defenderOfCatanCards.pop();
    if (card == null) {
      return null;
    }
    player.defenderOfCatanCards.push(card);
    return card;
  };
  return Game;
})();
Game.COLORS = ['red', 'blue', 'orange', 'white', 'green', 'brown'];
Game.EXPANSIONS = [CitiesAndKnights];