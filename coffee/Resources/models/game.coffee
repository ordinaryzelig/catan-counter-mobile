class Game

  setup: (options = {}) ->
    @createPlayers(options['numPlayers'])
    @createSoldiers()
    @createLargestArmy()
    @createLongestRoad()
    @createDevelopmentCardVictoryPoints()

  victoryPointsRequiredToWin: 10

  createPlayers: (num) ->
    @players = []
    for i in [1..num]
      player = new Player(game: @)
      player.setup()
      @players.push(player)

  createSoldiers: ->
    @soldiers = new PlayableSet()
    for i in [1..14]
      @soldiers.push(new Soldier(game: @))

  createLongestRoad: ->
    @longestRoad = new LongestRoad(game: @)

  createLargestArmy: ->
    @largestArmy = new LargestArmy(game: @)

  createDevelopmentCardVictoryPoints: ->
    @developmentCardVictoryPoints = new PlayableSet()
    for idx in [1..5]
      @developmentCardVictoryPoints.push(new DevelopmentCardVictoryPoint(game: @))

  awardLargestArmyTo: (player) ->
    @largestArmy.player = player

  awardLongestRoadTo: (player) ->
    @longestRoad.player = player

  playerByColor: (color) ->
    return @playersByColor[color] if @playersByColor?
    @playersByColor = {}
    for player in @players
      @playersByColor[player.color] = player
    @playersByColor[color]

Game.COLORS = ['red', 'blue', 'orange', 'white', 'green', 'brown']
