# Tabbed navigation browser for players.
# For each player, create a view.
# Each view has a dashboard with their game components.

views = []
for idx in [0..game.players.length - 1]

  player = game.players[idx]
  color = colors[idx]

  # create components as dashboard items.
  components = ['settlement', 'city']
  dashboard_data = []
  for component in components
    image = 'images/' + component + '_' + color + '.png'
    item = Titanium.UI.createDashboardItem({
      image: image,
      canDelete: false,
    })
    item.badge = player[pluralize(component)].inPlay().length
    dashboard_data.push(item)

  # Create dashboard and add it to a view.
  dashboard = Titanium.UI.createDashboardView({
    data: dashboard_data,
    editable: false,
    background: '#aaa',
  })
  view = Titanium.UI.createView()
  view.add(dashboard)
  views.push(view)

scrollableView = Titanium.UI.createScrollableView({
  views: views,
})
window.add(scrollableView)

# Toolbar with buttons to scroll to player.
tabbedBarButtonData = []
for idx in [0..colors.length - 1]
  color = colors[idx]
  imagePath = 'images/toolbar_button_' + color + '.png'
  tabbedBarButtonData.push({image: imagePath})
tabbedBar = Titanium.UI.createTabbedBar({
  labels: tabbedBarButtonData,
  index: 0
})
# When clicked, determine which view to scroll to.
tabbedBar.addEventListener('click', (event) ->
  scrollableView.scrollToView(event.index)
)
# Center the tabbed bar on the window's toolbar.
window.setToolbar([flexSpace, tabbedBar, flexSpace])
