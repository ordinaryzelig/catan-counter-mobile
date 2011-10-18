describe('Cities and Knights', function() {
  beforeEach(function() {
    this.settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    return this.game = new Game({
      numPlayers: 1,
      settings: this.settings
    });
  });
  describe('game', function() {
    it('sets victory points required to win to 13', function() {
      return expect(this.game.victoryPointsRequiredToWin).toEqual(13);
    });
    it('does not create soldiers', function() {
      return expect(this.game.soldiers).toBeUndefined;
    });
    it('does not create largest army', function() {
      return expect(this.game.largestArmy).toBeUndefined();
    });
    return it('does not create development card victory points', function() {
      return expect(this.game.developmentCardVictoryPoints).toBeUndefined();
    });
  });
  return describe('player', function() {
    beforeEach(function() {
      return this.player = this.game.players[0];
    });
    it('begins with 1 settlement and 1 city', function() {
      expect(this.player.settlements.inPlay().length).toEqual(1);
      return expect(this.player.cities.inPlay().length).toEqual(1);
    });
    it('begins with 2 inactive knights of each level', function() {
      var level, _results;
      expect(this.player.knights.length).toEqual(6);
      expect(this.player.knights.inactive().length).toEqual(6);
      expect(this.player.knights.notInPlay().length).toEqual(6);
      _results = [];
      for (level = 1; level <= 3; level++) {
        _results.push(expect(this.player.knights.level(level).length).toEqual(2));
      }
      return _results;
    });
    it('does not create development card victory points', function() {
      return expect(this.player.developmentCardVictoryPoints).toBeUndefined();
    });
    return it('does not create soldiers', function() {
      return expect(this.player.soldiers).toBeUndefined();
    });
  });
});