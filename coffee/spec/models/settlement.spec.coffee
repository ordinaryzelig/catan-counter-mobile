describe 'Settlement', ->

  it 'is worth 1 victory point each', ->
    game = new Game(numPlayers: 1)
    player = game.players[0]
    expect(player.victoryPoints()).toEqual(2)
    player.buildSettlement()
    expect(player.victoryPoints()).toEqual(3)

  it 'can be upgraded to city', ->
    player = new Player()
    settlement = player.settlements.inPlay()[0]
    city = settlement.upgradeToCity()
    expect(settlement.inPlay).toEqual(false)
    expect(city.inPlay).toEqual(true)
    expect(player.settlements.inPlay().length).toEqual(1)
    expect(player.cities.inPlay().length).toEqual(1)

  it '#destroy removes it from being in play', ->
    player = new Player()
    settlement = player.settlements.inPlay()[0]
    settlement.destroy()
    expect(settlement.inPlay).toEqual(false)
