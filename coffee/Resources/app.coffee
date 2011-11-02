Ti.include('init.js')
Ti.include('helpers.js')
Ti.include('/gui/gui.js')
Ti.include('/gui/controller.js')

controller.newGame(new GameSettings(expansions: [CitiesAndKnights]))
player = game.players[0]

Ti.include('/gui/navigation.js')

gui.navigateTo(1)
gui.scrollTo(0)
