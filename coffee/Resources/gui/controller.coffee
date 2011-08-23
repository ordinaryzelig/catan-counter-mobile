game = new Game()

controller = {}

controller.resetGame = ->
  game.setup({numPlayers: Game.COLORS.length})
  # Assign colors.
  for player in game.players
    player.color = Game.COLORS[game.players.indexOf(player)]
