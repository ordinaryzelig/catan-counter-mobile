var BarbariansBattleOutcome;
BarbariansBattleOutcome = (function() {
  function BarbariansBattleOutcome(barbarians) {
    this.barbarians = barbarians;
    this.catanDefense = this.barbarians.game.catanDefense;
    this.winner = catanSuccessfullyDefends() ? this.catanDefense : this.barbarians;
  }
  BarbariansBattleOutcome.prototype.catanSuccessfullyDefends = function() {
    return this.catanDefense.strength() >= this.barbarians.strength();
  };
  BarbariansBattleOutcome.prototype.barbariansWin = function() {
    return !catanSuccessfullyDefends();
  };
  return BarbariansBattleOutcome;
})();