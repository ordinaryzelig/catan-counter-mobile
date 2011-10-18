describe 'Game', ->

  it 'creates players', ->
    numPlayers = 4
    game = new Game(numPlayers: numPlayers)
    expect(game.players.length).toEqual(numPlayers)

  it 'accesses players by color', ->
    colors = ['red', 'white', 'blue']
    numPlayers = colors.length
    game = new Game(numPlayers: numPlayers)
    for idx in [0..numPlayers - 1]
      game.players[idx].color = colors[idx]
    for color in colors
      expect(game.playerByColor(color).color).toEqual(color)

  it 'accepts settings with expansions at initialization', ->
    settings = new GameSettings({expansions: [CitiesAndKnights]})
    game = new Game({settings: settings})
    expect(game.usesExpansion(CitiesAndKnights)).toEqual(true)
