var PlayableSet;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PlayableSet = (function() {
  function PlayableSet() {
    PlayableSet.__super__.constructor.apply(this, arguments);
  }
  __extends(PlayableSet, Array);
  PlayableSet.prototype.inPlay = function() {
    return this.filter(function(object) {
      return object.inPlay;
    });
  };
  PlayableSet.prototype.notInPlay = function() {
    return this.filter(function(object) {
      return !object.inPlay;
    });
  };
  return PlayableSet;
})();