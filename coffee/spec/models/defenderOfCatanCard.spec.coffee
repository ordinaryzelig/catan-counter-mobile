describe 'DefenderOfCatanCard', ->

  beforeEach ->
    @settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 2, settings: @settings)

  it 'is awarded to single player who defends Catan', ->
    player1 = @game.players[0]
    player1.buildKnight().promote().activate()
    @game.barbarians.attack().apply()
    expect(player1.defenderOfCatanCards.length).toEqual(1)
    expect(@game.defenderOfCatanCards.length).toEqual(7)

  it 'is worth 1 victory point', ->
    player1 = @game.players[0]
    player1.buildKnight().promote().activate()
    @game.barbarians.attack().apply()
    expect(player1.victoryPoints()).toEqual(4)
