describe 'Merchant', ->

  beforeEach ->
    @game = new Game(
      settings: new GameSettings(expansions: [CitiesAndKnights]),
      numPlayers: 2,
    )
    @merchant = @game.merchant
    @player = @game.players[0]

  it 'is worth 1 victory point', ->
    @player.takeMerchant()
    expect(@player.victoryPoints()).toEqual(4)
