describe Barbarians, ->

  beforeEach ->
    @settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 2, settings: @settings)
    @barbarians = @game.barbarians

  it "#strength returns sum of number of players' cities", ->
    @game.players[0].buildCity()
    expect(@barbarians.strength()).toEqual(3)
