game = new Game()

controller = {}

controller.resetGame = (colors) ->
  game.setup({numPlayers: colors.length})
  # Assign colors.
  for player in game.players
    player.color = colors[game.players.indexOf(player)]
