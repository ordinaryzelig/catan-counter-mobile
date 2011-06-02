describe('Settlement', function() {
  it('is worth 1 victory point each', function() {
    var game, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    player.setup();
    expect(player.victoryPoints()).toEqual(2);
    player.buildSettlement();
    return expect(player.victoryPoints()).toEqual(3);
  });
  return it('can be upgraded to city', function() {
    var city, player, settlement;
    player = new Player();
    player.setup();
    settlement = player.settlements.inPlay()[0];
    city = settlement.upgradeToCity();
    expect(settlement.inPlay).toEqual(false);
    expect(city.inPlay).toEqual(true);
    expect(player.settlements.inPlay().length).toEqual(1);
    return expect(player.cities.inPlay().length).toEqual(1);
  });
});