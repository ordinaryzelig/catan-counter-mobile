var Player;
Player = (function() {
  function Player(atts) {
    if (atts == null) {
      atts = {};
    }
    this.game = atts['game'];
    this.soldiers = new PlayableSet();
    this.developmentCardVictoryPoints = new PlayableSet();
  }
  Player.prototype.setup = function() {
    var i, _results;
    this.createSettlements();
    this.createCities();
    _results = [];
    for (i = 1; i <= 2; i++) {
      _results.push(this.buildSettlement());
    }
    return _results;
  };
  Player.prototype.victoryPoints = function() {
    return (this.settlements.inPlay().length * 1) + (this.cities.inPlay().length * 2) + (this.hasLargestArmy() ? 2 : 0) + (this.hasLongestRoad() ? 2 : 0) + this.developmentCardVictoryPoints.length;
  };
  Player.prototype.hasEnoughVictoryPointsToWin = function() {
    return this.victoryPoints() >= this.game.victoryPointsRequiredToWin;
  };
  Player.prototype.buildSettlement = function() {
    var settlementToBuild;
    settlementToBuild = this.settlements.notInPlay()[0];
    return settlementToBuild.build();
  };
  Player.prototype.createSettlements = function() {
    var i, _results;
    this.settlements = new PlayableSet();
    _results = [];
    for (i = 1; i <= 5; i++) {
      _results.push(this.settlements.push(new Settlement({
        player: this
      })));
    }
    return _results;
  };
  Player.prototype.destroySettlement = function() {
    var settlementToDestroy;
    settlementToDestroy = this.settlements.inPlay()[0];
    if (settlementToDestroy != null) {
      return settlementToDestroy.destroy();
    }
  };
  Player.prototype.canBuildSettlement = function() {
    return this.settlements.notInPlay().length > 0;
  };
  Player.prototype.hasSettlementsToUpgrade = function() {
    return this.settlements.inPlay().length > 0;
  };
  Player.prototype.buildCity = function() {
    var settlementToUpgrade;
    settlementToUpgrade = this.settlements.inPlay()[0];
    if (settlementToUpgrade != null) {
      return settlementToUpgrade.upgradeToCity();
    } else {
      throw 'no settlements to upgrade';
    }
  };
  Player.prototype.createCities = function() {
    var i, _results;
    this.cities = new PlayableSet();
    _results = [];
    for (i = 1; i <= 4; i++) {
      _results.push(this.cities.push(new City({
        player: this
      })));
    }
    return _results;
  };
  Player.prototype.downgradeCity = function() {
    return this.cities.inPlay()[0].downgradeToSettlement();
  };
  Player.prototype.hasCitiesToBuild = function() {
    return this.cities.notInPlay().length > 0;
  };
  Player.prototype.canBuildCity = function() {
    return this.hasCitiesToBuild() && this.hasSettlementsToUpgrade();
  };
  Player.prototype.destroysCityIfDowngraded = function() {
    return !this.canBuildSettlement();
  };
  Player.prototype.playSoldier = function() {
    var soldierToPlay;
    soldierToPlay = this.game.soldiers.notInPlay()[0];
    if (soldierToPlay != null) {
      soldierToPlay.build();
      this.soldiers.push(soldierToPlay);
    }
    return this.checkForLargestArmy();
  };
  Player.prototype.hasLargestArmy = function() {
    if (!this.game.largestArmy.awarded()) {
      return false;
    }
    return this.game.largestArmy.player === this;
  };
  Player.prototype.checkForLargestArmy = function() {
    if (this.soldiers.length >= this.game.largestArmy.numSoldiersNeeded()) {
      return this.game.awardLargestArmyTo(this);
    }
  };
  Player.prototype.hasLongestRoad = function() {
    if (!this.game.longestRoad.awarded()) {
      return false;
    }
    return this.game.longestRoad.player === this;
  };
  Player.prototype.takeLongestRoad = function() {
    return this.game.awardLongestRoadTo(this);
  };
  Player.prototype.showDevelopmentCardVictoryPoints = function(numCards) {
    var card, _i, _len, _ref, _results;
    _ref = this.game.developmentCardVictoryPoints.notInPlay().slice(0, (numCards - 1 + 1) || 9e9);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      card.build();
      card.player = this;
      _results.push(this.developmentCardVictoryPoints.push(card));
    }
    return _results;
  };
  Player.prototype.winByPlayingDevelopmentCardVictoryPoints = function() {
    if (this.canWinByShowingAllDevelopmentCardVictoryPoints()) {
      return this.showDevelopmentCardVictoryPoints(this.numDevelopmentCardVictoryPointsNeededToWin());
    }
  };
  Player.prototype.numDevelopmentCardVictoryPointsNeededToWin = function() {
    return this.game.victoryPointsRequiredToWin - (this.victoryPoints() - this.developmentCardVictoryPoints.length);
  };
  Player.prototype.canWinByShowingAllDevelopmentCardVictoryPoints = function() {
    return (this.game.victoryPointsRequiredToWin - this.victoryPoints()) <= this.game.developmentCardVictoryPoints.notInPlay().length;
  };
  return Player;
})();