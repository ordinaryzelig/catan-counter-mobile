class DevelopmentCardVictoryPoint extends Buildable

  constructor: (atts = {}) ->
    super
    @game = atts['game']
    @player = null
