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
      },
      toHaveLargestArmy: function() {
        return this.actual.hasLargestArmy();
      },
      toNotHaveLargestArmy: function() {
        return !this.actual.hasLargestArmy();
      }
    });
  });
  it('that has 10 victory points has enough victory points to win', function() {
    var game, i, player;
    game = new Game({
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
    game = new Game({
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
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    player.showDevelopmentCardVictoryPoints(2);
    return expect(player.numDevelopmentCardVictoryPointsNeededToWin()).toEqual(8);
  });
  it('#canWinByShowingAllDevelopmentCardVictoryPoints', function() {
    var game, idx, player;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player.canWinByShowingAllDevelopmentCardVictoryPoints()).toEqual(false);
    for (idx = 1; idx <= 3; idx++) {
      player.buildSettlement();
    }
    return expect(player.canWinByShowingAllDevelopmentCardVictoryPoints()).toEqual(true);
  });
  it('#winByPlayingDevelopmentCardVictoryPoints', function() {
    var game, idx, player;
    game = new Game({
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
  it('#destroySoldier removes knight and unassigns self from it', function() {
    var game, idx, player, soldier;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    for (idx = 1; idx <= 2; idx++) {
      player.playSoldier();
    }
    soldier = player.soldiers[0];
    player.destroySoldier();
    expect(soldier.player).toBeNull();
    expect(soldier.inPlay).toEqual(false);
    return expect(player.soldiers.length).toEqual(1);
  });
  it('#destroySoldier reassigns largest army if necessary', function() {
    var game, idx, player1, player2;
    game = new Game({
      numPlayers: 2
    });
    player1 = game.players[0];
    player2 = game.players[1];
    player1.playSoldier();
    player1.destroySoldier();
    expect(player1).toNotHaveLargestArmy();
    for (idx = 1; idx <= 3; idx++) {
      player1.playSoldier();
      player2.playSoldier();
    }
    expect(player1).toHaveLargestArmy();
    player2.playSoldier();
    expect(player2).toHaveLargestArmy();
    player2.destroySoldier();
    return expect(player1).toHaveLargestArmy();
  });
  return describe('with Cities and Knights', function() {
    beforeEach(function() {
      return this.settings = new GameSettings({
        expansions: [CitiesAndKnights]
      });
    });
    it('#knightStrength returns sum of activated knights levels', function() {
      var game, idx, player;
      game = new Game({
        numPlayers: 1,
        settings: this.settings
      });
      player = game.players[0];
      player.buildKnight().promote().promote().activate();
      for (idx = 1; idx <= 2; idx++) {
        player.buildKnight().promote().activate();
      }
      player.buildKnight();
      return expect(player.knightStrength()).toEqual(7);
    });
    return it('@knights.findById returns knight with matching id', function() {
      var game, knight, player;
      game = new Game({
        numPlayers: 1,
        settings: this.settings
      });
      player = game.players[0];
      knight = player.knights.findById(2);
      return expect(knight.id).toEqual(2);
    });
  });
});