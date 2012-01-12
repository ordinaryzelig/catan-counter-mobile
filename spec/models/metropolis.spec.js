describe('Metropolis', function() {
  beforeEach(function() {
    this.game = new Game({
      settings: new GameSettings({
        expansions: [CitiesAndKnights]
      }),
      numPlayers: 2
    });
    this.metro = this.game.metropolises[0];
    return this.player = this.game.players[0];
  });
  it('is worth 2 victory points', function() {
    this.player.takeMetropolis(this.metro);
    return expect(this.player.victoryPoints()).toEqual(5);
  });
  return it('#unaward unassigns player', function() {
    this.player.takeMetropolis(this.metro);
    this.metro.unaward();
    expect(this.metro.player).toBeUndefined();
    return expect(this.player.victoryPoints()).toEqual(3);
  });
});