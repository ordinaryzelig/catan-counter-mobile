describe(CatanDefense, function() {
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
  return it("#strength returns sum of players' knight strengths", function() {
    var player, _i, _len, _ref;
    _ref = this.game.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      player.buildKnight().promote().activate();
    }
    return expect(this.game.catanDefense.strength()).toEqual(4);
  });
});