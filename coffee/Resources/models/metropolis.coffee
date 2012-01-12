class Metropolis

  constructor: (atts) ->
    @type = atts['type']
    @player = atts['player']

  # Unassign player.
  unaward: ->
    @player.metropolises.remove(@)
    @player = undefined

Metropolis.types = ['trade', 'politics', 'science']
