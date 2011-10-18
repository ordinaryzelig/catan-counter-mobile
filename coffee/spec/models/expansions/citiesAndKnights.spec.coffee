describe 'Cities and Knights', ->

  beforeEach ->
    @settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 1, settings: @settings)

  describe 'game', ->

    it 'sets victory points required to win to 13', ->
      expect(@game.victoryPointsRequiredToWin).toEqual(13)

    it 'does not create soldiers', ->
      expect(@game.soldiers).toBeUndefined

    it 'does not create largest army', ->
      expect(@game.largestArmy).toBeUndefined()

    it 'does not create development card victory points', ->
      expect(@game.developmentCardVictoryPoints).toBeUndefined()

  describe 'player', ->

    beforeEach ->
      @player = @game.players[0]

    it 'begins with 1 settlement and 1 city', ->
      expect(@player.settlements.inPlay().length).toEqual(1)
      expect(@player.cities.inPlay().length).toEqual(1)

    it 'begins with 2 inactive knights of each level', ->
      expect(@player.knights.length).toEqual(6)
      expect(@player.knights.inactive().length).toEqual(6)
      expect(@player.knights.notInPlay().length).toEqual(6)
      for level in [1..3]
        expect(@player.knights.level(level).length).toEqual(2)

    it 'does not create development card victory points', ->
      expect(@player.developmentCardVictoryPoints).toBeUndefined()

    it 'does not create soldiers', ->
      expect(@player.soldiers).toBeUndefined()
