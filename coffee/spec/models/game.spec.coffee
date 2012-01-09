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

  describe 'with no expansions', ->

    beforeEach ->
      @game = new Game(numPlayers: 1)

    it 'sets victory points required to win to 10', ->
      expect(@game.victoryPointsRequiredToWin).toEqual(10)

    it 'creates soldiers', ->
      expect(@game.soldiers.length).toEqual(14)

    it 'creates largest army', ->
      expect(@game.largestArmy).toBeDefined()

    it 'does not create development card victory points', ->
      expect(@game.developmentCardVictoryPoints.length).toEqual(5)

  describe 'with Cities and Knights', ->

    beforeEach ->
      @settings = new GameSettings(expansions: [CitiesAndKnights])
      @game = new Game(numPlayers: 2, settings: @settings)

    it 'sets victory points required to win to 13', ->
      expect(@game.victoryPointsRequiredToWin).toEqual(13)

    it 'does not create soldiers', ->
      expect(@game.soldiers).toBeUndefined

    it 'does not create largest army', ->
      expect(@game.largestArmy).toBeUndefined()

    it 'does not create development card victory points', ->
      expect(@game.developmentCardVictoryPoints).toBeUndefined()

    it '#playersByKnightStrength returns an array of players in descending order of knight strength', ->
      @game.players[0].buildKnight().activate()
      @game.players[1].buildKnight().promote().activate()
      sortedPlayers = @game.playersByKnightStrength()
      strengths = []
      for player in sortedPlayers
        strengths.push player.knightStrength()
      expect(strengths).toEqual([2, 1])

    it '#playersWhoContributeMostKnights returns players who have biggest knight strength', ->
      expect(@game.playersWhoContributeMostKnights()).toEqual(@game.players)
      player1 = @game.players[0]
      player1.buildKnight().activate()
      expect(@game.playersWhoContributeMostKnights()).toEqual([player1])

    describe '#playersNotImmuneWhoContributeLeastKnights', ->

      it 'returns players who have at least 1 unmetropolized city and have lowest knight strength', ->
        expect(@game.playersNotImmuneWhoContributeLeastKnights()).toEqual(@game.players)
        player1 = @game.players[0]
        player1.buildKnight().activate()
        player2 = @game.players[1]
        expect(@game.playersNotImmuneWhoContributeLeastKnights()).toEqual([player2])

      it 'excludes players who have no cities', ->
        player1 = @game.players[0]
        player1.downgradeCity()
        player2 = @game.players[1]
        expect(@game.playersNotImmuneWhoContributeLeastKnights()).toEqual([player2])

    it 'creates defenders of Catan cards', ->
      expect(@game.defenderOfCatanCards.length).toEqual(8)
