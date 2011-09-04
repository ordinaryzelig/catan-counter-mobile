class Player

  constructor: (atts = {}) ->
    @game = atts['game']
    @soldiers = new PlayableSet()
    @developmentCardVictoryPoints = new PlayableSet()

  setup: ->
    @createSettlements()
    @createCities()
    for i in [1..2]
      @buildSettlement()

  # Victory points.

  victoryPoints: ->
    (@settlements.inPlay().length * 1)   +
    (@cities.inPlay().length * 2)        +
    (if @hasLargestArmy() then 2 else 0) +
    (if @hasLongestRoad() then 2 else 0) +
    (@developmentCardVictoryPoints.length)

  hasEnoughVictoryPointsToWin: ->
    @victoryPoints() >= @game.victoryPointsRequiredToWin

  # Settlements.

  buildSettlement: ->
    settlementToBuild = @settlements.notInPlay()[0]
    settlementToBuild.build()

  createSettlements: ->
    @settlements = new PlayableSet()
    for i in [1..5]
      @settlements.push(new Settlement(player: @))

  destroySettlement: ->
    settlementToDestroy = @settlements.inPlay()[0]
    if settlementToDestroy?
      settlementToDestroy.destroy()

  canBuildSettlement: ->
    @settlements.notInPlay().length > 0

  hasSettlementsToUpgrade: ->
    @settlements.inPlay().length > 0

  # Cities.

  buildCity: ->
    settlementToUpgrade = @settlements.inPlay()[0]
    if settlementToUpgrade?
      settlementToUpgrade.upgradeToCity()
    else
      throw 'no settlements to upgrade'

  createCities: ->
    @cities = new PlayableSet()
    for i in [1..4]
      @cities.push(new City(player: @))

  downgradeCity: ->
    @cities.inPlay()[0].downgradeToSettlement()

  hasCitiesToBuild: ->
    @cities.notInPlay().length > 0

  canBuildCity: ->
    @hasCitiesToBuild() and @hasSettlementsToUpgrade()

  destroysCityIfDowngraded: ->
    !@canBuildSettlement()

  # Soldiers.

  playSoldier: ->
    soldierToPlay = @game.soldiers.notInPlay()[0]
    if soldierToPlay?
      soldierToPlay.build()
      @soldiers.push soldierToPlay
    @checkForLargestArmy()

  destroySoldier: ->
    hadLargestArmy = @hasLargestArmy()
    soldier = @soldiers[0]
    if soldier?
      soldier.destroy()
      soldier.player = null
      @soldiers.splice(@soldiers.indexOf(soldier), 1)
      if hadLargestArmy
        @game.reassignPreviousPlayerWithLargestArmy()

  hasLargestArmy: ->
    return false unless @game.largestArmy.awarded()
    @game.largestArmy.player == @

  checkForLargestArmy: ->
    if @soldiers.length >= @game.largestArmy.numSoldiersNeeded()
      @game.awardLargestArmyTo(@)

  # Longest road.

  hasLongestRoad: ->
    return false unless @game.longestRoad.awarded()
    @game.longestRoad.player == @

  takeLongestRoad: ->
    @game.awardLongestRoadTo @

  # Development card victory points.

  showDevelopmentCardVictoryPoints: (numCards) ->
    for card in @game.developmentCardVictoryPoints.notInPlay()[0..numCards - 1]
      card.build()
      card.player = @
      @developmentCardVictoryPoints.push(card)

  winByPlayingDevelopmentCardVictoryPoints: ->
    @showDevelopmentCardVictoryPoints(@numDevelopmentCardVictoryPointsNeededToWin()) if @canWinByShowingAllDevelopmentCardVictoryPoints()

  # How many TOTAL development card victory points need to be SHOWN to win.
  # Edge case: Should not include cards already possessed because this should be called even before the cards are shown.
  numDevelopmentCardVictoryPointsNeededToWin: ->
    @game.victoryPointsRequiredToWin - (@victoryPoints() - @developmentCardVictoryPoints.length)

  canWinByShowingAllDevelopmentCardVictoryPoints: ->
    (@game.victoryPointsRequiredToWin - @victoryPoints()) <= @game.developmentCardVictoryPoints.notInPlay().length
