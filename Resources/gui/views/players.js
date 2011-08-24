var createColorNavTabs, createPlayerViews, playersWindow, tab;
playersWindow = Ti.UI.createWindow();
tab = Ti.UI.createTab({
  window: playersWindow,
  icon: Ti.UI.iPhone.SystemIcon.CONTACTS
});
gui.navigation.addTab(tab);
Ti.include('/gui/events/componentClick.js');
createPlayerViews = function() {
  var componentType, dashboard, dashboardItems, item, player, view, views, _i, _j, _len, _len2, _ref, _ref2;
  views = [];
  _ref = game.players;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    dashboardItems = [];
    _ref2 = ['settlement', 'city'];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      componentType = _ref2[_j];
      item = dashboardItem({
        image: imagesPath(componentType + '_' + player.color + '.png'),
        badge: player[pluralize(componentType)].inPlay().length,
        componentType: componentType
      });
      dashboardItems.push(item);
      gui.dashboardItems[player.color] = dashboardItems;
    }
    item = dashboardItem({
      image: imagesPath('longest_road.png'),
      componentType: 'longestRoad'
    });
    dashboardItems.push(item);
    item = dashboardItem({
      image: imagesPath('soldier.png'),
      componentType: 'soldier'
    });
    dashboardItems.push(item);
    item = dashboardItem({
      image: imagesPath('development_card_victory_point.png'),
      componentType: 'developmentCardVictoryPoint'
    });
    dashboardItems.push(item);
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
gui.scrollableView = Ti.UI.createScrollableView({
  views: createPlayerViews()
});
playersWindow.add(gui.scrollableView);
createColorNavTabs = function() {
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
  labels: createColorNavTabs(),
  index: 0
});
gui.colorNav.addEventListener('click', function(event) {
  var player;
  gui.scrollTo(event.index);
  return player = game.players[event.index];
});
gui.changeTitle(game.players[0], playersWindow);
playersWindow.setToolbar([gui.flexSpace, gui.colorNav, gui.flexSpace]);