describe 'Game', ->

  it 'creates players', ->
    numPlayers = 4
    game = new Game(numPlayers: numPlayers)
    expect(game.players.length).toEqual(numPlayers)
