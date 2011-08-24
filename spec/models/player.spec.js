describe('Player', function() {
  beforeEach(function() {
    return this.addMatchers({
      toAllBelongToPlayer: function(player) {
        var object, _i, _len, _ref;
        _ref = this.actual;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          object = _ref[_i];
          if (object.player !== player) {
            return false;
          }
        }
        return true;
      },
      toHaveEnoughVictoryPointsToWin: function() {
        return this.actual.hasEnoughVictoryPointsToWin();
      },
      toNotHaveEnoughVictoryPointsToWin: function() {
        return !this.actual.hasEnoughVictoryPointsToWin();
      }
    });
  });
  it('#setup creates settlements and cities', function() {
    var player;
    player = new Player();
    player.setup();
    expect(player.settlements.length).toEqual(5);
    expect(player.settlements).toAllBelongToPlayer(player);
    expect(player.cities.length).toEqual(4);
    return expect(player.cities).toAllBelongToPlayer(player);
  });
  it('starts with 2 settlements built', function() {
    var player;
    player = new Player();
    player.setup();
    return expect(player.settlements.inPlay().length).toEqual(2);
  });
  it('that has 10 victory points has enough victory points to win', function() {
    var game, i, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player).toNotHaveEnoughVictoryPointsToWin();
    for (i = 1; i <= 3; i++) {
      player.buildSettlement();
    }
    for (i = 1; i <= 4; i++) {
      player.buildCity();
    }
    expect(player).toNotHaveEnoughVictoryPointsToWin();
    player.buildSettlement();
    return expect(player).toHaveEnoughVictoryPointsToWin();
  });
  it('#canBuildCity', function() {
    var game, idx, player, settlement, _i, _len, _ref;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player.canBuildCity()).toEqual(true);
    _ref = player.settlements.inPlay();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      settlement = _ref[_i];
      player.destroySettlement();
    }
    expect(player.canBuildCity()).toEqual(false);
    for (idx = 1; idx <= 4; idx++) {
      player.buildSettlement();
      player.buildCity();
    }
    return expect(player.canBuildCity()).toEqual(false);
  });
  it('#numDevelopmentCardVictoryPointsNeededToWin', function() {
    var game, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    player.showDevelopmentCardVictoryPoints(2);
    return expect(player.numDevelopmentCardVictoryPointsNeededToWin()).toEqual(8);
  });
  it('#canWinByShowingAllDevelopmentCardVictoryPoints', function() {
    var game, idx, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player.canWinByShowingAllDevelopmentCardVictoryPoints()).toEqual(false);
    for (idx = 1; idx <= 3; idx++) {
      player.buildSettlement();
    }
    return expect(player.canWinByShowingAllDevelopmentCardVictoryPoints()).toEqual(true);
  });
  return it('#winByPlayingDevelopmentCardVictoryPoints', function() {
    var game, idx, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    player.winByPlayingDevelopmentCardVictoryPoints();
    expect(player.victoryPoints()).toEqual(2);
    for (idx = 1; idx <= 3; idx++) {
      player.buildSettlement();
    }
    player.winByPlayingDevelopmentCardVictoryPoints();
    return expect(player.victoryPoints()).toEqual(10);
  });
});