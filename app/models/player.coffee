class Player

  constructor: (atts = {}) ->
    @game = atts['game']
    @soldiers = new PlayableSet()

  setup: ->
    @createSettlements()
    @createCities()
    for i in [1..2]
      @buildSettlement()

  victoryPoints: ->
    (@settlements.inPlay().length * 1) +
    (@cities.inPlay().length      * 2) +
    (if @hasLargestArmy() then 2 else 0)

  # Settlements.

  buildSettlement: ->
    settlementToBuild = @settlements.notInPlay()[0]
    settlementToBuild.build()

  createSettlements: ->
    @settlements = new PlayableSet()
    for i in [1..5]
      @settlements.push(new Settlement(player: this))

  # Cities.

  buildCity: ->
    settlementToUpgrade = @settlements.inPlay()[0]
    if settlementToUpgrade?
      settlementToUpgrade.upgradeToCity()

  createCities: ->
    @cities = new PlayableSet()
    for i in [1..4]
      @cities.push(new City(player: this))

  # Soldiers.

  playSoldier: ->
    soldierToPlay = @game.soldiers.notInPlay()[0]
    if soldierToPlay?
      soldierToPlay.build()
      @soldiers.push soldierToPlay
    @checkForLargestArmy()

  hasLargestArmy: ->
    return false if @game.largestArmy.awarded()
    @game.largestArmy.player == @

  checkForLargestArmy: ->
    if @soldiers.length >= @game.largestArmy.numSoldiersNeeded()
      @game.awardLargestArmyTo(this)
