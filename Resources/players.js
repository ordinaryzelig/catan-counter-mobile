var color, component, components, dashboard, dashboard_data, idx, image, imagePath, item, player, scrollableView, tabbedBar, tabbedBarButtonData, view, views, _i, _len, _ref, _ref2;
views = [];
for (idx = 0, _ref = game.players.length - 1; 0 <= _ref ? idx <= _ref : idx >= _ref; 0 <= _ref ? idx++ : idx--) {
  player = game.players[idx];
  color = colors[idx];
  components = ['settlement', 'city'];
  dashboard_data = [];
  for (_i = 0, _len = components.length; _i < _len; _i++) {
    component = components[_i];
    image = 'images/' + component + '_' + color + '.png';
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
for (idx = 0, _ref2 = colors.length - 1; 0 <= _ref2 ? idx <= _ref2 : idx >= _ref2; 0 <= _ref2 ? idx++ : idx--) {
  color = colors[idx];
  imagePath = 'images/toolbar_button_' + color + '.png';
  tabbedBarButtonData.push({
    image: imagePath
  });
}
tabbedBar = Titanium.UI.createTabbedBar({
  labels: tabbedBarButtonData,
  index: 0
});
tabbedBar.addEventListener('click', function(event) {
  return scrollableView.scrollToView(event.index);
});
window.setToolbar([flexSpace, tabbedBar, flexSpace]);