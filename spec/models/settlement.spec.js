describe('Settlement', function() {
  beforeEach(function() {
    this.game = new Game({
      numPlayers: 1
    });
    return this.player = this.game.players[0];
  });
  it('is worth 1 victory point each', function() {
    expect(this.player.victoryPoints()).toEqual(2);
    this.player.buildSettlement();
    return expect(this.player.victoryPoints()).toEqual(3);
  });
  it('can be upgraded to city', function() {
    var city, settlement;
    settlement = this.player.settlements.inPlay()[0];
    city = settlement.upgradeToCity();
    expect(settlement.inPlay).toEqual(false);
    expect(city.inPlay).toEqual(true);
    expect(this.player.settlements.inPlay().length).toEqual(1);
    return expect(this.player.cities.inPlay().length).toEqual(1);
  });
  return it('#destroy removes it from being in play', function() {
    var settlement;
    settlement = this.player.settlements.inPlay()[0];
    settlement.destroy();
    return expect(settlement.inPlay).toEqual(false);
  });
});