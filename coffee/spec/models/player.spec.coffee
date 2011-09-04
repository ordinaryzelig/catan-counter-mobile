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

      toHaveLargestArmy: ->
        @actual.hasLargestArmy()

      toNotHaveLargestArmy: ->
        !@actual.hasLargestArmy()
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

  it '#destroySoldier removes knight and unassigns self from it', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    for idx in [1..2]
      player.playSoldier()
    soldier = player.soldiers[0]
    player.destroySoldier()
    expect(soldier.player).toBeNull()
    expect(soldier.inPlay).toEqual(false)
    expect(player.soldiers.length).toEqual(1)

  it '#destroySoldier reassigns largest army if necessary', ->
    game = new Game()
    game.setup(numPlayers: 2)
    player1 = game.players[0]
    player2 = game.players[1]
    player1.playSoldier()
    player1.destroySoldier()
    expect(player1).toNotHaveLargestArmy()
    for idx in [1..3]
      player1.playSoldier()
      player2.playSoldier()
    expect(player1).toHaveLargestArmy()
    player2.playSoldier()
    expect(player2).toHaveLargestArmy()
    player2.destroySoldier()
    expect(player1).toHaveLargestArmy()
