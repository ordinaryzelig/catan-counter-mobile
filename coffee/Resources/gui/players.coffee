# Tabbed navigation browser for players.
# Each player has dashboard with components (settlement, city, etc.).
# All dashboards are on a view that belong to a scrollable view.
# Tabbed bar at bottom represents each color. Scrolls to player when tapped.

playersWindow = Ti.UI.createWindow()
tab = Ti.UI.createTab({
  window: playersWindow,
  icon:   Ti.UI.iPhone.SystemIcon.CONTACTS
})
gui.navigation.addTab(tab)

Ti.include('/gui/componentClick.js')

views = []
for player in game.players

  # create components as dashboard items.
  components = ['settlement', 'city']
  dashboardItems = []
  for component in components
    image = 'images/' + component + '_' + player.color + '.png'
    item = Ti.UI.createDashboardItem({
      image: image,
      canDelete: false,
    })
    item.componentType = component
    item.badge = player[pluralize(component)].inPlay().length
    dashboardItems.push(item)
    gui.dashboardItems[player.color] = dashboardItems

  # Create dashboard and add it to a view.
  dashboard = Ti.UI.createDashboardView({
    data: dashboardItems,
    editable: false,
    background: '#aaa',
  })
  dashboard.addEventListener('click', componentClick)
  view = Ti.UI.createView()
  view.add(dashboard)
  view.playerColor = player.color
  views.push(view)

gui.scrollableView = Ti.UI.createScrollableView({
  views: views,
})
playersWindow.add(gui.scrollableView)

# Toolbar with buttons to scroll to player.
tabbedBarButtonData = []
for player in game.players
  imagePath = 'images/square_' + player.color + '.png'
  tabbedBarButtonData.push({
    image: imagePath,
    playerColor: player.color,
  })
gui.colorNav = Ti.UI.createTabbedBar({
  labels: tabbedBarButtonData,
  index: 0
})

# When clicked, scroll to view and change the title bar.
gui.colorNav.addEventListener('click', (event) ->
  gui.scrollTo(event.index)
  player = game.players[event.index]
)

# Change title for first player.
gui.changeTitle(game.players[0], playersWindow)

# Center the gui.colorNav on the window's toolbar.
playersWindow.setToolbar([gui.flexSpace, gui.colorNav, gui.flexSpace])
