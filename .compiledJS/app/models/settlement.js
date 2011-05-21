var Settlement;
Settlement = (function() {
  function Settlement() {}
  Settlement.prototype.upgradeToCity = function() {
    return this.destroy();
  };
  return Settlement;
})();