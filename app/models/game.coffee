class Game

  setup: (options = {}) ->
    @createPlayers(options['numPlayers'])
    @createSoldiers()
    @createLargestArmy()

  createPlayers: (num)->
    @players = []
    for i in [1..num]
      player = new Player(game: this)
      player.setup()
      @players.push(player)

  createSoldiers: ->
    @soldiers = new PlayableSet()
    for i in [1..14]
      @soldiers.push new Soldier(game: this)

  createLargestArmy: ->
    @largestArmy = new LargestArmy(game: this)

  awardLargestArmyTo: (player)->
    @largestArmy.player = player
