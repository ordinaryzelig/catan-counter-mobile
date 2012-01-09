var Player;
Player = (function() {
  function Player(atts) {
    var i;
    if (atts == null) {
      atts = {};
    }
    this.game = atts['game'];
    this.createSettlements();
    this.createCities();
    for (i = 1; i <= 2; i++) {
      this.buildSettlement();
    }
    if (this.game.usesExpansion(CitiesAndKnights)) {
      this.createKnights();
      this.buildCity();
      this.defenderOfCatanCards = [];
    } else {
      this.soldiers = [];
      this.developmentCardVictoryPoints = [];
    }
  }
  Player.prototype.victoryPoints = function() {
    var component, components, sum, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
    components = ['settlements', 'cities', 'longest road'];
    if (this.game.usesExpansion(CitiesAndKnights)) {
      _ref = ['defender of Catan cards'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        components.push(component);
      }
    } else {
      _ref2 = ['largest army', 'development card victory points'];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        component = _ref2[_j];
        components.push(component);
      }
    }
    sum = 0;
    for (_k = 0, _len3 = components.length; _k < _len3; _k++) {
      component = components[_k];
      sum = sum + this.victoryPointsFor(component);
    }
    return sum;
  };
  Player.prototype.victoryPointsFor = function(component) {
    switch (component) {
      case 'settlements':
        return this.settlements.inPlay().length;
      case 'cities':
        return this.cities.inPlay().length * 2;
      case 'longest road':
        if (this.hasLongestRoad()) {
          return 2;
        } else {
          return 0;
        }
        break;
      case 'largest army':
        if (this.hasLargestArmy()) {
          return 2;
        } else {
          return 0;
        }
        break;
      case 'development card victory points':
        return this.developmentCardVictoryPoints.length;
      case 'defender of Catan cards':
        return this.defenderOfCatanCards.length;
      default:
        throw "don't know how to calculate victory points for " + component;
    }
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
    this.settlements = [];
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
    this.cities = [];
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
  Player.prototype.unmetropolizedCities = function() {
    var cities, city, _i, _len, _ref;
    cities = [];
    _ref = this.cities.inPlay();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      city = _ref[_i];
      if (!city.metropolis) {
        cities.push(city);
      }
    }
    return cities;
  };
  Player.prototype.immune = function() {
    return this.unmetropolizedCities().length === 0;
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
  Player.prototype.destroySoldier = function() {
    var hadLargestArmy, soldier;
    hadLargestArmy = this.hasLargestArmy();
    soldier = this.soldiers[0];
    if (soldier != null) {
      soldier.destroy();
      soldier.player = null;
      this.soldiers.splice(this.soldiers.indexOf(soldier), 1);
      if (hadLargestArmy) {
        return this.game.reassignPreviousPlayerWithLargestArmy();
      }
    }
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
  Player.prototype.createKnights = function() {
    var idx, knight, knightId, level;
    this.knights = [];
    knightId = 1;
    for (level = 1; level <= 3; level++) {
      for (idx = 1; idx <= 2; idx++) {
        knight = new Knight({
          level: level,
          player: this,
          id: knightId
        });
        this.knights.push(knight);
        knightId = knightId + 1;
      }
    }
    this.knights.findById = function(id) {
      var knight, _i, _len;
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        knight = this[_i];
        if (knight.id === id) {
          return knight;
        }
      }
    };
    return this.knights;
  };
  Player.prototype.buildKnight = function() {
    var knightToBuild;
    knightToBuild = this.knights.notInPlay().level(1)[0];
    if (knightToBuild != null) {
      knightToBuild.build();
      return knightToBuild;
    }
  };
  Player.prototype.knightStrength = function() {
    var knight, strength, _i, _len, _ref;
    strength = 0;
    _ref = this.knights.inPlay().active();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      knight = _ref[_i];
      strength = strength + knight.level;
    }
    return strength;
  };
  Player.prototype.canBuildKnight = function() {
    return this.knights.notInPlay().level(1).length > 0;
  };
  Player.prototype.deactivateAllKnights = function() {
    var knight, _i, _len, _ref, _results;
    _ref = this.knights.inPlay().active();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      knight = _ref[_i];
      _results.push(knight.deactivate());
    }
    return _results;
  };
  return Player;
})();