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
gui.flexSpace = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
gui.navigateTo = function(tab_id) {
  return this.navigation.setActiveTab(tab_id);
};
gui.scrollTo = function(index) {
  var view;
  view = this.scrollableView.views[index];
  this.currentPlayer = game.playerByColor(view.playerColor);
  this.colorNav.index = index;
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
gui.updatePlayerVictoryPoints = function(player) {
  this.changePlayersMenuVictoryPoints(player);
  return this.changeTitle(player);
};
gui.changePlayersMenuVictoryPoints = function(player) {
  var row, _i, _len, _ref, _results;
  alert(player.victoryPoints());
  _ref = this.playersTable.data[0].rows;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    row = _ref[_i];
    _results.push(row.playerColor === player.color ? row.children[2].text = player.victoryPoints() : void 0);
  }
  return _results;
};