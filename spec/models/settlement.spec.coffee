describe 'Settlement', ->

  it 'can be upgraded to city', ->
    player = new Player()
    player.setup()
    settlement = player.settlements.inPlay()[0]
    city = settlement.upgradeToCity()
    expect(settlement.inPlay).toEqual(false)
    expect(city.inPlay).toEqual(true)
    expect(player.settlements.inPlay().length).toEqual(1)
    expect(player.cities.inPlay().length).toEqual(1)
