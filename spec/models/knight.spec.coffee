describe 'Knight', ->

  beforeEach ->
    settings = new GameSettings(expansions: [CitiesAndKnights])
    @game = new Game(numPlayers: 2, settings: settings)
    @player = @game.players[0]

  it 'can be built', ->
    expect(@player.knights.inPlay().length).toEqual(0)
    @player.buildKnight()
    expect(@player.knights.inPlay().length).toEqual(1)

  it 'can be activated', ->
    knight = @player.buildKnight()
    expect(knight.active).toEqual(false)
    knight.activate()
    expect(knight.active).toEqual(true)

  it 'can be deactivated', ->
    knight = @player.buildKnight()
    knight.activate()
    knight.deactivate()
    expect(knight.active).toEqual(false)

  it 'can be promoted', ->
    knight = @player.buildKnight()
    knight.activate()
    knight.promote()
    expect(@player.knights.inPlay().level(1).length).toEqual(0)
    expect(@player.knights.inPlay().level(2).active().length).toEqual(1)

  it 'assigned with id', ->
    ids = []
    for knight in @player.knights
      ids.push(knight.id)
    expect(ids).toEqual([1, 2, 3, 4, 5, 6])

  it '#promote throws error if attempted on level 3 knight', ->
    knight = @player.buildKnight()
    for level in [2..3]
      knight = knight.promote()
    expect(knight.level).toEqual(3)
    expect(->knight.promote()).toThrow('level 3 knight cannot be promoted')

  it '#promote throws error if no available knights to build', ->
    for idx in [1..2]
      @player.buildKnight().promote()
    knight = @player.buildKnight()
    expect(->knight.promote()).toThrow('no level 2 knights available')

  it '#promote passes button to new knight and reassign button.knightId', ->
    knight = @player.buildKnight()
    button = {
      knightId: knight.id,
    }
    knight.button = button
    newKnight = knight.promote()
    expect(newKnight.button).toEqual(button)
    expect(knight.button).toBeNull()
    expect(button.knightId).toEqual(newKnight.id)

  it '#desertFor destroys knight for 1 player, adds equal knight to other player', ->
    knight = @player.buildKnight().promote()
    knight.activate()
    player2 = @game.players[1]
    player2Knight = knight.desertFor(player2)
    expect(knight.active).toEqual(false)
    expect(knight.inPlay).toEqual(false)
    expect(player2Knight.player).toEqual(player2)
    expect(player2Knight.level).toEqual(2)
    expect(player2Knight.active).toEqual(true)

  it '#desertFor returns undefined if another player cannot build equal knight', ->
    knight = @player.buildKnight()
    player2 = @game.players[1]
    for times in [1..2]
      player2.buildKnight()
    player2Knight = knight.desertFor(player2)
    expect(player2Knight).toBeUndefined()

  it '#canBePromoted returns true if there are knights of level + 1 not in play', ->
    # Build 2 level 2 knights.
    for idx in [1..2]
      @player.buildKnight().promote()
    # Build level 1 knight who should not be able to be promoted.
    knight = @player.buildKnight()
    expect(knight.canBePromoted()).toEqual(false)
    knight2 = @player.knights.level(2)[0]
    expect(knight2.canBePromoted()).toEqual(true)
