class Barbarians

  constructor: (options) ->
    @game = options['game']

  strength: ->
    cities = 0
    for player in @game.players
      cities = cities + player.cities.inPlay().length
    cities

  attack: ->
    new BarbariansBattleOutcome(@)
