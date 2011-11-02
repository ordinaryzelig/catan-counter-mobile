class Player

  constructor: (atts = {}) ->
    @game = atts['game']
    @createSettlements()
    @createCities()
    for i in [1..2]
      @buildSettlement()
    if @game.usesExpansion(CitiesAndKnights)
      @createKnights()
      @buildCity()
    else
      @soldiers = []
      @developmentCardVictoryPoints = []

  # Victory points.

  victoryPoints: ->
    components = ['settlements', 'cities', 'longest road']
    if @game.usesExpansion(CitiesAndKnights)
    else
      for component in ['largest army', 'development card victory points']
        components.push component
    sum = 0
    for component in components
      sum = sum + @victoryPointsFor(component)
    sum

  victoryPointsFor: (component) ->
    switch component
      when 'settlements'                     then @settlements.inPlay().length
      when 'cities'                          then @cities.inPlay().length * 2
      when 'longest road'                    then (if @hasLongestRoad() then 2 else 0)
      when 'largest army'                    then (if @hasLargestArmy() then 2 else 0)
      when 'development card victory points' then @developmentCardVictoryPoints.length
      else throw("don't know how to calculate victory points for " + component)

  hasEnoughVictoryPointsToWin: ->
    @victoryPoints() >= @game.victoryPointsRequiredToWin

  # Settlements.

  buildSettlement: ->
    settlementToBuild = @settlements.notInPlay()[0]
    settlementToBuild.build()

  createSettlements: ->
    @settlements = []
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
    @cities = []
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

  # Knights.
  # When creating knights, assign id (1 - 6)that is unique to player.
  # This makes it easier to find since we can't attach the knight object to the knight button.
  # Use player.knights.findById(id).

  createKnights: ->
    @knights = []
    knightId = 1
    for level in [1..3]
      for idx in [1..2]
        knight = new Knight(level: level, player: @, id: knightId)
        @knights.push(knight)
        knightId = knightId + 1
    @knights.findById = (id) ->
      for knight in @
        return knight if knight.id == id
    @knights

  # Get level 1 knight not in play and build.
  buildKnight: ->
    knightToBuild = @knights.notInPlay().level(1)[0]
    if knightToBuild?
      knightToBuild.build()
      knightToBuild

  knightStrength: ->
    strength = 0
    for knight in @knights.inPlay().active()
      strength = strength + knight.level
    strength

  canBuildKnight: ->
    @knights.notInPlay().level(1).length > 0

  canPromoteToMightyKnight: ->
    true
