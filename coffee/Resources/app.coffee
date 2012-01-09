Ti.include('init.js')
Ti.include('helpers.js')
Ti.include('/gui/gui.js')
Ti.include('/gui/controller.js')
Ti.include('/gui/navigation.js')

# Open to players view.
gui.navigateTo(gui.tabs.PLAYERS_MENU)
# Show new game window without Cancel button.
gui.showNewGameWindow(false)
# Open.
gui.navigation.open()
