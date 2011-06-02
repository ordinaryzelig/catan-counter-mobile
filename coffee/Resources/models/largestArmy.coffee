class LargestArmy

  constructor: (atts = {}) ->
    @game = atts['game']
    @player = atts['player']

  awarded: ->
    !!@player

  numSoldiersNeeded: ->
    if @awarded() then @player.soldiers.length + 1 else 3
