describe 'DefenderOfCatanCard', ->

  beforeEach ->
    @settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 2, settings: @settings)
    @player = @game.players[0]

  describe 'when awarded', ->

    beforeEach ->
      @player.buildKnight().promote().activate()
      @game.barbarians.attack().apply()

    it 'is awarded to single player who defends Catan', ->
      expect(@player.defenderOfCatanCards.length).toEqual(1)
      expect(@game.defenderOfCatanCards.length).toEqual(7)

    it 'is worth 1 victory point', ->
      expect(@player.victoryPoints()).toEqual(4)

    it 'Player#discardDefenderOfCatanCard unassigns from player and goes back in game deck', ->
      @player.discardDefenderOfCatanCard()
      expect(@player.defenderOfCatanCards.length).toEqual(0)
      expect(@game.defenderOfCatanCards.length).toEqual(8)
