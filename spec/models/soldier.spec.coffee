describe 'Soldier', ->

  it 'is played by a player', ->
    game = new Game()
    game.setup(numPlayers: 1)
    player = game.players[0]
    player.playSoldier()
    expect(player.soldiers.length).toEqual(1)
    expect(game.soldiers.notInPlay().length).toEqual(13)
