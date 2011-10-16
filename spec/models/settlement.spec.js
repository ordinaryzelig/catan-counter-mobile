describe('Settlement', function() {
  it('is worth 1 victory point each', function() {
    var game, player;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player.victoryPoints()).toEqual(2);
    player.buildSettlement();
    return expect(player.victoryPoints()).toEqual(3);
  });
  it('can be upgraded to city', function() {
    var city, player, settlement;
    player = new Player();
    settlement = player.settlements.inPlay()[0];
    city = settlement.upgradeToCity();
    expect(settlement.inPlay).toEqual(false);
    expect(city.inPlay).toEqual(true);
    expect(player.settlements.inPlay().length).toEqual(1);
    return expect(player.cities.inPlay().length).toEqual(1);
  });
  return it('#destroy removes it from being in play', function() {
    var player, settlement;
    player = new Player();
    settlement = player.settlements.inPlay()[0];
    settlement.destroy();
    return expect(settlement.inPlay).toEqual(false);
  });
});