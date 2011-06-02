var LargestArmy;
LargestArmy = (function() {
  function LargestArmy(atts) {
    if (atts == null) {
      atts = {};
    }
    this.game = atts['game'];
    this.player = atts['player'];
  }
  LargestArmy.prototype.awarded = function() {
    return !!this.player;
  };
  LargestArmy.prototype.numSoldiersNeeded = function() {
    if (this.awarded()) {
      return this.player.soldiers.length + 1;
    } else {
      return 3;
    }
  };
  return LargestArmy;
})();