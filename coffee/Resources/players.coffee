# Tabbed navigation browser for players.
# For each player, create a view.
# Each view has a dashboard with their game components.

views = []
for player in game.players

  # create components as dashboard items.
  components = ['settlement', 'city']
  dashboard_data = []
  for component in components
    image = 'images/' + component + '_' + player.color + '.png'
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
for player in game.players
  imagePath = 'images/toolbar_button_' + player.color + '.png'
  tabbedBarButtonData.push({image: imagePath})
tabbedBar = Titanium.UI.createTabbedBar({
  labels: tabbedBarButtonData,
  index: 0
})

# When clicked, scroll to view and change the title bar.
changeTitle = (player, window) ->
  window.title = player.color + ' (' + player.victoryPoints() + ')'
tabbedBar.addEventListener('click', (event) ->
  scrollableView.scrollToView(event.index)
  player = game.players[event.index]
  changeTitle(player, window)
)

# Change title for first player.
changeTitle(game.players[0], window)

# Center the tabbed bar on the window's toolbar.
window.setToolbar([flexSpace, tabbedBar, flexSpace])
