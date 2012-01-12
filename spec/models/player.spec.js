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
  describe('with no expansions', function() {
    beforeEach(function() {
      this.game = new Game({
        numPlayers: 1
      });
      return this.player = this.game.players[0];
    });
    return it('begins with 2 settlements and 0 cities', function() {
      expect(this.player.settlements.inPlay().length).toEqual(2);
      return expect(this.player.cities.inPlay().length).toEqual(0);
    });
  });
  return describe('with Cities and Knights', function() {
    beforeEach(function() {
      this.settings = new GameSettings({
        expansions: [CitiesAndKnights]
      });
      this.game = new Game({
        numPlayers: 2,
        settings: this.settings
      });
      this.player = this.game.players[0];
      return this.player2 = this.game.players[1];
    });
    it('#knightStrength returns sum of activated knights levels', function() {
      var idx, player;
      player = this.game.players[0];
      player.buildKnight().promote().promote().activate();
      for (idx = 1; idx <= 2; idx++) {
        player.buildKnight().promote().activate();
      }
      player.buildKnight();
      return expect(player.knightStrength()).toEqual(7);
    });
    it('@knights.findById returns knight with matching id', function() {
      var knight, player;
      this.game = new Game({
        numPlayers: 1,
        settings: this.settings
      });
      player = this.game.players[0];
      knight = player.knights.findById(2);
      return expect(knight.id).toEqual(2);
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
    it('does not create soldiers', function() {
      return expect(this.player.soldiers).toBeUndefined();
    });
    it('#unmetropolizedCities excludes cities with a metropolis', function() {
      var metroplizedCity;
      expect(this.player.unmetropolizedCities()).toEqual(this.player.cities.inPlay());
      metroplizedCity = this.player.cities.inPlay()[0];
      metroplizedCity.metropolis = true;
      return expect(this.player.unmetropolizedCities()).toEqual([]);
    });
    it('#immune returns true if player has no unmetropolizedCities', function() {
      var metroplizedCity;
      expect(this.player.immune()).toEqual(false);
      metroplizedCity = this.player.cities.inPlay()[0];
      metroplizedCity.metropolis = true;
      return expect(this.player.immune()).toEqual(true);
    });
    it('#deactivateAllKnights deactivates all knights', function() {
      this.player.buildKnight().activate();
      this.player.deactivateAllKnights();
      return expect(this.player.knightStrength()).toEqual(0);
    });
    it('#takeMetropolis awards metropolis to player', function() {
      var metropolis;
      metropolis = this.game.metropolises[0];
      this.player.takeMetropolis(metropolis);
      return expect(metropolis.player).toEqual(this.player);
    });
    return it('#takeMetropolis unawards metropolis if another player has it', function() {
      var metropolis;
      metropolis = this.game.metropolises[0];
      this.player.takeMetropolis(metropolis);
      this.player2.takeMetropolis(metropolis);
      expect(this.player.metropolises.length).toEqual(0);
      return expect(this.player2.metropolises.length).toEqual(1);
    });
  });
});