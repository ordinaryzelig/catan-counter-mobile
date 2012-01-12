describe 'Metropolis', ->

  beforeEach ->
    @game = new Game(
      settings: new GameSettings(expansions: [CitiesAndKnights]),
      numPlayers: 2,
    )
    @metro = @game.metropolises[0]
    @player = @game.players[0]

  it 'is worth 2 victory points', ->
    @player.takeMetropolis(@metro)
    expect(@player.victoryPoints()).toEqual(5)

  it '#unaward unassigns player', ->
    @player.takeMetropolis(@metro)
    @metro.unaward()
    expect(@metro.player).toBeUndefined()
    expect(@player.victoryPoints()).toEqual(3)
