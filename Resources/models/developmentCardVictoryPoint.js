var DevelopmentCardVictoryPoint;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
DevelopmentCardVictoryPoint = (function() {
  __extends(DevelopmentCardVictoryPoint, Buildable);
  function DevelopmentCardVictoryPoint(atts) {
    if (atts == null) {
      atts = {};
    }
    DevelopmentCardVictoryPoint.__super__.constructor.apply(this, arguments);
    this.game = atts['game'];
    this.player = null;
  }
  return DevelopmentCardVictoryPoint;
})();