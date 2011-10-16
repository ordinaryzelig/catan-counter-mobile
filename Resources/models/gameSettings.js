var GameSettings;
GameSettings = (function() {
  function GameSettings(options) {
    if (options == null) {
      options = {};
    }
    this.expansions = options['expansions'];
  }
  return GameSettings;
})();