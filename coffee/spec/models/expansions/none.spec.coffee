describe 'With no expansions', ->

  beforeEach ->
    @game = new Game(numPlayers: 1)

  describe 'game', ->

    it 'sets victory points required to win to 10', ->
      expect(@game.victoryPointsRequiredToWin).toEqual(10)

    it 'creates soldiers', ->
      expect(@game.soldiers.length).toEqual(14)

    it 'creates largest army', ->
      expect(@game.largestArmy).toBeDefined()

    it 'does not create development card victory points', ->
      expect(@game.developmentCardVictoryPoints.length).toEqual(5)

  describe 'player', ->

    beforeEach ->
      @player = @game.players[0]

    it 'begins with 2 settlements and 0 cities', ->
      expect(@player.settlements.inPlay().length).toEqual(2)
      expect(@player.cities.inPlay().length).toEqual(0)
