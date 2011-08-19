Ti.include('init.js')
Ti.include('helpers.js')
Ti.include('guiEvents.js')

Titanium.UI.setBackgroundColor('#aaa')

# Create new game.
colors = ['red', 'blue', 'orange', 'white', 'green', 'brown']
game = new Game()
game.setup(numPlayers: colors.length)
for player in game.players
  player.color = colors[game.players.indexOf(player)]
  player.buildCity()
  player.buildSettlement()

Ti.include('navigation.js')
Ti.include('players.js')
