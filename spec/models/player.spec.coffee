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

  it 'counts each settlements in play as 1 victory point and each city in play as 2 victory points', ->
    player = new Player()
    player.setup()
    player.buildSettlement()
    player.buildCity()
    expect(player.victoryPoints()).toEqual(4)
