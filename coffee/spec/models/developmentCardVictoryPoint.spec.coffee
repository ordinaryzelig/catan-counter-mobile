describe 'DevelopmentCardVictoryPoint', ->

  it 'is worth 1 victory point each', ->
    game = new Game(numPlayers: 1)
    player = game.players[0]
    player.showDevelopmentCardVictoryPoints(2)
    expect(player.developmentCardVictoryPoints.length).toEqual(2)
    expect(player.victoryPoints()).toEqual(4)

  it '#build assigns player and is marked as inPlay', ->
    game = new Game(numPlayers: 1)
    player = game.players[0]
    player.showDevelopmentCardVictoryPoints(1)
    card = player.developmentCardVictoryPoints[0]
    expect(card.inPlay).toEqual(true)
    expect(card.player).toEqual(player)
