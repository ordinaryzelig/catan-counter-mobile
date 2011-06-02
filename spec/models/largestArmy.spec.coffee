describe 'LargestArmy', ->

  it 'awarded to first player to play 3 soldiers', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player.hasLargestArmy()).toEqual(false)
    for i in [1..3]
      player.playSoldier()
    expect(player.hasLargestArmy()).toEqual(true)
    expect(player.victoryPoints()).toEqual(4)
