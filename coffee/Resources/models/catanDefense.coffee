class CatanDefense

  constructor: (options) ->
    @game = options['game']

  strength: ->
    knightStrengths = 0
    for player in @game.players
      knightStrengths = knightStrengths + player.knightStrength()
    knightStrengths
