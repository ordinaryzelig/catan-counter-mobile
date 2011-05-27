class Settlement extends Buildable

  constructor: (atts = {}) ->
    super
    @player = atts['player']

  upgradeToCity: ->
    if @inPlay
      cityToBuild = @player.cities.notInPlay()[0]
      if cityToBuild?
        cityToBuild.build()
        @.destroy()
      cityToBuild
