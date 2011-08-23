var gui;
gui = {};
gui.dashboardItems = {};
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
    _results.push((function() {
      switch (item.componentType) {
        case 'settlement':
        case 'city':
          return item.badge = player[pluralize(item.componentType)].inPlay().length;
        case 'longest road':
          return item.badge = player.hasLongestRoad() ? 1 : 0;
      }
    })());
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
  var reorderedTabs, reorderedViews;
  reorderedTabs = reorderByColor(colors, this.colorNav.labels);
  this.setColorNavTabs(reorderedTabs);
  reorderedViews = reorderByColor(colors, this.scrollableView.views);
  this.setScrollableViews(reorderedViews);
  return this.scrollTo(0);
};
gui.setScrollableViews = function(newViews) {
  return this.scrollableView.views = newViews;
};
gui.setColorNavTabs = function(tabs) {
  return this.colorNav.labels = tabs;
};
gui.changePlayersMenuVictoryPoints = function(player) {
  var row, _i, _len, _ref, _results;
  _ref = this.playersTable.data[0].rows;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    row = _ref[_i];
    _results.push(row.playerColor === player.color ? row.children[2].text = player.victoryPoints() : void 0);
  }
  return _results;
};
gui.updatePlayerVictoryPoints = function(player) {
  this.changePlayersMenuVictoryPoints(player);
  return this.changeTitle(player);
};
gui.updatePlayerVictoryPointsAndBadges = function(player) {
  this.updateBadges(player);
  return this.updatePlayerVictoryPoints(player);
};