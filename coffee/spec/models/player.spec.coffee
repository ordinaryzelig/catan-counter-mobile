describe 'Player', ->

  beforeEach ->
    @addMatchers {
      toAllBelongToPlayer: (player) ->
        for object in @actual
          return false unless object.player == player
        true
      toHaveEnoughVictoryPointsToWin: ->
        @actual.hasEnoughVictoryPointsToWin()
      toNotHaveEnoughVictoryPointsToWin: ->
        !@actual.hasEnoughVictoryPointsToWin()
    }

  it '#setup creates settlements and cities', ->
    player = new Player()
    player.setup()
    expect(player.settlements.length).toEqual(5)
    expect(player.settlements).toAllBelongToPlayer(player)
    expect(player.cities.length).toEqual(4)
    expect(player.cities).toAllBelongToPlayer(player)

  it 'starts with 2 settlements built', ->
    player = new Player()
    player.setup()
    expect(player.settlements.inPlay().length).toEqual(2)

  it 'that has 10 victory points has enough victory points to win', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player).toNotHaveEnoughVictoryPointsToWin()
    for i in [1..3]
      player.buildSettlement()
    for i in [1..4]
      player.buildCity()
    expect(player).toNotHaveEnoughVictoryPointsToWin()
    player.buildSettlement()
    expect(player).toHaveEnoughVictoryPointsToWin()

  it '#canBuildCity', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player.canBuildCity()).toEqual(true)
    # If no settlements to build city, then should return false.
    for settlement in player.settlements.inPlay()
      player.destroySettlement()
    expect(player.canBuildCity()).toEqual(false)
    # If no more cities to build, then should return false.
    for idx in [1..4]
      player.buildSettlement()
      player.buildCity()
    expect(player.canBuildCity()).toEqual(false)

  it '#numDevelopmentCardVictoryPointsNeededToWin', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    player.showDevelopmentCardVictoryPoints(2)
    expect(player.numDevelopmentCardVictoryPointsNeededToWin()).toEqual(8)

  it '#canWinByShowingAllDevelopmentCardVictoryPoints', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player.canWinByShowingAllDevelopmentCardVictoryPoints()).toEqual(false)
    for idx in [1..3]
      player.buildSettlement()
    expect(player.canWinByShowingAllDevelopmentCardVictoryPoints()).toEqual(true)

  it '#winByPlayingDevelopmentCardVictoryPoints', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    player.winByPlayingDevelopmentCardVictoryPoints()
    expect(player.victoryPoints()).toEqual(2)
    for idx in [1..3]
      player.buildSettlement()
    player.winByPlayingDevelopmentCardVictoryPoints()
    expect(player.victoryPoints()).toEqual(10)
