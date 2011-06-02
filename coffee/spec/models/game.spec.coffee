describe 'Game', ->

  it 'creates players and soldiers', ->
    numPlayers = 4
    game = new Game(numPlayers: numPlayers)
    game.setup(numPlayers: numPlayers)
    expect(game.players.length).toEqual(numPlayers)
    expect(game.soldiers.length).toEqual(14)
