describe('Game', function() {
  it('creates players', function() {
    var game, numPlayers;
    numPlayers = 4;
    game = new Game({
      numPlayers: numPlayers
    });
    return expect(game.players.length).toEqual(numPlayers);
  });
  it('accesses players by color', function() {
    var color, colors, game, idx, numPlayers, _i, _len, _ref, _results;
    colors = ['red', 'white', 'blue'];
    numPlayers = colors.length;
    game = new Game({
      numPlayers: numPlayers
    });
    for (idx = 0, _ref = numPlayers - 1; 0 <= _ref ? idx <= _ref : idx >= _ref; 0 <= _ref ? idx++ : idx--) {
      game.players[idx].color = colors[idx];
    }
    _results = [];
    for (_i = 0, _len = colors.length; _i < _len; _i++) {
      color = colors[_i];
      _results.push(expect(game.playerByColor(color).color).toEqual(color));
    }
    return _results;
  });
  it('accepts settings with expansions at initialization', function() {
    var game, settings;
    settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    game = new Game({
      settings: settings
    });
    return expect(game.usesExpansion(CitiesAndKnights)).toEqual(true);
  });
  describe('with no expansions', function() {
    beforeEach(function() {
      return this.game = new Game({
        numPlayers: 1
      });
    });
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
  return describe('with Cities and Knights', function() {
    beforeEach(function() {
      this.settings = new GameSettings({
        expansions: [CitiesAndKnights]
      });
      return this.game = new Game({
        numPlayers: 2,
        settings: this.settings
      });
    });
    it('sets victory points required to win to 13', function() {
      return expect(this.game.victoryPointsRequiredToWin).toEqual(13);
    });
    it('does not create soldiers', function() {
      return expect(this.game.soldiers).toBeUndefined;
    });
    it('does not create largest army', function() {
      return expect(this.game.largestArmy).toBeUndefined();
    });
    it('does not create development card victory points', function() {
      return expect(this.game.developmentCardVictoryPoints).toBeUndefined();
    });
    it('#playersByKnightStrength returns an array of players in descending order of knight strength', function() {
      var player, sortedPlayers, strengths, _i, _len;
      this.game.players[0].buildKnight().activate();
      this.game.players[1].buildKnight().promote().activate();
      sortedPlayers = this.game.playersByKnightStrength();
      strengths = [];
      for (_i = 0, _len = sortedPlayers.length; _i < _len; _i++) {
        player = sortedPlayers[_i];
        strengths.push(player.knightStrength());
      }
      return expect(strengths).toEqual([2, 1]);
    });
    it('#playersWhoContributeMostKnights returns players who have biggest knight strength', function() {
      var player1;
      expect(this.game.playersWhoContributeMostKnights()).toEqual(this.game.players);
      player1 = this.game.players[0];
      player1.buildKnight().activate();
      return expect(this.game.playersWhoContributeMostKnights()).toEqual([player1]);
    });
    describe('#playersNotImmuneWhoContributeLeastKnights', function() {
      it('returns players who have at least 1 unmetropolized city and have lowest knight strength', function() {
        var player1, player2;
        expect(this.game.playersNotImmuneWhoContributeLeastKnights()).toEqual(this.game.players);
        player1 = this.game.players[0];
        player1.buildKnight().activate();
        player2 = this.game.players[1];
        return expect(this.game.playersNotImmuneWhoContributeLeastKnights()).toEqual([player2]);
      });
      return it('excludes players who have no cities', function() {
        var player1, player2;
        player1 = this.game.players[0];
        player1.downgradeCity();
        player2 = this.game.players[1];
        return expect(this.game.playersNotImmuneWhoContributeLeastKnights()).toEqual([player2]);
      });
    });
    return it('creates defenders of Catan cards', function() {
      return expect(this.game.defenderOfCatanCards.length).toEqual(8);
    });
  });
});