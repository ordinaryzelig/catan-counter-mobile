# Create tab group (black bar at bottom and title bar at top).

gui.navigation = Ti.UI.createTabGroup()

# Tabs.
Ti.include('/gui/views/gameMenu.js')
Ti.include('/gui/views/players.js')

# Start on players menu.
gui.navigateTo(gui.tabs.PLAYERS_MENU)

# Assign first player as gui.currentPlayer
gui.currentPlayer = game.playerByColor(Game.COLORS[0])

# Open sesame.
gui.navigation.open()
