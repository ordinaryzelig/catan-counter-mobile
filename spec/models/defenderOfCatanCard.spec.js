describe('DefenderOfCatanCard', function() {
  beforeEach(function() {
    this.settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    return this.game = new Game({
      numPlayers: 2,
      settings: this.settings
    });
  });
  it('is awarded to single player who defends Catan', function() {
    var player1;
    player1 = this.game.players[0];
    player1.buildKnight().promote().activate();
    this.game.barbarians.attack().apply();
    expect(player1.defenderOfCatanCards.length).toEqual(1);
    return expect(this.game.defenderOfCatanCards.length).toEqual(7);
  });
  return it('is worth 1 victory point', function() {
    var player1;
    player1 = this.game.players[0];
    player1.buildKnight().promote().activate();
    this.game.barbarians.attack().apply();
    return expect(player1.victoryPoints()).toEqual(4);
  });
});