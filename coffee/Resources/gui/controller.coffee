# TODO get rid of this and move it somewhere else.
# No more controller.

game = null

controller = {}

controller.newGame = (settings = {}) ->
  game = new Game({
    numPlayers: Game.COLORS.length,
    settings: settings,
  })
  # Assign colors.
  for player in game.players
    player.color = Game.COLORS[game.players.indexOf(player)]
