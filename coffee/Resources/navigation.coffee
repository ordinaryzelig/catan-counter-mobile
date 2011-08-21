# Create tab group (black bar at bottom and title bar at top).

gui.navigation = Titanium.UI.createTabGroup()

# Player points.
playerPointsWindow = Titanium.UI.createWindow({
  title: 'Players',
})
tab = Titanium.UI.createTab({
  window: playerPointsWindow,
  icon:   Titanium.UI.iPhone.SystemIcon.BOOKMARKS
})
Ti.include('playersMenu.js')
gui.navigation.addTab(tab)

# Player boards.
playersWindow = Titanium.UI.createWindow()
tab = Titanium.UI.createTab({
  window: playersWindow,
  icon:   Titanium.UI.iPhone.SystemIcon.CONTACTS
})
Ti.include('players.js')
gui.navigation.addTab(tab)

gui.navigateTo(gui.tabs.PLAYERS_MENU)
gui.navigation.open()
