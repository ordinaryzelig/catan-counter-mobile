describe 'LargestArmy', ->

  it 'awarded to first player to play 3 soldiers', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player.hasLargestArmy()).toEqual(false)
    for i in [1..3]
      player.playSoldier()
    expect(player.soldiers.length).toEqual(3)
    expect(game.largestArmy.player).toEqual(player)
    expect(player.victoryPoints()).toEqual(4)
