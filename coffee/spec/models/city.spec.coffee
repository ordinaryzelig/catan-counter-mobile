describe 'City', ->

  it 'is worth 2 victory points each', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    expect(player.victoryPoints()).toEqual(2)
    player.buildCity()
    expect(player.victoryPoints()).toEqual(3)

  it 'can be downgraded to settlement', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    player.buildCity()
    player.downgradeCity()
    expect(player.settlements.inPlay().length).toEqual(2)
    expect(player.cities.inPlay().length).toEqual(0)

  it 'is completely destroyed if no more settlements to build', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    for idx in [1..3]
      player.buildSettlement()
    for idx in [1..4]
      player.buildCity()
    for idx in [1..4]
      player.buildSettlement()
    expect(player.destroysCityIfDowngraded()).toEqual(true)
    player.downgradeCity()
    expect(player.cities.inPlay().length).toEqual(3)
    expect(player.settlements.inPlay().length).toEqual(5)
    expect(player.victoryPoints()).toEqual(11)
