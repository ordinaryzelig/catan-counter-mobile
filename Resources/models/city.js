var City;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
City = (function() {
  function City(atts) {
    if (atts == null) {
      atts = {};
    }
    City.__super__.constructor.apply(this, arguments);
    this.player = atts['player'];
  }
  __extends(City, Buildable);
  City.prototype.downgradeToSettlement = function() {
    this.destroy();
    return this.player.buildSettlement();
  };
  return City;
})();