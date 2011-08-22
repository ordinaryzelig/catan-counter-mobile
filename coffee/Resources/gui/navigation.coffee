# Create tab group (black bar at bottom and title bar at top).

gui.navigation = Ti.UI.createTabGroup()

# Player points.
playerPointsWindow = Ti.UI.createWindow({
  title: 'Players',
})
tab = Ti.UI.createTab({
  window: playerPointsWindow,
  icon:   Ti.UI.iPhone.SystemIcon.BOOKMARKS
})
Ti.include('/gui/playersMenu.js')
gui.navigation.addTab(tab)

# Player boards.
playersWindow = Ti.UI.createWindow()
tab = Ti.UI.createTab({
  window: playersWindow,
  icon:   Ti.UI.iPhone.SystemIcon.CONTACTS
})
Ti.include('/gui/players.js')
gui.navigation.addTab(tab)

# Start on players menu.
gui.navigateTo(gui.tabs.PLAYERS_MENU)

# Assign first player as gui.currentPlayer
gui.currentPlayer = game.playerByColor(Game.COLORS[0])

gui.navigation.open()
