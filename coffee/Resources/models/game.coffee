class Game

  constructor: (options = {}) ->
    @settings = options['settings']
    @settings = {} unless @settings?
    @createPlayers(options['numPlayers'])
    @victoryPointsRequiredToWin = 10
    @createLongestRoad()
    if @usesExpansion(CitiesAndKnights)
      @victoryPointsRequiredToWin = @victoryPointsRequiredToWin + 3
      @createBarbarians()
      @createCatanDefense()
      @createDefenderOfCatanCards()
      @createMetropolises()
      @createMerchant()
    else
      @createSoldiers()
      @createLargestArmy()
      @createDevelopmentCardVictoryPoints()

  # =======================================================================
  # Game components.

  createPlayers: (num) ->
    @players = []
    for i in [1..num]
      player = new Player(game: @)
      @players.push(player)

  createSoldiers: ->
    @soldiers = []
    @previousPlayersWithLargestArmy = []
    for i in [1..14]
      @soldiers.push(new Soldier(game: @))

  createLongestRoad: ->
    @longestRoad = new LongestRoad(game: @)

  createLargestArmy: ->
    @largestArmy = new LargestArmy(game: @)

  createDevelopmentCardVictoryPoints: ->
    @developmentCardVictoryPoints = []
    for idx in [1..5]
      @developmentCardVictoryPoints.push(new DevelopmentCardVictoryPoint(game: @))

  createBarbarians: ->
    @barbarians = new Barbarians(game: @)

  createCatanDefense: ->
    @catanDefense = new CatanDefense(game: @)

  createDefenderOfCatanCards: ->
    @defenderOfCatanCards = []
    for idx in [1..8]
      @defenderOfCatanCards.push(new DefenderOfCatanCard())

  createMetropolises: ->
    @metropolises = []
    for type in Metropolis.types
      @metropolises.push new Metropolis(type: type)

  createMerchant: ->
    @merchant = new Merchant(game: @)

  # =======================================================================

  awardLargestArmyTo: (player) ->
    @previousPlayersWithLargestArmy.push(@largestArmy.player)
    @largestArmy.player = player

  # Keep a stack record of players so we can unwind if needed.
  previousPlayerWithLargestArmy: ->
    @previousPlayersWithLargestArmy[@previousPlayersWithLargestArmy.length - 1]

  reassignPreviousPlayerWithLargestArmy: ->
    reassignTo = @previousPlayersWithLargestArmy.pop()
    @largestArmy.player = reassignTo

  awardLongestRoadTo: (player) ->
    @longestRoad.player = player

  playerByColor: (color) ->
    return @playersByColor[color] if @playersByColor?
    @playersByColor = {}
    for player in @players
      @playersByColor[player.color] = player
    @playersByColor[color]

  playersByKnightStrength: ->
    players = @players.slice(0)
    players.sort (a, b) ->
      b.knightStrength() - a.knightStrength()

  playersWhoContributeMostKnights: ->
    defenders = []
    playersByKnightStrength = @playersByKnightStrength()
    maxKnightStrength = playersByKnightStrength[0].knightStrength()
    for player in playersByKnightStrength
      defenders.push player if player.knightStrength() == maxKnightStrength
    defenders

  playersNotImmuneWhoContributeLeastKnights: ->
    playersNotImmune = []
    for player in @playersByKnightStrength()
      playersNotImmune.push player unless player.immune()
    return [] if playersNotImmune.length == 0
    minKnightStrength = playersNotImmune[playersNotImmune.length - 1].knightStrength()
    players = []
    for player in playersNotImmune
      players.push player if player.knightStrength() == minKnightStrength
    players

  usesExpansion: (expansion) ->
    expansion in @settings.expansions

  barbariansStrength: ->
    strength = 0
    for player in @players
      strength = strength + player.cities.inPlay().length
    strength

  # Remove defender card from stack and give to player.
  awardDefenderOfCatanCardTo: (player) ->
    card = @defenderOfCatanCards.pop()
    return null unless card?
    player.defenderOfCatanCards.push(card)
    card

  metropolisesByType: ->
    metropolises = {}
    for metro in @metropolises
      metropolises[metro.type] = metro
    metropolises

Game.COLORS = ['red', 'blue', 'orange', 'white', 'green', 'brown']
Game.EXPANSIONS = [
  CitiesAndKnights,
]
