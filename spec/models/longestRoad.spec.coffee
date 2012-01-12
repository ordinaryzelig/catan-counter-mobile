describe 'LongestRoad', ->

  it 'is worth 2 victory points', ->
    game = new Game(numPlayers: 1)
    player = game.players[0]
    game.awardLongestRoadTo(player)
    expect(player.hasLongestRoad()).toEqual(true)
    expect(player.victoryPoints()).toEqual(4)
