class Game

  constructor: (options = {}) ->
    @settings = options['settings']
    @settings = {} unless @settings?
    @createPlayers(options['numPlayers'])
    @victoryPointsRequiredToWin = 10
    @createLongestRoad()
    if @usesExpansion(CitiesAndKnights)
      @victoryPointsRequiredToWin = @victoryPointsRequiredToWin + 3
    else
      @createSoldiers()
      @createLargestArmy()
      @createDevelopmentCardVictoryPoints()

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

  usesExpansion: (expansion) ->
    expansion in @settings.expansions

Game.COLORS = ['red', 'blue', 'orange', 'white', 'green', 'brown']
Game.EXPANSIONS = [
  CitiesAndKnights,
]
