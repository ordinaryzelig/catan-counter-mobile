describe CatanDefense, ->

  beforeEach ->
    @settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 2, settings: @settings)
    @barbarians = @game.barbarians

  it "#strength returns sum of players' knight strengths", ->
    for player in @game.players
      player.buildKnight().promote().activate()
    expect(@game.catanDefense.strength()).toEqual(4)
