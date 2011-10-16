describe('LargestArmy', function() {
  beforeEach(function() {
    return this.addMatchers({
      toHaveLargestArmy: function() {
        return this.actual.hasLargestArmy();
      },
      toNotHaveLargestArmy: function() {
        return !this.actual.hasLargestArmy();
      }
    });
  });
  it('awarded to first player to play 3 soldiers', function() {
    var game, i, player;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player).toNotHaveLargestArmy();
    for (i = 1; i <= 3; i++) {
      player.playSoldier();
    }
    expect(player).toHaveLargestArmy();
    return expect(player.victoryPoints()).toEqual(4);
  });
  return it('can be stolen when another player plays more soldiers than person with largest army', function() {
    var game, i, player_1, player_2;
    game = new Game({
      numPlayers: 2
    });
    player_1 = game.players[0];
    for (i = 1; i <= 3; i++) {
      player_1.playSoldier();
    }
    player_2 = game.players[1];
    for (i = 1; i <= 3; i++) {
      player_2.playSoldier();
    }
    expect(player_2).toNotHaveLargestArmy();
    player_2.playSoldier();
    expect(player_2).toHaveLargestArmy();
    return expect(player_1).toNotHaveLargestArmy();
  });
});