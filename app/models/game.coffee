class Game

  constructor: (atts = {}) ->
    @createPlayers(atts['numPlayers'])

  # private.

  createPlayers: (num)->
    @players = []
    for i in [1..num]
      @players.push(new Player(this))
