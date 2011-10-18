describe('With no expansions', function() {
  beforeEach(function() {
    return this.game = new Game({
      numPlayers: 1
    });
  });
  describe('game', function() {
    it('sets victory points required to win to 10', function() {
      return expect(this.game.victoryPointsRequiredToWin).toEqual(10);
    });
    it('creates soldiers', function() {
      return expect(this.game.soldiers.length).toEqual(14);
    });
    it('creates largest army', function() {
      return expect(this.game.largestArmy).toBeDefined();
    });
    return it('does not create development card victory points', function() {
      return expect(this.game.developmentCardVictoryPoints.length).toEqual(5);
    });
  });
  return describe('player', function() {
    beforeEach(function() {
      return this.player = this.game.players[0];
    });
    return it('begins with 2 settlements and 0 cities', function() {
      expect(this.player.settlements.inPlay().length).toEqual(2);
      return expect(this.player.cities.inPlay().length).toEqual(0);
    });
  });
});