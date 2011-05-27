class Player

  setup: ->
    @createSettlements()
    @createCities()
    for i in [1..2]
      @buildSettlement()

  buildSettlement: ->
    settlementToBuild = @settlements.notInPlay()[0]
    settlementToBuild.build()

  buildCity: ->
    settlementToUpgrade = @settlements.inPlay()[0]
    if settlementToUpgrade?
      settlementToUpgrade.upgradeToCity()

  # private.

  createSettlements: ->
    @settlements = new PlayableSet()
    for i in [1..5]
      @settlements.push(new Settlement(player: this))

  createCities: ->
    @cities = new PlayableSet()
    for i in [1..4]
      @cities.push(new City(player: this))

  victoryPoints: ->
    (@settlements.inPlay().length) +
    (@cities.inPlay().length * 2)
