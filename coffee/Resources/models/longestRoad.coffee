class LongestRoad

  constructor: (atts = {}) ->
    @game = atts['game']
    @player = atts['player']

  awarded: ->
    !!@player
