describe BarbariansBattleOutcome, ->

  beforeEach ->
    @settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 2, settings: @settings)
    @player1 = @game.players[0]
    @player1.color = 'red'
    @player2 = @game.players[1]
    @player2.color = 'blue'

  describe 'when barbarians strength > catan defense', ->

    beforeEach ->
      @player1.buildKnight().activate()
      @outcome = @game.barbarians.attack()

    it 'barbarians win the battle', ->
      expect(@outcome.barbariansWin).toEqual(true)
      expect(@outcome.catanSuccessfullyDefends).toEqual(false)

    it '.defendersOfCatan is nobody', ->
      expect(@outcome.defendersOfCatan).toEqual([])

    it '.playersWhoLoseCity is player 2 who contributed no knights', ->
      expect(@outcome.playersWhoLoseCity).toEqual([@player2])

    it '#apply plays out outcome', ->
      @outcome.apply()
      expect(@player1.cities.inPlay().length).toEqual(1)
      expect(@player2.cities.inPlay().length).toEqual(0)

  describe 'when catan defense strength >= barbarians', ->

    beforeEach ->
      for player in @game.players
        player.buildKnight().activate()
      @player1.knights.inPlay()[0].promote()
      @outcome = @game.barbarians.attack()

    it 'catan successfully defends', ->
      expect(@outcome.barbariansWin).toEqual(false)
      expect(@outcome.catanSuccessfullyDefends).toEqual(true)

    it '.defendersOfCatan is player 1 who contributed most knights', ->
      expect(@outcome.defendersOfCatan).toEqual([@player1])

    it '.playersWhoLoseCity is nobody', ->
      expect(@outcome.playersWhoLoseCity).toEqual([])

  it '#apply deactivates all knights', ->
    for player in @game.players
      player.buildKnight().activate()
    outcome = @game.barbarians.attack()
    outcome.apply()
    expect(@game.catanDefense.strength()).toEqual(0)

  describe '#summary', ->

    it 'lists players who will lose a city', ->
      @outcome = @game.barbarians.attack()
      summary = "#{@player1.color}, #{@player2.color} will lose a city."
      expect(@outcome.summary).toEqual(summary)

    it 'lists players who will completely lose a city', ->
      # Both players will lose a city.
      # player2 will completely lose a city.
      for idx in [1..4]
        @player2.buildSettlement()
      @outcome = @game.barbarians.attack()
      summary = "#{@player1.color}, #{@player2.color} will lose a city. #{@player2.color} will completely lose a city."
      expect(@outcome.summary).toEqual(summary)

    it 'contains defender of Catan', ->
      @player1.buildKnight().promote().activate()
      @outcome = @game.barbarians.attack()
      summary = "#{@player1.color} will be the Defender of Catan and receive 1 Victory Point."
      expect(@outcome.summary).toEqual(summary)

    it 'contains defenders of Catan', ->
      for player in @game.players
        player.buildKnight().promote().activate()
      @outcome = @game.barbarians.attack()
      summary = "#{@player1.color}, #{@player2.color} will have defended Catan and receive a progress card."
      expect(@outcome.summary).toEqual(summary)
