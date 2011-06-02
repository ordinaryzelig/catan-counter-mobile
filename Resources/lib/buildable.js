var Buildable;
Buildable = (function() {
  function Buildable() {
    this.inPlay = false;
  }
  Buildable.prototype.build = function() {
    return this.inPlay = true;
  };
  Buildable.prototype.destroy = function() {
    return this.inPlay = false;
  };
  return Buildable;
})();