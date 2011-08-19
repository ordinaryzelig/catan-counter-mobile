var gui;
gui = {
  dashboardItems: {}
};
gui.updateBadges = function(player) {
  var item, _i, _len, _ref, _results;
  _ref = this.dashboardItems[player.color];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    item = _ref[_i];
    _results.push(item.badge = player[pluralize(item.componentType)].inPlay().length);
  }
  return _results;
};
gui.changeTitle = function(player) {
  return window.title = player.color + ' (' + player.victoryPoints() + ')';
};
gui.flexSpace = Titanium.UI.createButton({
  systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});