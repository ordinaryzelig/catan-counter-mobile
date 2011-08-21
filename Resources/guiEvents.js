var gui;
gui = {};
gui.dashboardItems = {};
gui.currentPlayer = null;
gui.tabs = {
  PLAYERS_MENU: 0,
  PLAYERS: 1
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
  return playersWindow.title = player.color + ' (' + player.victoryPoints() + ')';
};
gui.flexSpace = Titanium.UI.createButton({
  systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
gui.navigateTo = function(tab_id) {
  return this.navigation.setActiveTab(tab_id);
};
gui.scrollTo = function(index) {
  var view;
  view = this.scrollableView.views[index];
  this.currentPlayer = game.playerByColor(view.playerColor);
  this.scrollableView.scrollToView(view);
  return this.changeTitle(this.currentPlayer);
};
gui.reorderNavigation = function(colors) {
  var reorderedTabs, reorderedViews, view, _i, _j, _len, _len2, _ref;
  reorderedViews = reorderByColor(colors, this.scrollableView.views);
  _ref = this.scrollableView.views;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    view = _ref[_i];
    this.scrollableView.removeView(view);
  }
  for (_j = 0, _len2 = reorderedViews.length; _j < _len2; _j++) {
    view = reorderedViews[_j];
    this.scrollableView.addView(view);
  }
  reorderedTabs = reorderByColor(colors, this.colorNav.labels);
  return this.colorNav.labels = reorderedTabs;
};