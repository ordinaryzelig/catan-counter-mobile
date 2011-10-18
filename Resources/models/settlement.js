var Settlement;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Settlement = (function() {
  __extends(Settlement, Buildable);
  function Settlement(atts) {
    if (atts == null) {
      atts = {};
    }
    Settlement.__super__.constructor.apply(this, arguments);
    this.player = atts['player'];
  }
  Settlement.prototype.upgradeToCity = function() {
    var cityToBuild;
    if (this.inPlay) {
      cityToBuild = this.player.cities.notInPlay()[0];
      if (cityToBuild != null) {
        cityToBuild.build();
        this.destroy();
      }
      return cityToBuild;
    }
  };
  return Settlement;
})();