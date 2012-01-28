Ti.include('init.js')
Ti.include('helpers.js')
Ti.include('/gui/gui.js')
Ti.include('/gui/navigation.js')

# Show new game window without Cancel button.
gui.showNewGameWindow(false)
# Open.
gui.navigation.open()
