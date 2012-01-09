describe(BarbariansBattleOutcome, function() {
  beforeEach(function() {
    this.settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    this.game = new Game({
      numPlayers: 2,
      settings: this.settings
    });
    this.player1 = this.game.players[0];
    this.player1.color = 'red';
    this.player2 = this.game.players[1];
    return this.player2.color = 'blue';
  });
  describe('when barbarians strength > catan defense', function() {
    beforeEach(function() {
      this.player1.buildKnight().activate();
      return this.outcome = this.game.barbarians.attack();
    });
    it('barbarians win the battle', function() {
      expect(this.outcome.barbariansWin).toEqual(true);
      return expect(this.outcome.catanSuccessfullyDefends).toEqual(false);
    });
    it('.defendersOfCatan is nobody', function() {
      return expect(this.outcome.defendersOfCatan).toEqual([]);
    });
    it('.playersWhoLoseCity is player 2 who contributed no knights', function() {
      return expect(this.outcome.playersWhoLoseCity).toEqual([this.player2]);
    });
    return it('#apply plays out outcome', function() {
      this.outcome.apply();
      expect(this.player1.cities.inPlay().length).toEqual(1);
      return expect(this.player2.cities.inPlay().length).toEqual(0);
    });
  });
  describe('when catan defense strength >= barbarians', function() {
    beforeEach(function() {
      var player, _i, _len, _ref;
      _ref = this.game.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.buildKnight().activate();
      }
      this.player1.knights.inPlay()[0].promote();
      return this.outcome = this.game.barbarians.attack();
    });
    it('catan successfully defends', function() {
      expect(this.outcome.barbariansWin).toEqual(false);
      return expect(this.outcome.catanSuccessfullyDefends).toEqual(true);
    });
    it('.defendersOfCatan is player 1 who contributed most knights', function() {
      return expect(this.outcome.defendersOfCatan).toEqual([this.player1]);
    });
    return it('.playersWhoLoseCity is nobody', function() {
      return expect(this.outcome.playersWhoLoseCity).toEqual([]);
    });
  });
  it('#apply deactivates all knights', function() {
    var outcome, player, _i, _len, _ref;
    _ref = this.game.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      player.buildKnight().activate();
    }
    outcome = this.game.barbarians.attack();
    outcome.apply();
    return expect(this.game.catanDefense.strength()).toEqual(0);
  });
  return describe('#summary', function() {
    it('lists players who will lose a city', function() {
      var summary;
      this.outcome = this.game.barbarians.attack();
      summary = "" + this.player1.color + ", " + this.player2.color + " will lose a city.";
      return expect(this.outcome.summary).toEqual(summary);
    });
    it('lists players who will completely lose a city', function() {
      var idx, summary;
      for (idx = 1; idx <= 4; idx++) {
        this.player2.buildSettlement();
      }
      this.outcome = this.game.barbarians.attack();
      summary = "" + this.player1.color + ", " + this.player2.color + " will lose a city. " + this.player2.color + " will completely lose a city.";
      return expect(this.outcome.summary).toEqual(summary);
    });
    it('contains defender of Catan', function() {
      var summary;
      this.player1.buildKnight().promote().activate();
      this.outcome = this.game.barbarians.attack();
      summary = "" + this.player1.color + " will be the Defender of Catan and receive 1 Victory Point.";
      return expect(this.outcome.summary).toEqual(summary);
    });
    return it('contains defenders of Catan', function() {
      var player, summary, _i, _len, _ref;
      _ref = this.game.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.buildKnight().promote().activate();
      }
      this.outcome = this.game.barbarians.attack();
      summary = "" + this.player1.color + ", " + this.player2.color + " will have defended Catan and receive a progress card.";
      return expect(this.outcome.summary).toEqual(summary);
    });
  });
});