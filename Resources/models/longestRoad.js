var LongestRoad;
LongestRoad = (function() {
  function LongestRoad(atts) {
    if (atts == null) {
      atts = {};
    }
    this.game = atts['game'];
    this.player = atts['player'];
  }
  LongestRoad.prototype.awarded = function() {
    return !!this.player;
  };
  return LongestRoad;
})();