class City extends Buildable

  constructor: (atts = {}) ->
    super
    @player = atts['player']
