var createColorNavTabs, createPlayerViews, playersWindow, tab;
playersWindow = Ti.UI.createWindow();
tab = Ti.UI.createTab({
  window: playersWindow,
  icon: Ti.UI.iPhone.SystemIcon.CONTACTS
});
gui.navigation.addTab(tab);
Ti.include('/gui/events/componentClick.js');
createPlayerViews = function() {
  var component, components, dashboard, dashboardItems, image, item, player, view, views, _i, _j, _len, _len2, _ref;
  views = [];
  _ref = game.players;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    player = _ref[_i];
    components = ['settlement', 'city'];
    dashboardItems = [];
    for (_j = 0, _len2 = components.length; _j < _len2; _j++) {
      component = components[_j];
      image = 'images/' + component + '_' + player.color + '.png';
      item = Ti.UI.createDashboardItem({
        image: image,
        canDelete: false
      });
      item.componentType = component;
      item.badge = player[pluralize(component)].inPlay().length;
      dashboardItems.push(item);
      gui.dashboardItems[player.color] = dashboardItems;
    }
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