# Tabbed navigation browser for players.
# Each player has dashboard with components (settlement, city, etc.).
# All dashboards are on a view that belong to a scrollable view.
# Tabbed bar at bottom represents each color. Scrolls to player when tapped.

playersWindow = Ti.UI.createWindow()
tab = Ti.UI.createTab({
  window: playersWindow,
  icon:   tabsPath('players.png'),
  title:  'Players',
})
gui.navigation.addTab(tab)

Ti.include('/gui/events/componentClick.js')

gui.createPlayerViews = ->
  views = []
  for player in game.players

    dashboardItems = []

    # Create settlement and city dashboard items.
    for componentType in ['settlement', 'city']
      item = dashboardItem({
        image: imagesPath(componentType + '_' + player.color + '.png'),
        badge: player[pluralize(componentType)].inPlay().length,
        componentType: componentType
      })
      dashboardItems.push(item)
      gui.dashboardItems[player.color] = dashboardItems

    # Create longest road dashboard item.
    item = dashboardItem({
      image: imagesPath('longest_road.png'),
      componentType: 'longestRoad',
    })
    dashboardItems.push(item)

    # Create soldier dashboard item.
    item = dashboardItem({
      image: imagesPath('soldier.png'),
      componentType: 'soldier',
    })
    dashboardItems.push(item)

    # Create development card victory point dashboard item.
    item = dashboardItem({
      image: imagesPath('development_card_victory_point.png'),
      componentType: 'developmentCardVictoryPoint',
    })
    dashboardItems.push(item)

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
  views

gui.scrollableView = Ti.UI.createScrollableView({
  views: gui.createPlayerViews(),
})
playersWindow.add(gui.scrollableView)

# Toolbar with buttons to scroll to player.
gui.createColorNavTabs = ->
  tabbedBarButtonData = []
  for player in game.players
    imagePath = 'images/square_' + player.color + '.png'
    tabbedBarButtonData.push({
      image: imagePath,
      playerColor: player.color,
    })
  tabbedBarButtonData
gui.colorNav = Ti.UI.createTabbedBar({
  labels: gui.createColorNavTabs(),
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
