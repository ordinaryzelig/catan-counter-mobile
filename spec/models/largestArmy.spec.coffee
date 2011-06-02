describe 'LargestArmy', ->

  beforeEach ->
    @addMatchers {
      toHaveLargestArmy: ->
        @actual.hasLargestArmy()
      toNotHaveLargestArmy: ->
        !@actual.hasLargestArmy()
    }

  it 'awarded to first player to play 3 soldiers', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player).toNotHaveLargestArmy()
    for i in [1..3]
      player.playSoldier()
    expect(player).toHaveLargestArmy()
    expect(player.victoryPoints()).toEqual(4)

  it 'can be stolen when another player plays more soldiers than person with largest army', ->
    game = new Game()
    game.setup(numPlayers: 2)
    player_1 = game.players[0]
    for i in [1..3]
      player_1.playSoldier()
    player_2 = game.players[1]
    for i in [1..3]
      player_2.playSoldier()
    expect(player_2).toNotHaveLargestArmy()
    player_2.playSoldier()
    expect(player_2).toHaveLargestArmy()
    expect(player_1).toNotHaveLargestArmy()
