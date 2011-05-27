var Player;
Player = (function() {
  function Player() {}
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
  Player.prototype.buildSettlement = function() {
    var settlementToBuild;
    settlementToBuild = this.settlements.notInPlay()[0];
    return settlementToBuild.build();
  };
  Player.prototype.buildCity = function() {
    var settlementToUpgrade;
    settlementToUpgrade = this.settlements.inPlay()[0];
    if (settlementToUpgrade != null) {
      return settlementToUpgrade.upgradeToCity();
    }
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
  Player.prototype.victoryPoints = function() {
    return (this.settlements.inPlay().length) + (this.cities.inPlay().length * 2);
  };
  return Player;
})();