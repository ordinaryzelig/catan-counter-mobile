var component, components, dashboard, dashboardItems, image, imagePath, item, player, tabbedBarButtonData, view, views, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
Titanium.include('componentClick.js');
views = [];
_ref = game.players;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  player = _ref[_i];
  components = ['settlement', 'city'];
  dashboardItems = [];
  for (_j = 0, _len2 = components.length; _j < _len2; _j++) {
    component = components[_j];
    image = 'images/' + component + '_' + player.color + '.png';
    item = Titanium.UI.createDashboardItem({
      image: image,
      canDelete: false
    });
    item.componentType = component;
    item.badge = player[pluralize(component)].inPlay().length;
    dashboardItems.push(item);
    gui.dashboardItems[player.color] = dashboardItems;
  }
  dashboard = Titanium.UI.createDashboardView({
    data: dashboardItems,
    editable: false,
    background: '#aaa'
  });
  dashboard.addEventListener('click', componentClick);
  view = Titanium.UI.createView();
  view.add(dashboard);
  view.playerColor = player.color;
  views.push(view);
}
gui.scrollableView = Titanium.UI.createScrollableView({
  views: views
});
playersWindow.add(gui.scrollableView);
tabbedBarButtonData = [];
_ref2 = game.players;
for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
  player = _ref2[_k];
  imagePath = 'images/square_' + player.color + '.png';
  tabbedBarButtonData.push({
    image: imagePath,
    playerColor: player.color
  });
}
gui.colorNav = Titanium.UI.createTabbedBar({
  labels: tabbedBarButtonData,
  index: 0
});
gui.colorNav.addEventListener('click', function(event) {
  gui.scrollTo(event.index);
  return player = game.players[event.index];
});
gui.changeTitle(game.players[0], playersWindow);
playersWindow.setToolbar([gui.flexSpace, gui.colorNav, gui.flexSpace]);