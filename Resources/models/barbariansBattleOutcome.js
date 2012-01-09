var BarbariansBattleOutcome;
BarbariansBattleOutcome = (function() {
  function BarbariansBattleOutcome(barbarians) {
    this.barbarians = barbarians;
    this.game = this.barbarians.game;
    this.catanDefense = this.barbarians.game.catanDefense;
    this.catanSuccessfullyDefends = this.catanDefense.strength() >= this.barbarians.strength();
    this.barbariansWin = !this.catanSuccessfullyDefends;
    this.calculateDefendersOfCatan();
    this.calculatePlayersWhoLoseCity();
    this.composeSummary();
  }
  BarbariansBattleOutcome.prototype.calculateDefendersOfCatan = function() {
    return this.defendersOfCatan = this.catanSuccessfullyDefends ? this.game.playersWhoContributeMostKnights() : [];
  };
  BarbariansBattleOutcome.prototype.calculatePlayersWhoLoseCity = function() {
    var player, _i, _len, _ref, _results;
    this.playersWhoLoseCity = this.barbariansWin ? this.game.playersNotImmuneWhoContributeLeastKnights() : [];
    this.playersWhoCompletelyLoseCity = [];
    _ref = this.playersWhoLoseCity;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      _results.push(!player.canBuildSettlement() ? this.playersWhoCompletelyLoseCity.push(player) : void 0);
    }
    return _results;
  };
  BarbariansBattleOutcome.prototype.composeSummary = function() {
    if (this.barbariansWin) {
      this.summary = this.cityLossSummary();
      if (this.playersWhoCompletelyLoseCity.length) {
        this.summary = "" + this.summary + " " + (this.completeCityLossSummary());
      }
    } else {
      this.summary = this.catanDefendedSummary();
    }
    return this.summary;
  };
  BarbariansBattleOutcome.prototype.cityLossSummary = function() {
    var colors;
    colors = _.map(this.playersWhoLoseCity, function(player) {
      return player.color;
    });
    return colors.join(', ') + ' will lose a city.';
  };
  BarbariansBattleOutcome.prototype.completeCityLossSummary = function() {
    var colors;
    colors = _.map(this.playersWhoCompletelyLoseCity, function(player) {
      return player.color;
    });
    return colors.join(', ') + ' will completely lose a city.';
  };
  BarbariansBattleOutcome.prototype.catanDefendedSummary = function() {
    var colors;
    if (this.defendersOfCatan.length > 1) {
      colors = _.map(this.defendersOfCatan, function(player) {
        return player.color;
      });
      return "" + (colors.join(', ')) + " will have defended Catan and receive a progress card.";
    } else {
      return "" + (_.first(this.defendersOfCatan).color) + " will be the Defender of Catan and receive 1 Victory Point.";
    }
  };
  BarbariansBattleOutcome.prototype.apply = function() {
    var player, _i, _len, _ref;
    if (this.barbariansWin) {
      _ref = this.playersWhoLoseCity;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.downgradeCity();
      }
    }
    return this.deactivateAllKnights();
  };
  BarbariansBattleOutcome.prototype.deactivateAllKnights = function() {
    var player, _i, _len, _ref, _results;
    _ref = this.game.players;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      _results.push(player.deactivateAllKnights());
    }
    return _results;
  };
  return BarbariansBattleOutcome;
})();