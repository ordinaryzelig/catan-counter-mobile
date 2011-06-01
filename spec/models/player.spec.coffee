describe 'Player', ->

  beforeEach ->
    @addMatchers {
      toAllBelongToPlayer: (player) ->
        for object in @actual
          return false unless object.player == player
        true
    }

  it '#setup creates settlements and cities', ->
    player = new Player()
    player.setup()
    expect(player.settlements.length).toEqual(5)
    expect(player.settlements).toAllBelongToPlayer(player)
    expect(player.cities.length).toEqual(4)
    expect(player.cities).toAllBelongToPlayer(player)

  it 'starts with 2 settlements built', ->
    player = new Player()
    player.setup()
    expect(player.settlements.inPlay().length).toEqual(2)
