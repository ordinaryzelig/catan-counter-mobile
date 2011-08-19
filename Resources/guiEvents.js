var gui;
gui = {
  dashboardItems: []
};
gui.updateBadges = function() {
  var item, player, _i, _len, _ref, _results;
  _ref = this.dashboardItems;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    item = _ref[_i];
    player = game.playerByColor(item.color);
    _results.push(item.badge = player[pluralize(item.componentType)].inPlay().length);
  }
  return _results;
};
gui.changeTitle = function(player) {
  return window.title = player.color + ' (' + player.victoryPoints() + ')';
};