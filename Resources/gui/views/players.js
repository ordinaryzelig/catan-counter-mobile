var playersWindow, tab;
playersWindow = Ti.UI.createWindow();
tab = Ti.UI.createTab({
  window: playersWindow,
  icon: tabsPath('players.png'),
  title: 'Players'
});
gui.navigation.addTab(tab);
Ti.include('/gui/events/events.js');
gui.createPlayerViews = function() {
  var dashboard, dashboardItems, item, items, player, view, views, _i, _j, _k, _len, _len2, _len3, _ref;
  views = [];
  _ref = game.players;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    dashboardItems = [this.createSettlementDashboardItem(player), this.createCityDashboardItem(player), this.createLongestRoadDashboardItem()];
    if (game.usesExpansion(CitiesAndKnights)) {
      items = [this.createKnightDashboardItem(player), this.createDefenderOfCatanCardItem(player)];
      for (_j = 0, _len2 = items.length; _j < _len2; _j++) {
        item = items[_j];
        dashboardItems.push(item);
      }
    } else {
      items = [this.createSoldierDashboardItem(), this.createDevelopmentCardVictoryPointDashboardItem()];
      for (_k = 0, _len3 = items.length; _k < _len3; _k++) {
        item = items[_k];
        dashboardItems.push(item);
      }
    }
    gui.dashboardItems[player.color] = dashboardItems;
    dashboard = Ti.UI.createDashboardView({
      data: dashboardItems,
      editable: false,
      background: '#aaa'
    });
    dashboard.addEventListener('click', componentClick);
    view = Ti.UI.createView();
    view.add(dashboard);
    view.playerColor = player.color;
    views.push(view);
  }
  return views;
};
gui.createPlayerDashboardItem = function(componentType, player) {
  return dashboardItem({
    image: imagesPath(componentType + '_' + player.color + '.png'),
    componentType: componentType
  });
};
gui.createSettlementDashboardItem = function(player) {
  return this.createPlayerDashboardItem('settlement', player);
};
gui.createCityDashboardItem = function(player) {
  return this.createPlayerDashboardItem('city', player);
};
gui.createLongestRoadDashboardItem = function() {
  return dashboardItem({
    image: imagesPath('longest_road.png'),
    componentType: 'longestRoad'
  });
};
gui.createSoldierDashboardItem = function() {
  return dashboardItem({
    image: imagesPath('soldier.png'),
    componentType: 'soldier'
  });
};
gui.createDevelopmentCardVictoryPointDashboardItem = function() {
  return dashboardItem({
    image: imagesPath('development_card_victory_point.png'),
    componentType: 'developmentCardVictoryPoint'
  });
};
gui.createKnightDashboardItem = function(player) {
  return dashboardItem({
    image: imagesPath('knights/' + player.color + '_1.png'),
    componentType: 'knights'
  });
};
gui.createDefenderOfCatanCardItem = function(player) {
  return dashboardItem({
    image: imagesPath('defender_of_catan_card.png'),
    componentType: 'defenderOfCatanCard'
  });
};
gui.scrollableView = Ti.UI.createScrollableView();
playersWindow.add(gui.scrollableView);
gui.createColorNavTabs = function() {
  var imagePath, player, tabbedBarButtonData, _i, _len, _ref;
  tabbedBarButtonData = [];
  _ref = game.players;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    imagePath = 'images/square_' + player.color + '.png';
    tabbedBarButtonData.push({
      image: imagePath,
      playerColor: player.color
    });
  }
  return tabbedBarButtonData;
};
gui.colorNav = Ti.UI.createTabbedBar({
  index: 0
});
gui.colorNav.addEventListener('click', function(event) {
  var player;
  gui.scrollTo(event.index);
  return player = game.players[event.index];
});
playersWindow.setToolbar([gui.flexSpace, gui.colorNav, gui.flexSpace]);