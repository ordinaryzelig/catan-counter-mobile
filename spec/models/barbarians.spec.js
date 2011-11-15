describe(Barbarians, function() {
  beforeEach(function() {
    this.settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    this.game = new Game({
      numPlayers: 2,
      settings: this.settings
    });
    return this.barbarians = this.game.barbarians;
  });
  return it("#strength returns sum of number of players' cities", function() {
    this.game.players[0].buildCity();
    return expect(this.barbarians.strength()).toEqual(3);
  });
});