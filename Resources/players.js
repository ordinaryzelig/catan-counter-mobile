var changeTitle, component, components, dashboard, dashboard_data, image, imagePath, item, player, scrollableView, tabbedBar, tabbedBarButtonData, view, views, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
views = [];
_ref = game.players;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  player = _ref[_i];
  components = ['settlement', 'city'];
  dashboard_data = [];
  for (_j = 0, _len2 = components.length; _j < _len2; _j++) {
    component = components[_j];
    image = 'images/' + component + '_' + player.color + '.png';
    item = Titanium.UI.createDashboardItem({
      image: image,
      canDelete: false
    });
    item.badge = player[pluralize(component)].inPlay().length;
    dashboard_data.push(item);
  }
  dashboard = Titanium.UI.createDashboardView({
    data: dashboard_data,
    editable: false,
    background: '#aaa'
  });
  view = Titanium.UI.createView();
  view.add(dashboard);
  views.push(view);
}
scrollableView = Titanium.UI.createScrollableView({
  views: views
});
window.add(scrollableView);
tabbedBarButtonData = [];
_ref2 = game.players;
for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
  player = _ref2[_k];
  imagePath = 'images/toolbar_button_' + player.color + '.png';
  tabbedBarButtonData.push({
    image: imagePath
  });
}
tabbedBar = Titanium.UI.createTabbedBar({
  labels: tabbedBarButtonData,
  index: 0
});
changeTitle = function(player, window) {
  return window.title = player.color + ' (' + player.victoryPoints() + ')';
};
tabbedBar.addEventListener('click', function(event) {
  scrollableView.scrollToView(event.index);
  player = game.players[event.index];
  return changeTitle(player, window);
});
changeTitle(game.players[0], window);
window.setToolbar([flexSpace, tabbedBar, flexSpace]);